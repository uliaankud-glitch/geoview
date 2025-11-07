# GeoView Design Guidelines

## Design Approach
**Reference-Based: Scientific Data Journalism**
Primary inspiration from Our World in Data and FlowingData - sites that excel at making complex data accessible and beautiful through clarity, generous whitespace, and thoughtful hierarchy.

**Core Principles:**
- Data and content are the hero - design supports, never competes
- Academic credibility through restrained, professional aesthetics
- Maximum readability for long-form scientific storytelling
- Generous whitespace to let visualizations breathe

## Typography System

**Font Stack:**
- Headlines: Inter or Source Sans Pro (700, 600 weights) - clean, modern sans-serif
- Body: Charter or Georgia (400, 400 italic) - highly readable serif for long-form content
- Data/Code: JetBrains Mono (400) - for code snippets and technical details

**Type Scale:**
- Hero Headlines: text-5xl to text-6xl (desktop), text-3xl (mobile)
- Post Titles: text-4xl (desktop), text-2xl (mobile)
- Section Headers: text-2xl to text-3xl
- Body Text: text-lg (19-20px) - larger than typical for extended reading comfort
- Captions/Metadata: text-sm
- Category Tags: text-xs uppercase tracking-wide

## Layout System

**Spacing Primitives:**
Use Tailwind units of 4, 6, 8, 12, 16, 20 for consistent rhythm (e.g., p-4, gap-8, mb-12, py-20)

**Grid Structure:**
- Container: max-w-7xl for site wrapper
- Reading Content: max-w-3xl (optimal line length ~70 characters)
- Wide Content: max-w-5xl for data visualizations and full-width images
- Full-Bleed: w-full for hero images and immersive visualizations

**Responsive Breakpoints:**
- Mobile-first approach
- Single column on mobile, strategic 2-3 columns on desktop
- Stack all multi-column layouts to single column below md breakpoint

## Home Page Structure

**Hero Section (60vh to 80vh):**
- Large hero image: Stunning satellite/aerial imagery showcasing geocomputation beauty
- Overlay: Site title and tagline with blurred background behind text (backdrop-blur-md)
- Minimal navigation integrated into hero

**Featured Posts Grid:**
- 2-column layout (md:grid-cols-2) for main featured stories
- Large preview images (16:9 aspect ratio)
- Post cards with generous padding (p-6 to p-8)
- Clear typography hierarchy: category tag → title → excerpt → metadata

**Category Navigation:**
- Horizontal scrollable tag bar or clean pill-style buttons
- Six categories: Geography, History, Society, Economics, Psychology, Tech

**Recent/Additional Posts:**
- 3-column grid (lg:grid-cols-3) for secondary content
- Smaller cards maintaining same design language

## Blog Post Page Structure

**Article Header:**
- Full-width hero image related to post topic (aspect-video or aspect-[21/9])
- Title overlay with blurred background or positioned below image
- Metadata bar: Author, date, read time, category tags

**Content Area:**
- Centered max-w-3xl container for text
- Break out to max-w-5xl for wide images and visualizations
- Full-bleed treatment for maps and interactive charts

**Interactive Elements:**
- Plotly charts: Full container width with subtle borders
- Leaflet maps: Minimum height of 400-500px, rounded corners
- Embedded tools: Clean integration with surrounding content, adequate spacing

**Image Treatment:**
- Full-width within content container
- Captions in smaller italic text beneath images
- Photo credits in subtle metadata style

## Component Library

**Navigation:**
- Sticky header with subtle shadow on scroll
- Logo/wordmark left, main nav center or right
- Dark/light mode toggle in header (sun/moon icon)

**Cards (Posts):**
- Subtle border or shadow (not both)
- Hover state: Slight elevation or border emphasis
- Image fills card top, content section below with consistent padding
- Category tag as pill/badge at top of card content

**Buttons/CTAs:**
- Minimal, text-focused primary buttons
- "Read More" or "Explore Data" as primary CTAs
- Icon support (arrow-right from Heroicons)

**Data Visualization Containers:**
- Light border surrounding charts/maps
- Title and description above visualization
- Source citation below in small text
- Adequate padding around content (p-6 to p-8)

**Tag System:**
- Pill-style tags with subtle backgrounds
- Clickable for filtering
- Consistent sizing (px-3 py-1 text-xs)

**Footer:**
- Clean, minimal design
- About GeoView brief, category links, newsletter signup
- Social links if applicable, copyright notice

## Dark/Light Mode Strategy

**Toggle Implementation:**
- Icon-based toggle in header
- Smooth transition between modes
- Persistence via localStorage

**Mode Considerations:**
- Light mode: Primary reading mode, optimized for data clarity
- Dark mode: Softer backgrounds, maintained readability, adjusted chart colors
- Ensure data visualizations adapt appropriately to both modes

## Images

**Required Images:**
1. **Hero Image**: Spectacular satellite/aerial view showcasing Earth observation (e.g., river deltas, urban patterns, agricultural grids) - full-width, high-impact
2. **Featured Post Images**: 3-4 compelling images for placeholder posts - satellite imagery, data visualization screenshots, historical maps
3. **Blog Post Headers**: Individual hero images per post - thematic to content (climate data visuals, urban landscapes, terrain mapping)

**Icon Library:** Heroicons for UI elements (menu, toggle, arrows, tags)

## Animations

**Minimal Approach:**
- Smooth page transitions (150-200ms)
- Subtle hover states on cards and buttons
- Fade-in on scroll for blog post images (optional, very subtle)
- No distracting or complex animations - content is the focus

## Special Considerations

**Data Visualization Integration:**
- Provide clear wrapper components for Plotly, Leaflet, D3
- Maintain generous margins around visualizations (my-12 to my-16)
- Responsive scaling for all chart types

**Markdown Rendering:**
- Styled blockquotes for callouts
- Code blocks with syntax highlighting
- Proper heading hierarchy (h2, h3, h4)
- Lists with adequate spacing

**Performance:**
- Lazy-load images below fold
- Optimize visualization libraries (load only when needed)
- Efficient font loading strategy

This design creates a professional, credible platform that elevates scientific storytelling while maintaining the clarity and accessibility that makes complex data comprehensible.