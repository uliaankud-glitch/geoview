import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Reference {
  id: number;
  authors: string;
  year: number;
  title: string;
  publication: string;
  url?: string;
}

interface ReferencesProps {
  references: Reference[];
}

export function References({ references }: ReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (references.length === 0) return null;

  return (
    <Card className="my-12 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left hover-elevate transition-all flex items-center justify-between"
        data-testid="button-toggle-references"
      >
        <div className="flex items-center gap-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-xl font-semibold">References</h3>
            <p className="text-sm text-muted-foreground">
              {references.length} citation{references.length !== 1 ? "s" : ""}
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
        <div className="px-6 pb-6 border-t" data-testid="content-references">
          <div className="space-y-4 mt-4">
            {references.map((ref) => (
              <div key={ref.id} className="text-sm">
                <p className="text-foreground">
                  <span className="font-medium">{ref.authors}</span> ({ref.year}).{" "}
                  {ref.url ? (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {ref.title}
                    </a>
                  ) : (
                    <span className="italic">{ref.title}</span>
                  )}
                  . <span className="text-muted-foreground">{ref.publication}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
