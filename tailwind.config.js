const {nextui} = require('@nextui-org/theme');
const { withUt } = require("uploadthing/tw");

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ['class'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",    
    './src/**/*.{ts,tsx}',
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "// Or if using src directory:\n    ./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
  	extend: {
      screens: {
        'laptop': '1074px',    // Will apply to both screens
        'desktop': '1457px',   // Will ONLY apply to 1457px screen, NOT 1074px
        'wide': '1600px',      // For even larger screens
      	},
  		spacing: {
  			'0': '0',
  			'1': '0.4rem',
  			'2': '0.8rem',
  			'3': '1.2rem',
  			'4': '1.6rem',
  			'5': '2rem',
  			'6': '2.4rem',
  			'7': '2.8rem',
  			'8': '3.2rem',
  			'9': '3.6rem',
  			'10': '4rem',
  			'11': '4.4rem',
  			'12': '4.8rem',
  			'13': '5.2rem',
  			'14': '5.6rem',
  			'15': '6rem',
  			'16': '6.4rem'
  		},
  		fontFamily: {
  			body: 'var(--font-inter), sans-serif',
  			heading: 'var(--font-cousine), serif'
  		},
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			heading: 'var(--color-heading)',
  			text: 'var(--color-text)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			xs: '1.05rem',
  			sm: '1.4rem',
  			md: '1.575rem',
  			lg: '1.7rem',
  			xl: '2.1rem',
  			'2xl': '4.2rem',
  			'3xl': '6.3rem'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [nextui(), require("tailwindcss-animate")],
});