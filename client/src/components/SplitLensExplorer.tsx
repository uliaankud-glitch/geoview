import { useEffect, useState, useRef } from "react";
import { DynamicVisualization } from "./DynamicVisualization";
import { Card } from "@/components/ui/card";
import { SplitLensData } from "@/lib/posts";

interface SplitLensExplorerProps {
  data: SplitLensData;
}

export function SplitLensExplorer({ data }: SplitLensExplorerProps) {
  const [activeSection, setActiveSection] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!data.sections || data.sections.length === 0) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || data.sections.length === 0) return;

      const scrollTop = contentRef.current.scrollTop;
      const scrollHeight = contentRef.current.scrollHeight - contentRef.current.clientHeight;
      const scrollPercent = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      
      const newSection = Math.min(
        Math.floor(scrollPercent * data.sections.length),
        data.sections.length - 1
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
  }, [activeSection, data.sections.length]);

  return (
    <div className="grid md:grid-cols-2 gap-4 my-12 h-[600px]">
      <Card className="overflow-hidden">
        <div className="p-6 border-b bg-muted/50">
          <h3 className="text-xl font-semibold">Narrative</h3>
          <p className="text-sm text-muted-foreground">Scroll to explore the data story</p>
        </div>
        <div ref={contentRef} className="h-[500px] overflow-y-auto p-6 space-y-96">
          {data.sections.map((section, index) => (
            <div
              key={index}
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
            Section {activeSection + 1} of {data.sections.length}: {data.sections[activeSection].title}
          </p>
        </div>
        <div className="p-6">
          <DynamicVisualization type={data.sections[activeSection].visualizationType} />
        </div>
      </Card>
    </div>
  );
}
