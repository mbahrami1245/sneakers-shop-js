/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/public/*.{html,js}", "./src/js/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        archivo: ["Archivo"],
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
