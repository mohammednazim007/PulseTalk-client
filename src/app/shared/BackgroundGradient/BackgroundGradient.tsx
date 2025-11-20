const BackgroundGradient = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    {/* Top Left Glow */}
    <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[100px] animate-pulse" />
    {/* Bottom Right Glow */}
    <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[100px] opacity-60" />
    {/* Center subtle accent */}
    <div className="absolute top-[20%] left-[30%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px]" />
  </div>
);
export default BackgroundGradient;
