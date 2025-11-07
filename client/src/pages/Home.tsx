import { Link } from "wouter";
import { Hero } from "@/components/Hero";
import { PostCard } from "@/components/PostCard";
import { GeoMap } from "@/components/GeoMap";
import { posts } from "@/lib/posts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe2, TrendingUp, MapPin, ArrowRight, Map } from "lucide-react";

export default function Home() {
  const featuredPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold">Welcome to GeoView</h2>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
            Exploring the intersection of geocomputation, remote sensing, and the human story. 
            We use satellite data and geographic analysis to understand patterns in history, 
            economics, sociology, and psychology—revealing connections invisible from the ground.
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
              <Globe2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Remote Sensing</h3>
            <p className="text-sm text-muted-foreground">
              Leveraging satellite imagery and aerial data to observe Earth's patterns and changes over time.
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Data Stories</h3>
            <p className="text-sm text-muted-foreground">
              Interactive visualizations and narratives that bring geographic data to life through charts, maps, and analysis.
            </p>
          </Card>

          <Card className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Interdisciplinary Insights</h3>
            <p className="text-sm text-muted-foreground">
              Connecting geographic data with history, economics, sociology, and psychology for deeper understanding.
            </p>
          </Card>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Map className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">Explore by Location</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Click on any marker to discover articles geotagged to that location
          </p>
          <GeoMap />
        </div>

        <div className="my-16 border-t" />

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold">Suggested Articles</h2>
          <Link href="/articles">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-articles">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/articles">
            <Button size="lg" className="gap-2" data-testid="button-explore-more">
              Explore More Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
