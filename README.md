# PlateWise 🍽️

A culturally-aware, AI-driven meal planning platform that helps families and individuals optimize their food budgets while preserving culinary traditions.

## Overview

PlateWise combines advanced cost analysis, cultural heritage preservation, nutritional optimization, and community features to create a holistic meal planning and grocery shopping experience. The platform uses AI to generate personalized meal plans that respect cultural authenticity while staying within budget constraints.

## 🚀 Current Status

PlateWise is actively under development with a comprehensive foundation in place:

- ✅ **Authentication System** - Complete Supabase Auth integration with email confirmation
- ✅ **Profile Setup Wizard** - Multi-step onboarding with cultural preferences
- ✅ **Database Schema** - Full PostgreSQL schema with RLS policies
- ✅ **Design System** - Bento-style UI with cultural theme support
- ✅ **Landing Page** - Modern, responsive design with cultural imagery
- 🔄 **API Integrations** - Framework ready for external services
- 🔄 **AI Features** - Bedrock integration patterns established
- 📋 **Core Features** - Recipe management, meal planning, budget tracking (in progress)

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
- Amazon Bedrock integration for intelligent meal planning
- Recipe parsing and ingredient substitution suggestions
- Nutritional analysis and health recommendations
- Multi-language support with voice features (ElevenLabs)
- Cultural authenticity scoring and preservation

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

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage, RLS)
- **AI**: Amazon Bedrock (Claude 3.5 Sonnet)
- **Voice**: ElevenLabs API for multilingual text-to-speech
- **APIs**: Kroger Catalog, Spoonacular, Edamam, Google Places, USDA
- **Caching**: Redis for performance optimization
- **Testing**: Jest, React Testing Library
- **Deployment**: Vercel (configured)

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
│   │   ├── auth/                 # Authentication pages
│   │   ├── dashboard/            # Main application dashboard
│   │   ├── profile/              # Profile management
│   │   └── page.tsx              # Landing page
│   ├── components/               # React components
│   │   ├── auth/                 # Authentication components
│   │   ├── dashboard/            # Dashboard components
│   │   ├── landing/              # Landing page components
│   │   ├── layout/               # Layout components
│   │   ├── profile/              # Profile setup wizard
│   │   └── ui/                   # Reusable UI components
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Utility libraries
│   │   ├── auth/                 # Authentication helpers
│   │   ├── profile/              # Profile services
│   │   ├── supabase/             # Supabase client configuration
│   │   └── themes/               # Cultural theme system
│   ├── styles/                   # Global styles and CSS
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
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
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Amazon Bedrock Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# External API Keys (Optional for development)
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret
SPOONACULAR_API_KEY=your_spoonacular_api_key
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key
ELEVENLABS_API_KEY=your_elevenlabs_api_key
GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Redis Configuration (Optional)
REDIS_URL=redis://localhost:6379
```

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
   - Enable Claude 3.5 Sonnet model access

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open application**
   Navigate to `http://localhost:3000`

## 🎨 Design Philosophy

PlateWise uses a modern **bento-style design system** with bold, culturally-inspired color palettes that celebrate the diversity of global cuisines. The interface adapts to different cultural themes while maintaining accessibility and usability standards.

### Cultural Themes
- **Mediterranean** - Warm oranges and greens with olive branch patterns
- **Asian** - Bold reds and purples with geometric elements
- **Latin American** - Vibrant corals and teals with textile patterns
- **African** - Earth tones with traditional geometric designs
- **Middle Eastern** - Rich purples and golds with arabesque patterns

## 🌍 Cultural Sensitivity

PlateWise is built with deep respect for cultural food traditions. Our development follows strict guidelines to:

- **Preserve Authenticity** - Traditional recipes are treated as cultural heritage
- **Provide Context** - Cultural significance and history are included
- **Support Diversity** - Accommodate various dietary restrictions and preferences
- **Promote Learning** - Encourage respectful cultural exchange
- **Community Oversight** - Cultural communities review content for accuracy

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
```

## 📚 Development Guidelines

### Code Standards
- **TypeScript** - Strict type checking enabled
- **ESLint** - Configured for Next.js and accessibility
- **Prettier** - Consistent code formatting
- **Cultural Sensitivity** - Follow authenticity guidelines
- **Performance** - Lighthouse scores >90 (Performance), >95 (Accessibility)

### API Integration Patterns
- **Error Handling** - Comprehensive retry logic and circuit breakers
- **Caching** - Redis-based caching with appropriate TTL
- **Rate Limiting** - Respect API limits and implement backoff
- **Cultural Context** - Include cultural information in all AI prompts

## 🚀 Deployment

The application is configured for deployment on Vercel:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

## 🤝 Contributing

This project prioritizes cultural sensitivity and authenticity. Contributors should:

1. Read the cultural authenticity guidelines in `.kiro/steering/`
2. Follow the development standards for code quality
3. Test cultural features with community members when possible
4. Respect traditional knowledge and provide proper attribution

## 📄 License

[License to be determined]

---

**PlateWise** - Preserving culinary heritage while optimizing food budgets through intelligent technology.