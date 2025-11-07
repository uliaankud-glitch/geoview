import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { posts } from "@/lib/posts";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface GraphNode {
  id: string;
  name: string;
  category: string;
  val: number;
  connections: number;
  x?: number;
  y?: number;
}

interface GraphData {
  nodes: GraphNode[];
  links: { source: string; target: string; value: number }[];
}

export function CognitiveMap() {
  const [, setLocation] = useLocation();
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const animationFrame = useRef<number>(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.max(containerRef.current.offsetWidth * 0.6, 500)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Calculate connections for variable node sizes
  const connectionCounts = posts.reduce((acc, post) => {
    acc[post.id] = (post.relatedPosts || []).length;
    return acc;
  }, {} as Record<string, number>);

  const graphData: GraphData = {
    nodes: posts.map(post => ({
      id: post.id,
      name: post.title,
      category: post.category,
      val: 10 + (connectionCounts[post.id] * 5),
      connections: connectionCounts[post.id] || 0
    })),
    links: posts.flatMap(post =>
      (post.relatedPosts || []).map(relatedId => ({
        source: post.id,
        target: relatedId,
        value: 1
      }))
    )
  };

  // Modern gradient color palette - teal, amber, violet, gray
  const getCategoryGradient = (category: string): [string, string] => {
    const gradients: Record<string, [string, string]> = {
      Geography: ['#14b8a6', '#0d9488'],    // Teal gradient
      History: ['#f59e0b', '#d97706'],       // Amber gradient
      Economics: ['#06b6d4', '#0891b2'],     // Cyan gradient
      Psychology: ['#a855f7', '#9333ea'],    // Violet gradient
      Society: ['#ec4899', '#db2777'],       // Pink gradient
      Tech: ['#64748b', '#475569']           // Gray gradient
    };
    return gradients[category] || ['#64748b', '#475569'];
  };

  const getNodeColor = (category: string): string => {
    return getCategoryGradient(category)[0];
  };

  const drawGlowingNode = (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number, isHovered: boolean, isDimmed: boolean) => {
    // Safety check: ensure coordinates are valid numbers
    if (!node.x || !node.y || !isFinite(node.x) || !isFinite(node.y)) {
      return;
    }
    
    const [color1, color2] = getCategoryGradient(node.category);
    const baseRadius = 5 + (node.connections * 1.5);
    const radius = isHovered ? baseRadius * 1.3 : baseRadius;
    const opacity = isDimmed ? 0.25 : 1;
    
    // Additional safety check for radius
    if (!isFinite(radius) || radius <= 0) {
      return;
    }

    // Outer glow
    if (isHovered || !isDimmed) {
      const glowRadius = radius * (isHovered ? 2.5 : 1.8);
      const gradient = ctx.createRadialGradient(node.x!, node.y!, radius, node.x!, node.y!, glowRadius);
      gradient.addColorStop(0, `${color1}40`);
      gradient.addColorStop(0.5, `${color1}20`);
      gradient.addColorStop(1, `${color1}00`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, glowRadius, 0, 2 * Math.PI);
      ctx.fill();
    }

    // Main node with gradient
    const nodeGradient = ctx.createRadialGradient(
      node.x! - radius * 0.3,
      node.y! - radius * 0.3,
      0,
      node.x!,
      node.y!,
      radius
    );
    nodeGradient.addColorStop(0, color1);
    nodeGradient.addColorStop(1, color2);

    ctx.fillStyle = nodeGradient;
    ctx.globalAlpha = opacity;
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, radius, 0, 2 * Math.PI);
    ctx.fill();

    // Inner highlight for depth
    if (!isDimmed) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.beginPath();
      ctx.arc(node.x! - radius * 0.3, node.y! - radius * 0.3, radius * 0.4, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    // Label
    if (globalScale > 0.8 || isHovered) {
      const fontSize = Math.max(10, 11 / globalScale);
      ctx.font = `500 ${fontSize}px 'Inter', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Text shadow for readability
      if (!isDimmed) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 1;
      }
      
      const maxLength = isHovered ? 40 : 25;
      const label = node.name.length > maxLength 
        ? node.name.substring(0, maxLength) + '...' 
        : node.name;
      
      ctx.fillStyle = isDimmed ? '#94a3b8' : '#e2e8f0';
      ctx.fillText(label, node.x!, node.y! + radius + 12);
      
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }
  };

  // Get connected node IDs
  const getConnectedNodes = (nodeId: string): Set<string> => {
    const connected = new Set<string>([nodeId]);
    graphData.links.forEach(link => {
      if (typeof link.source === 'string') {
        if (link.source === nodeId) connected.add(link.target as string);
        if (link.target === nodeId) connected.add(link.source);
      } else {
        const sourceId = (link.source as any).id || link.source;
        const targetId = (link.target as any).id || link.target;
        if (sourceId === nodeId) connected.add(targetId);
        if (targetId === nodeId) connected.add(sourceId);
      }
    });
    return connected;
  };

  const handleNodeHover = (node: GraphNode | null) => {
    setHoveredNode(node);
    
    if (node && containerRef.current && graphRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const screenCoords = graphRef.current.graph2ScreenCoords(node.x || 0, node.y || 0);
      
      setTooltipPos({
        x: screenCoords.x + rect.left,
        y: screenCoords.y + rect.top - 80
      });
    }
  };

  return (
    <div className="relative">
      <Card className="overflow-hidden border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-2xl font-semibold mb-2 font-['Space_Grotesk']">Knowledge Network</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Explore the interconnected web of ideas. Hover to highlight connections, click to explore.
          </p>
        </div>
        
        {/* Graph container with gradient background */}
        <div 
          ref={containerRef} 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(14, 165, 233, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)'
          }}
        >
          <ForceGraph2D
            ref={graphRef}
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            nodeLabel={() => ''}
            nodeRelSize={1}
            nodeVal={(node: any) => node.val}
            linkColor={(link: any) => {
              if (!hoveredNode) return 'rgba(100, 116, 139, 0.15)';
              
              const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
              const targetId = typeof link.target === 'string' ? link.target : link.target.id;
              const connectedNodes = getConnectedNodes(hoveredNode.id);
              
              if (connectedNodes.has(sourceId) && connectedNodes.has(targetId)) {
                return 'rgba(59, 130, 246, 0.4)';
              }
              return 'rgba(100, 116, 139, 0.08)';
            }}
            linkWidth={(link: any) => {
              if (!hoveredNode) return 1;
              
              const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
              const targetId = typeof link.target === 'string' ? link.target : link.target.id;
              const connectedNodes = getConnectedNodes(hoveredNode.id);
              
              if (connectedNodes.has(sourceId) && connectedNodes.has(targetId)) {
                return 2;
              }
              return 0.5;
            }}
            linkCurvature={0.2}
            linkDirectionalParticles={hoveredNode ? 2 : 0}
            linkDirectionalParticleWidth={2}
            linkDirectionalParticleSpeed={0.005}
            onNodeClick={(node: any) => {
              setLocation(`/post/${node.id}`);
            }}
            onNodeHover={handleNodeHover}
            nodeCanvasObject={(node: any, ctx, globalScale) => {
              const connectedNodes = hoveredNode ? getConnectedNodes(hoveredNode.id) : new Set();
              const isHovered = hoveredNode?.id === node.id;
              const isDimmed = hoveredNode !== null && !connectedNodes.has(node.id);
              
              drawGlowingNode(node as GraphNode, ctx, globalScale, isHovered, isDimmed);
            }}
            d3VelocityDecay={0.4}
            d3AlphaDecay={0.02}
            warmupTicks={100}
            cooldownTicks={200}
          />
        </div>

        {/* Category legend */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex flex-wrap gap-3 text-xs">
            {['Geography', 'History', 'Economics', 'Psychology', 'Society', 'Tech'].map(cat => {
              const [color1] = getCategoryGradient(cat);
              return (
                <div key={cat} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${color1}, ${getCategoryGradient(cat)[1]})`,
                      boxShadow: `0 0 8px ${color1}40`
                    }}
                  />
                  <span className="text-slate-600 dark:text-slate-400">{cat}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <Card className="p-4 shadow-xl border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-2 leading-tight text-slate-900 dark:text-slate-100">
                  {hoveredNode.name}
                </h4>
                <div className="flex items-center gap-2 mb-2">
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                    style={{
                      backgroundColor: `${getNodeColor(hoveredNode.category)}20`,
                      color: getNodeColor(hoveredNode.category)
                    }}
                  >
                    {hoveredNode.category}
                  </Badge>
                  {hoveredNode.connections > 0 && (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {hoveredNode.connections} connection{hoveredNode.connections !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setLocation(`/post/${hoveredNode.id}`)}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 pointer-events-auto"
                  data-testid={`link-read-article-${hoveredNode.id}`}
                >
                  Read article <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
