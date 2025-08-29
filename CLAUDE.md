# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Core Development**
```bash
npm run dev          # Start development server on localhost:3000
npm run build        # Build for production
npm start            # Start production server
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable ESLint issues
```

**Testing**
```bash
npm run test         # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

**Code Quality**
```bash
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Architecture Overview

PlateWise is a culturally-aware AI meal planning platform built on Next.js 15 with the App Router pattern.

### Core Technology Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript (strict mode)
- **Backend**: Supabase (PostgreSQL with RLS, Auth, Storage)
- **AI**: Amazon Bedrock with Claude 3.5 Sonnet
- **Styling**: Tailwind CSS with cultural theme system
- **State**: React Context + custom hooks, Zustand for complex state

### Key Architectural Patterns

**Service Layer Architecture**
- `src/lib/` contains all service modules organized by domain
- Each service has proper error handling, type safety, and interfaces
- External APIs use circuit breaker patterns with health monitoring

**Authentication & Authorization**
- Supabase Auth with email confirmation flow
- Row Level Security (RLS) policies for data access
- Protected routes with `ProtectedRoute` component
- Auth context provides user state throughout app

**Database Architecture**
- PostgreSQL with comprehensive schema in `supabase-schema.sql`
- Recipe management with cultural authenticity tracking
- User profiles with cultural preferences and dietary restrictions
- Recipe collections and community features

**AI Integration Patterns**
- Amazon Bedrock service with cultural context awareness
- Circuit breaker for API reliability
- Rate limiting and intelligent caching
- Cultural authenticity analysis for recipes

### Important File Locations

**Configuration**
- `src/lib/supabase/` - Database client configuration (browser, server, middleware)
- `src/lib/ai/bedrock-service.ts` - AI service configuration
- `src/lib/themes/cultural-themes.ts` - Cultural theme definitions

**Authentication System**
- `src/contexts/AuthContext.tsx` - Global auth state
- `src/components/auth/` - Auth components (SignIn, SignUp, etc.)
- `src/app/auth/` - Auth pages and flows

**Recipe Management**
- `src/lib/recipes/` - Complete recipe service layer with CRUD operations
- `src/components/recipes/` - Recipe UI components (cards, forms, search, scaling)
- Database schema supports cultural authenticity tracking and community features

**External API Integration**
- `src/lib/external-apis/` - Complete API integration layer
- Includes Kroger, Spoonacular, Edamam, ElevenLabs, Google Places, USDA APIs
- All services implement circuit breaker and health monitoring patterns

**Cultural Theme System**
- `src/lib/themes/` - Cultural theme service and definitions
- `src/contexts/ThemeContext.tsx` - Theme state management
- Supports Mediterranean, Asian, Latin American, African, Middle Eastern themes

### TypeScript Configuration
- Strict mode enabled with comprehensive type checking
- Path aliases configured for clean imports (`@/` prefix)
- Custom types in `src/types/index.ts`

### Environment Variables Required
```bash
# Supabase (Required)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AWS Bedrock (Required for AI)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=

# External APIs (Optional)
KROGER_CLIENT_ID=
KROGER_CLIENT_SECRET=
NEXT_PUBLIC_RAPIDAPI_KEY= # For Spoonacular API via RapidAPI
SPOONACULAR_API_KEY=      # Alternative for direct Spoonacular API (deprecated)
EDAMAM_APP_ID=
EDAMAM_APP_KEY=
USDA_API_KEY=
ELEVENLABS_API_KEY=
GOOGLE_PLACES_API_KEY=
REDIS_URL=
```

### Development Practices
- Use TypeScript strict mode - no `any` types
- Follow cultural authenticity guidelines for recipe features
- All external API integrations must implement circuit breaker patterns
- Recipe management requires cultural authenticity classification
- Test AI features with proper mocking for external services
- Maintain WCAG 2.1 AA accessibility standards

### Performance Considerations
- Next.js App Router with server components where possible
- Image optimization configured for Spoonacular and Supabase
- Bundle optimization removes console.log in production
- Security headers configured in next.config.js
- Redis caching for external API responses (when configured)

### Testing Strategy
- Jest configured for unit testing (configuration in package.json)
- Focus testing on business logic, recipe management, and AI integration
- Mock external APIs for reliable testing
- Cultural authenticity features require community validation
- Accessibility testing with WCAG compliance verification

### Configuration Files
- **next.config.js** - Next.js configuration with image optimization, security headers, and webpack customization
- **tsconfig.json** - TypeScript strict mode with path aliases (@/ mapping)
- **tailwind.config.js** - Cultural theme color system and custom animations
- **.eslintrc.json** - TypeScript ESLint rules with React and accessibility checks
- **postcss.config.js** - PostCSS configuration for Tailwind CSS processing