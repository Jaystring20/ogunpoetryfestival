import { Download } from "lucide-react";
import { cn } from "@/lib/utils";

/** A brochure download: the file type and size are shown so people on mobile data know what to expect. */
export function DownloadLink({ file, className }: { file: { href: string; label: string; size: string }; className?: string }) {
  return (
    <a href={file.href} download className={cn("btn-line", className)}>
      <Download className="h-5 w-5" aria-hidden="true" />
      <span>
        Download the {file.label.toLowerCase()} <span className="font-normal opacity-75">(PDF, {file.size})</span>
      </span>
    </a>
  );
}
