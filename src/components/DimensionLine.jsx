/**
 * Engineering dimension line — circle terminator, trace, square terminator.
 * Animated variant carries a glowing charge along the trace (hero); the
 * static variant is used as a section divider on blog posts.
 */
const DimensionLine = ({ animated = true, className = "" }) => (
    <div className={`flex items-center ${className}`} aria-hidden="true">
        <div className="h-[10px] w-[10px] shrink-0 rounded-full border-[1.5px] border-blueink"></div>
        <div className="trace">
            {animated && <div className="trace-dot"></div>}
        </div>
        <div className="h-[10px] w-[10px] shrink-0 border-[1.5px] border-blueink bg-blueink/25"></div>
    </div>
);

export default DimensionLine;
