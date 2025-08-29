# PlateWise 🍽️

A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.

## Overview

PlateWise combines advanced cost analysis, cultural heritage preservation, nutritional optimization, and community features to create a holistic meal planning and grocery shopping experience. The platform uses Amazon Bedrock AI to generate personalized meal plans that respect cultural authenticity while staying within budget constraints, integrated with comprehensive external APIs for real-time pricing, recipe discovery, and cultural food research.

## 🚀 Current Status

PlateWise has reached a significant milestone with a comprehensive foundation and advanced features:

- ✅ **Authentication System** - Complete Supabase Auth with email confirmation, password reset, and OAuth callbacks
- ✅ **Profile Setup Wizard** - 7-step onboarding covering personal info, cultural preferences, dietary restrictions, budget settings, nutritional goals, cooking profile, and review
- ✅ **Database Schema** - Full PostgreSQL schema with RLS policies and cultural metadata support
- ✅ **Design System** - Bento-style UI with 5 cultural themes (Mediterranean, Asian, Latin American, African, Middle Eastern)
- ✅ **Landing Page** - Modern, responsive design with cultural imagery and theme switching
- ✅ **AI Integration** - Amazon Bedrock service with Claude 3.5 Sonnet for culturally-aware meal planning
- ✅ **Complete API Layer** - 8 integrated external services with circuit breakers, rate limiting, and caching
- ✅ **Recipe Management System** - Full CRUD operations with cultural authenticity scoring, scaling, and analysis
- ✅ **Voice Integration** - ElevenLabs multilingual text-to-speech with cultural pronunciation
- ✅ **Local Store Discovery** - Google Places and USDA integration for grocery stores and farmer markets
- ✅ **Price Comparison Engine** - Kroger API integration with real-time pricing and coupon discovery
- ✅ **Debug Tools** - Comprehensive debugging components for recipe management and authentication
- 🔄 **Meal Planning & Budget Tracking** - AI-powered meal plans with cost optimization (in progress)

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
- **Amazon Bedrock Integration** - Claude 3.5 Sonnet for intelligent meal planning
- **Cultural Authenticity Analysis** - AI-powered scoring and preservation recommendations
- **Smart Substitutions** - Culturally-appropriate ingredient alternatives with cost analysis
- **Recipe Parsing** - Extract recipes from text, photos, or voice input
- **Budget Optimization** - AI-driven cost reduction strategies
- **Multi-language Translation** - Preserve cultural context across languages
- **Voice Integration** - ElevenLabs text-to-speech with cultural pronunciation
- **Circuit Breaker & Rate Limiting** - Robust AI service reliability
- **Comprehensive Recipe Management** - Full CRUD operations with cultural authenticity scoring

### 🏪 Local Store Discovery & Shopping
- **Grocery Store Finder** - Google Places integration for local store discovery with cultural specialty filtering
- **Price Comparison** - Real-time price analysis across multiple stores with route optimization
- **Specialty Market Discovery** - Find ethnic markets and specialty stores for authentic ingredients
- **Farmer Market Integration** - USDA data for local farmer markets and seasonal produce
- **Shopping List Optimization** - AI-powered shopping route planning with cost analysis
- **Coupon Integration** - Kroger API integration for real-time coupon and deal discovery

### 📚 Recipe Management
- **Comprehensive Recipe Database** - Full CRUD operations with Supabase integration
- **Cultural Authenticity Tracking** - Traditional vs. adapted recipe classification
- **Recipe Collections** - Organize recipes into custom collections
- **Advanced Search & Filtering** - Search by culture, cuisine, difficulty, time, and authenticity
- **Multi-Source Search** - Integrated search across Spoonacular and internal recipe database
- **Community Ratings** - Rate recipes for taste, cost-effectiveness, and cultural authenticity
- **Recipe Scaling** - Intelligent ingredient scaling with unit conversions
- **Cost Analysis** - Real-time cost calculations with store price comparisons

### 👥 Community Features
- **Recipe Sharing** - Share recipes with cultural authenticity ratings and community feedback
- **Recipe Collections** - Create and share curated recipe collections with cultural themes
- **Community Ratings** - Multi-dimensional rating system for taste, cost, and authenticity
- **Cultural Preservation** - Community-driven validation of traditional recipes and techniques
- **Local Food Discovery** - Find specialty markets and farmer markets with cultural focus
- **Social Following** - Follow other users and discover culturally-relevant recipes

