import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { posts } from "@/lib/posts";
import { useLocation } from "wouter";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export function GeoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).setView([20, 0], 2);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);

    posts.filter(post => post.geoLocation).forEach(post => {
      if (post.geoLocation) {
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div class="w-8 h-8 bg-primary rounded-full border-4 border-background shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                   <div class="w-2 h-2 bg-white rounded-full"></div>
                 </div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker(
          [post.geoLocation.lat, post.geoLocation.lng],
          { icon: customIcon }
        ).addTo(map);

        const popupContent = `
          <div class="p-2 min-w-[200px]">
            <h4 class="font-semibold text-sm mb-1">${post.title}</h4>
            <p class="text-xs text-muted-foreground mb-2">${post.excerpt.substring(0, 100)}...</p>
            <div class="flex items-center justify-between">
              <span class="text-xs px-2 py-1 rounded bg-primary/10 text-primary">${post.category}</span>
              <button class="text-xs text-primary hover:underline" onclick="window.dispatchEvent(new CustomEvent('navigate-to-post', { detail: '${post.id}' }))">
                Read More →
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);
      }
    });

    const handleNavigate = ((event: CustomEvent) => {
      setLocation(`/post/${event.detail}`);
    }) as EventListener;

    window.addEventListener('navigate-to-post', handleNavigate);

    return () => {
      window.removeEventListener('navigate-to-post', handleNavigate);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [setLocation]);

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden border shadow-lg">
      <div ref={mapRef} className="w-full h-full" data-testid="geo-map" />
    </div>
  );
}
