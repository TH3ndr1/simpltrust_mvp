# SimpleTrust Design System Foundation

## Color System

```
// Primary Blues
--primary-50: #EFF6FF;  // Lightest blue, background
--primary-100: #DBEAFE; // Very light blue, subtle highlights
--primary-200: #BFDBFE; // Light blue, hover states
--primary-300: #93C5FD; // Mid-light blue, borders
--primary-400: #60A5FA; // Medium blue, secondary actions
--primary-500: #3B82F6; // Core blue, primary UI elements
--primary-600: #2563EB; // Deeper blue, primary actions/buttons
--primary-700: #1D4ED8; // Dark blue, active states
--primary-800: #1E40AF; // Very dark blue, text on light bg
--primary-900: #1E3A8A; // Darkest blue, headers on light bg
--primary-950: #172554; // Nearly black blue, subtle dark UI

// Secondary (Dark Blues)
--secondary-50: #F8FAFC;
--secondary-100: #F1F5F9;
--secondary-200: #E2E8F0;
--secondary-300: #CBD5E1;
--secondary-400: #94A3B8;
--secondary-500: #64748B;
--secondary-600: #475569;
--secondary-700: #334155;
--secondary-800: #1E293B;
--secondary-900: #0F172A; // Main secondary color
--secondary-950: #020617;

// Accent (Purple)
--accent-300: #C4B5FD; // Light purple
--accent-500: #8B5CF6; // Medium purple
--accent-600: #7C3AED; // Main accent color
--accent-700: #6D28D9; // Deep purple

// Semantic Colors
--success-50: #ECFDF5;  // Very light green
--success-500: #10B981; // Main success color
--success-700: #047857; // Dark green

--warning-50: #FFFBEB;  // Very light amber
--warning-500: #F59E0B; // Main warning color
--warning-700: #B45309; // Dark amber

--error-50: #FEF2F2;    // Very light red
--error-500: #EF4444;   // Main error color
--error-700: #B91C1C;   // Dark red

--info-50: #EFF6FF;     // Very light blue
--info-500: #3B82F6;    // Main info color
--info-700: #1D4ED8;    // Dark blue

// Neutrals (Gray Scale)
--gray-50: #F9FAFB;   // Lightest, backgrounds
--gray-100: #F3F4F6;  // Very light, alternate backgrounds
--gray-200: #E5E7EB;  // Light, borders and dividers
--gray-300: #D1D5DB;  // Mid-light, disabled elements
--gray-400: #9CA3AF;  // Medium, placeholder text
--gray-500: #6B7280;  // Mid-dark, secondary text
--gray-600: #4B5563;  // Dark, body text
--gray-700: #374151;  // Darker, headings
--gray-800: #1F2937;  // Very dark, primary text on light bg
--gray-900: #111827;  // Nearly black, high emphasis text
```

## Typography

```
// Font Family
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: 'JetBrains Mono', Menlo, Monaco, Consolas, monospace;

// Font Sizes
--text-xs: 0.75rem;     // 12px
--text-sm: 0.875rem;    // 14px
--text-base: 1rem;      // 16px
--text-lg: 1.125rem;    // 18px
--text-xl: 1.25rem;     // 20px
--text-2xl: 1.5rem;     // 24px
--text-3xl: 1.875rem;   // 30px
--text-4xl: 2.25rem;    // 36px
--text-5xl: 3rem;       // 48px

// Line Heights
--leading-none: 1;        // Tight, for headings
--leading-tight: 1.25;    // Tighter than normal
--leading-snug: 1.375;    // Slightly tighter than normal
--leading-normal: 1.5;    // Default body text
--leading-relaxed: 1.625; // Slightly looser
--leading-loose: 2;       // Very loose

// Font Weights
--font-thin: 100;
--font-extralight: 200;
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
--font-black: 900;

// Letter Spacing
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

## Component Styles

### Buttons

```tsx
// Button Base (shared styles across all variants)
const buttonBase = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

// Size Variants
const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 py-2",
  lg: "h-12 px-6 py-3 text-lg"
};

