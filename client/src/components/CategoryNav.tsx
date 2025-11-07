import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const categories = [
  "All",
  "Geography",
  "History",
  "Society",
  "Economics",
  "Psychology",
  "Tech",
];

interface CategoryNavProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryNav({ selectedCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Badge
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          className="cursor-pointer whitespace-nowrap px-4 py-2 text-sm"
          onClick={() => onCategoryChange(category)}
          data-testid={`badge-category-${category.toLowerCase()}`}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
