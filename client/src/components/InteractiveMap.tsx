import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface InteractiveMapProps {
  postId: string;
}

const silkRoadCities = [
  { name: "Xi'an (Chang'an)", country: "China", description: "Eastern terminus of the Silk Road" },
  { name: "Samarkand", country: "Uzbekistan", description: "Major trading hub on the Silk Road" },
  { name: "Bukhara", country: "Uzbekistan", description: "Ancient center of trade and culture" },
  { name: "Tashkent", country: "Uzbekistan", description: "Important oasis city" },
  { name: "Tbilisi", country: "Georgia", description: "Gateway between Asia and Europe" },
  { name: "Istanbul", country: "Turkey", description: "Western terminus connecting to Europe" },
];

export function InteractiveMap({ postId }: InteractiveMapProps) {
  return (
    <Card className="p-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2">The Silk Road: Major Trading Posts</h3>
        <p className="text-sm text-muted-foreground">
          Historical trading centers along the ancient Silk Road, connecting East and West
        </p>
      </div>
      <div className="min-h-[500px] rounded-md bg-muted/30 p-6" data-testid="map-silk-road">
        <div className="space-y-4">
          {silkRoadCities.map((city, index) => (
            <div 
              key={city.name}
              className="flex items-start gap-3 p-4 rounded-md bg-background border hover-elevate transition-all"
            >
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">{city.name}</h4>
                <p className="text-sm text-muted-foreground mb-1">{city.country}</p>
                <p className="text-sm">{city.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Historical data compiled from archaeological and historical sources
      </p>
    </Card>
  );
}
