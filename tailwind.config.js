module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require('tailwindcss-writing-mode')({
            variants: ['responsive', 'hover'],
        }),
    ],
}
