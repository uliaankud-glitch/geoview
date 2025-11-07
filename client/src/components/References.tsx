import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Reference {
  id: number;
  authors: string;
  year: number;
  title: string;
  publication: string;
  url?: string;
  doi?: string;
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
            {references.map((ref, index) => (
              <Card key={ref.id} className="p-4 hover-elevate">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-2">
                      <span className="font-medium text-foreground">{ref.authors}</span>
                      <span className="text-muted-foreground"> ({ref.year})</span>
                    </p>
                    <p className="text-sm font-semibold mb-1 text-foreground">
                      {ref.title}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      {ref.publication}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ref.url && (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Badge variant="outline" className="gap-1">
                            <ExternalLink className="h-3 w-3" />
                            View Article
                          </Badge>
                        </a>
                      )}
                      {ref.doi && (
                        <a
                          href={`https://doi.org/${ref.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex"
                        >
                          <Badge variant="outline" className="gap-1">
                            DOI: {ref.doi}
                          </Badge>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
