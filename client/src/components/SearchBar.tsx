import { useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { posts } from "@/lib/posts";
import { Link } from "wouter";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredPosts = query.trim()
    ? posts.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) ||
          post.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="pl-9 pr-9"
          data-testid="input-search"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            data-testid="button-clear-search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isOpen && query.trim() && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <Card className="absolute top-full mt-2 w-full max-w-md z-50 max-h-96 overflow-y-auto">
            {filteredPosts.length > 0 ? (
              <div className="p-2">
                {filteredPosts.map((post) => (
                  <Link key={post.id} href={`/post/${post.id}`}>
                    <div
                      className="p-3 rounded-md hover-elevate cursor-pointer"
                      onClick={() => {
                        setQuery("");
                        setIsOpen(false);
                      }}
                      data-testid={`search-result-${post.id}`}
                    >
                      <h4 className="font-semibold text-sm mb-1">{post.title}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-2 flex gap-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-sm bg-muted">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
}
