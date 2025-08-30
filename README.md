# PlateWise 🍽️

A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.

## Overview

PlateWise combines advanced cost analysis, cultural heritage preservation, nutritional optimization, and community features to create a holistic meal planning and grocery shopping experience. The platform uses Amazon Bedrock AI to generate personalized meal plans that respect cultural authenticity while staying within budget constraints, integrated with comprehensive external APIs for real-time pricing, recipe discovery, and cultural food research.

## 🔄 Recent Updates & Enhancements

PlateWise has recently undergone significant improvements to enhance the user experience and provide more accurate, culturally-sensitive meal planning:

### Latest Features (January 2025)
- **Enhanced Multi-Tier Pricing System** - New EnhancedPricingService combines Perplexity AI primary pricing with Kroger API fallback and basic estimates for 99.9% coverage
- **AI-First Pricing Intelligence** - Perplexity AI serves as primary pricing source with real-time web price aggregation from major grocery stores
- **Intelligent Fallback Architecture** - Automatic fallback from Perplexity → Kroger → Basic estimates with confidence scoring and transparent source attribution
- **Advanced Pricing Testing** - Comprehensive PricingFallbackTest component for testing multi-tier pricing system with real-time validation and health monitoring
- **Smart Confidence Scoring** - Confidence scoring system (0-100%) for all pricing sources with detailed explanations and reliability indicators
- **Enhanced API Health Monitoring** - Real-time health checks for Perplexity and Kroger services with automatic failover capabilities
- **Cultural Authenticity Scoring** - Comprehensive 1-10 scale authenticity rating system with AI-powered cultural context analysis
- **Advanced Recipe Management** - Complete CRUD system with real-time pricing, scaling, and cultural preservation features
- **Improved Error Handling** - Production-ready error boundaries with graceful degradation and user-friendly recovery options
- **Enhanced Voice Integration** - ElevenLabs integration with cultural pronunciation guides and multilingual support
- **Tavily Research Integration** - Cultural food research capabilities with hooks system for authenticity validation
- **Developer Tools Enhancement** - Comprehensive debugging components for recipe operations and pricing analysis with fallback testing
- **Resilient Service Architecture** - Multiple pricing sources with intelligent fallback to ensure 99.9% service availability

## 🚀 Current Status

PlateWise has reached a significant milestone with a comprehensive foundation and production-ready features. The platform now includes advanced recipe management with real-time pricing integration, comprehensive cultural authenticity tracking, and a complete AI-powered meal planning system:

- ✅ **Complete Authentication System** - Supabase Auth with email confirmation, password reset, OAuth callbacks, and secure session management
- ✅ **Advanced Profile Setup** - 7-step cultural onboarding wizard with personal info, cultural preferences, dietary restrictions, budget settings, nutritional goals, cooking profile, and comprehensive review
- ✅ **Production Database** - Full PostgreSQL schema with Row Level Security, cultural metadata support, and optimized queries
- ✅ **Cultural Design System** - Bento-style UI with 5 dynamic cultural themes, responsive grid system, and accessibility compliance
- ✅ **Modern Landing Experience** - Responsive design with cultural imagery, theme switching, and optimized performance
- ✅ **AI-Powered Intelligence** - Amazon Bedrock integration with Claude 3.5 Sonnet for culturally-aware meal planning and recipe analysis
- ✅ **Comprehensive API Layer** - 9+ integrated external services with circuit breakers, rate limiting, caching, and health monitoring
- ✅ **Advanced Recipe Management** - Complete CRUD system with cultural authenticity scoring, intelligent scaling, AI-powered cost analysis, and community features
- ✅ **Enhanced Multi-Tier Pricing System** - Complete EnhancedPricingService with Perplexity AI primary, Kroger API fallback, basic estimates, confidence scoring, health monitoring, and 99.9% coverage guarantee
- ✅ **Multilingual Voice Integration** - ElevenLabs text-to-speech with cultural pronunciation guides and voice command system
- ✅ **Local Food Discovery** - Google Places and USDA integration for grocery stores, specialty markets, and farmer markets with cultural filtering
- ✅ **AI-Powered Price Intelligence** - Multi-tier pricing system with Perplexity AI primary, Kroger fallback, route optimization, and shopping list generation
- ✅ **Developer Tools** - Comprehensive debugging components, MCP integration, and development utilities with recipe testing tools and pricing fallback testing
- ✅ **Cultural Authenticity Engine** - AI-powered cultural context analysis, preservation recommendations, and authenticity scoring (1-10 scale)
- ✅ **Error Handling & Reliability** - Production-ready error boundaries, graceful degradation, and comprehensive error recovery
- ✅ **Recipe Intelligence System** - Multi-source recipe search, cultural classification, ingredient scaling, and cost optimization
- 🔄 **Meal Planning & Budget Tracking** - AI-powered meal plans with cost optimization and cultural balance (in progress)

## Key Features

### 🎯 Budget Optimization
- Real-time price comparison across multiple stores
- Advanced cost analysis with seasonal trend predictions
- Bulk buying recommendations and coupon integration
- Weekly/monthly budget tracking with smart alerts
- USDA budget guidelines integration

### 🌍 Cultural Preservation
- Authentic recipe adaptation with cultural context
- Traditional cooking technique guides
- Cultural ingredient education and sourcing tips
- Festival and holiday meal planning
- Multi-cultural theme system (Mediterranean, Asian, Latin American, African, Middle Eastern)

