import { useEffect, useState, useRef } from "react";
import { DataVisualization } from "./DataVisualization";
import { Card } from "@/components/ui/card";

interface SplitLensExplorerProps {
  postId: string;
}

export function SplitLensExplorer({ postId }: SplitLensExplorerProps) {
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 0,
      title: "Temperature Anomalies",
      text: "Global temperature data shows a clear warming trend over the past century.",
      visualization: "chart"
    },
    {
      id: 1,
      title: "Urban Growth Patterns",
      text: "Satellite imagery reveals rapid urbanization in developing regions.",
      visualization: "chart"
    },
    {
      id: 2,
      title: "Geographic Distribution",
      text: "The spatial distribution of these phenomena follows predictable patterns.",
      visualization: "chart"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const scrollPercent = scrollTop / scrollHeight;
      
      const newSection = Math.min(
        Math.floor(scrollPercent * sections.length),
        sections.length - 1
      );
      
      if (newSection !== activeSection) {
        setActiveSection(newSection);
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, [activeSection, sections.length]);

  return (
    <div className="grid md:grid-cols-2 gap-4 my-12 h-[600px]">
      <Card className="overflow-hidden">
        <div className="p-6 border-b bg-muted/50">
          <h3 className="text-xl font-semibold">Narrative</h3>
          <p className="text-sm text-muted-foreground">Scroll to explore the data story</p>
        </div>
        <div ref={contentRef} className="h-[500px] overflow-y-auto p-6 space-y-96">
          {sections.map((section, index) => (
            <div
              key={section.id}
              className={`transition-opacity duration-300 ${
                index === activeSection ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <h4 className="text-2xl font-semibold mb-4">{section.title}</h4>
              <p className="text-lg leading-relaxed">{section.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="overflow-hidden sticky top-4">
        <div className="p-6 border-b bg-primary/5">
          <h3 className="text-xl font-semibold">Visualization</h3>
          <p className="text-sm text-muted-foreground">
            Section {activeSection + 1} of {sections.length}
          </p>
        </div>
        <div className="p-6">
          <DataVisualization postId={postId} />
        </div>
      </Card>
    </div>
  );
}