// Style Variants
const buttonVariants = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500",
  secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 focus-visible:ring-secondary-500",
  outline: "border border-gray-300 bg-transparent hover:bg-gray-50 focus-visible:ring-primary-500",
  ghost: "hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-primary-500",
  link: "text-primary-600 underline-offset-4 hover:underline focus-visible:ring-primary-500",
  danger: "bg-error-500 text-white hover:bg-error-600 focus-visible:ring-error-500",
  success: "bg-success-500 text-white hover:bg-success-600 focus-visible:ring-success-500",
};
```

### Form Elements

```tsx
// Input Base
const inputBase = "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50";

// Select Base
const selectBase = "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50";

// Checkbox Base
const checkboxBase = "h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500";

// Radio Base
const radioBase = "h-4 w-4 border-gray-300 text-primary-600 focus:ring-primary-500";

// Textarea Base
const textareaBase = "flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50";

// Label Base
const labelBase = "text-sm font-medium text-gray-700";

// Helper Text
const helperText = "text-xs text-gray-500 mt-1";

// Error Text
const errorText = "text-xs text-error-500 mt-1";
```

### Cards and Containers

```tsx
// Card Base
const cardBase = "rounded-lg border border-gray-200 bg-white shadow-sm";

// Card Variants
const cardVariants = {
  default: "p-6",
  compact: "p-4",
  flat: "border-0 shadow-none p-6",
  interactive: "p-6 hover:shadow transition-shadow cursor-pointer"
};

// Panel (like dashboard widgets)
const panelBase = "rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden";

// Panel Header
const panelHeader = "px-6 py-4 border-b border-gray-200 bg-gray-50 font-medium";

// Panel Body
const panelBody = "p-6";

// Panel Footer
const panelFooter = "px-6 py-4 border-t border-gray-200 bg-gray-50";
```

### Navigation Elements

```tsx
// Tabs Base
const tabsBase = "space-x-1 flex border-b border-gray-200";

// Tab Item
const tabItem = "px-4 py-2 text-sm font-medium transition-colors";

// Tab Variants
const tabVariants = {
  active: "text-primary-600 border-b-2 border-primary-600",
  inactive: "text-gray-500 hover:text-gray-900"
};

// Breadcrumb Container
const breadcrumbContainer = "flex items-center space-x-1 text-sm";

// Breadcrumb Item
const breadcrumbItem = "text-gray-500 hover:text-gray-900";

// Breadcrumb Separator
const breadcrumbSeparator = "text-gray-400 mx-1";

// Breadcrumb Active
const breadcrumbActive = "text-gray-900 font-medium";
```

### Data Display Components

```tsx
// Table Container
const tableContainer = "w-full overflow-auto";

// Table Base
const tableBase = "w-full caption-bottom text-sm";

// Table Header
const tableHeader = "border-b bg-gray-50";

// Table Header Cell
const tableHeaderCell = "h-12 px-4 text-left align-middle font-medium text-gray-700";

// Table Body
const tableBody = "divide-y divide-gray-200 bg-white";

// Table Row
const tableRow = "hover:bg-gray-50";

// Table Cell
const tableCell = "p-4 align-middle";

// Table Footer
const tableFooter = "border-t bg-gray-50";

// Table Caption
const tableCaption = "mt-4 text-sm text-gray-500";
```

### Status Indicators

```tsx
// Badge Base
const badgeBase = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

// Badge Variants
const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-primary-100 text-primary-800",
  secondary: "bg-secondary-100 text-secondary-800",
  success: "bg-success-100 text-success-800",
  warning: "bg-warning-100 text-warning-800",
  error: "bg-error-100 text-error-800",
  info: "bg-info-100 text-info-800"
};

// Alert Base
const alertBase = "relative w-full rounded-lg border p-4";

