# PlateWise 🍽️

A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.

## Overview

PlateWise combines advanced cost analysis, cultural heritage preservation, nutritional optimization, and community features to create a holistic meal planning and grocery shopping experience. The platform uses Amazon Bedrock AI to generate personalized meal plans that respect cultural authenticity while staying within budget constraints, integrated with comprehensive external APIs for real-time pricing, recipe discovery, and cultural food research.

## 🚀 Current Status

PlateWise has reached a significant milestone with a comprehensive foundation and production-ready features:

- ✅ **Complete Authentication System** - Supabase Auth with email confirmation, password reset, OAuth callbacks, and secure session management
- ✅ **Advanced Profile Setup** - 7-step cultural onboarding wizard with personal info, cultural preferences, dietary restrictions, budget settings, nutritional goals, cooking profile, and comprehensive review
- ✅ **Production Database** - Full PostgreSQL schema with Row Level Security, cultural metadata support, and optimized queries
- ✅ **Cultural Design System** - Bento-style UI with 5 dynamic cultural themes, responsive grid system, and accessibility compliance
- ✅ **Modern Landing Experience** - Responsive design with cultural imagery, theme switching, and optimized performance
- ✅ **AI-Powered Intelligence** - Amazon Bedrock integration with Claude 3.5 Sonnet for culturally-aware meal planning and recipe analysis
- ✅ **Comprehensive API Layer** - 8 integrated external services with circuit breakers, rate limiting, caching, and health monitoring
- ✅ **Advanced Recipe Management** - Full CRUD operations, cultural authenticity scoring, intelligent scaling, cost analysis, and community features
- ✅ **Multilingual Voice Integration** - ElevenLabs text-to-speech with cultural pronunciation guides and voice command system
- ✅ **Local Food Discovery** - Google Places and USDA integration for grocery stores, specialty markets, and farmer markets
- ✅ **Smart Price Comparison** - Kroger API integration with real-time pricing, coupon discovery, and shopping optimization
- ✅ **Developer Tools** - Comprehensive debugging components, MCP integration, and development utilities
- ✅ **Cultural Authenticity Engine** - AI-powered cultural context analysis and preservation recommendations
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
- **Amazon Bedrock Integration** - Claude 3.5 Sonnet for intelligent meal planning with cultural context
- **Cultural Authenticity Engine** - AI-powered scoring, preservation recommendations, and traditional technique analysis
- **Smart Ingredient Substitutions** - Culturally-appropriate alternatives with cost and authenticity impact analysis
- **Recipe Intelligence** - Extract and parse recipes from text, photos, or voice input with cultural classification
- **Budget Optimization AI** - Cost reduction strategies while maintaining cultural authenticity and nutritional goals
- **Multi-language Translation** - Preserve cultural context and culinary terminology across languages
- **Voice Command System** - ElevenLabs integration with multilingual support and cultural pronunciation guides
- **Robust Service Architecture** - Circuit breakers, rate limiting, health monitoring, and intelligent fallbacks
- **Recipe Analysis Engine** - Comprehensive CRUD operations with cultural authenticity scoring and scaling algorithms

### 🏪 Local Store Discovery & Shopping
- **Intelligent Store Finder** - Google Places integration with cultural specialty filtering and distance optimization
- **Real-time Price Comparison** - Multi-store price analysis with route optimization and fuel cost calculations
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

### External Integrations
- **Grocery & Shopping APIs**: Kroger Catalog API for real-time pricing, product availability, and coupon integration
- **Recipe Discovery**: Spoonacular API for extensive recipe database with cultural cuisine filtering and nutritional data
- **Voice & Audio Services**: ElevenLabs API for multilingual text-to-speech with cultural pronunciation guides and voice commands
- **Location & Maps**: Google Places API for grocery store, specialty market, and cultural food source discovery
- **Government Data**: USDA API for food composition, farmer markets, seasonal produce, and nutritional guidelines
- **Price Intelligence**: Multi-store price comparison with route optimization and savings calculations
- **Voice Interface**: Complete multilingual voice command system for hands-free cooking assistance and navigation
- **Cultural Research**: Tavily API integration for cultural food research and authenticity validation (optional)

