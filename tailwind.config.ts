import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'open-sauce': ['Open Sauce One', 'sans-serif'],
				'tomorrow': ['Tomorrow', 'sans-serif'],
			},
			fontSize: {
				'responsive-sm': 'clamp(0.875rem, 2vw, 1.125rem)',      // 14px to 18px
				'responsive-base': 'clamp(1rem, 2.5vw, 1.4rem)',        // 16px to 22.4px
				'responsive-lg': 'clamp(1.125rem, 3vw, 1.75rem)',       // 18px to 28px
				'responsive-xl': 'clamp(1.25rem, 3.5vw, 2rem)',         // 20px to 32px
				'responsive-2xl': 'clamp(1.5rem, 4vw, 2.5rem)',         // 24px to 40px
				'responsive-3xl': 'clamp(1.875rem, 5vw, 3rem)',         // 30px to 48px
				'responsive-title': 'clamp(1.5rem, 4vw, 2.25rem)',      // 24px to 36px - optimized for titles
				'responsive-subtitle': 'clamp(1rem, 2.5vw, 1.25rem)',   // 16px to 20px - optimized for subtitles
				'responsive-terminal': 'clamp(0.75rem, 2.4vw, 1.2rem)',   // 12px to 19.2px - for terminal text (smaller on mobile)
				'responsive-label': 'clamp(1rem, 2.4vw, 1.35rem)',     // 16px to 21.6px - for user_industry (20% larger)
				'responsive-button': 'clamp(1rem, 3.6vw, 2.1rem)',     // 16px to 33.6px - for next button (smaller on mobile)
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				'neon-cyan': 'hsl(var(--neon-cyan))',
				'neon-cyan-glow': 'hsl(var(--neon-cyan-glow))',
				'terminal-green': 'hsl(var(--terminal-green))',
				'dark-surface': 'hsl(var(--dark-surface))',
				'darker-surface': 'hsl(var(--darker-surface))',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'terminal-typing': {
					'0%': { width: '0' },
					'100%': { width: '100%' }
				},
				'cursor-blink': {
					'0%, 50%': { opacity: '1' },
					'51%, 100%': { opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'terminal-typing': 'terminal-typing 3s ease-out infinite',
				'cursor-blink': 'cursor-blink 1s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
