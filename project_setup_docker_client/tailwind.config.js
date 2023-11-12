module.exports = {
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
    theme: {
        screens: {
            sm: '480px',
            md: '768px',
            lg: '976px',
            xl: '1440px',
        },

        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            width: {
                200: '200px',
            },
            spacing: {
                128: '32rem',
                144: '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            colors: {
                primary: '#003343',
                secondary: '#003343',
                cgrey: '#55686D',
                ctext: '#D0CFCF',
            },
            fontSize: {
                small: '12px',
                medium: '14px',
                large: '16px',
            },
        },
    },
};
