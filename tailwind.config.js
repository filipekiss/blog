const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            borderRadius: {
                circle: '50%',
            },
            colors: {
                victoria: {
                    100: '#EEECF4',
                    200: '#D4D0E4',
                    300: '#BAB4D3',
                    400: '#877CB2',
                    500: 'hsl(208, 61%, 17%)',
                    600: '#4B3D83',
                    700: '#322957',
                    800: '#251F41',
                    900: '#19142C',
                },
            },
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
                mono: ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
            },
        },
        variants: {},
        plugins: [],
    },
};
