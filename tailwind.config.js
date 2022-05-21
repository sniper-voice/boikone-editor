module.exports = {
    content: ['./src/**/*.{ts,tsx}', './public/index.html'],
    theme: {
        extend: {
            borderWidth: {
                3: '3px',
            },
        },
    },
    plugins: [
        require('tailwindcss-writing-mode')({
            variants: ['responsive', 'hover'],
        }),
    ],
}
