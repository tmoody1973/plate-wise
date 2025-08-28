import { CulturalTheme } from '@/types';

export const CULTURAL_THEMES: CulturalTheme[] = [
  {
    id: 'mediterranean',
    name: 'mediterranean',
    displayName: 'Mediterranean',
    colors: {
      primary: '#E67E22',
      secondary: '#27AE60',
      accent: '#3498DB',
      gradient: ['#E67E22', '#F39C12', '#27AE60']
    },
    patterns: {
      background: 'olive-branch-pattern',
      accent: 'geometric-tiles'
    },
    typography: {
      heading: 'Playfair Display',
      body: 'Source Sans Pro'
    },
    culturalElements: {
      cuisine: ['Greek', 'Italian', 'Spanish', 'Turkish', 'Lebanese'],
      traditions: ['Family dining', 'Seasonal cooking', 'Olive oil traditions'],
      ingredients: ['Olive oil', 'Tomatoes', 'Herbs', 'Seafood', 'Grains']
    }
  },
  {
    id: 'asian',
    name: 'asian',
    displayName: 'Asian Fusion',
    colors: {
      primary: '#E74C3C',
      secondary: '#F39C12',
      accent: '#8E44AD',
      gradient: ['#E74C3C', '#F39C12', '#8E44AD']
    },
    patterns: {
      background: 'bamboo-pattern',
      accent: 'wave-pattern'
    },
    typography: {
      heading: 'Noto Sans',
      body: 'Inter'
    },
    culturalElements: {
      cuisine: ['Chinese', 'Japanese', 'Korean', 'Thai', 'Vietnamese', 'Indian'],
      traditions: ['Balance principles', 'Tea culture', 'Seasonal harmony'],
      ingredients: ['Rice', 'Soy sauce', 'Ginger', 'Garlic', 'Vegetables']
    }
  },
  {
    id: 'latin',
    name: 'latin',
    displayName: 'Latin American',
    colors: {
      primary: '#FF6B6B',
      secondary: '#4ECDC4',
      accent: '#45B7D1',
      gradient: ['#FF6B6B', '#4ECDC4', '#45B7D1']
    },
    patterns: {
      background: 'aztec-pattern',
      accent: 'tropical-pattern'
    },
    typography: {
      heading: 'Montserrat',
      body: 'Open Sans'
    },
    culturalElements: {
      cuisine: ['Mexican', 'Brazilian', 'Peruvian', 'Colombian', 'Argentine'],
      traditions: ['Family celebrations', 'Street food culture', 'Harvest festivals'],
      ingredients: ['Corn', 'Beans', 'Chili peppers', 'Avocado', 'Lime']
    }
  },
  {
    id: 'african',
    name: 'african',
    displayName: 'African Heritage',
    colors: {
      primary: '#D35400',
      secondary: '#27AE60',
      accent: '#F1C40F',
      gradient: ['#D35400', '#27AE60', '#F1C40F']
    },
    patterns: {
      background: 'kente-pattern',
      accent: 'tribal-pattern'
    },
    typography: {
      heading: 'Ubuntu',
      body: 'Lato'
    },
    culturalElements: {
      cuisine: ['West African', 'East African', 'North African', 'Ethiopian', 'Moroccan'],
      traditions: ['Communal dining', 'Spice traditions', 'Harvest celebrations'],
      ingredients: ['Yams', 'Plantains', 'Spices', 'Grains', 'Legumes']
    }
  },
  {
    id: 'middle-eastern',
    name: 'middle-eastern',
    displayName: 'Middle Eastern',
    colors: {
      primary: '#8E44AD',
      secondary: '#E67E22',
      accent: '#16A085',
      gradient: ['#8E44AD', '#E67E22', '#16A085']
    },
    patterns: {
      background: 'persian-pattern',
      accent: 'geometric-islamic'
    },
    typography: {
      heading: 'Amiri',
      body: 'Noto Sans'
    },
    culturalElements: {
      cuisine: ['Persian', 'Turkish', 'Lebanese', 'Moroccan', 'Israeli'],
      traditions: ['Hospitality', 'Spice markets', 'Tea culture'],
      ingredients: ['Saffron', 'Dates', 'Nuts', 'Herbs', 'Grains']
    }
  },
  {
    id: 'default',
    name: 'default',
    displayName: 'Global Fusion',
    colors: {
      primary: '#f97316',
      secondary: '#3b82f6',
      accent: '#10b981',
      gradient: ['#f97316', '#3b82f6', '#10b981']
    },
    patterns: {
      background: 'neutral-pattern',
      accent: 'modern-geometric'
    },
    typography: {
      heading: 'Inter',
      body: 'Inter'
    },
    culturalElements: {
      cuisine: ['International', 'Fusion', 'Modern'],
      traditions: ['Global cooking', 'Modern techniques', 'Seasonal eating'],
      ingredients: ['Seasonal produce', 'Global spices', 'Fresh herbs']
    }
  }
];

export const DEFAULT_THEME = CULTURAL_THEMES.find(theme => theme.id === 'default')!;

export const getThemeById = (id: string): CulturalTheme => {
  return CULTURAL_THEMES.find(theme => theme.id === id) || DEFAULT_THEME;
};

export const getThemeByName = (name: string): CulturalTheme => {
  return CULTURAL_THEMES.find(theme => theme.name === name) || DEFAULT_THEME;
};

export const getThemeByCuisine = (cuisine: string): CulturalTheme => {
  return CULTURAL_THEMES.find(theme => 
    theme.culturalElements.cuisine.some(c => 
      c.toLowerCase().includes(cuisine.toLowerCase())
    )
  ) || DEFAULT_THEME;
};