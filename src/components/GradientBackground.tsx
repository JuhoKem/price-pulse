/** Full-screen animated gradient background */
const GradientBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen w-full overflow-hidden">
    {/* Base gradient */}
    <div className="absolute inset-0 gradient-vibrant" />
    {/* Animated wave blobs */}
    <div
      className="absolute -top-1/4 -left-1/4 w-[150%] h-[60%] rounded-full opacity-30"
      style={{
        background: "radial-gradient(circle, hsl(320 80% 58%) 0%, transparent 70%)",
        animation: "wave 8s ease-in-out infinite",
      }}
    />
    <div
      className="absolute -bottom-1/4 -right-1/4 w-[120%] h-[50%] rounded-full opacity-20"
      style={{
        background: "radial-gradient(circle, hsl(220 90% 56%) 0%, transparent 70%)",
        animation: "wave 10s 2s ease-in-out infinite",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export default GradientBackground;
