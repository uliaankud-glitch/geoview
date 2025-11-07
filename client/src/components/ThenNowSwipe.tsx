import ReactCompareImage from "react-compare-image";
import { Card } from "@/components/ui/card";
import { BeforeAfter } from "@/lib/posts";

interface ThenNowSwipeProps {
  data: BeforeAfter;
}

export function ThenNowSwipe({ data }: ThenNowSwipeProps) {
  return (
    <Card className="my-12 overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-2xl font-semibold mb-2">Then vs Now Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Drag the slider to compare historical and modern imagery
        </p>
      </div>
      <div className="relative">
        <ReactCompareImage
          leftImage={data.before}
          rightImage={data.after}
          leftImageLabel={data.beforeLabel}
          rightImageLabel={data.afterLabel}
          sliderLineColor="#hsl(var(--primary))"
        />
      </div>
      <div className="p-4 bg-muted/50 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-semibold">Before:</span> {data.beforeLabel}
        </div>
        <div className="text-right">
          <span className="font-semibold">After:</span> {data.afterLabel}
        </div>
      </div>
    </Card>
  );
}