### 🎨 Design System
- **Bento Grid Layout** - Modern card-based interface
- **Cultural Themes** - Dynamic color schemes and patterns
- **Responsive Design** - Mobile-first approach
- **Accessibility** - WCAG 2.1 AA compliance
- **Multi-language Support** - RTL language support

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
- **Grocery Data**: Kroger Catalog API for real-time pricing and product availability
- **Recipe Database**: Spoonacular API for recipe discovery with cultural filtering
- **Voice Services**: ElevenLabs API for multilingual text-to-speech with cultural pronunciation
- **Location Services**: Google Places API for grocery store and specialty market discovery
- **Government Data**: USDA API for food composition, farmer markets, and seasonal produce data
- **Price Comparison**: Multi-store price analysis with coupon integration
- **Voice Interface**: Complete voice command system for hands-free cooking assistance

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
│   └── steering/                 # Development guidelines
│       ├── platewise-development-standards.md
│       ├── cultural-authenticity-guide.md
│       └── api-integration-patterns.md
├── src/
│   ├── app/                      # Next.js 14 App Router
│   │   ├── auth/                 # Authentication pages & flows
│   │   ├── dashboard/            # Main application dashboard
│   │   ├── profile/              # Profile management & setup
│   │   ├── recipes/              # Recipe browsing and management
│   │   ├── budget/               # Budget tracking pages
│   │   ├── shopping/             # Shopping list management
│   │   ├── help/                 # Help and support pages
│   │   ├── debug/                # Debug and development tools
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── dashboard/            # Dashboard bento cards
│   │   ├── debug/                # Debug components (RecipeDebug)
│   │   ├── landing/              # Landing page components
│   │   ├── layout/               # Layout and navigation
│   │   ├── profile/              # Profile setup wizard (7 steps)
│   │   ├── recipes/              # Recipe components (cards, forms, search, scaling)
│   │   ├── search/               # Search components
│   │   ├── bento/                # Bento grid system components
│   │   └── ui/                   # Reusable UI components
│   ├── contexts/                 # React contexts (Auth, Theme)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Core services and utilities
│   │   ├── ai/                   # Amazon Bedrock AI service
│   │   ├── auth/                 # Authentication helpers
│   │   ├── external-apis/        # External API integrations (8 services)
│   │   ├── profile/              # Profile management services
│   │   ├── recipes/              # Recipe management services (database, scaling, analysis)
│   │   ├── supabase/             # Supabase client configuration
│   │   ├── themes/               # Cultural theme system
│   │   └── favicon/              # Favicon management
│   ├── styles/                   # Global styles and cultural themes
│   ├── types/                    # Comprehensive TypeScript definitions
│   └── utils/                    # Utility functions and constants
├── public/                       # Static assets
│   └── assets/                   # Images, logos, icons
└── supabase-schema.sql           # Database schema
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

# External API Keys (Optional for development)
# Grocery & Shopping APIs
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret

# Recipe & Nutrition APIs
SPOONACULAR_API_KEY=your_spoonacular_api_key
USDA_API_KEY=your_usda_api_key

# Voice & Location APIs
ELEVENLABS_API_KEY=your_elevenlabs_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Performance & Caching (Optional)
REDIS_URL=redis://localhost:6379

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

**Note**: Copy `.env.example` to `.env.local` and update with your actual API keys. The application will work with just Supabase and AWS Bedrock credentials for core functionality. External API keys enable enhanced features like real-time pricing, voice assistance, local store discovery, and expanded recipe databases.

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

### Database Features
- **Recipe CRUD Operations** - Create, read, update, and delete recipes with proper authorization
- **Cultural Authenticity Tracking** - Classification system for traditional, adapted, inspired, and fusion recipes
- **Recipe Collections** - Organize recipes into custom collections (public or private)
- **Advanced Search & Filtering** - Search by culture, cuisine, difficulty, cooking time, and authenticity level
- **Community Ratings** - Multi-dimensional rating system for taste, cost-effectiveness, and cultural authenticity
- **Recipe Scaling** - Intelligent ingredient scaling with proper unit conversions
- **Cost Analysis Integration** - Real-time cost calculations with store price comparisons
- **Debug Tools** - Built-in debugging components for troubleshooting recipe operations and authentication

### Recipe Components
- **RecipeCard** - Beautiful recipe display with cultural theming and cost analysis
- **RecipeForm** - Comprehensive recipe creation and editing interface with cultural context
- **RecipeSearch** - Advanced search with cultural, dietary, and authenticity filters
- **RecipeList** - Responsive grid layout with infinite scroll and cultural categorization
- **RecipeScaling** - Interactive ingredient scaling with intelligent unit conversion
- **RecipeInputModal** - Quick recipe input from text, URL, or voice with AI parsing
- **RecipeRecommendations** - AI-powered recipe suggestions based on cultural preferences and budget
- **RecipeDebug** - Development tool for debugging recipe operations, authentication, and database interactions

### Cultural Features
- **Authenticity Classification** - Traditional vs. adapted recipe categorization
- **Cultural Context** - Historical background and significance for traditional recipes
- **Regional Variations** - Support for different authentic versions of the same dish
- **Ingredient Substitution Tracking** - Monitor cultural impact of ingredient changes
- **Traditional Cooking Methods** - Preserve and document traditional techniques

