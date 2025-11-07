import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { Globe2 } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 transition-colors cursor-pointer">
            <Globe2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">GeoView</span>
          </div>
        </Link>
        
        <div className="flex-1 max-w-md hidden md:block">
          <SearchBar />
        </div>

        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/" data-testid="link-nav-home">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/data-stories" data-testid="link-nav-data-stories">
            <span className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Data Stories
            </span>
          </Link>
        </nav>

        <ThemeToggle />
      </div>

      <div className="md:hidden border-t p-2">
        <SearchBar />
      </div>
    </header>
  );
}