### 🤖 AI-Powered Intelligence
- **Amazon Bedrock Integration** - Claude 3.5 Sonnet for intelligent meal planning with cultural context and authenticity preservation
- **Enhanced Multi-Tier Pricing System** - EnhancedPricingService with Perplexity AI primary, Kroger API fallback, basic estimates, confidence scoring, and health monitoring
- **Cultural Authenticity Engine** - AI-powered scoring (1-10 scale), preservation recommendations, and traditional technique analysis
- **Smart Ingredient Substitutions** - Culturally-appropriate alternatives with cost and authenticity impact analysis
- **Recipe Intelligence** - Extract and parse recipes from text, photos, or voice input with cultural classification and context
- **Budget Optimization AI** - Cost reduction strategies while maintaining cultural authenticity and nutritional goals
- **Multi-language Translation** - Preserve cultural context and culinary terminology across languages with proper pronunciation
- **Voice Command System** - ElevenLabs integration with multilingual support and cultural pronunciation guides
- **Robust Service Architecture** - Circuit breakers, rate limiting, health monitoring, and intelligent fallbacks with 99.9% uptime target
- **Recipe Analysis Engine** - Comprehensive CRUD operations with cultural authenticity scoring and intelligent scaling algorithms
- **Error Recovery & Resilience** - Production-ready error boundaries with graceful degradation and user-friendly error handling
- **Pricing Intelligence** - AI-powered product matching with confidence scoring and explanation of matching logic
- **Cultural Context AI** - Intelligent cultural significance analysis and preservation recommendations for traditional recipes

### 💰 Enhanced Multi-Tier Pricing System
PlateWise features a sophisticated **EnhancedPricingService** that ensures reliable, accurate pricing through intelligent fallback architecture:

- **Perplexity AI Primary** - Real-time web price aggregation from major grocery stores (Kroger, Walmart, Target, Safeway) with AI-powered analysis
- **Kroger API Fallback** - Advanced product matching and pricing when Perplexity confidence is low or service unavailable
- **Basic Estimates Backup** - Intelligent price estimates based on ingredient categories when APIs are unavailable
- **Confidence Scoring** - Transparent 0-100% confidence ratings for all pricing sources with detailed explanations
- **Health Monitoring** - Real-time service health checks with automatic failover and status reporting
- **99.9% Coverage** - Guaranteed pricing availability through intelligent three-tier fallback system

### 🏪 Local Store Discovery & Shopping
- **Intelligent Store Finder** - Google Places integration with cultural specialty filtering and distance optimization
- **AI-Powered Price Intelligence** - EnhancedPricingService provides comprehensive pricing across multiple sources and stores
- **Specialty Market Discovery** - Find ethnic markets, halal/kosher stores, and cultural specialty shops for authentic ingredients
- **Farmer Market Integration** - USDA data integration for local farmer markets, seasonal produce, and payment options (SNAP/WIC)
- **Smart Shopping Optimization** - AI-powered route planning with cultural store prioritization and cost analysis
- **Advanced Coupon System** - Kroger API integration for real-time coupon discovery, savings calculations, and deal optimization
- **Location Services** - Unified local food sourcing with cultural context and seasonal recommendations

### 📚 Recipe Management
- **Advanced Recipe Database** - Full CRUD operations with Supabase integration, RLS security, and cultural metadata
- **Cultural Authenticity System** - Traditional vs. adapted classification with AI-powered authenticity scoring (1-10 scale)
- **Smart Recipe Collections** - Organize recipes into custom collections with cultural themes and sharing capabilities
- **Intelligent Search & Filtering** - Multi-dimensional search by culture, cuisine, difficulty, time, authenticity, and dietary restrictions
- **Multi-Source Integration** - Unified search across Spoonacular API, internal database, and community contributions
- **Community Rating System** - Multi-dimensional ratings for taste, cost-effectiveness, cultural authenticity, and difficulty
- **Recipe Scaling Engine** - Intelligent ingredient scaling with proper unit conversions and cultural context preservation
- **Real-time Cost Analysis** - Dynamic cost calculations with multi-store price comparisons and budget impact assessment
- **Recipe Input Methods** - Support for text input, URL parsing, voice commands, and photo recognition with AI processing
- **Enhanced Multi-Tier Pricing Integration** - EnhancedPricingService with Perplexity AI primary, Kroger fallback, basic estimates, confidence scoring, and health monitoring
- **Advanced Pricing API Routes** - Enhanced pricing endpoints with automatic fallback, confidence scoring, and detailed source attribution
- **Recipe Debug Tools** - Comprehensive debugging interface for recipe operations, authentication flows, and database interactions
- **Ingredient Intelligence** - Advanced ingredient parsing, substitution suggestions, and cultural impact analysis

### 👥 Community Features
- **Recipe Sharing** - Share recipes with cultural authenticity ratings and community feedback
- **Recipe Collections** - Create and share curated recipe collections with cultural themes
- **Community Ratings** - Multi-dimensional rating system for taste, cost, and authenticity
- **Cultural Preservation** - Community-driven validation of traditional recipes and techniques
- **Local Food Discovery** - Find specialty markets and farmer markets with cultural focus
- **Social Following** - Follow other users and discover culturally-relevant recipes

### 🎨 Design System
- **Bento Grid Layout** - Modern card-based interface with flexible sizing (small, medium, large, wide, tall, hero)
- **Dynamic Cultural Themes** - 5 culturally-inspired themes with authentic color palettes and traditional patterns
- **Responsive Architecture** - Mobile-first design with touch-friendly interactions and gesture support
- **Accessibility Excellence** - WCAG 2.1 AA compliance with screen reader support and keyboard navigation
- **Multi-language Support** - RTL language support for Arabic and Hebrew with cultural typography adaptation
- **Performance Optimized** - Lighthouse scores >90 Performance, >95 Accessibility with optimized assets

## Technology Stack

### Core Platform
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **Styling**: Tailwind CSS with custom cultural themes and bento grid system
- **State Management**: React Context API with custom hooks

### AI & Machine Learning
- **AI Engine**: Amazon Bedrock with Claude 3.5 Sonnet model
- **Voice Processing**: ElevenLabs API for multilingual text-to-speech
- **Cultural Analysis**: Custom AI prompts for authenticity scoring
- **Recipe Intelligence**: AI-powered parsing and ingredient analysis
- **Primary Pricing Intelligence**: Perplexity AI for real-time grocery pricing with web aggregation from major stores

