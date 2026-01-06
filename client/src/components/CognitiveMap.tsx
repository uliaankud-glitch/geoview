import { useEffect, useRef, useState, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import type { Post } from "@/lib/posts";
import { TopicCategory } from "@/lib/posts";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { getCategoryGradient, getCategoryLabel } from "@/lib/categoryConfig";

interface GraphNode {
  id: string;
  name: string;
  category: string;
  topicCategory: TopicCategory;
  val: number;
  connections: number;
  x?: number;
  y?: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: { source: string; target: string; value: number }[];
}

interface CognitiveMapProps {
  posts: Post[];
}

export function CognitiveMap({ posts }: CognitiveMapProps) {
  const [, setLocation] = useLocation();
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [graphKey, setGraphKey] = useState(0); // ensures re-mount

  // --- Resize listener ---
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setDimensions({
          width,
          height: Math.max(width * 0.6, 500),
        });
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // --- Build graph data ---
  const graphData: GraphData = useMemo(() => {
    const connectionCounts = posts.reduce((acc, post) => {
      acc[post.id] = (post.relatedPosts || []).length;
      return acc;
    }, {} as Record<string, number>);

    // ✅ Build valid node set and filtered links
    const nodeIds = new Set(posts.map((p) => p.id));

    const links = posts.flatMap((post) =>
      (post.relatedPosts || [])
        .filter((relatedId) => nodeIds.has(relatedId)) // <- prevents missing-node errors
        .map((relatedId) => ({
          source: post.id,
          target: relatedId,
          value: 1,
        }))
    );

    return {
      nodes: posts.map((post) => ({
        id: post.id,
        name: post.shortName || post.title,
        category: post.category,
        topicCategory: post.topicCategory || "technology",
        val: 10 + (connectionCounts[post.id] || 0) * 5,
        connections: connectionCounts[post.id] || 0,
      })),
      links,
    };
  }, [posts]);

  // --- Force full rebuild of graph when posts change ---
  useEffect(() => {
    if (graphRef.current?._destructor) {
      graphRef.current._destructor();
    }
    setHoveredNode(null);
    setGraphKey((k) => k + 1);
  }, [graphData]);

  // --- Helpers ---
  const getNodeColor = (topicCategory: TopicCategory): string =>
    getCategoryGradient(topicCategory)[0];

  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>([nodeId]);
    graphData.links.forEach((link) => {
      const src = typeof link.source === "string" ? link.source : (link.source as any).id;
      const tgt = typeof link.target === "string" ? link.target : (link.target as any).id;
      if (src === nodeId) connected.add(tgt);
      if (tgt === nodeId) connected.add(src);
    });
    return connected;
  };

  // --- Hover logic ---
  const handleNodeHover = (node: GraphNode | null) => {
    if (!node) {
      setHoveredNode(null);
      return;
    }
    if (!isFinite(node.x!) || !isFinite(node.y!)) return;

    setHoveredNode(node);
    if (containerRef.current && graphRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const screenCoords = graphRef.current.graph2ScreenCoords(node.x || 0, node.y || 0);
      setTooltipPos({
        x: screenCoords.x + rect.left,
        y: screenCoords.y + rect.top - 80,
      });
    }
  };

  // --- Render ---
  return (
    <div className="relative">
      <Card className="overflow-hidden border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-semibold mb-2 font-['Space_Grotesk']">
            Knowledge Network
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Explore the interconnected web of ideas. Hover to highlight connections, click to explore.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)",
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(14,165,233,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.08) 0%, transparent 50%)",
          }}
        >
          {posts.length === 0 ? (
            <div className="flex items-center justify-center h-[400px] text-slate-500 dark:text-slate-400">
              No articles found in this category.
            </div>
          ) : (
            <ForceGraph2D
              key={graphKey}
              ref={graphRef}
              graphData={graphData}
              width={dimensions.width}
              height={dimensions.height}
              nodeLabel={() => ""}
              nodeRelSize={1}
              nodeVal={(n: any) => n.val}
              linkColor={(link: any) => {
                if (!hoveredNode) return "rgba(100,116,139,0.15)";
                const connected = getConnectedNodes(hoveredNode.id);
                const src = typeof link.source === "string" ? link.source : link.source.id;
                const tgt = typeof link.target === "string" ? link.target : link.target.id;
                return connected.has(src) && connected.has(tgt)
                  ? "rgba(59,130,246,0.4)"
                  : "rgba(100,116,139,0.08)";
              }}
              linkWidth={(link: any) => {
                if (!hoveredNode) return 1;
                const connected = getConnectedNodes(hoveredNode.id);
                const src = typeof link.source === "string" ? link.source : link.source.id;
                const tgt = typeof link.target === "string" ? link.target : link.target.id;
                return connected.has(src) && connected.has(tgt) ? 2 : 0.5;
              }}
              linkCurvature={0.2}
              linkDirectionalParticles={hoveredNode ? 2 : 0}
              linkDirectionalParticleWidth={2}
              linkDirectionalParticleSpeed={0.005}
              onNodeClick={(node: any) => {
                if (!node?.id) return;
                setLocation(`/post/${node.id}`);
              }}
              onNodeHover={handleNodeHover}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                if (!isFinite(node.x) || !isFinite(node.y)) return;

                const connected = hoveredNode
                  ? getConnectedNodes(hoveredNode.id)
                  : new Set();
                const isHovered = hoveredNode?.id === node.id;
                const isDimmed = hoveredNode && !connected.has(node.id);
                const [color1, color2] = getCategoryGradient(node.topicCategory);

                const baseRadius = 5 + node.connections * 1.5;
                const radius = isHovered ? baseRadius * 1.3 : baseRadius;
                if (!isFinite(radius)) return;

                const gradient = ctx.createRadialGradient(
                  node.x,
                  node.y,
                  radius / 2,
                  node.x,
                  node.y,
                  radius * 2
                );
                gradient.addColorStop(0, color1);
                gradient.addColorStop(1, color2);

                ctx.fillStyle = gradient;
                ctx.globalAlpha = isDimmed ? 0.25 : 1;
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.globalAlpha = 1;

                if (globalScale > 0.8 || isHovered) {
                  const fontSize = Math.max(8, 9 / globalScale);
                  ctx.font = `500 ${fontSize}px 'Inter', sans-serif`;
                  ctx.textAlign = "center";
                  ctx.textBaseline = "middle";
                  ctx.fillStyle = isDimmed ? "#94a3b8" : "#e2e8f0";
                  ctx.fillText(node.name, node.x, node.y + radius + 10);
                }
              }}
            />
          )}
        </div>

        {/* --- Category legend --- */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex flex-wrap gap-3 text-xs">
            {(
              ["environment", "history", "economics", "psychology", "sociology", "technology"] as TopicCategory[]
            ).map((topicCat) => {
              const [color1, color2] = getCategoryGradient(topicCat);
              const label = getCategoryLabel(topicCat);
              return (
                <div key={topicCat} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2})`,
                      boxShadow: `0 0 8px ${color1}40`,
                    }}
                  />
                  <span className="text-slate-600 dark:text-slate-400">{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* --- Hover tooltip --- */}
      {hoveredNode && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: "translateX(-50%)",
          }}
        >
          <Card className="p-4 shadow-xl border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md max-w-xs">
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                {posts.find((p) => p.id === hoveredNode.id)?.title || hoveredNode.name}
              </h4>
              <div className="flex items-center gap-2 mb-2">
                <Badge
                  variant="secondary"
                  className="text-xs"
                  style={{
                    backgroundColor: `${getNodeColor(hoveredNode.topicCategory)}20`,
                    color: getNodeColor(hoveredNode.topicCategory),
                  }}
                >
                  {hoveredNode.category}
                </Badge>
                {hoveredNode.connections > 0 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {hoveredNode.connections} connection
                    {hoveredNode.connections !== 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                onClick={() => setLocation(`/post/${hoveredNode.id}`)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 pointer-events-auto"
              >
                Read article <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
