import urbanImage from "@assets/generated_images/Urban_inequality_satellite_view_ae811999.png";
import tradeImage from "@assets/generated_images/Trade_routes_from_orbit_19161c8b.png";
import climateImage from "@assets/generated_images/Climate_migration_data_visualization_1368c937.png";
import agricultureImage from "@assets/generated_images/Agricultural_landscape_perception_1f012b1e.png";

// ---------- Interfaces ----------

export interface Reference {
  id: number;
  authors: string;
  year: number;
  title: string;
  publication: string;
  url?: string;
  doi?: string;
}

export interface FurtherReadingLink {
  title: string;
  description: string;
  url: string;
  type: "article" | "dataset" | "tool" | "course";
}

export interface GeoLocation {
  lat: number;
  lng: number;
  name: string;
}

export interface TimePeriod {
  start: number;
  end?: number;
  era: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}

export interface SplitLensSection {
  title: string;
  text: string;
  visualizationType: "temperatureChart" | "migrationChart" | "urbanGrowth";
}

export interface SplitLensData {
  sections: SplitLensSection[];
}

export type TopicCategory =
  | "environment"
  | "economics"
  | "sociology"
  | "psychology"
  | "history"
  | "technology";

// 👇 Added: metadata for framed images
export interface ImageMeta {
  title?: string;
  subtitle?: string;
}

export interface Post {
  id: string;
  title: string;
  shortName?: string;
  excerpt: string;
  content: string;
  category: string;
  topicCategory?: TopicCategory;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  author: string;
  references?: Reference[];
  furtherReading?: FurtherReadingLink[];
  geoLocation?: GeoLocation;
  timePeriod?: TimePeriod;
  relatedPosts?: string[];
  beforeAfter?: BeforeAfter;
  splitLens?: SplitLensData;
  imageMeta?: ImageMeta; // 👈 Added field for FramedImage
}

// ---------- Posts Array ----------

export const posts: Post[] = [
  {
    id: "urban-inequality",
    title: "How satellite data reveals patterns of urban inequality",
    shortName: "Urban Inequality",
    excerpt:
      "Using remote sensing technology to understand socioeconomic disparities in metropolitan areas through spatial analysis and machine learning.",
    content: `# How satellite data reveals patterns of urban inequality

Satellite imagery has revolutionized our understanding of urban development and socioeconomic patterns.

![Surface temperature disparities across city zones](${urbanImage})

Satellite-derived surface temperature map highlighting heat disparities across urban areas.

## The Power of Remote Sensing

Remote sensing allows us to observe cities from a unique vantage point. High-resolution imagery combined with machine learning algorithms can detect patterns in:

- Building density and height
- Green space distribution
- Infrastructure quality
- Heat island effects
`,
    category: "Geography",
    topicCategory: "environment",
    tags: ["Remote Sensing", "Urban Studies", "Data Science"],
    date: "Nov 5, 2025",
    readTime: "8 min read",
    image: urbanImage,
    author: "Dr. Sarah Chen",
    geoLocation: { lat: 40.7128, lng: -74.0060, name: "New York City, USA" },
    timePeriod: { start: 2020, end: 2025, era: "Modern Era" },
    relatedPosts: ["trade-routes", "climate-migration"],
    imageMeta: {
      title: "Urban Heat Visualization",
      subtitle: "Satellite-derived surface temperature map",
    },
  },
  {
    id: "trade-routes",
    title: "Historical trade routes seen from orbit",
    shortName: "Trade Routes",
    excerpt:
      "Ancient commercial pathways become visible through modern satellite analysis, revealing centuries-old patterns of human connection.",
    content: `# Historical trade routes seen from orbit

The Silk Road and other ancient trade routes left permanent marks on the landscape that are visible from space today.

![Ancient Silk Road terrain patterns](${tradeImage})

Sections of the Silk Road identified from satellite imagery and terrain data.
`,
    category: "History",
    topicCategory: "history",
    tags: ["Historical Geography", "Trade", "Archaeology"],
    date: "Oct 28, 2025",
    readTime: "6 min read",
    image: tradeImage,
    author: "Prof. Michael Torres",
    geoLocation: { lat: 41.9028, lng: 12.4964, name: "Rome, Italy" },
    timePeriod: { start: 130, end: 1453, era: "Ancient to Medieval" },
    relatedPosts: ["urban-inequality"],
    beforeAfter: {
      before: tradeImage,
      after: urbanImage,
      beforeLabel: "Historical Trade Routes (130 BCE)",
      afterLabel: "Modern Trade Networks (2025)",
    },
    imageMeta: {
      title: "Historical Trade Routes",
      subtitle: "Satellite-derived archaeological mapping",
    },
  },
  {
    id: "climate-migration",
    title: "Climate data and economic migration patterns",
    shortName: "Climate Migration",
    excerpt:
      "Analyzing the complex relationship between environmental change and human movement using geospatial data and economic indicators.",
    content: `# Climate data and economic migration patterns

Climate change is reshaping global migration patterns in ways that become clear through comprehensive geospatial analysis.

![Climate migration visualization](${climateImage})

Map showing regions affected by climate-driven migration.
`,
    category: "Economics",
    topicCategory: "economics",
    tags: ["Climate Change", "Migration", "Economics"],
    date: "Oct 20, 2025",
    readTime: "7 min read",
    image: climateImage,
    author: "Dr. Elena Rodriguez",
    geoLocation: { lat: 15.87, lng: 100.9925, name: "Southeast Asia" },
    timePeriod: { start: 2000, end: 2025, era: "Modern Era" },
    relatedPosts: ["urban-inequality", "landscape-perception"],
    imageMeta: {
      title: "Climate Migration Visualization",
      subtitle: "Geospatial data and economic indicators",
    },
  },
  {
    id: "landscape-perception",
    title: "Remote sensing and the psychology of perception",
    shortName: "Landscape Perception",
    excerpt:
      "How we 'see' landscapes from above reveals fascinating insights about human cognition, pattern recognition, and spatial understanding.",
    content: `# Remote sensing and the psychology of perception

The way humans interpret satellite imagery reveals deep truths about how our brains process spatial information.

![Agricultural pattern perception study](${agricultureImage})

Regular agricultural patterns trigger specific cognitive responses and aesthetic perception.
`,
    category: "Psychology",
    topicCategory: "psychology",
    tags: ["Perception", "Cognition", "Visual Analysis"],
    date: "Oct 12, 2025",
    readTime: "6 min read",
    image: agricultureImage,
    author: "Dr. James Park",
    geoLocation: { lat: 51.5074, lng: -0.1278, name: "London, UK" },
    timePeriod: { start: 2015, end: 2025, era: "Modern Era" },
    relatedPosts: ["climate-migration"],
    imageMeta: {
      title: "Pattern Perception Visualization",
      subtitle: "Psychological response to visual regularity",
    },
  },
];

// ---------- Utility Functions ----------

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === "All") return posts;
  return posts.filter((post) => post.category === category);
}
