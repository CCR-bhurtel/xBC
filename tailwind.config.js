/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
    theme: {
        extend: {
            screens: {
                sm: '425px',
                md: '768px',
                lg: '1024px',
                xlg: '1440px',
                mobile: '500px',
                tablet: '900px',
                laptop: '1440px',
            },
            fontSize: {
                large: ['84px', '84px'],
            },
            fontFamily: {
                Grotesk: ['Power Grotesk', 'serif'],
            },
            colors: {
                gray: {
                    DEFAULT: '#F7F7F7',
                    200: '#70707020',
                    300: '#131418',
                    400: '#ffffff80',
                    500: '#333333',
                },
                pink: {
                    DEFAULT: '#ff006c',
                },
            },
        },
    },
    plugins: [require('tw-elements/dist/plugin')],
};