### External Integrations
- **Enhanced Multi-Tier Pricing**: EnhancedPricingService combining Perplexity AI primary, Kroger API fallback, and basic estimates with confidence scoring and health monitoring
- **AI-Powered Pricing Intelligence**: Perplexity AI for primary real-time grocery pricing with web aggregation from major stores
- **Grocery & Shopping APIs**: Kroger Catalog API v2 for fallback pricing, advanced product matching, and coupon integration
- **Recipe Discovery**: Spoonacular API for extensive recipe database with cultural cuisine filtering and nutritional data
- **Voice & Audio Services**: ElevenLabs API for multilingual text-to-speech with cultural pronunciation guides and voice commands
- **Location & Maps**: Google Places API for grocery store, specialty market, and cultural food source discovery with cultural filtering
- **Government Data**: USDA API for food composition, farmer markets, seasonal produce, and nutritional guidelines
- **Enhanced Multi-Tier Pricing System**: EnhancedPricingService with Perplexity AI primary, Kroger API fallback, basic estimates, confidence scoring, and automatic health monitoring
- **Voice Interface**: Complete multilingual voice command system for hands-free cooking assistance and navigation
- **Cultural Research**: Tavily API integration for cultural food research and authenticity validation with hooks system
- **AI Services**: Amazon Bedrock with Claude 3.5 Sonnet for culturally-aware meal planning and recipe analysis

### Infrastructure & Performance
- **Caching**: Redis for API response caching and performance optimization
- **Reliability**: Circuit breaker patterns, rate limiting, and health monitoring with fallback services
- **Error Handling**: Production-ready error boundaries with graceful degradation and user recovery options
- **Testing**: Jest, React Testing Library, accessibility testing, and cultural authenticity validation
- **Deployment**: Vercel with automatic deployments and environment management
- **Monitoring**: Built-in error tracking, performance monitoring, and API usage analytics
- **Database**: Supabase PostgreSQL with Row Level Security and cultural metadata support
- **Enhanced Multi-Tier Pricing**: EnhancedPricingService with Perplexity AI primary, Kroger API fallback, basic estimates, and health monitoring for 99.9% coverage

## Project Structure

