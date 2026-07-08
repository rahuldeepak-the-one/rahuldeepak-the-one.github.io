const blogPosts = [
    {
        slug: "building-modular-deepstream-9-pipelines",
        title: "Building Modular DeepStream 9.0 Pipelines",
        date: "2026-05-10",
        tags: ["DeepStream", "C++", "GStreamer", "Architecture"],
        excerpt: "How I designed a modular, multi-source GStreamer pipeline with YAML-driven configuration and dynamic RTSP source management for production video analytics.",
        readTime: "8 min",
        content: `
## The Problem

When you're processing dozens of RTSP camera feeds simultaneously, a monolithic pipeline becomes a nightmare to debug and maintain. Every camera dropout cascades into mysterious segfaults, and adding new analytics modules means touching a 3600-line core file.

## The Architecture

I designed a modular pipeline architecture that separates concerns cleanly:

\`\`\`
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│ Source       │───▶│ Inference    │───▶│ Analytics   │
│ Manager     │    │ Engine       │    │ Plugins     │
│ (RTSP/File) │    │ (Triton gRPC)│    │ (Loadable)  │
└─────────────┘    └──────────────┘    └─────────────┘
       │                  │                    │
       ▼                  ▼                    ▼
   YAML Config      Model Repo          Probe Callbacks
\`\`\`

### YAML-Driven Configuration

Instead of hardcoding pipeline parameters, everything is driven by YAML:

\`\`\`yaml
streammux:
  batch-size: 8
  width: 1920
  height: 1080
  
sources:
  - uri: rtsp://cam1.local/stream
    type: rtsp
  - uri: rtsp://cam2.local/stream  
    type: rtsp
\`\`\`

### Dynamic Source Management

The \`create_source_bin\` pattern allows hot-plugging camera sources without restarting the pipeline. When an RTSP stream drops, the source bin handles reconnection autonomously while other streams continue processing.

## Key Learnings

1. **Never block the GStreamer main loop** — async API calls must use thread pools with timeouts
2. **Boundary clamping is non-negotiable** — camera ID shifts produce out-of-bounds bounding boxes that crash OpenCV
3. **YAML configs + shared libraries** = zero-code deployment changes

The result? A pipeline that handles 8+ concurrent streams at 30 FPS each, survives network interruptions, and can be reconfigured without a single recompile.
        `
    },
    {
        slug: "benchmarking-yolo-models-edge-gpus",
        title: "Benchmarking YOLO Models on Edge GPUs",
        date: "2026-04-24",
        tags: ["YOLO", "TensorRT", "Benchmarking", "Edge AI"],
        excerpt: "A data-driven comparison of YOLOv8 and YOLO26 model families across n/s/m scales on an RTX 3060 Laptop GPU, finding the optimal detection-to-latency trade-off.",
        readTime: "6 min",
        content: `
## Why Benchmark?

Choosing the right YOLO variant for edge deployment isn't just about accuracy — it's about finding the sweet spot between detection quality and inference latency. A model that's 2% more accurate but 3x slower is a bad trade for real-time surveillance.

## The Framework

I built an automated benchmarking suite using DeepStream 9.0 in headless mode (\`BENCH_MODE=1\`):

\`\`\`
┌──────────────────────────────────────────────┐
│           Benchmark Runner                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ YOLOv8n  │  │ YOLOv8s  │  │ YOLOv8m  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ YOLO26n  │  │ YOLO26s  │  │ YOLO26m  │   │
│  └──────────┘  └──────────┘  └──────────┘   │
│                                              │
│  Metrics: FPS │ Latency │ GPU Util │ Memory  │
└──────────────────────────────────────────────┘
\`\`\`

## Results (RTX 3060 Laptop, TensorRT FP16)

| Model    | FPS   | Latency (ms) | GPU Memory |
|----------|-------|-------------|------------|
| YOLOv8n  | 142   | 7.0         | 1.2 GB     |
| YOLOv8s  | 98    | 10.2        | 1.8 GB     |
| YOLOv8m  | 61    | 16.4        | 2.6 GB     |
| YOLO26n  | 128   | 7.8         | 1.4 GB     |
| YOLO26s  | 89    | 11.2        | 2.0 GB     |
| YOLO26m  | 55    | 18.1        | 2.9 GB     |

## The Verdict

For multi-stream edge deployment where you need 30+ FPS per stream, **YOLOv8n with TensorRT FP16** is the clear winner. It gives you headroom for 4 streams on a single GPU while maintaining real-time performance.

For single-stream high-accuracy scenarios, YOLOv8s hits the sweet spot — nearly 100 FPS with meaningfully better detection.
        `
    },
    {
        slug: "monolith-to-plugins-video-analytics",
        title: "From Monolith to Plugins: Modernizing a Video Analytics Platform",
        date: "2026-04-15",
        tags: ["Architecture", "C++", "Triton", "Refactoring"],
        excerpt: "The story of decomposing a 3600-line C++ monolith into a modular plugin architecture with Triton-based inference, reducing container size by 30%.",
        readTime: "10 min",
        content: `
## The Legacy

Imagine a single C++ file — \`core.cpp\` — containing 3600 lines of pipeline logic, bus callbacks, metadata processing, source management, and sink configuration. That was the Iris pipeline.

The container image was 15GB. Deploying a model update meant rebuilding the entire thing. A segfault in the face recognition module would take down the entire pipeline.

## The Strategy

### Phase 1: Architectural Decoupling

The first move was extracting inference into a standalone Triton Inference Server:

\`\`\`
Before:  Pipeline ←→ nvinfer (embedded models)
After:   Pipeline ←→ nvinferserver ←→ Triton gRPC ←→ Model Repo
\`\`\`

**Results:**
- Container size: 15GB → 10.5GB (30% reduction)
- Model updates: Full rebuild → Hot-swap via Triton model repository
- A/B testing: Impossible → Native support via Triton model versioning

### Phase 2: Module Decomposition

The monolith was split into focused modules:

- **SourceManager** — RTSP/file source lifecycle with reconnection
- **BusHandler** — GStreamer bus message routing  
- **MetaProcessor** — Metadata extraction and enrichment
- **AnalyticsPlugin** — Loadable shared libraries for use-case logic

### Phase 3: Reliability

The most impactful change was fixing the API call pattern:

\`\`\`cpp
// Before: Thread-blocking infinite retry
while (true) {
    if (api_call()) break;
    sleep(1);  // Blocks forever if network is down
}

// After: Bounded retry with exponential backoff
for (int i = 0; i < MAX_RETRIES; i++) {
    if (api_call_with_timeout(5s)) break;
    sleep(min(pow(2, i), 30));
}
\`\`\`

## Lessons Learned

1. **Decompose by failure domain** — If a module can crash, isolate it
2. **Measure before you refactor** — Our benchmarking framework proved the new architecture had zero performance regression
3. **Infrastructure as configuration** — YAML-driven pipelines eliminate deployment friction

The modernized platform now runs 24/7 across dozens of edge devices with zero unplanned downtime.
        `
    }
];

// newest first; note numbers count up from the oldest post (latest = highest)
export const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));

export const noteLabel = (slug) => {
    const index = sortedPosts.findIndex((post) => post.slug === slug);
    if (index === -1) return "NOTE-000";
    return `NOTE-${String(sortedPosts.length - index).padStart(3, "0")}`;
};

export default blogPosts;
