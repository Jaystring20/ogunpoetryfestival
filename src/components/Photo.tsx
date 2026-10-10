import type { Photo as PhotoData } from "@/data/photos";
import { cn } from "@/lib/utils";

/**
 * A real OPF photograph. Square corners, lazy loaded, with a small copy for
 * phones. `frame` sizes or crops the image itself (e.g. an aspect ratio),
 * `position` chooses what stays in frame when it is cropped, and `className`
 * goes on the outer element.
 */
export function Photo({
  photo,
  caption,
  className,
  frame,
  position,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  photo: PhotoData;
  caption?: string;
  className?: string;
  frame?: string;
  position?: string;
  sizes?: string;
}) {
  const img = (
    <img
      src={photo.src}
      srcSet={`${photo.small} 800w, ${photo.src} ${photo.w}w`}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading="lazy"
      decoding="async"
      className="h-full w-full bg-ink-raised object-cover"
      style={position ? { objectPosition: position } : undefined}
    />
  );
  if (!caption) return <div className={cn("overflow-hidden", frame, className)}>{img}</div>;
  return (
    <figure className={className}>
      <div className={cn("overflow-hidden", frame)}>{img}</div>
      <figcaption className="label mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
