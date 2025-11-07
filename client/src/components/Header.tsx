import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { Globe2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" data-testid="link-home">
          <a className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 transition-colors">
            <Globe2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">GeoView</span>
          </a>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" data-testid="link-nav-home">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
          </Link>
          <Link href="/data-stories" data-testid="link-nav-data-stories">
            <a className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Data Stories
            </a>
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
