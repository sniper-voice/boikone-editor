module.exports = {
    content: ['./src/**/*.{ts,tsx}', './public/index.html'],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-writing-mode')({
            variants: ['responsive', 'hover'],
        }),
    ],
}