## 🌍 Cultural Sensitivity

PlateWise is built with deep respect for cultural food traditions. Our development follows strict guidelines to:

- **Preserve Authenticity** - Traditional recipes are treated as cultural heritage
- **Provide Context** - Cultural significance and history are included with AI analysis
- **Support Diversity** - Accommodate various dietary restrictions and cultural preferences
- **Promote Learning** - Encourage respectful cultural exchange through AI-powered education
- **Community Oversight** - Cultural communities review AI-generated content for accuracy
- **AI Validation** - All AI suggestions undergo cultural authenticity verification

## 🔌 API Integrations

PlateWise integrates with multiple external services to provide comprehensive meal planning, shopping, and local discovery features:

### Grocery & Shopping APIs
- **Kroger Catalog API** - Real-time product pricing, availability, and coupon integration
- **Google Places API** - Grocery store and specialty market discovery with cultural filtering
- **Price Comparison Service** - Multi-store price analysis with route optimization
- **Location Service** - Unified local food sourcing with farmer market integration

### Recipe & Nutrition APIs
- **Spoonacular API** - Extensive recipe database with cultural cuisine filtering
- **USDA API** - Government food composition, farmer markets, and seasonal produce data
- **Recipe Service** - Unified recipe search across multiple sources with cultural context
- **Internal Recipe Database** - Comprehensive CRUD operations with cultural authenticity tracking

### AI & Voice Services
- **Amazon Bedrock** - Claude 3.5 Sonnet for culturally-aware meal planning
- **ElevenLabs API** - Multi-language text-to-speech with cultural pronunciation guides
- **Voice Interface** - Complete voice command system for hands-free cooking assistance
- **AI Health Monitoring** - Service availability checking and intelligent fallbacks

### Service Architecture
- **Circuit Breaker Pattern** - Automatic failover for unreliable APIs with exponential backoff
- **Rate Limiting** - Intelligent request throttling with usage statistics tracking
- **Caching Layer** - Redis-based caching with cultural context preservation
- **Error Recovery** - Graceful degradation with meaningful user feedback
- **API Health Service** - Unified health checking across all external services
- **Configuration Validation** - Automatic validation of API keys and service availability
- **Location Services** - Unified local food sourcing with Google Places and USDA integration
- **Voice Interface Service** - Complete multilingual voice command system with ElevenLabs
- **Price Comparison Engine** - Real-time multi-store price analysis with route optimization

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
```

### Testing Standards
- **Unit Tests** - 80%+ coverage for business logic, AI integration, and recipe management
- **Cultural Testing** - Community validation for cultural authenticity features
- **API Testing** - Mock external services for reliable testing with circuit breaker validation
- **Recipe Testing** - Comprehensive testing of CRUD operations and cultural authenticity scoring
- **Voice Testing** - ElevenLabs integration testing for multilingual text-to-speech
- **Integration Testing** - End-to-end testing of external API integrations
- **Accessibility Testing** - WCAG 2.1 AA compliance verification
- **Performance Testing** - Lighthouse scores >90 Performance, >95 Accessibility

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

### Current Phase (Q1 2025)
- ✅ Core authentication and profile system
- ✅ Amazon Bedrock AI integration with cultural context
- ✅ Cultural theme system and bento UI
- ✅ Recipe management system with CRUD operations
- ✅ External API integration layer (8 services)
- ✅ Recipe database with cultural authenticity tracking
- ✅ Voice interface foundation with ElevenLabs integration
- ✅ Local store discovery with Google Places and USDA integration
- 🔄 Meal planning and budget tracking features
- 🔄 Shopping list generation with store integration

### Next Phase (Q2 2025)
- 📋 Complete meal planning workflow with AI optimization
- 📋 Advanced budget tracking with real-time price monitoring
- 📋 Community features and recipe sharing platform
- 📋 Mobile app development with offline capabilities
- 📋 Enhanced voice commands and cooking assistance
- 📋 Cultural expert review system for authenticity validation

### Future Enhancements
- 📋 Nutritionist and cultural expert partnerships
- 📋 Festival and holiday meal planning
- 📋 Family recipe preservation tools
- 📋 Cooking technique video integration
- 📋 Social features and cultural exchange

## 📞 Support & Community

- **Documentation** - Comprehensive guides in `.kiro/specs/`
- **Cultural Guidelines** - Authenticity standards in `.kiro/steering/`
- **Issues** - Report bugs and request features via GitHub Issues
- **Discussions** - Community discussions for cultural food topics
- **Cultural Review** - Community-driven content validation process

---

**PlateWise** - Preserving culinary heritage while optimizing food budgets through intelligent AI technology.

*Built with respect for cultural traditions and powered by cutting-edge AI to make authentic, budget-friendly cooking accessible to everyone.*