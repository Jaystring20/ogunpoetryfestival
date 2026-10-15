import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/data/photos";

/**
 * Full-size view of one photo from a set, in a native <dialog> (focus trap,
 * Escape to close). Arrow keys and the side buttons step through the set.
 */
export function Lightbox({ photos, index, onChange, onClose }: { photos: readonly Photo[]; index: number | null; onChange: (i: number) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = index !== null;

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onChange((index! + 1) % photos.length);
      if (e.key === "ArrowLeft") onChange((index! - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, photos.length, onChange]);

  const photo = open ? photos[index] : null;
  const step = (d: number) => onChange((index! + d + photos.length) % photos.length);
  const button = "flex h-12 w-12 items-center justify-center bg-ink/80 text-paper transition-colors hover:bg-sun hover:text-ink";

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="m-0 h-full max-h-none w-full max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/90"
      aria-label="Photo viewer"
    >
      {photo && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <p className="label text-xs text-muted">
              {index! + 1} / {photos.length}
            </p>
            <button type="button" className={button} onClick={onClose} aria-label="Close photo viewer">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4">
            <img src={photo.src} alt={photo.alt} width={photo.w} height={photo.h} className="max-h-full max-w-full object-contain" />
            <button type="button" className={`${button} absolute left-4 top-1/2 -translate-y-1/2`} onClick={() => step(-1)} aria-label="Previous photo">
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button type="button" className={`${button} absolute right-4 top-1/2 -translate-y-1/2`} onClick={() => step(1)} aria-label="Next photo">
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
          <p className="px-4 pb-5 text-center text-sm text-paper/80">{photo.alt}</p>
        </div>
      )}
    </dialog>
  );
}
