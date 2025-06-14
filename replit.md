# Perla Dunării - Danube Tourism Platform

## Overview

Perla Dunării is a full-stack tourism platform for discovering and booking destinations and experiences along the Danube River. The application features an AI-powered interface with modern React frontend and Express.js backend, utilizing PostgreSQL with Drizzle ORM for data management.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme (Danube color scheme)
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with JSON responses
- **Session Management**: PostgreSQL session store

### Development Environment
- **Platform**: Replit with Node.js 20
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Build Process**: Vite for client, esbuild for server bundling

## Key Components

### Database Schema
Located in `shared/schema.ts`:
- **destinations**: Tourism destinations with ratings, prices, and availability
- **experiences**: Activities and tours with duration, group size, and categories
- **bookings**: Customer reservations for destinations/experiences
- **inquiries**: Customer contact form submissions
- **testimonials**: Customer reviews and ratings
- **users**: User accounts (referenced but not fully implemented)

### API Endpoints
RESTful API structure in `server/routes.ts`:
- `GET /api/destinations` - List all destinations
- `GET /api/destinations/featured` - Featured destinations
- `GET /api/destinations/:id` - Single destination
- `GET /api/experiences` - List all experiences
- `GET /api/experiences/:id` - Single experience
- `POST /api/bookings` - Create booking
- `POST /api/inquiries` - Submit inquiry

### Frontend Pages
- **Home** (`/`): Hero section, featured destinations, experiences showcase
- **Destinations** (`/destinations`): Browse all destinations with filtering
- **Experiences** (`/experiences`): Browse available experiences by category
- **Booking** (`/booking/:type/:id`): Dynamic booking form for destinations/experiences

### UI Components
Comprehensive component library including:
- Header with navigation and branding
- Hero section with search functionality
- Featured destinations grid
- Experiences showcase with category filtering
- Testimonials carousel
- Contact form with inquiry submission
- Booking modal and forms

## Data Flow

1. **Client Requests**: Frontend components use TanStack Query for API calls
2. **API Processing**: Express.js routes handle requests and validate data
3. **Database Operations**: Drizzle ORM manages PostgreSQL operations
4. **Response**: JSON data returned to client and cached by React Query
5. **UI Updates**: Components re-render based on query state changes

### Search & Booking Flow
1. User searches destinations via hero form
2. Results filtered and displayed on destinations page
3. User selects item and navigates to booking page
4. Booking form validates and submits data
5. Confirmation displayed and queries invalidated

## External Dependencies

### Core Dependencies
- **Database**: `@neondatabase/serverless` for PostgreSQL connection
- **ORM**: `drizzle-orm` with `drizzle-zod` for schema validation
- **UI Library**: Extensive Radix UI components with shadcn/ui
- **Icons**: FontAwesome and Lucide React icons
- **Styling**: Tailwind CSS with PostCSS processing

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **Vite**: Fast development server and optimized builds
- **ESBuild**: Server-side bundling for production
- **Replit Integration**: Runtime error overlay and cartographer

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Process**: Concurrent frontend (Vite) and backend (tsx) development servers
- **Port**: 5000 for backend, proxied through Vite for frontend

### Production Build
- **Frontend**: `vite build` outputs to `dist/public`
- **Backend**: `esbuild` bundles server to `dist/index.js`
- **Assets**: Static files served from built frontend

### Replit Deployment
- **Target**: Autoscale deployment
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Port Mapping**: Internal 5000 → External 80

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 14, 2025. Initial setup