### Infrastructure & Performance
- **Caching**: Redis for API response caching and performance optimization
- **Reliability**: Circuit breaker patterns, rate limiting, and health monitoring
- **Testing**: Jest, React Testing Library, accessibility testing, and cultural authenticity validation
- **Deployment**: Vercel with automatic deployments and environment management
- **Monitoring**: Built-in error tracking, performance monitoring, and API usage analytics
- **Database**: Supabase PostgreSQL with Row Level Security and cultural metadata support

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
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components (SignIn, SignUp, ForgotPassword)
│   │   ├── dashboard/            # Dashboard bento cards and recommendations
│   │   ├── debug/                # Debug components (RecipeDebug, API testing)
│   │   ├── landing/              # Landing page components (LandingPage, LoadingScreen)
│   │   ├── layout/               # Layout and navigation (AppLayout, MainNavigation)
│   │   ├── profile/              # Profile setup wizard (7 steps) and management
│   │   │   ├── steps/            # Individual setup steps
│   │   │   └── __tests__/        # Component tests
│   │   ├── recipes/              # Recipe components (cards, forms, search, scaling, recommendations)
│   │   ├── bento/                # Bento grid system components
│   │   ├── navigation/           # Navigation components (Breadcrumb)
│   │   └── ui/                   # Reusable UI components (Button, Logo, ThemeSwitcher)
│   ├── contexts/                 # React contexts (Auth, Theme)
│   ├── hooks/                    # Custom React hooks (useAuth, useProfileSetup, useProfileTheme)
│   ├── lib/                      # Core services and utilities
│   │   ├── ai/                   # Amazon Bedrock AI service with Claude 3.5 Sonnet
│   │   ├── auth/                 # Authentication helpers and configuration
│   │   ├── external-apis/        # External API integrations (8 services)
│   │   │   ├── kroger-service.ts # Kroger API integration
│   │   │   ├── spoonacular-service.ts # Recipe database API
│   │   │   ├── elevenlabs-service.ts # Voice synthesis
│   │   │   ├── google-places-service.ts # Store discovery
│   │   │   ├── usda-service.ts   # Government food data
│   │   │   ├── tavily-service.ts # Cultural research
│   │   │   ├── location-service.ts # Unified location services
│   │   │   ├── voice-interface.ts # Voice command system
│   │   │   └── price-comparison.ts # Price analysis
│   │   ├── profile/              # Profile management services
│   │   ├── recipes/              # Recipe management services
│   │   │   ├── recipe-service.ts # Core recipe operations
│   │   │   ├── recipe-database-service.ts # Database operations
│   │   │   ├── recipe-scaling-service.ts # Ingredient scaling
│   │   │   ├── recipe-analysis-service.ts # Cultural analysis
│   │   │   └── recipe-recommendations-service.ts # AI recommendations
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
# Grocery & Shopping APIs
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret

