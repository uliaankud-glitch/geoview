# GeoView - Geographic Data Storytelling Platform

## Overview

GeoView is a data journalism and storytelling platform focused on geocomputation and remote sensing. The application presents scientific articles and data visualizations that explore connections between geographic data and human disciplines (history, economics, sociology, psychology). The platform emphasizes beautiful, accessible data presentation inspired by sites like Our World in Data and FlowingData.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for optimal HMR and fast builds
- Wouter for lightweight client-side routing (replacing React Router)
- Mobile-first responsive design using Tailwind CSS breakpoints

**UI Component System**
- Shadcn/ui component library (New York style variant) for consistent, accessible UI primitives
- Radix UI primitives for headless, accessible component foundations
- Custom design system with generous whitespace and typography hierarchy for long-form reading
- Theme support (light/dark mode) via context provider with localStorage persistence

**State Management**
- TanStack Query (React Query) for server state management and caching
- React Context for global theme state
- Local component state for UI interactions

**Data Visualization**
- Recharts for chart components (bar charts, line charts, area charts)
- Leaflet for interactive mapping with OpenStreetMap tiles
- react-force-graph-2d for network/cognitive map visualizations
- react-compare-image for before/after image comparisons
- Custom visualization components integrated with article content

**Design Philosophy**
- Typography-focused with Inter/Source Sans Pro for headlines, Charter/Georgia for body text
- Generous spacing using Tailwind's spacing primitives (4, 6, 8, 12, 16, 20)
- Optimal reading width (max-w-3xl for content, max-w-5xl for visualizations)
- Color-coded categories (blue for remote sensing, red for history, green for sociology, gold for economics)

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- Custom Vite integration for SSR-ready development with HMR support
- Session-based architecture preparation (connect-pg-simple included for future session storage)

**Storage Strategy**
- In-memory storage implementation (MemStorage class) for development
- Interface-based design (IStorage) allowing easy swap to persistent storage
- Drizzle ORM configured for PostgreSQL with schema definitions ready
- Database migrations directory structure prepared

**API Design**
- RESTful API structure with /api prefix convention
- Centralized error handling with status code checking
- JSON request/response format
- CORS and credential handling configured

### Application Structure

**Content Model**
- Static post data with rich metadata (categories, tags, geographic locations, time periods)
- Support for multiple content types: articles, data stories, interactive visualizations
- Reference and citation system for academic credibility
- Related post linking for content discovery

**Visualization Types**
- Standard charts (temperature, migration, urban growth)
- Interactive maps with geographic markers
- Timeline views for historical content
- Cognitive/network maps showing post relationships
- Split-lens explorers (scroll-driven narrative + visualization)
- Before/after comparison swipes

**Navigation & Discovery**
- Category-based filtering (Geography, History, Society, Economics, Psychology, Tech)
- Full-text search across posts, tags, and categories
- Multiple view modes (grid, timeline, network)
- Related posts and further reading sections

### Data Flow

**Client-Side Rendering**
- Static post data imported from posts.ts library
- Client-side filtering and search without backend queries
- React Query configured but currently used for future API integration
- Optimistic UI updates with local state management

**Asset Management**
- Vite alias resolution for clean imports (@/, @shared/, @assets/)
- Static assets served from attached_assets directory
- Generated images for post thumbnails and hero sections

## External Dependencies

### UI & Visualization Libraries
- **Radix UI**: Complete set of accessible, unstyled UI primitives (accordion, dialog, dropdown, select, etc.)
- **Recharts**: Composable charting library built on D3
- **Leaflet**: Interactive map rendering with OpenStreetMap integration
- **react-force-graph-2d**: Force-directed graph visualization
- **react-compare-image**: Image comparison slider component
- **react-markdown**: Markdown rendering with remark-gfm and rehype-raw plugins
- **react-syntax-highlighter**: Code syntax highlighting with Prism themes

### Styling & Theming
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx & tailwind-merge**: Conditional class name utilities

### Data & State Management
- **TanStack Query**: Async state management with caching and refetching
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for forms and data structures
- **@hookform/resolvers**: Zod integration for React Hook Form

### Database & ORM
- **Drizzle ORM**: TypeScript ORM configured for PostgreSQL
- **@neondatabase/serverless**: Serverless Postgres driver (Neon Database)
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **TypeScript**: Type safety across client and server
- **Vite**: Fast build tool with plugin ecosystem
- **ESBuild**: JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific development plugins (error overlay, cartographer, dev banner)

### Routing & HTTP
- **Wouter**: Minimalist routing for React (2KB alternative to React Router)
- **Express**: Node.js web framework for API server

### Fonts & Icons
- **Google Fonts**: Architects Daughter, DM Sans, Fira Code, Geist Mono, Inter, Outfit
- **Lucide React**: Icon library for UI elements