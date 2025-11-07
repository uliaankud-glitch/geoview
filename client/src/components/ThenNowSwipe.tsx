import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { Card } from "@/components/ui/card";
import { BeforeAfter } from "@/lib/posts";

interface ThenNowSwipeProps {
  data: BeforeAfter;
}

export function ThenNowSwipe({ data }: ThenNowSwipeProps) {
  if (!data || !data.before || !data.after) {
    return null;
  }

  return (
    <Card className="my-12 overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-2xl font-semibold mb-2">Then vs Now Comparison</h3>
        <p className="text-sm text-muted-foreground">
          Drag the slider to compare historical and modern imagery
        </p>
      </div>
      <div className="relative w-full aspect-video">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage 
              src={data.before} 
              alt={data.beforeLabel}
            />
          }
          itemTwo={
            <ReactCompareSliderImage 
              src={data.after} 
              alt={data.afterLabel}
            />
          }
          style={{
            width: '100%',
            height: '100%'
          }}
          handle={
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'hsl(var(--primary))',
              border: '3px solid white',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'ew-resize'
            }}>
              <div style={{
                width: '2px',
                height: '20px',
                backgroundColor: 'white',
                marginRight: '3px'
              }} />
              <div style={{
                width: '2px',
                height: '20px',
                backgroundColor: 'white',
                marginLeft: '3px'
              }} />
            </div>
          }
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
