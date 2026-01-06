import { Card } from "@/components/ui/card";

interface FramedImageProps {
  src: string;
  alt: string;
  caption?: string;
  title?: string;
  subtitle?: string;
}

/**
 * Displays a single image in a framed card with the same style as SplitLensExplorer.
 */
export function FramedImage({ src, alt, caption, title, subtitle }: FramedImageProps) {

    console.log("✅ Rendering new FramedImage");
    
    return (
    <Card className="overflow-hidden my-12 border shadow-sm">
      {/* Header (same as SplitLens) */}
      {(title || subtitle) && (
        <div className="p-6 border-b bg-primary/5">
          {title && <h3 className="text-xl font-semibold">{title}</h3>}
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      {/* Image area (matches SplitLens visualization section) */}
      <div className="p-6 bg-muted/30">
        <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-border bg-background shadow-sm">
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>

      {/* Caption (matches card footer aesthetic) */}
      {caption && (
        <div className="p-4 bg-muted/50 text-sm text-center text-muted-foreground border-t">
          {caption}
        </div>
      )}
    </Card>
  );
}
