import { TopicCategory } from "./posts";

export interface CategoryMetadata {
  label: string;
  shortLabel: string;
  mainColor: string;
  gradientEnd: string;
  glowColor: string;
}

// Modern gradient color palette - single source of truth
export const categoryMetadata: Record<TopicCategory, CategoryMetadata> = {
  environment: {
    label: "Geography",
    shortLabel: "Geography",
    mainColor: "#14b8a6",        // Teal
    gradientEnd: "#0d9488",
    glowColor: "rgba(20, 184, 166, 0.4)"
  },
  economics: {
    label: "Economics",
    shortLabel: "Economics",
    mainColor: "#06b6d4",        // Cyan
    gradientEnd: "#0891b2",
    glowColor: "rgba(6, 182, 212, 0.4)"
  },
  sociology: {
    label: "Society",
    shortLabel: "Society",
    mainColor: "#ec4899",        // Pink
    gradientEnd: "#db2777",
    glowColor: "rgba(236, 72, 153, 0.4)"
  },
  psychology: {
    label: "Psychology",
    shortLabel: "Psychology",
    mainColor: "#a855f7",        // Violet
    gradientEnd: "#9333ea",
    glowColor: "rgba(168, 85, 247, 0.4)"
  },
  history: {
    label: "History",
    shortLabel: "History",
    mainColor: "#f59e0b",        // Amber
    gradientEnd: "#d97706",
    glowColor: "rgba(245, 158, 11, 0.4)"
  },
  technology: {
    label: "Tech",
    shortLabel: "Tech",
    mainColor: "#64748b",        // Gray
    gradientEnd: "#475569",
    glowColor: "rgba(100, 116, 139, 0.4)"
  }
};

export function getCategoryMetadata(topic: TopicCategory): CategoryMetadata {
  return categoryMetadata[topic] || categoryMetadata.technology;
}

export function getCategoryColor(topic: TopicCategory): string {
  return categoryMetadata[topic]?.mainColor || categoryMetadata.technology.mainColor;
}

export function getCategoryGradient(topic: TopicCategory): [string, string] {
  const meta = categoryMetadata[topic] || categoryMetadata.technology;
  return [meta.mainColor, meta.gradientEnd];
}

export function getCategoryLabel(topic: TopicCategory): string {
  return categoryMetadata[topic]?.label || categoryMetadata.technology.label;
}
