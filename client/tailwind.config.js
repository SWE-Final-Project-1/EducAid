/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import flowbite from "flowbite/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        app_primary: "#143463",
        app_primary_hover: "#1a437f",
        app_secondary: "#53bab9",
        app_white: "#fefefe",
        app_tertiary: "#7289DA",
      },
      fontFamily: {
        display: ["Lexand Deca", "Inter", "Roboto Mono"],
        logo: ["Lexend Deca", "Inter"],
      },
      boxShadow: {
        app_shadow_light: "box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
        app_shadow:
          "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05),0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      },
    },
  },
  plugins: [daisyui, flowbite],
  daisyui: {
    themes: false, // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "dark", // name of one of the included themes for dark mode
    // base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  },
};
