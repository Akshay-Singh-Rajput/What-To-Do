module.exports = {
  purge: [ "./src/app/components/**/*.js", "./src/pages/**/*.js" ],
  // darkMode: false, // or 'media' or 'class'
  darkMode: 'class',
  theme: {
    extend: {
      // colors: {
      //   gray: {
      //     100: "#FBFBFB",
      //     200: "#c2c7ca",
      //     300: "#b8bcbf",
      //     400: "#999999",
      //     500: "#7F7F7F",
      //     600: "#666666",
      //     700: "#4C4C4C",
      //     800: "#121212",
      //     900: "#191919",
      //   },
      //   primary: '#64ffda', // Teal
      //   secondary: '#ff4081', // Pink
      //   background: '#121212', // Dark Gray
      //   text: '#ffffff', // White
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
