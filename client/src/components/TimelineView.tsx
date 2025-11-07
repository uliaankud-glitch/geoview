import { posts } from "@/lib/posts";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

export function TimelineView() {
  const sortedPosts = [...posts]
    .filter(post => post.timePeriod)
    .sort((a, b) => (a.timePeriod?.start || 0) - (b.timePeriod?.start || 0));

  return (
    <div className="relative">
      <div className="overflow-x-auto pb-8">
        <div className="flex gap-6 min-w-max px-4">
          {sortedPosts.map((post, index) => (
            <div key={post.id} className="relative">
              <div className="flex flex-col items-center w-80">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border-4 border-background z-10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                
                <div className="w-1 h-6 bg-border" />
                
                <Link href={`/post/${post.id}`}>
                  <Card className="w-80 hover-elevate cursor-pointer" data-testid={`timeline-post-${post.id}`}>
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="mb-3 flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        {post.timePeriod && (
                          <Badge variant="outline" className="text-xs">
                            {post.timePeriod.start}{post.timePeriod.end ? `-${post.timePeriod.end}` : ''}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 leading-tight text-sm">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      {post.geoLocation && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{post.geoLocation.name}</span>
                        </div>
                      )}
                      {post.timePeriod && (
                        <div className="mt-2 text-xs font-semibold text-primary">
                          {post.timePeriod.era}
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              </div>
              
              {index < sortedPosts.length - 1 && (
                <div className="absolute top-8 left-full w-6 h-1 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-border" />
    </div>
  );
}
