import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { posts, TopicCategory } from "@/lib/posts";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Layers } from "lucide-react";

const topicColors: Record<TopicCategory, { main: string; glow: string; label: string }> = {
  environment: { main: "#10b981", glow: "rgba(16, 185, 129, 0.4)", label: "Environment" },
  economics: { main: "#f59e0b", glow: "rgba(245, 158, 11, 0.4)", label: "Economics" },
  sociology: { main: "#8b5cf6", glow: "rgba(139, 92, 246, 0.4)", label: "Sociology" },
  psychology: { main: "#ec4899", glow: "rgba(236, 72, 153, 0.4)", label: "Psychology" },
  history: { main: "#6366f1", glow: "rgba(99, 102, 241, 0.4)", label: "History" },
  technology: { main: "#06b6d4", glow: "rgba(6, 182, 212, 0.4)", label: "Technology" }
};

export function GeoMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markerLayersRef = useRef<Map<string, { marker: L.Marker; topic: TopicCategory }>>(new Map());
  const [, setLocation] = useLocation();
  const [activeFilters, setActiveFilters] = useState<Set<TopicCategory>>(new Set());
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: true,
      fadeAnimation: true,
      zoomAnimation: true,
      markerZoomAnimation: true,
      easeLinearity: 0.25
    }).setView([20, 0], 2);
    
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '© OpenStreetMap, © CartoDB',
      maxZoom: 18,
      minZoom: 2
    }).addTo(map);

    const style = document.createElement('style');
    style.id = 'geo-map-styles';
    style.textContent = `
      @keyframes pulse-ring {
        0% {
          transform: scale(0.8);
          opacity: 1;
        }
        50% {
          transform: scale(1.2);
          opacity: 0.5;
        }
        100% {
          transform: scale(0.8);
          opacity: 1;
        }
      }

      .map-marker {
        position: relative;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .map-marker:hover {
        transform: scale(1.3);
        z-index: 1000;
      }

      .marker-core {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        position: relative;
        z-index: 2;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
      }

      .marker-glow {
        position: absolute;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        animation: pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        z-index: 1;
      }

      .leaflet-popup-content-wrapper {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(0, 0, 0, 0.05) !important;
        padding: 0 !important;
        border: none !important;
      }

      .leaflet-popup-content {
        margin: 0 !important;
        min-width: 260px !important;
      }

      .leaflet-popup-tip {
        background: rgba(255, 255, 255, 0.95) !important;
        box-shadow: none !important;
      }

      .dark .leaflet-popup-content-wrapper {
        background: rgba(30, 33, 41, 0.95) !important;
      }

      .dark .leaflet-popup-tip {
        background: rgba(30, 33, 41, 0.95) !important;
      }

      .popup-header {
        padding: 16px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      }

      .dark .popup-header {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      }

      .popup-body {
        padding: 16px;
      }

      .popup-footer {
        padding: 12px 16px;
        background: rgba(0, 0, 0, 0.02);
        border-top: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 0 0 12px 12px;
      }

      .dark .popup-footer {
        background: rgba(255, 255, 255, 0.03);
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .topic-badge {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        color: white;
        display: inline-block;
        letter-spacing: 0.3px;
      }

      .read-more-btn {
        font-size: 13px;
        font-weight: 500;
        text-decoration: none;
        transition: all 0.2s;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        color: #1E293B;
      }

      .dark .read-more-btn {
        color: #E2E8F0;
      }

      .read-more-btn:hover {
        opacity: 0.7;
      }
    `;
    
    if (!document.getElementById('geo-map-styles')) {
      document.head.appendChild(style);
    }

    posts.filter(post => post.geoLocation).forEach(post => {
      if (post.geoLocation) {
        const topic = post.topicCategory || "technology";
        const colors = topicColors[topic];

        const customIcon = L.divIcon({
          className: 'custom-marker-wrapper',
          html: `
            <div class="map-marker">
              <div class="marker-glow" style="background: ${colors.glow};"></div>
              <div class="marker-core" style="background: ${colors.main};"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
          popupAnchor: [0, -12]
        });

        const marker = L.marker(
          [post.geoLocation.lat, post.geoLocation.lng],
          { icon: customIcon }
        ).addTo(map);

        const popupContent = `
          <div class="popup-header">
            <h4 style="margin: 0 0 8px 0; font-size: 15px; font-weight: 600; color: #1E293B; line-height: 1.4;">${post.title}</h4>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="topic-badge" style="background: ${colors.main};">${colors.label}</span>
              <span style="font-size: 12px; color: #64748B;">${post.geoLocation.name}</span>
            </div>
          </div>
          <div class="popup-body">
            <p style="margin: 0; font-size: 13px; color: #475569; line-height: 1.6;">${post.excerpt.substring(0, 120)}...</p>
          </div>
          <div class="popup-footer">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 12px; color: #94A3B8;">${post.readTime}</span>
              <a href="#" class="read-more-btn" data-post-id="${post.id}">
                Read Article →
              </a>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: 'custom-popup'
        });

        markerLayersRef.current.set(post.id, { marker, topic });
      }
    });

    const handlePopupClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('read-more-btn')) {
        e.preventDefault();
        const postId = target.getAttribute('data-post-id');
        if (postId) {
          setLocation(`/post/${postId}`);
        }
      }
    };

    map.on('popupopen', () => {
      document.addEventListener('click', handlePopupClick);
    });

    map.on('popupclose', () => {
      document.removeEventListener('click', handlePopupClick);
    });

    return () => {
      document.removeEventListener('click', handlePopupClick);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markerLayersRef.current.clear();
      const styleEl = document.getElementById('geo-map-styles');
      if (styleEl) {
        styleEl.remove();
      }
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
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(topic)) {
        next.delete(topic);
      } else {
        next.add(topic);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setActiveFilters(new Set());
  };

  return (
    <div className="relative w-full">
      <div className="relative w-full h-[500px] rounded-lg overflow-hidden border shadow-lg">
        <div ref={mapRef} className="w-full h-full" data-testid="geo-map" />
        
        {showLegend && (
          <Card className="absolute bottom-6 left-6 z-[1000] p-4 bg-background/95 backdrop-blur-md border shadow-lg max-w-[280px]">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Topics</h3>
              </div>
              <button
                onClick={() => setShowLegend(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-testid="button-hide-legend"
              >
                Hide
              </button>
            </div>
            <div className="space-y-2">
              {Object.entries(topicColors).map(([topic, config]) => {
                const isActive = activeFilters.size === 0 || activeFilters.has(topic as TopicCategory);
                return (
                  <button
                    key={topic}
                    onClick={() => toggleFilter(topic as TopicCategory)}
                    className={`flex items-center gap-3 w-full text-left p-2 rounded-md transition-all ${
                      isActive ? 'bg-accent/50' : 'opacity-50 hover:opacity-75'
                    }`}
                    data-testid={`filter-topic-${topic}`}
                  >
                    <div className="relative">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: config.main }}
                      />
                      {isActive && (
                        <div
                          className="absolute inset-0 w-3 h-3 rounded-full animate-pulse"
                          style={{ background: config.glow }}
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
                className="mt-3 w-full text-xs text-primary hover:underline"
                data-testid="button-clear-filters"
              >
                Clear filters
              </button>
            )}
          </Card>
        )}

        {!showLegend && (
          <button
            onClick={() => setShowLegend(true)}
            className="absolute bottom-6 left-6 z-[1000] p-3 bg-background/95 backdrop-blur-md border shadow-lg rounded-lg hover-elevate active-elevate-2"
            data-testid="button-show-legend"
          >
            <Layers className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
