interface MatrixBackgroundProps {
  /** Opacity of the GIF overlay (0-1). Lower = more subtle. */
  opacity?: number;
  /** Whether to apply a dark gradient overlay on top for readability. */
  overlay?: boolean;
}

export default function MatrixBackground({
  opacity = 0.15,
  overlay = true,
}: MatrixBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <img
        src="https://media1.tenor.com/m/IvyuPtEfzhoAAAAd/matrix.gif"
        alt=""
        aria-hidden="true"
        className="h-full w-full object-cover"
        style={{ opacity }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/90" />
      )}
    </div>
  );
}