```
platewise/
├── .kiro/                         # Kiro AI development configuration
│   ├── specs/plate-wise/          # Project specifications
│   │   ├── requirements.md        # Detailed requirements (22 sections)
│   │   ├── design.md             # Technical design document
│   │   └── tasks.md              # Implementation plan (45 tasks)
│   ├── settings/                 # Development settings
│   │   └── mcp.json              # Model Context Protocol configuration
│   └── steering/                 # Development guidelines
│       ├── platewise-development-standards.md
│       ├── cultural-authenticity-guide.md
│       └── api-integration-patterns.md
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── auth/                 # Authentication flows
│   │   │   ├── callback/         # OAuth callback handling
│   │   │   ├── confirm/          # Email confirmation
│   │   │   ├── reset-password/   # Password reset flow
│   │   │   └── page.tsx          # Main auth page
│   │   ├── dashboard/            # Main application dashboard
│   │   ├── profile/              # Profile management & setup
│   │   │   ├── setup/            # Profile setup wizard
│   │   │   └── manage/           # Profile management
│   │   ├── recipes/              # Recipe browsing and management
│   │   │   └── [id]/             # Individual recipe pages
│   │   ├── budget/               # Budget tracking pages
│   │   ├── shopping/             # Shopping list management
│   │   ├── meal-plans/           # Meal planning interface
│   │   ├── help/                 # Help and support pages
│   │   ├── debug/                # Debug and development tools
│   │   │   ├── page.tsx          # Debug dashboard with pricing fallback testing
│   │   │   └── components/       # Debug components (RecipeDebug, PricingFallbackTest)
│   │   ├── api/                  # Next.js API routes
│   │   │   ├── kroger/           # Kroger API integration endpoints
│   │   │   │   └── locations/    # Store location services
│   │   │   ├── pricing/          # Enhanced multi-tier pricing and cost analysis
│   │   │   │   ├── alternatives/ # Alternative ingredient pricing with confidence scoring
│   │   │   │   ├── enhanced/     # EnhancedPricingService with Perplexity primary, Kroger fallback, and health monitoring
│   │   │   │   ├── ingredients/  # Ingredient price lookup with AI-powered product matching
│   │   │   │   └── route.ts      # Main pricing API endpoint with multi-tier fallback and explanations
│   │   │   ├── recipes/          # Recipe management endpoints
│   │   │   │   └── import/       # Recipe import and parsing
│   │   │   ├── recommendations/  # AI-powered recommendation endpoints
│   │   │   └── search/           # Search functionality endpoints
│   │   │       └── tavily/       # Tavily search integration for cultural research
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components (SignIn, SignUp, ForgotPassword)
│   │   ├── dashboard/            # Dashboard bento cards and recommendations
│   │   ├── debug/                # Debug components (RecipeDebug, PricingFallbackTest, API testing)
│   │   │   ├── RecipeDebug.tsx   # Recipe system testing and debugging
│   │   │   └── PricingFallbackTest.tsx # Interactive EnhancedPricingService testing with real-time health monitoring and fallback validation
│   │   ├── landing/              # Landing page components (LandingPage, LoadingScreen)
│   │   ├── layout/               # Layout and navigation (AppLayout, MainNavigation)
│   │   ├── profile/              # Profile setup wizard (7 steps) and management
│   │   │   ├── steps/            # Individual setup steps
│   │   │   └── __tests__/        # Component tests
│   │   ├── recipes/              # Recipe components (cards, forms, search, scaling, recommendations, pricing)
│   │   │   ├── EnhancedPricingPanel.tsx # Enhanced multi-tier pricing dashboard with health monitoring
│   │   │   ├── GroceryPricing.tsx    # AI-powered grocery pricing with confidence scoring
│   │   │   ├── PricingPanel.tsx      # Interactive pricing dashboard
│   │   │   ├── RecipeInputModal.tsx  # Multi-method recipe input (text, URL, voice, photo)
│   │   │   ├── SpoonacularSearch.tsx # Spoonacular API integration
│   │   │   └── TavilySearch.tsx      # Cultural research integration
│   │   ├── bento/                # Bento grid system components
│   │   ├── navigation/           # Navigation components (Breadcrumb)
│   │   ├── ui/                   # Reusable UI components (Button, Logo, ThemeSwitcher)
│   │   ├── ErrorBoundary.tsx     # Production-ready error boundary with user recovery options
│   │   └── Providers.tsx         # Centralized context providers for app-wide state
│   ├── contexts/                 # React contexts (Auth, Theme)
│   ├── hooks/                    # Custom React hooks (useAuth, useProfileSetup, useProfileTheme, useTavily, useEnhancedPricing)
│   ├── lib/                      # Core services and utilities
│   │   ├── ai/                   # Amazon Bedrock AI service with Claude 3.5 Sonnet
│   │   ├── auth/                 # Authentication helpers and configuration
│   │   ├── external-apis/        # External API integrations (9+ services)
│   │   │   ├── enhanced-pricing-service.ts # Multi-tier pricing service with Perplexity primary and Kroger fallback
│   │   │   ├── perplexity-service.ts # Primary AI-powered grocery pricing service
│   │   │   ├── kroger-service.ts # Kroger Catalog API v2 fallback with advanced product matching
│   │   │   ├── kroger-catalog-v2.ts # Enhanced Kroger integration with confidence scoring
│   │   │   ├── kroger-matching.ts # Intelligent product matching algorithms
│   │   │   ├── spoonacular-service.ts # Recipe database API
│   │   │   ├── elevenlabs-service.ts # Voice synthesis with cultural pronunciation
│   │   │   ├── google-places-service.ts # Store discovery with cultural filtering
│   │   │   ├── usda-service.ts   # Government food data and farmer markets
│   │   │   ├── tavily-service.ts # Cultural research and authenticity validation

│   │   │   ├── location-service.ts # Unified location services
│   │   │   ├── voice-interface.ts # Voice command system
│   │   │   └── price-comparison.ts # Advanced price analysis
│   │   ├── profile/              # Profile management services
│   │   ├── recipes/              # Recipe management services
│   │   │   ├── recipe-service.ts # Core recipe operations with CRUD
│   │   │   ├── recipe-database-service.ts # Database operations with RLS
│   │   │   ├── recipe-database-service-fix.ts # Enhanced database operations
│   │   │   ├── recipe-scaling-service.ts # Intelligent ingredient scaling
│   │   │   ├── recipe-analysis-service.ts # Cultural authenticity analysis
│   │   │   ├── recipe-recommendations-service.ts # AI-powered recommendations
│   │   │   └── html-recipe-parser.ts # Recipe parsing from HTML/text
│   │   ├── supabase/             # Supabase client configuration
│   │   ├── themes/               # Cultural theme system
│   │   ├── favicon/              # Favicon management
│   │   └── recommendations/      # AI recommendation services
│   ├── styles/                   # Global styles and cultural themes
│   ├── types/                    # Comprehensive TypeScript definitions
│   └── utils/                    # Utility functions and constants
├── public/                       # Static assets
│   ├── assets/                   # Images, logos, icons
│   │   ├── logo/                 # PlateWise branding assets
│   │   ├── images/               # Cultural food imagery
│   │   └── illustrations/        # UI illustrations
│   └── site.webmanifest          # PWA configuration
├── scripts/                      # Development scripts
├── supabase-schema.sql           # Complete database schema
└── Configuration files           # Next.js, Tailwind, ESLint, etc.
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- AWS account (for Bedrock)

### Environment Variables
Create a `.env.local` file with the following variables:

```bash
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Amazon Bedrock Configuration (Required for AI features)
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# External API Keys (Optional for enhanced features)
# Enhanced Multi-Tier Pricing APIs
PERPLEXITY_API_KEY=your_perplexity_api_key        # Primary AI-powered pricing service for EnhancedPricingService
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret    # Fallback pricing service for EnhancedPricingService

# Recipe & Nutrition APIs
RAPIDAPI_KEY=your_rapidapi_key                    # For Spoonacular access via RapidAPI
SPOONACULAR_API_KEY=your_spoonacular_api_key      # Alternative direct access (deprecated)
USDA_API_KEY=your_usda_nutrition_api_key          # USDA FoodData Central

# Voice & Location APIs
ELEVENLABS_API_KEY=your_elevenlabs_api_key        # Voice synthesis
GOOGLE_PLACES_API_KEY=your_google_places_api_key  # Store discovery
TAVILY_API_KEY=your_tavily_api_key                # Cultural research (optional)

# Performance & Caching (Optional)
REDIS_URL=redis://localhost:6379

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Development Flags (Optional)
NEXT_PUBLIC_TAVILY_MOCK=false                     # Set to true to use mock data for Tavily API
USE_KROGER_CATALOG_V2=true                        # Set to true to use Kroger Catalog API v2 with advanced product matching (recommended)
ENABLE_ENHANCED_PRICING=true                      # Set to true to use EnhancedPricingService with multi-tier fallback (recommended)
ENABLE_PRICING_DEBUG=true                         # Set to true to enable detailed pricing debug logs and EnhancedPricingService testing interface
```

**Note**: Copy `.env.example` to `.env.local` and update with your actual API keys. The application will work with just Supabase and AWS Bedrock credentials for core functionality. External API keys enable enhanced features:

- **Perplexity API**: Primary AI-powered pricing service for the EnhancedPricingService with real-time web price aggregation from major grocery stores
- **Kroger API**: Fallback pricing service for the EnhancedPricingService with advanced product matching, confidence scoring, and coupon integration
- **Spoonacular API**: Expanded recipe database and nutritional data (use RAPIDAPI_KEY for best results)
- **ElevenLabs API**: Multilingual voice synthesis and commands with cultural pronunciation guides
- **Google Places API**: Local store discovery and specialty market finding with cultural filtering
- **USDA API**: Government nutrition data and farmer market information
- **Tavily API**: Cultural food research and authenticity validation with hooks integration

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd platewise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Configure authentication providers
   - Set up Row Level Security policies

4. **Configure AWS Bedrock**
   - Set up AWS credentials with Bedrock access
   - Enable Claude 3.5 Sonnet model access in your AWS region
   - Ensure proper IAM permissions for Bedrock runtime

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to `http://localhost:3000`

