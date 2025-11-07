import { useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { posts } from "@/lib/posts";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";

interface GraphData {
  nodes: { id: string; name: string; category: string; val: number }[];
  links: { source: string; target: string }[];
}

export function CognitiveMap() {
  const [, setLocation] = useLocation();
  const graphRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: Math.min(containerRef.current.offsetWidth * 0.75, 600)
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const graphData: GraphData = {
    nodes: posts.map(post => ({
      id: post.id,
      name: post.title,
      category: post.category,
      val: 10
    })),
    links: posts.flatMap(post =>
      (post.relatedPosts || []).map(relatedId => ({
        source: post.id,
        target: relatedId
      }))
    )
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Geography: '#3b82f6',
      History: '#f59e0b',
      Economics: '#10b981',
      Psychology: '#8b5cf6',
      Society: '#ec4899',
      Tech: '#06b6d4'
    };
    return colors[category] || '#64748b';
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b">
        <h3 className="text-2xl font-semibold mb-2">Cognitive Map Navigation</h3>
        <p className="text-sm text-muted-foreground">
          Explore article relationships as an interactive network. Click any node to read the article.
        </p>
      </div>
      <div ref={containerRef} className="bg-background">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          nodeLabel="name"
          nodeColor={node => getCategoryColor(node.category)}
          nodeRelSize={8}
          linkColor={() => 'rgba(100, 116, 139, 0.3)'}
          linkWidth={2}
          onNodeClick={(node: any) => {
            setLocation(`/post/${node.id}`);
          }}
          nodeCanvasObject={(node: any, ctx, globalScale) => {
            const label = node.name;
            const fontSize = 12 / globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            
            ctx.fillStyle = getCategoryColor(node.category);
            ctx.beginPath();
            ctx.arc(node.x, node.y, 8, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = '#fff';
            ctx.fillText(label.substring(0, 30), node.x, node.y + 15);
          }}
          d3VelocityDecay={0.3}
        />
      </div>
      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-3 text-xs">
          {['Geography', 'History', 'Economics', 'Psychology', 'Society', 'Tech'].map(cat => (
            <div key={cat} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: getCategoryColor(cat) }}
              />
              <span>{cat}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
