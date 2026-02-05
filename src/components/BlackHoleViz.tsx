interface BlackHoleVizProps {
  size?: number;
  className?: string;
}

export function BlackHoleViz({ size = 200, className = "" }: BlackHoleVizProps) {
  return (
    <div
      className={`black-hole animate-float ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
}