7. **Test enhanced pricing system (optional)**
   Navigate to `http://localhost:3000/debug` to access the PricingFallbackTest component and test the EnhancedPricingService with real-time health monitoring

## 🛠️ Development & Testing Tools

PlateWise includes comprehensive development and testing tools to ensure reliability and performance of all features, especially the complex pricing and AI systems.

### Debug Dashboard
Access the debug dashboard at `/debug` to test and monitor various system components:

- **PricingFallbackTest** - Interactive testing of the EnhancedPricingService
  - Test complete multi-tier pricing with Perplexity primary, Kroger fallback, and basic estimates
  - Monitor real-time health status of Perplexity and Kroger services
  - View confidence scores and automatic fallback behavior
  - Add/remove ingredients dynamically with live updates
  - Test different locations and store availability
  - View detailed API response logs, error handling, and service health metrics

- **RecipeDebug** - Comprehensive recipe system testing
  - Test recipe creation, parsing, and database operations
  - Monitor authentication flows and user permissions
  - Debug cultural authenticity scoring algorithms
  - Test recipe scaling and cost calculations

### Enhanced Pricing System Testing
The PricingFallbackTest component provides a complete testing interface for the EnhancedPricingService:

1. **Multi-Tier Testing** - Test the complete EnhancedPricingService with Perplexity AI primary, Kroger API fallback, and basic estimates
2. **Health Monitoring** - Real-time health checks for Perplexity and Kroger services with automatic failover detection
3. **Confidence Scoring** - Monitor pricing confidence levels (0-100%) across all pricing tiers with detailed source attribution
4. **Fallback Behavior** - Verify automatic fallback from Perplexity → Kroger → Basic estimates with transparent reporting
5. **Multi-Location Support** - Test pricing across different ZIP codes and cities with location-aware results
6. **Real-time Updates** - See live pricing updates, API response times, fallback behavior, and service health status

### API Health Monitoring
- Circuit breaker status for all external APIs
- Real-time health monitoring for EnhancedPricingService (Perplexity and Kroger services)
- Rate limiting and usage statistics
- Cache hit/miss ratios and performance metrics
- Cultural authenticity validation results
- Pricing confidence scores and fallback behavior tracking

## 🎨 Design Philosophy

PlateWise uses a modern **bento-style design system** with bold, culturally-inspired color palettes that celebrate the diversity of global cuisines. The interface dynamically adapts to different cultural themes while maintaining accessibility and usability standards.

### Bento Grid System
- **Responsive Cards** - Flexible grid layout that adapts to content
- **Cultural Theming** - Dynamic color schemes and patterns
- **Accessibility First** - WCAG 2.1 AA compliance with proper contrast ratios
- **Mobile Optimized** - Touch-friendly interface with gesture support

