import { useState } from "react";
import { ExternalLink, BookMarked, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FurtherReadingLink {
  title: string;
  description: string;
  url: string;
  type: "article" | "dataset" | "tool" | "course";
}

interface FurtherReadingProps {
  links: FurtherReadingLink[];
}

const typeIcons = {
  article: "📄",
  dataset: "📊",
  tool: "🔧",
  course: "🎓",
};

const typeColors = {
  article: "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
  dataset: "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300",
  tool: "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300",
  course: "bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300",
};

export function FurtherReading({ links }: FurtherReadingProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (links.length === 0) return null;

  return (
    <Card className="my-12 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover-elevate transition-all flex items-center justify-between"
        data-testid="button-toggle-further-reading"
      >
        <div className="flex items-center gap-3">
          <BookMarked className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-xl font-semibold">Further Reading & Resources</h3>
            <p className="text-sm text-muted-foreground">
              {links.length} resource{links.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t" data-testid="content-further-reading">
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`link-further-reading-${index}`}
              >
                <Card className="p-4 hover-elevate transition-all h-full">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 text-2xl">{typeIcons[link.type]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-sm leading-tight">{link.title}</h4>
                        <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {link.description}
                      </p>
                      <span
                        className={`inline-block text-xs px-2 py-1 rounded-md ${typeColors[link.type]}`}
                      >
                        {link.type.charAt(0).toUpperCase() + link.type.slice(1)}
                      </span>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
