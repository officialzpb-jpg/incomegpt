// WealthForge Theme Configuration
// Use these constants for consistent styling across the app

export const theme = {
  // Colors
  colors: {
    // Primary - Dark Orange
    primary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
      950: '#431407',
    },
    // Background - Dark Slate
    background: {
      DEFAULT: '#020617',
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // Text
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      muted: '#64748b',
      disabled: '#475569',
    },
    // Status
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
  },

  // Gradients
  gradients: {
    primary: 'bg-gradient-to-r from-orange-800 to-orange-950',
    primaryHover: 'hover:from-orange-900 hover:to-black',
    hero: 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
    forgeGlow: 'bg-gradient-to-t from-orange-900/30 via-orange-800/15 to-transparent',
    text: 'bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500',
  },

  // Borders
  borders: {
    DEFAULT: 'border-slate-800',
    primary: 'border-orange-900/20',
    focus: 'focus:border-orange-700',
    hover: 'hover:border-orange-800/50',
  },

  // Backgrounds
  backgrounds: {
    DEFAULT: 'bg-slate-950',
    card: 'bg-slate-900/50',
    cardHover: 'hover:bg-slate-800/50',
    input: 'bg-slate-950',
    glass: 'bg-slate-900/50 backdrop-blur-xl',
  },

  // Text Colors
  text: {
    DEFAULT: 'text-slate-100',
    secondary: 'text-slate-400',
    muted: 'text-slate-500',
    primary: 'text-orange-100',
    primaryBright: 'text-orange-500',
  },

  // Buttons
  buttons: {
    primary: 'bg-gradient-to-r from-orange-800 to-orange-950 text-orange-100 border border-orange-800/50 hover:from-orange-900 hover:to-black',
    secondary: 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700',
    ghost: 'text-slate-400 hover:text-orange-400',
  },

  // Spacing
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
  },

  // Border Radius
  radius: {
    sm: 'rounded-md',
    md: 'rounded-lg',
    lg: 'rounded-xl',
    xl: 'rounded-2xl',
    full: 'rounded-full',
  },

  // Shadows
  shadows: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    glow: 'shadow-orange-900/20',
  },

  // Animation
  animation: {
    fast: 'duration-150',
    normal: 'duration-300',
    slow: 'duration-500',
    spring: 'transition-all ease-spring',
  },
};

// Tailwind class combinations for common patterns
export const classes = {
  // Container
  container: 'mx-auto max-w-5xl px-4',
  containerWide: 'mx-auto max-w-7xl px-6',

  // Cards
  card: 'bg-slate-900/50 border border-slate-800 rounded-xl',
  cardHover: 'bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-800/50 transition-colors',
  cardPrimary: 'bg-gradient-to-b from-orange-950/50 to-slate-900/50 border border-orange-800/30 rounded-xl',

  // Inputs
  input: 'w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-700 focus:outline-none transition-colors text-slate-200',

  // Typography
  heading1: 'text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-100',
  heading2: 'text-3xl sm:text-4xl font-bold text-slate-100',
  heading3: 'text-xl font-semibold text-slate-200',
  body: 'text-slate-400',
  bodySmall: 'text-sm text-slate-500',

  // Icons
  icon: 'h-5 w-5',
  iconSmall: 'h-4 w-4',
  iconLarge: 'h-6 w-6',
  iconPrimary: 'text-orange-600',
  iconSecondary: 'text-slate-500',

  // Layout
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexCol: 'flex flex-col',
  grid2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  grid3: 'grid grid-cols-1 md:grid-cols-3 gap-4',
  grid4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
};

// Common component styles
export const components = {
  // Navbar
  navbar: {
    wrapper: 'fixed top-0 left-0 right-0 z-50 border-b border-orange-900/20 bg-slate-950/90 backdrop-blur-md',
    link: 'text-xs text-slate-400 hover:text-orange-400 transition-colors',
    button: 'rounded-md bg-gradient-to-r from-orange-700 to-orange-900 px-3 py-1.5 text-xs font-medium text-orange-100 hover:from-orange-800 hover:to-orange-950 transition-colors',
  },

  // Buttons
  button: {
    primary: 'flex items-center justify-center gap-2 bg-gradient-to-r from-orange-800 to-orange-950 text-orange-100 py-3 rounded-xl font-medium hover:from-orange-900 hover:to-black transition-colors disabled:opacity-50 border border-orange-800/50',
    secondary: 'flex items-center justify-center gap-2 bg-slate-800 text-slate-300 py-3 rounded-xl font-medium hover:bg-slate-700 transition-colors border border-slate-700',
    ghost: 'text-slate-400 hover:text-orange-400 transition-colors',
  },

  // Stats
  stat: {
    wrapper: 'bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center',
    value: 'text-2xl font-bold text-orange-100',
    label: 'text-xs text-slate-500',
  },

  // Forms
  form: {
    label: 'block text-sm font-medium mb-2 text-slate-300',
    error: 'mb-4 p-3 rounded-lg bg-red-900/30 border border-red-800/30 text-red-400 text-sm',
  },
};

// Export individual values for easy imports
export const {
  colors,
  gradients,
  borders,
  backgrounds,
  text,
  buttons,
  spacing,
  radius,
  shadows,
  animation,
} = theme;