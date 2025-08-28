# PlateWise 🍽️

A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.

## Overview

PlateWise combines advanced cost analysis, cultural heritage preservation, nutritional optimization, and community features to create a holistic meal planning and grocery shopping experience. The platform uses Amazon Bedrock AI to generate personalized meal plans that respect cultural authenticity while staying within budget constraints.

## 🚀 Current Status

PlateWise is actively under development with a comprehensive foundation in place:

- ✅ **Authentication System** - Complete Supabase Auth integration with email confirmation
- ✅ **Profile Setup Wizard** - Multi-step onboarding with cultural preferences
- ✅ **Database Schema** - Full PostgreSQL schema with RLS policies
- ✅ **Design System** - Bento-style UI with cultural theme support
- ✅ **Landing Page** - Modern, responsive design with cultural imagery
- ✅ **AI Integration** - Amazon Bedrock service with Claude 3.5 Sonnet
- ✅ **API Services** - Complete framework for external service integrations
- 🔄 **Core Features** - Recipe management, meal planning, budget tracking (in progress)

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

### 👥 Community Features
- Recipe sharing with cultural authenticity ratings
- Social following and community recommendations
- Local store discovery and farmer market integration
- Cultural food tradition preservation

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
- **Grocery Data**: Kroger Catalog API for real-time pricing
- **Recipe Database**: Spoonacular API for recipe discovery
- **Nutrition Data**: Edamam API for nutritional analysis
- **Location Services**: Google Places API for store discovery
- **Government Data**: USDA API for food composition data

### Infrastructure & Performance
- **Caching**: Redis for API response caching and performance
- **Reliability**: Circuit breaker patterns and rate limiting
- **Testing**: Jest, React Testing Library, accessibility testing
- **Deployment**: Vercel with automatic deployments
- **Monitoring**: Built-in error tracking and performance monitoring

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
│   │   ├── budget/               # Budget tracking pages
│   │   ├── shopping/             # Shopping list management
│   │   ├── help/                 # Help and support pages
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── dashboard/            # Dashboard bento cards
│   │   ├── landing/              # Landing page components
│   │   ├── layout/               # Layout and navigation
│   │   ├── profile/              # Profile setup wizard (7 steps)
│   │   ├── bento/                # Bento grid system components
│   │   └── ui/                   # Reusable UI components
│   ├── contexts/                 # React contexts (Auth, Theme)
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Core services and utilities
│   │   ├── ai/                   # Amazon Bedrock AI service
│   │   ├── auth/                 # Authentication helpers
│   │   ├── external-apis/        # External API integrations
│   │   ├── profile/              # Profile management services
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
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key
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

**Note**: Copy `.env.example` to `.env.local` and update with your actual API keys. The application will work with just Supabase and AWS Bedrock credentials for core functionality.

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

## 🌍 Cultural Sensitivity

PlateWise is built with deep respect for cultural food traditions. Our development follows strict guidelines to:

- **Preserve Authenticity** - Traditional recipes are treated as cultural heritage
- **Provide Context** - Cultural significance and history are included with AI analysis
- **Support Diversity** - Accommodate various dietary restrictions and cultural preferences
- **Promote Learning** - Encourage respectful cultural exchange through AI-powered education
- **Community Oversight** - Cultural communities review AI-generated content for accuracy
- **AI Validation** - All AI suggestions undergo cultural authenticity verification

## 🔌 API Integrations

PlateWise integrates with multiple external services to provide comprehensive meal planning and shopping features:

### Grocery & Shopping APIs
- **Kroger Catalog API** - Real-time product pricing and availability
- **Google Places API** - Store discovery and specialty market location
- **Price Comparison Service** - Multi-store price analysis and optimization

### Recipe & Nutrition APIs
- **Spoonacular API** - Extensive recipe database with cultural filtering
- **Edamam API** - Comprehensive nutritional analysis and dietary information
- **USDA API** - Government food composition and safety data

### AI & Voice Services
- **Amazon Bedrock** - Claude 3.5 Sonnet for intelligent meal planning
- **ElevenLabs API** - Multi-language text-to-speech with cultural pronunciation
- **Voice Interface** - Recipe parsing from voice input and audio guidance

### Service Reliability Features
- **Circuit Breaker Pattern** - Automatic failover for unreliable APIs
- **Rate Limiting** - Intelligent request throttling and queue management
- **Caching Layer** - Redis-based caching with appropriate TTL strategies
- **Error Recovery** - Graceful degradation when external services are unavailable

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

# Test API integrations (requires API keys)
npm run test:integration
```

### Testing Standards
- **Unit Tests** - 80%+ coverage for business logic and AI integration
- **Cultural Testing** - Community validation for cultural authenticity features
- **API Testing** - Mock external services for reliable testing
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
- **Error Handling** - Comprehensive retry logic and circuit breakers
- **Caching Strategy** - Redis-based caching with intelligent TTL management
- **Rate Limiting** - Respect API limits with exponential backoff
- **Cultural Context** - Include cultural information in all AI prompts
- **Service Reliability** - Circuit breaker patterns for external API failures
- **Data Normalization** - Consistent data formats across different APIs

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
3. Write comprehensive tests for new features
4. Test cultural authenticity features with appropriate communities
5. Submit pull request with detailed description and cultural impact assessment

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
- ✅ Amazon Bedrock AI integration
- ✅ Cultural theme system and bento UI
- 🔄 Recipe management and meal planning features
- 🔄 Budget tracking and optimization tools

### Next Phase (Q2 2025)
- 📋 Shopping list generation and store integration
- 📋 Community features and recipe sharing
- 📋 Voice interface and multi-language support
- 📋 Mobile app development
- 📋 Advanced cultural authenticity features

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