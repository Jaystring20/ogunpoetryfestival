import { cn } from "@/lib/utils";

/**
 * The festival's signature: blocks of square tiles, each a quarter circle,
 * a triangle, a half circle or a plain square, in the logo's colours. It's
 * the same geometry as the lettering in the logo and the prospectus corners.
 * A seed makes each block different but stable between renders.
 */

const COLORS = ["#F81050", "#08B098", "#F8C800", "#29D3EA", "#1b1563"];

type Shape = "quarter" | "triangle" | "half" | "square" | "empty";
const SHAPES: Shape[] = ["quarter", "triangle", "half", "square", "quarter", "empty"];

function rng(seed: number) {
  let s = seed % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function Tile({ shape, color, rot, x, y, s }: { shape: Shape; color: string; rot: number; x: number; y: number; s: number }) {
  const t = `rotate(${rot} ${x + s / 2} ${y + s / 2})`;
  switch (shape) {
    case "quarter":
      return <path d={`M${x} ${y}h${s}v${s}A${s} ${s} 0 0 1 ${x} ${y}z`} fill={color} transform={t} />;
    case "triangle":
      return <path d={`M${x} ${y + s}L${x + s} ${y + s}L${x} ${y}z`} fill={color} transform={t} />;
    case "half":
      return <path d={`M${x} ${y + s}A${s / 2} ${s / 2} 0 0 1 ${x + s} ${y + s}z`} fill={color} transform={t} />;
    case "square":
      return <rect x={x} y={y} width={s} height={s} fill={color} />;
    default:
      return null;
  }
}

export function Tiles({
  cols,
  rows,
  seed = 7,
  className,
  colors = COLORS,
}: {
  cols: number;
  rows: number;
  seed?: number;
  className?: string;
  colors?: string[];
}) {
  const r = rng(seed);
  const s = 100;
  const tiles = [];
  for (let y = 0; y < rows; y++)
    for (let x = 0; x < cols; x++) {
      const shape = SHAPES[Math.floor(r() * SHAPES.length)];
      const color = colors[Math.floor(r() * colors.length)];
      const rot = [0, 90, 180, 270][Math.floor(r() * 4)];
      tiles.push(<Tile key={`${x}-${y}`} shape={shape} color={color} rot={rot} x={x * s} y={y * s} s={s} />);
    }
  return (
    <svg viewBox={`0 0 ${cols * s} ${rows * s}`} aria-hidden="true" className={cn("block", className)} preserveAspectRatio="xMidYMid slice">
      {tiles}
    </svg>
  );
}
