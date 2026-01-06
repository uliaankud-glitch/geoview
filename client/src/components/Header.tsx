import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { Globe2, Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", testId: "link-nav-home" },
    { href: "/articles", label: "Articles", testId: "link-nav-articles" },
    { href: "/data-stories", label: "Data Stories", testId: "link-nav-data-stories" },
  ];

  const isActiveLink = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2 transition-all cursor-pointer">
            <Globe2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight font-sans">GeoView</span>
          </div>
        </Link>

        {/* Desktop Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div data-search-instance="desktop">
            <SearchBar />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} data-testid={link.testId}>
              <span
                className={`text-sm font-medium transition-all cursor-pointer relative pb-1 ${
                  isActiveLink(link.href)
                    ? "text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Desktop Theme Toggle */}
        <div className="hidden md:block">
          <div data-theme-instance="desktop">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-t p-2">
        <div data-search-instance="mobile">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Drawer — unfolds below header */}
      <div
        className={`fixed left-0 right-0 top-16 z-[9999] md:hidden transition-all duration-300 ${
          mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop covers only below header */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          data-testid="mobile-menu-backdrop"
        />

        {/* Drawer Panel */}
        <div
          className={`absolute right-0 top-0 h-[calc(100vh-4rem)] w-72 bg-background border-l shadow-xl transform transition-transform duration-300 ease-in-out rounded-l-xl overflow-y-auto ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          data-testid="mobile-menu-panel"
        >
          <div className="p-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`${link.testId}-mobile`}>
                <div
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md transition-all cursor-pointer ${
                    isActiveLink(link.href)
                      ? "bg-primary/10 text-primary border-l-2 border-primary font-medium"
                      : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}

            <div className="border-t my-4" />

            {/* Theme Toggle in Mobile Menu */}
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <div data-theme-instance="mobile">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
