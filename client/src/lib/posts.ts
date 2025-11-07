import urbanImage from "@assets/generated_images/Urban_inequality_satellite_view_ae811999.png";
import tradeImage from "@assets/generated_images/Trade_routes_from_orbit_19161c8b.png";
import climateImage from "@assets/generated_images/Climate_migration_data_visualization_1368c937.png";
import agricultureImage from "@assets/generated_images/Agricultural_landscape_perception_1f012b1e.png";

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

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  author: string;
  references?: Reference[];
  furtherReading?: FurtherReadingLink[];
}

export const posts: Post[] = [
  {
    id: "urban-inequality",
    title: "How satellite data reveals patterns of urban inequality",
    excerpt: "Using remote sensing technology to understand socioeconomic disparities in metropolitan areas through spatial analysis and machine learning.",
    content: `# How satellite data reveals patterns of urban inequality

Satellite imagery has revolutionized our understanding of urban development and socioeconomic patterns. By analyzing data from space, researchers can identify disparities that are invisible at ground level.

## The Power of Remote Sensing

Remote sensing allows us to observe cities from a unique vantage point. High-resolution imagery combined with machine learning algorithms can detect patterns in:

- Building density and height
- Green space distribution
- Infrastructure quality
- Heat island effects

## Case Study: Metropolitan Analysis

Recent studies have shown strong correlations between satellite-observable features and socioeconomic indicators. Areas with less tree coverage and more impervious surfaces often correspond to lower-income neighborhoods.

### Key Findings

Our analysis of 50 major cities revealed:

1. **Green space inequality**: Higher-income areas average 40% more tree coverage
2. **Heat exposure**: Low-income neighborhoods experience 3-5°F higher temperatures
3. **Infrastructure**: Road quality varies significantly by socioeconomic zone

## Interactive Data Visualization

The map below shows urban heat distribution across a metropolitan area, with darker red indicating higher surface temperatures.

\`\`\`javascript
// Sample code for processing satellite data
const analyzeSatelliteData = (imagery) => {
  return imagery.map(pixel => ({
    temperature: calculateSurfaceTemp(pixel),
    greenness: calculateNDVI(pixel),
    location: pixel.coordinates
  }));
};
\`\`\`

## Implications for Policy

These insights enable evidence-based urban planning and targeted interventions to reduce inequality. City planners can use this data to:

- Prioritize tree planting initiatives
- Design cooling strategies for vulnerable areas
- Allocate resources more equitably

## Looking Forward

As satellite technology continues to advance, our ability to monitor and address urban inequality will only improve. The combination of remote sensing and ground-truth data creates powerful tools for social change.`,
    category: "Geography",
    tags: ["Remote Sensing", "Urban Studies", "Data Science"],
    date: "Nov 5, 2025",
    readTime: "8 min read",
    image: urbanImage,
    author: "Dr. Sarah Chen",
    references: [
      {
        id: 1,
        authors: "Chen, L., & Martinez, R.",
        year: 2024,
        title: "Satellite-based assessment of urban heat islands and socioeconomic disparities",
        publication: "Remote Sensing of Environment, 287, 113-128",
        url: "https://example.com/paper1",
        doi: "10.1016/j.rse.2024.113128"
      },
      {
        id: 2,
        authors: "Johnson, M., Smith, K., & Lee, H.",
        year: 2023,
        title: "Machine learning approaches to urban inequality mapping",
        publication: "International Journal of Geographic Information Science, 37(4), 892-915",
        doi: "10.1080/13658816.2023.892915"
      },
      {
        id: 3,
        authors: "Williams, A.",
        year: 2024,
        title: "Green space distribution and environmental justice in metropolitan areas",
        publication: "Urban Studies, 61(2), 234-251",
        url: "https://example.com/paper3",
        doi: "10.1177/00420980241234251"
      }
    ],
    furtherReading: [
      {
        title: "NASA's Urban Heat Island Effect Resources",
        description: "Comprehensive guide to understanding and measuring urban heat islands using satellite data",
        url: "https://earthobservatory.nasa.gov",
        type: "article"
      },
      {
        title: "Landsat Urban Analysis Toolkit",
        description: "Tools and datasets for analyzing urban development patterns using Landsat imagery",
        url: "https://earthexplorer.usgs.gov",
        type: "dataset"
      },
      {
        title: "QGIS Urban Planning Plugin",
        description: "Open-source GIS tool with specialized features for urban analysis and planning",
        url: "https://qgis.org",
        type: "tool"
      },
      {
        title: "Remote Sensing for Social Justice",
        description: "Online course exploring how satellite data can reveal and address inequality",
        url: "https://example.com/course",
        type: "course"
      }
    ]
  },
  {
    id: "trade-routes",
    title: "Historical trade routes seen from orbit",
    excerpt: "Ancient commercial pathways become visible through modern satellite analysis, revealing centuries-old patterns of human connection.",
    content: `# Historical trade routes seen from orbit

The Silk Road and other ancient trade routes left permanent marks on the landscape that are visible from space today.

## Discovering the Past from Above

Modern satellite technology allows us to see historical trade routes that have shaped civilizations. These ancient pathways reveal:

- Caravan stops and rest areas
- Agricultural development along routes
- Settlement patterns
- Environmental impact of historical trade

## The Silk Road from Space

Using multispectral imaging, researchers have identified sections of the ancient Silk Road that are still visible in terrain patterns, vegetation changes, and archaeological sites.

### Technology Meets History

Combining historical records with satellite data creates a new understanding of:

1. Route selection based on terrain
2. Seasonal variations in path usage
3. Long-term environmental changes
4. Cultural exchange patterns

## Economic Geography Through Time

Trade routes weren't just paths—they were engines of economic and cultural exchange that shaped the modern world.`,
    category: "History",
    tags: ["Historical Geography", "Trade", "Archaeology"],
    date: "Oct 28, 2025",
    readTime: "6 min read",
    image: tradeImage,
    author: "Prof. Michael Torres"
  },
  {
    id: "climate-migration",
    title: "Climate data and economic migration patterns",
    excerpt: "Analyzing the complex relationship between environmental change and human movement using geospatial data and economic indicators.",
    content: `# Climate data and economic migration patterns

Climate change is reshaping global migration patterns in ways that become clear through comprehensive geospatial analysis.

## Understanding Climate Migration

By combining climate data with economic indicators, we can identify:

- Temperature and precipitation changes
- Agricultural productivity shifts
- Economic opportunity maps
- Migration flow patterns

## Data-Driven Insights

Satellite observations of environmental change, combined with demographic data, reveal strong correlations between climate stress and population movement.

### Regional Analysis

Our research shows that areas experiencing:

- Extended drought periods see 20% population decline over 10 years
- Rising sea levels drive coastal migration
- Temperature extremes reduce agricultural employment

## The Human Cost

Behind every data point is a human story of adaptation, resilience, and sometimes displacement.

## Policy Implications

Understanding these patterns helps governments and organizations:

1. Prepare receiving areas for climate migrants
2. Invest in climate adaptation at origin points
3. Create economic opportunities in vulnerable regions
4. Plan infrastructure for population shifts`,
    category: "Economics",
    tags: ["Climate Change", "Migration", "Economics"],
    date: "Oct 20, 2025",
    readTime: "7 min read",
    image: climateImage,
    author: "Dr. Elena Rodriguez"
  },
  {
    id: "landscape-perception",
    title: "Remote sensing and the psychology of perception",
    excerpt: "How we 'see' landscapes from above reveals fascinating insights about human cognition, pattern recognition, and spatial understanding.",
    content: `# Remote sensing and the psychology of perception

The way humans interpret satellite imagery reveals deep truths about how our brains process spatial information.

## Visual Cognition from Above

When looking at Earth from orbit, our brains engage in complex pattern recognition that differs from ground-level perception.

### Psychological Factors

Research shows that interpreting satellite imagery involves:

- Gestalt principles of grouping and organization
- Color psychology and natural associations
- Scale perception challenges
- Cultural interpretations of landscape

## Agricultural Patterns

The geometric beauty of agricultural land from above triggers aesthetic responses while also providing functional information about land use.

### Pattern Recognition

Humans excel at:

1. Identifying regular vs. irregular patterns
2. Detecting changes over time
3. Recognizing familiar shapes at any scale
4. Finding meaning in abstract spatial data

## Cognitive Mapping

Our mental maps of the world are transformed when we see places from a satellite perspective, creating new spatial understanding.

## Applications

Understanding perception helps us:

- Design better data visualizations
- Train analysts more effectively
- Create intuitive mapping interfaces
- Communicate spatial information clearly`,
    category: "Psychology",
    tags: ["Perception", "Cognition", "Visual Analysis"],
    date: "Oct 12, 2025",
    readTime: "6 min read",
    image: agricultureImage,
    author: "Dr. James Park"
  }
];

export function getPostById(id: string): Post | undefined {
  return posts.find(post => post.id === id);
}

export function getPostsByCategory(category: string): Post[] {
  if (category === "All") return posts;
  return posts.filter(post => post.category === category);
}
