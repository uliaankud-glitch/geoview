import { useState } from "react";
import { Hero } from "@/components/Hero";
import { CategoryNav } from "@/components/CategoryNav";
import { PostCard } from "@/components/PostCard";
import { posts, getPostsByCategory } from "@/lib/posts";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredPosts = getPostsByCategory(selectedCategory);
  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8">
          <h2 className="mb-6 text-3xl font-bold">Explore by Category</h2>
          <CategoryNav
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {featuredPost && (
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">Featured Story</h2>
            <PostCard
              {...featuredPost}
              featured={true}
            />
          </div>
        )}

        {otherPosts.length > 0 && (
          <div>
            <h2 className="mb-6 text-2xl font-semibold">Latest Stories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
