/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#59598E', // Base/Primary
                    light: '#6E6E9D',   // Shade 1
                    lighter: '#8383AD', // Shade 2
                    lightest: '#A3A3C0', // Shade 3
                    highlight: '#D8D8E0', // Lightest Tint
                },
                shade1: '#6E6E9D',
                shade2: '#8383AD',
                shade3: '#A3A3C0',
                dark: {
                    bg: '#1a1a2e', // Deep dark background for contrast
                    card: '#252540', // Slightly lighter for cards
                }
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                gradient: 'gradient 6s ease infinite',
                'spin-slow': 'spin 8s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                    '50%': { transform: 'translateY(-20px) translateX(10px)' },
                },
                gradient: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            },
        },
    },
    plugins: [],
}
