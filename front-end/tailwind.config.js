/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Adding Roboto as custom font
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customRed: "#FB5151",
        darkBlue: "#102325",
        customBlue: "#0087E8",
        ligthBlue: "#0093ff",
        darkGrey: "#919A9B",
        customGrey: "#B5BBBB",
        ligthGrey: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
