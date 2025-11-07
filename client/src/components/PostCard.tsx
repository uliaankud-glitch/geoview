import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "wouter";

interface PostCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags?: string[];
  featured?: boolean;
}

export function PostCard({
  id,
  title,
  excerpt,
  category,
  date,
  readTime,
  image,
  tags = [],
  featured = false,
}: PostCardProps) {
  return (
    <Link href={`/post/${id}`} data-testid={`link-post-${id}`}>
      <div className="cursor-pointer">
        <Card className={`overflow-hidden hover-elevate transition-all ${featured ? 'h-full' : ''}`}>
          <div className={`aspect-video w-full overflow-hidden ${featured ? 'md:aspect-[21/9]' : ''}`}>
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
              data-testid={`img-post-${id}`}
            />
          </div>
          <div className="p-6">
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs" data-testid={`badge-category-${id}`}>
                {category}
              </Badge>
              {tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <h3 className={`mb-3 font-semibold leading-tight ${featured ? 'text-2xl md:text-3xl' : 'text-xl'}`} data-testid={`text-title-${id}`}>
              {title}
            </h3>
            <p className={`mb-4 text-muted-foreground ${featured ? 'text-base md:text-lg' : 'text-sm'}`} data-testid={`text-excerpt-${id}`}>
              {excerpt}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Link>
  );
}
