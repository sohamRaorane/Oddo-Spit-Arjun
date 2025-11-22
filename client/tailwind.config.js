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
                dark: {
                    bg: '#1a1a2e', // Deep dark background for contrast
                    card: '#252540', // Slightly lighter for cards
                }
            },
        },
    },
    plugins: [],
}