// Alert Variants
const alertVariants = {
  default: "bg-white border-gray-200 text-gray-800",
  primary: "bg-primary-50 border-primary-200 text-primary-800",
  success: "bg-success-50 border-success-200 text-success-800",
  warning: "bg-warning-50 border-warning-200 text-warning-800",
  error: "bg-error-50 border-error-200 text-error-800",
  info: "bg-info-50 border-info-200 text-info-800"
};
```

## Spacing and Layout

```
// Spacing Scale (in rems)
--space-0: 0;
--space-px: 1px;
--space-0.5: 0.125rem; // 2px
--space-1: 0.25rem;    // 4px
--space-1.5: 0.375rem; // 6px
--space-2: 0.5rem;     // 8px
--space-2.5: 0.625rem; // 10px
--space-3: 0.75rem;    // 12px
--space-3.5: 0.875rem; // 14px
--space-4: 1rem;       // 16px
--space-5: 1.25rem;    // 20px
--space-6: 1.5rem;     // 24px
--space-7: 1.75rem;    // 28px
--space-8: 2rem;       // 32px
--space-9: 2.25rem;    // 36px
--space-10: 2.5rem;    // 40px
--space-11: 2.75rem;   // 44px
--space-12: 3rem;      // 48px
--space-14: 3.5rem;    // 56px
--space-16: 4rem;      // 64px
--space-20: 5rem;      // 80px
--space-24: 6rem;      // 96px
--space-28: 7rem;      // 112px
--space-32: 8rem;      // 128px
--space-36: 9rem;      // 144px
--space-40: 10rem;     // 160px
--space-44: 11rem;     // 176px
--space-48: 12rem;     // 192px
--space-52: 13rem;     // 208px
--space-56: 14rem;     // 224px
--space-60: 15rem;     // 240px
--space-64: 16rem;     // 256px
--space-72: 18rem;     // 288px
--space-80: 20rem;     // 320px
--space-96: 24rem;     // 384px

// Container Widths
--container-sm: 640px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;

// Grid System
--grid-cols-1: repeat(1, minmax(0, 1fr));
--grid-cols-2: repeat(2, minmax(0, 1fr));
--grid-cols-3: repeat(3, minmax(0, 1fr));
--grid-cols-4: repeat(4, minmax(0, 1fr));
--grid-cols-5: repeat(5, minmax(0, 1fr));
--grid-cols-6: repeat(6, minmax(0, 1fr));
--grid-cols-7: repeat(7, minmax(0, 1fr));
--grid-cols-8: repeat(8, minmax(0, 1fr));
--grid-cols-9: repeat(9, minmax(0, 1fr));
--grid-cols-10: repeat(10, minmax(0, 1fr));
--grid-cols-11: repeat(11, minmax(0, 1fr));
--grid-cols-12: repeat(12, minmax(0, 1fr));
```

## Breakpoints

```
// Responsive Breakpoints
--screen-sm: 640px;  // Small devices (mobile)
--screen-md: 768px;  // Medium devices (tablets)
--screen-lg: 1024px; // Large devices (laptops)
--screen-xl: 1280px; // Extra large devices (desktops)
--screen-2xl: 1536px; // 2X large devices (large desktops)
```

## Shadows and Effects

```
// Box Shadows
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);
--shadow-none: 0 0 #0000;

// Border Radius
--radius-none: 0;
--radius-sm: 0.125rem; // 2px
--radius-base: 0.25rem; // 4px
--radius-md: 0.375rem; // 6px
--radius-lg: 0.5rem;   // 8px
--radius-xl: 0.75rem;  // 12px
--radius-2xl: 1rem;    // 16px
--radius-3xl: 1.5rem;  // 24px
--radius-full: 9999px; // Fully rounded (circles)

// Transitions
--transition-all: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-colors: background-color, border-color, color, fill, stroke 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-opacity: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-shadow: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-transform: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

// Focus Ring
--ring-offset-shadow: 0 0 0 2px rgba(255, 255, 255, 1);
--ring-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
--ring-shadow-combined: var(--ring-offset-shadow), var(--ring-shadow);
```

## Tailwind Configuration

This design system can be implemented in Tailwind CSS with the following configuration structure:

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617',
        },
        accent: {
          300: '#C4B5FD',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
        },
        success: {
          50: '#ECFDF5',
          500: '#10B981',
          700: '#047857',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          700: '#B45309',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          700: '#B91C1C',
        },
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          700: '#1D4ED8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '0.125rem',
        'base': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
``` 