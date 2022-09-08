const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      gridTemplateColumns: {
        fileupload: '50px auto',
      },
      gridTemplateRows: {
        progress: '25px auto 25px',
      },
      margin: {
        '-half': '50%',
      },
      minHeight: {
        hscreen: '50vh',
        20: '5rem',
        24: '6rem',
        28: '7rem',
        32: '8rem',
        36: '9rem',
      },
      fontFamily: {
        title: ['Proza Libre', 'sans-serif'],
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'center-light-sm': '0 0 3px 0 #d9dbe0',
        'center-light-md': '0 0 5px 0 #d9dbe0',
        'center-light-lg': '0 0 7px 0 #d9dbe0',
        'center-light-xl': '0 0 9px 0 #d9dbe0',
        'center-sm': '0 0 3px 0 #8d8e90',
        'center-md': '0 0 5px 0 #8d8e90',
        'center-lg': '0 0 7px 0 #8d8e90',
        'center-xl': '0 0 9px 0 #8d8e90',
      },
      colors: {
        primary: {
          lighter: '#e5e7eb',
          light: '#929AA0',
          DEFAULT: '#5D656B',
          dark: '#42484C',
        },
        secondary: {
          lighter: '#e6f4fd',
          light: '#92c1e3',
          DEFAULT: '#428DC2',
          dark: '#326F9A',
        },
        ternary: {
          lighter: '#faf8f7',
          light: '#EDE5DF',
          // light: '#d4c1b3',
          DEFAULT: '#AB8367',
          dark: '#916B50',
        },
        success: {
          DEFAULT: '#3ac47d',
        },
        warning: {
          DEFAULT: colors.amber[500],
        },
        danger: {
          DEFAULT: '#d92550',
        },
        info: {
          DEFAULT: '#16aaff',
        },
        teal: colors.teal,
        rose: colors.rose,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          // marginLeft: 'auto',
          // marginRight: 'auto',
          // paddingLeft: '2rem',
          // paddingRight: '2rem',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '768px',
          },
          '@screen lg': {
            maxWidth: '1024px',
          },
          '@screen xl': {
            maxWidth: '1280px',
          },
        },
      });
    },

    require('tailwindcss'),
    require('autoprefixer'),
    require('tw-elements/dist/plugin'),
  ],
};
