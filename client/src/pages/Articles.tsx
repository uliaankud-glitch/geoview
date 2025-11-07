import { useState } from "react";
import { posts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Badge } from "@/components/ui/badge";
import { Library } from "lucide-react";

const categories = ["All", "Geography", "History", "Society", "Economics", "Psychology", "Tech"];

export default function Articles() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-3 mb-4">
            <Library className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Article Archive</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Explore our complete collection of articles on geocomputation, remote sensing, and their intersections with history, economics, and society.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-${category.toLowerCase()}`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No articles found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
