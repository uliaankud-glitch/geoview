import { Link } from "wouter";
import { Globe2 } from "lucide-react";

const categories = ["Geography", "History", "Society", "Economics", "Psychology", "Tech"];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Globe2 className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">GeoView</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exploring the connections between geocomputation, remote sensing, and the human experience.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category}>
                  <Link href={`/?category=${category.toLowerCase()}`}>
                    <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                      {category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">About</h4>
            <p className="text-sm text-muted-foreground">
              GeoView brings together data science, geography, and storytelling to explore how we understand our world through spatial data.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GeoView. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
