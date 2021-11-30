const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        ...colors,
        "regal-blue": "rgb(36, 62,99)",
        "fb-blue": "#3c72a9",
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
        lora: ['"Lora"', "sans-serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
