import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { posts, TopicCategory } from "@/lib/posts";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { getCategoryMetadata, categoryMetadata } from "@/lib/categoryConfig";

export function GeoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerLayersRef = useRef<Map<string, { marker: L.Marker; topic: TopicCategory }>>(new Map());
  const [, setLocation] = useLocation();
  const [activeFilters, setActiveFilters] = useState<Set<TopicCategory>>(new Set());
  const [isFolded, setIsFolded] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      fadeAnimation: true,
      zoomAnimation: true,
      markerZoomAnimation: true,
      easeLinearity: 0.25,
    }).setView([20, 0], 2);

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap, © CartoDB",
      maxZoom: 18,
      minZoom: 2,
    }).addTo(map);

    const style = document.createElement("style");
    style.id = "geo-map-styles";
    style.textContent = `
      @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.5; }
        100% { transform: scale(0.8); opacity: 1; }
      }
      .map-marker { position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
      .map-marker:hover { transform: scale(1.3); z-index: 1000; }
      .marker-core { width: 14px; height: 14px; border-radius: 50%; position: relative; z-index: 2; box-shadow: 0 0 8px rgba(0,0,0,0.2); }
      .marker-glow { position: absolute; width: 24px; height: 24px; border-radius: 50%; animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; z-index: 1; }
    `;
    if (!document.getElementById("geo-map-styles")) {
      document.head.appendChild(style);
    }

    posts
      .filter((post) => post.geoLocation)
      .forEach((post) => {
        if (post.geoLocation) {
          const topic = post.topicCategory || "technology";
          const categoryMeta = getCategoryMetadata(topic);
          const colors = { main: categoryMeta.mainColor, glow: categoryMeta.glowColor, label: categoryMeta.label };

          const customIcon = L.divIcon({
            className: "custom-marker-wrapper",
            html: `
              <div class="map-marker">
                <div class="marker-glow" style="background: ${colors.glow};"></div>
                <div class="marker-core" style="background: ${colors.main};"></div>
              </div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
            popupAnchor: [0, -12],
          });

          const marker = L.marker([post.geoLocation.lat, post.geoLocation.lng], { icon: customIcon }).addTo(map);

          const popupContent = `
            <div class="popup-header">
              <h4 style="margin:0 0 8px 0;font-size:15px;font-weight:600;color:#1E293B;">${post.title}</h4>
              <div style="display:flex;align-items:center;gap:8px;">
                <span class="topic-badge" style="background:${colors.main};">${colors.label}</span>
                <span style="font-size:12px;color:#64748B;">${post.geoLocation.name}</span>
              </div>
            </div>
            <div class="popup-body">
              <p style="margin:0;font-size:13px;color:#475569;line-height:1.6;">${post.excerpt.substring(0, 120)}...</p>
            </div>
            <div class="popup-footer">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:12px;color:#94A3B8;">${post.readTime}</span>
                <a href="#" class="read-more-btn" data-post-id="${post.id}">Read Article →</a>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent, {
            maxWidth: 300,
            className: "custom-popup",
          });

          markerLayersRef.current.set(post.id, { marker, topic });
        }
      });

    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("read-more-btn")) {
        e.preventDefault();
        const postId = target.getAttribute("data-post-id");
        if (postId) {
          setLocation(`/post/${postId}`);
        }
      }
    };

    map.on("popupopen", () => {
      document.addEventListener("click", handlePopupClick);
    });

    map.on("popupclose", () => {
      document.removeEventListener("click", handlePopupClick);
    });

    return () => {
      document.removeEventListener("click", handlePopupClick);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markerLayersRef.current.clear();
      const styleEl = document.getElementById("geo-map-styles");
      if (styleEl) styleEl.remove();
    };
  }, [setLocation]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    markerLayersRef.current.forEach(({ marker, topic }) => {
      if (activeFilters.size === 0 || activeFilters.has(topic)) {
        if (!mapInstanceRef.current!.hasLayer(marker)) {
          marker.addTo(mapInstanceRef.current!);
        }
      } else {
        if (mapInstanceRef.current!.hasLayer(marker)) {
          mapInstanceRef.current!.removeLayer(marker);
        }
      }
    });
  }, [activeFilters]);

  const toggleFilter = (topic: TopicCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border shadow-lg">
        <div ref={mapRef} className="w-full h-full" data-testid="geo-map" />

        {/* --- FOLDABLE LEGEND --- */}
        <Card
          className={`absolute bottom-6 left-6 z-[999] bg-background/95 backdrop-blur-md border shadow-lg transition-all duration-300 ${
            isFolded ? "p-2 max-w-[70px] h-[56px]" : "p-4 max-w-[280px]"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-muted-foreground" />
              {!isFolded && <h3 className="text-sm font-semibold">Topics</h3>}
            </div>
            <button
              onClick={() => setIsFolded(!isFolded)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-toggle-legend"
            >
              {isFolded ? "Show" : "Hide"}
            </button>
          </div>

          {isFolded ? (
            <div className="flex gap-1">
              {Object.entries(categoryMetadata)
                .map(([topic, config]) => (
                  <div
                    key={topic}
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: config.mainColor,
                      boxShadow: `0 0 6px ${config.glowColor}`,
                    }}
                  />
                ))}
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {Object.entries(categoryMetadata).map(([topic, config]) => {
                  const isActive = activeFilters.size === 0 || activeFilters.has(topic as TopicCategory);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleFilter(topic as TopicCategory)}
                      className={`flex items-center gap-3 w-full text-left p-2 rounded-md transition-all hover-elevate ${
                        isActive ? "" : "opacity-50"
                      }`}
                      style={{
                        backgroundColor: isActive ? `${config.mainColor}15` : "transparent",
                        borderLeft: `3px solid ${config.mainColor}`,
                      }}
                      data-testid={`filter-topic-${topic}`}
                    >
                      <div className="relative flex-shrink-0">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{
                            background: config.mainColor,
                            boxShadow: `0 0 8px ${config.glowColor}`,
                          }}
                        />
                        {isActive && (
                          <div
                            className="absolute inset-0 w-4 h-4 rounded-full animate-pulse"
                            style={{ background: config.glowColor }}
                          />
                        )}
                      </div>
                      <span className="text-xs font-medium">{config.label}</span>
                    </button>
                  );
                })}
              </div>
              {activeFilters.size > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 w-full flex items-center justify-center gap-2 text-xs font-medium py-2 rounded-md border border-border bg-muted/30 hover:bg-muted/50 transition-all shadow-sm hover:shadow-md active:scale-[0.98] text-foreground/80 no-underline"
                  data-testid="button-clear-filters"
                >
                  Clear filters
                </button>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
