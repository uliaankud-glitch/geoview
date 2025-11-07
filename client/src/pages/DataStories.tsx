import { PostCard } from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function DataStories() {
  return (
    <div className="min-h-screen">
      <div className="border-b bg-muted/30 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Data Stories</h1>
          <p className="text-lg text-muted-foreground md:text-xl">
            Visual essays exploring the intersection of data, geography, and human experience
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
