const OnlineIndicator = ({ className }: { className?: string }) => {
  return (
    <span className={`absolute flex  ${className}`}>
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
    </span>
  );
};

export default OnlineIndicator;