# Recipe & Nutrition APIs
RAPIDAPI_KEY=your_rapidapi_key                    # For Spoonacular access
SPOONACULAR_API_KEY=your_spoonacular_api_key      # Alternative direct access
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
NEXT_PUBLIC_TAVILY_MOCK=false                     # Set to true to use mock data
```

**Note**: Copy `.env.example` to `.env.local` and update with your actual API keys. The application will work with just Supabase and AWS Bedrock credentials for core functionality. External API keys enable enhanced features:

- **Kroger API**: Real-time pricing and coupon integration
- **Spoonacular API**: Expanded recipe database and nutritional data
- **ElevenLabs API**: Multilingual voice synthesis and commands
- **Google Places API**: Local store discovery and specialty market finding
- **USDA API**: Government nutrition data and farmer market information
- **Tavily API**: Cultural food research and authenticity validation

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

PlateWise leverages Amazon Bedrock with Claude 3.5 Sonnet to provide intelligent, culturally-aware meal planning:

### Core AI Capabilities
- **Intelligent Meal Planning** - Generate personalized meal plans respecting cultural preferences and budget constraints
- **Cultural Authenticity Analysis** - Score recipes for traditional accuracy and suggest preservation methods
- **Smart Ingredient Substitutions** - Recommend culturally-appropriate alternatives with cost and authenticity impact
- **Recipe Intelligence** - Parse recipes from text, photos, or voice input with cultural context
- **Budget Optimization** - AI-driven cost reduction strategies while maintaining cultural authenticity
- **Multi-language Translation** - Preserve cultural context and culinary terminology across languages

### AI Service Architecture
- **Circuit Breaker Pattern** - Graceful handling of AI service failures
- **Rate Limiting** - Intelligent request management to prevent API abuse
- **Caching Strategy** - Optimize AI response times and reduce costs
- **Cultural Prompting** - Specialized prompts that include cultural context and authenticity requirements
- **Fallback Systems** - Ensure application functionality even when AI services are unavailable

## 📚 Recipe Management System

PlateWise includes a comprehensive recipe management system with full CRUD operations, cultural authenticity tracking, and intelligent scaling capabilities:

### Core Database Features
- **Advanced Recipe CRUD** - Create, read, update, and delete recipes with proper authorization and RLS security
- **Cultural Authenticity Engine** - AI-powered classification system for traditional, adapted, inspired, and fusion recipes with 1-10 scoring
- **Smart Recipe Collections** - Organize recipes into custom collections with cultural themes, privacy controls, and sharing capabilities
- **Multi-dimensional Search** - Advanced filtering by culture, cuisine, difficulty, cooking time, authenticity level, dietary restrictions, and cost
- **Community Rating System** - Multi-dimensional ratings for taste, cost-effectiveness, cultural authenticity, and difficulty level
- **Intelligent Recipe Scaling** - Dynamic ingredient scaling with proper unit conversions and cultural context preservation
- **Real-time Cost Integration** - Live cost calculations with multi-store price comparisons and budget impact analysis
- **Developer Debug Tools** - Comprehensive debugging components for recipe operations, authentication, and database interactions

### Recipe Components Architecture
- **RecipeCard** - Beautiful recipe display with cultural theming, cost analysis, and authenticity indicators
- **RecipeForm** - Comprehensive recipe creation and editing interface with cultural context validation
- **RecipeSearch** - Advanced search with cultural, dietary, authenticity filters, and AI-powered suggestions
- **RecipeList** - Responsive bento grid layout with infinite scroll, cultural categorization, and performance optimization
- **RecipeScaling** - Interactive ingredient scaling with intelligent unit conversion and cultural technique preservation
- **RecipeInputModal** - Multi-method recipe input (text, URL, voice, photo) with AI parsing and cultural classification
- **RecipeRecommendations** - AI-powered suggestions based on cultural preferences, budget constraints, and nutritional goals
- **RecipeDebug** - Production-ready debugging tool for recipe operations, authentication flows, and database interactions

### Cultural Intelligence Features
- **Authenticity Classification** - AI-powered categorization with cultural significance analysis and preservation recommendations
- **Cultural Context Engine** - Historical background, traditional occasions, and cultural significance documentation
- **Regional Variation Support** - Multiple authentic versions of dishes with geographic and family tradition variations
- **Ingredient Impact Tracking** - Monitor and analyze cultural impact of ingredient substitutions with AI guidance
- **Traditional Method Preservation** - Document and preserve traditional cooking techniques with video and audio guides
- **Cultural Expert Integration** - Community validation system for cultural accuracy and authenticity verification

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
- **Kroger Catalog API** - Real-time product pricing, availability, coupon integration, and store location services
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

## 📚 Development Guidelines

### Code Standards
- **TypeScript** - Strict type checking enabled
- **ESLint** - Configured for Next.js and accessibility
- **Prettier** - Consistent code formatting
- **Cultural Sensitivity** - Follow authenticity guidelines
- **Performance** - Lighthouse scores >90 (Performance), >95 (Accessibility)

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