### Cultural Themes
- **Mediterranean** - Warm oranges and greens with olive branch patterns (#E67E22, #27AE60)
- **Asian** - Bold reds and purples with geometric elements (#E74C3C, #8E44AD)
- **Latin American** - Vibrant corals and teals with textile patterns (#FF6B6B, #4ECDC4)
- **African** - Earth tones with traditional geometric designs (#D35400, #F1C40F)
- **Middle Eastern** - Rich purples and golds with arabesque patterns (#8E44AD, #E67E22)

### Typography & Branding
- **Primary Font** - Fredoka for headings (playful, approachable)
- **Body Font** - Inter for content (readable, professional)
- **Cultural Adaptation** - Right-to-left language support
- **Logo System** - Adaptive logo with cultural color variations

## 🤖 AI-Powered Features

PlateWise leverages Amazon Bedrock with Claude 3.5 Sonnet to provide intelligent, culturally-aware meal planning and recipe analysis:

### Core AI Capabilities
- **Intelligent Meal Planning** - Generate personalized meal plans respecting cultural preferences and budget constraints
- **Cultural Authenticity Analysis** - Score recipes for traditional accuracy (1-10 scale) and suggest preservation methods
- **Smart Ingredient Substitutions** - Recommend culturally-appropriate alternatives with cost and authenticity impact analysis
- **Recipe Intelligence** - Parse recipes from text, photos, or voice input with cultural context and authenticity classification
- **Budget Optimization** - AI-driven cost reduction strategies while maintaining cultural authenticity and nutritional goals
- **Multi-language Translation** - Preserve cultural context and culinary terminology across languages
- **Product Matching Intelligence** - AI-powered ingredient-to-product matching with confidence scoring and explanations
- **Real-time Pricing Intelligence** - Multi-tier pricing system with Perplexity AI fallback for comprehensive grocery price coverage
- **Confidence-Based Decision Making** - All AI recommendations include confidence scores to help users make informed decisions

### AI Service Architecture
- **Circuit Breaker Pattern** - Graceful handling of AI service failures with automatic recovery
- **Rate Limiting** - Intelligent request management to prevent API abuse and optimize costs
- **Caching Strategy** - Optimize AI response times and reduce costs with cultural context preservation
- **Cultural Prompting** - Specialized prompts that include cultural context and authenticity requirements
- **Fallback Systems** - Ensure application functionality even when AI services are unavailable
- **Confidence Scoring** - AI-powered confidence metrics for product matching and recipe analysis
- **Error Recovery** - Comprehensive error handling with meaningful user feedback and alternative suggestions
- **Multi-AI Integration** - Perplexity AI for real-time pricing fallback with web search capabilities

## 💰 Advanced Pricing Integration

PlateWise features a sophisticated real-time pricing system that provides accurate cost analysis while maintaining cultural authenticity:

### Kroger Catalog API v2 Integration
- **Advanced Product Matching** - Intelligent algorithms match recipe ingredients to grocery products with confidence scoring
- **Confidence Scoring System** - Each product match includes a confidence score (0-1) with detailed explanations
- **Alternative Suggestions** - AI-powered alternative product recommendations when primary matches have low confidence
- **Detailed Match Explanations** - Understand why products were matched, including category alignment, title similarity, and size proximity
- **Cultural Context Preservation** - Maintain ingredient authenticity while finding the best product matches
- **Real-time Price Updates** - Live pricing data with store-specific availability and promotional information

### Perplexity AI Fallback Pricing
- **Intelligent Fallback System** - Automatically switches to Perplexity AI when Kroger API is unavailable or lacks pricing data
- **Real-time Web Search** - Leverages current grocery store websites and pricing information across major retailers
- **Confidence-Based Pricing** - Each price estimate includes confidence scoring based on source reliability and recency
- **Multi-Store Coverage** - Searches across Walmart, Target, Kroger, Safeway, Instacart, and other major grocery retailers
- **Structured Price Data** - Returns standardized pricing information with store names, units, and explanatory notes
- **Graceful Degradation** - Falls back to estimated pricing when all external services are unavailable
- **Interactive Testing Interface** - PricingFallbackTest component allows developers to test the complete fallback system with real ingredients

### Pricing Intelligence Features
- **Multi-Store Comparison** - Compare prices across different store locations with distance optimization
- **Budget Impact Analysis** - Real-time calculation of recipe costs with per-serving breakdowns
- **Seasonal Price Trends** - Historical pricing data to identify optimal buying times
- **Bulk Buying Recommendations** - Suggest bulk purchases when cost-effective with expiration considerations
- **Coupon Integration** - Automatic coupon discovery and savings calculations
- **Shopping List Optimization** - Generate optimized shopping lists with route planning and cost minimization
- **Intelligent Fallback Pricing** - Perplexity AI provides current grocery prices from major retailers when primary APIs fail
- **Developer Testing Tools** - Interactive components for testing pricing accuracy and fallback behavior across different scenariosail
- **Service Reliability** - Multiple pricing sources ensure 99.9% availability with graceful degradation

## 📚 Recipe Management System

PlateWise includes a comprehensive recipe management system with full CRUD operations, cultural authenticity tracking, intelligent scaling capabilities, and real-time pricing integration:

### Core Database Features
- **Advanced Recipe CRUD** - Create, read, update, and delete recipes with proper authorization and RLS security
- **Cultural Authenticity Engine** - AI-powered classification system for traditional, adapted, inspired, and fusion recipes with 1-10 scoring
- **Smart Recipe Collections** - Organize recipes into custom collections with cultural themes, privacy controls, and sharing capabilities
- **Multi-dimensional Search** - Advanced filtering by culture, cuisine, difficulty, cooking time, authenticity level, dietary restrictions, and cost
- **Community Rating System** - Multi-dimensional ratings for taste, cost-effectiveness, cultural authenticity, and difficulty level
- **Intelligent Recipe Scaling** - Dynamic ingredient scaling with proper unit conversions and cultural context preservation
- **Real-time Cost Integration** - Live cost calculations with multi-store price comparisons, confidence scoring, and budget impact analysis
- **Advanced Product Matching** - Kroger Catalog API v2 integration with intelligent product matching and alternative suggestions
- **Developer Debug Tools** - Comprehensive debugging components for recipe operations, authentication, and database interactions

### Recipe Components Architecture
- **RecipeCard** - Beautiful recipe display with cultural theming, cost analysis, and authenticity indicators
- **RecipeForm** - Comprehensive recipe creation and editing interface with cultural context validation and real-time pricing
- **RecipeSearch** - Advanced search with cultural, dietary, authenticity filters, and AI-powered suggestions
- **RecipeList** - Responsive bento grid layout with infinite scroll, cultural categorization, and performance optimization
- **RecipeScaling** - Interactive ingredient scaling with intelligent unit conversion and cultural technique preservation
- **RecipeInputModal** - Multi-method recipe input (text, URL, voice, photo) with AI parsing and cultural classification
- **RecipeRecommendations** - AI-powered suggestions based on cultural preferences, budget constraints, and nutritional goals
- **GroceryPricing** - Real-time grocery pricing component with confidence scoring, product matching explanations, and alternative suggestions
- **PricingPanel** - Interactive pricing dashboard for ingredient cost tracking, budget optimization, and store comparison
- **SpoonacularSearch** - Integration with Spoonacular API for extensive recipe database access with cultural filtering
- **TavilySearch** - Cultural food research and authenticity validation through Tavily API with hooks integration
- **RecipeDebug** - Production-ready debugging tool for recipe operations, authentication flows, database interactions, and pricing analysis

### Cultural Intelligence Features
- **Authenticity Classification** - AI-powered categorization with cultural significance analysis and preservation recommendations
- **Cultural Context Engine** - Historical background, traditional occasions, and cultural significance documentation
- **Regional Variation Support** - Multiple authentic versions of dishes with geographic and family tradition variations
- **Ingredient Impact Tracking** - Monitor and analyze cultural impact of ingredient substitutions with AI guidance
- **Traditional Method Preservation** - Document and preserve traditional cooking techniques with video and audio guides
- **Cultural Expert Integration** - Community validation system for cultural accuracy and authenticity verification

## 🛡️ Error Handling & Reliability

PlateWise is built with production-ready reliability and comprehensive error handling:

### Error Boundary System
- **React Error Boundaries** - Catch and handle component errors gracefully without crashing the entire application
- **User-Friendly Recovery** - Clear error messages with actionable recovery options (refresh, retry, navigate)
- **Development Debugging** - Detailed error information and stack traces in development mode
- **Graceful Degradation** - Application continues to function even when individual components fail
- **Error Reporting** - Comprehensive error logging for monitoring and debugging

### Service Reliability
- **Circuit Breaker Pattern** - Automatic failover for external API failures with intelligent retry logic
- **Fallback Systems** - Alternative data sources and cached responses when services are unavailable
- **Health Monitoring** - Real-time monitoring of all external services with automatic recovery
- **Rate Limiting** - Intelligent request throttling to prevent API abuse and ensure service stability
- **Timeout Handling** - Proper timeout management for all external API calls with user feedback

## 🌍 Cultural Sensitivity

PlateWise is built with deep respect for cultural food traditions. Our development follows strict guidelines to:

- **Preserve Authenticity** - Traditional recipes are treated as cultural heritage
- **Provide Context** - Cultural significance and history are included with AI analysis
- **Support Diversity** - Accommodate various dietary restrictions and cultural preferences
- **Promote Learning** - Encourage respectful cultural exchange through AI-powered education
- **Community Oversight** - Cultural communities review AI-generated content for accuracy
- **AI Validation** - All AI suggestions undergo cultural authenticity verification

## 🔌 API Integrations

PlateWise integrates with 8+ external services through a robust, production-ready API layer:

### Grocery & Shopping Intelligence
- **Kroger Catalog API v2** - Real-time product pricing, availability, coupon integration, and store location services with advanced product matching algorithms
- **Intelligent Product Matching** - Confidence scoring system with detailed explanations for ingredient-to-product matching accuracy
- **Alternative Product Suggestions** - AI-powered alternative product recommendations with cost and cultural impact analysis
- **Google Places API** - Grocery store and specialty market discovery with cultural filtering and distance optimization
- **Advanced Price Comparison** - Multi-store price analysis with route optimization, fuel cost calculations, and savings projections
- **Unified Location Service** - Integrated local food sourcing combining Google Places and USDA farmer market data

### Recipe & Nutrition Intelligence
- **Spoonacular API** - Extensive recipe database (1M+ recipes) with cultural cuisine filtering and nutritional analysis
- **USDA FoodData Central** - Government food composition, nutritional data, and dietary guidelines integration
- **Internal Recipe Engine** - Comprehensive CRUD operations with cultural authenticity tracking and AI analysis
- **Tavily Research API** - Cultural food research and authenticity validation (optional integration)

### AI & Voice Services
- **Amazon Bedrock** - Claude 3.5 Sonnet integration for culturally-aware meal planning and recipe analysis
- **ElevenLabs API** - Multi-language text-to-speech with cultural pronunciation guides and voice command processing
- **Voice Interface System** - Complete multilingual voice command system for hands-free cooking assistance and navigation
- **AI Health Monitoring** - Intelligent service availability checking with automatic fallbacks and circuit breakers

### Production-Ready Service Architecture
- **Circuit Breaker Pattern** - Automatic failover for unreliable APIs with exponential backoff and health monitoring
- **Intelligent Rate Limiting** - Request throttling with usage statistics, quota management, and cost optimization
- **Redis Caching Layer** - High-performance caching with cultural context preservation and intelligent TTL management
- **Graceful Error Recovery** - Comprehensive error handling with meaningful user feedback and service degradation
- **API Health Dashboard** - Unified health checking across all external services with real-time monitoring
- **Configuration Validation** - Automatic API key validation and service availability verification
- **Service Reliability** - 99.9% uptime target with redundancy and intelligent failover mechanisms
- **Cost Optimization** - API usage monitoring, caching strategies, and intelligent request batching
- **Security Standards** - Secure API key management, request validation, and data encryption
- **Advanced Product Matching** - Kroger Catalog v2 with confidence scoring, explanation system, and alternative suggestions
- **Cultural Context Preservation** - Maintain cultural authenticity throughout all API integrations and data transformations

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests (when implemented)
npm run test:e2e

# Test cultural authenticity features
npm run test:cultural

# Test recipe management system
npm run test:recipes

# Test API integrations (requires API keys)
npm run test:integration

# Test external API health and circuit breakers
npm run test:api-health

# Test voice integration and local services
npm run test:voice

# Test MCP (Model Context Protocol) integrations
npm run test:mcp

# Test error boundaries and error handling
npm run test:error-handling
```

### Testing Standards
- **Unit Tests** - 80%+ coverage for business logic, AI integration, recipe management, and cultural authenticity algorithms
- **Cultural Validation** - Community-driven testing for cultural authenticity features and traditional recipe accuracy
- **API Integration Testing** - Comprehensive testing with mocked external services, circuit breaker validation, and error handling
- **Recipe System Testing** - Full CRUD operations, cultural authenticity scoring, scaling algorithms, and cost calculations
- **Voice & Audio Testing** - ElevenLabs integration testing for multilingual text-to-speech and voice command processing
- **End-to-End Testing** - Complete user workflows from authentication through meal planning and shopping
- **Accessibility Testing** - WCAG 2.1 AA compliance verification with screen reader and keyboard navigation testing
- **Performance Testing** - Lighthouse scores >90 Performance, >95 Accessibility with real-world load testing
- **Security Testing** - Authentication flows, RLS policies, API key security, and data protection validation
- **MCP Testing** - Model Context Protocol integration testing for AI service reliability and fallback mechanisms
- **Error Boundary Testing** - Comprehensive error handling validation with graceful degradation and user recovery flows

## 📚 Development Guidelines

### Code Standards
- **TypeScript** - Strict type checking enabled
- **ESLint** - Configured for Next.js and accessibility
- **Prettier** - Consistent code formatting
- **Cultural Sensitivity** - Follow authenticity guidelines
- **Performance** - Lighthouse scores >90 (Performance), >95 (Accessibility)
- **Error Boundaries** - Production-ready error handling with graceful degradation
- **State Management** - Centralized providers for consistent app-wide state

### API Integration Patterns
- **Error Handling** - Comprehensive retry logic with exponential backoff and circuit breakers
- **Caching Strategy** - Redis-based caching with intelligent TTL management and cultural context preservation
- **Rate Limiting** - Respect API limits with usage statistics and intelligent throttling
- **Cultural Context** - Include cultural information in all AI prompts and recipe analysis
- **Service Reliability** - Circuit breaker patterns with health monitoring and automatic failover
- **Data Normalization** - Consistent data formats across different APIs with cultural metadata preservation
- **Voice Integration** - Multi-language voice commands with cultural pronunciation support
- **Location Services** - Unified local food sourcing with specialty market discovery
- **Price Optimization** - Real-time price comparison with route optimization and coupon integration
- **Recipe Management** - Comprehensive CRUD operations with cultural authenticity scoring and scaling
- **Error Recovery** - User-friendly error boundaries with retry mechanisms and fallback options

## 🚀 Deployment

The application is configured for deployment on Vercel with automatic deployments:

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel deploy

# Deploy to production
vercel --prod
```

### Environment Configuration
- Set all required environment variables in Vercel dashboard
- Configure AWS credentials for Bedrock access
- Set up Supabase production database
- Configure Redis instance for caching (optional)

### Performance Optimization
- Automatic image optimization with Next.js
- API response caching with Redis
- Static asset optimization
- Cultural theme CSS optimization

## 🤝 Contributing

This project prioritizes cultural sensitivity and authenticity. Contributors should:

1. **Read Guidelines** - Review cultural authenticity guidelines in `.kiro/steering/`
2. **Follow Standards** - Adhere to development standards for code quality and cultural sensitivity
3. **Test Thoroughly** - Test cultural features with community members when possible
4. **Respect Heritage** - Honor traditional knowledge and provide proper attribution
5. **AI Integration** - Follow established patterns for AI service integration
6. **Accessibility** - Ensure all features meet WCAG 2.1 AA standards

### Development Workflow
1. Fork the repository and create a feature branch
2. Follow TypeScript strict mode and ESLint rules
3. Write comprehensive tests for new features (including recipe management and API integrations)
4. Test cultural authenticity features with appropriate communities
5. Validate external API integrations with proper error handling and circuit breakers
6. Test recipe CRUD operations and cultural authenticity scoring
7. Test voice integration and local store discovery features
8. Submit pull request with detailed description and cultural impact assessment

### Cultural Review Process
- All cultural content undergoes community review
- AI-generated content is validated for cultural accuracy
- Traditional recipes require cultural expert consultation
- Ingredient substitutions must maintain cultural authenticity

## 📄 License

[License to be determined]

## 📈 Roadmap

### Current Phase (Q1 2025) - Production Ready Core
- ✅ **Complete Authentication System** - Supabase Auth with email confirmation, password reset, and OAuth
- ✅ **Advanced AI Integration** - Amazon Bedrock with Claude 3.5 Sonnet for cultural meal planning
- ✅ **Cultural Design System** - 5 dynamic themes with bento grid layout and accessibility compliance
- ✅ **Production Recipe System** - Full CRUD operations with cultural authenticity scoring and scaling
- ✅ **Robust API Layer** - 8+ external service integrations with circuit breakers and health monitoring
- ✅ **Cultural Authenticity Engine** - AI-powered cultural analysis and preservation recommendations
- ✅ **Multilingual Voice System** - ElevenLabs integration with cultural pronunciation guides
- ✅ **Local Food Discovery** - Google Places and USDA integration for stores and farmer markets
- ✅ **Developer Tools** - Comprehensive debugging, MCP integration, and development utilities
- 🔄 **AI Meal Planning** - Advanced meal plan generation with cultural balance and budget optimization
- 🔄 **Smart Shopping Lists** - AI-powered shopping optimization with store integration and route planning

### Next Phase (Q2 2025) - Advanced Features
- 📋 **Complete Meal Planning Workflow** - AI-optimized meal plans with cultural balance and budget constraints
- 📋 **Advanced Budget Tracking** - Real-time price monitoring, spending analysis, and savings recommendations
- 📋 **Community Platform** - Recipe sharing, cultural validation, and social features with expert review system
- 📋 **Mobile Application** - Native iOS/Android apps with offline capabilities and voice integration
- 📋 **Enhanced Voice Assistant** - Advanced cooking guidance, timer management, and hands-free navigation
- 📋 **Cultural Expert Network** - Professional chef and cultural expert validation system for authenticity

### Future Enhancements (Q3-Q4 2025)
- 📋 **Professional Partnerships** - Nutritionist and cultural expert collaboration platform
- 📋 **Cultural Calendar Integration** - Festival and holiday meal planning with traditional recipes
- 📋 **Family Heritage Tools** - Recipe preservation, family story documentation, and tradition sharing
- 📋 **Video Integration** - Cooking technique videos with cultural context and traditional methods
- 📋 **Social Exchange Platform** - Cultural food exchange, cooking classes, and community events
- 📋 **AI Recipe Generation** - Create new recipes based on cultural traditions and dietary preferences
- 📋 **Sustainability Features** - Food waste reduction, seasonal eating, and environmental impact tracking

## 📞 Support & Community

- **Documentation** - Comprehensive guides in `.kiro/specs/`
- **Cultural Guidelines** - Authenticity standards in `.kiro/steering/`
- **Issues** - Report bugs and request features via GitHub Issues
- **Discussions** - Community discussions for cultural food topics
- **Cultural Review** - Community-driven content validation process

---

**PlateWise** - Preserving culinary heritage while optimizing food budgets through intelligent AI technology.

*Built with respect for cultural traditions and powered by cutting-edge AI to make authentic, budget-friendly cooking accessible to everyone.*