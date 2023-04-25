/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-primary": "#1B263B",
        "light-primary": "#E0E1DD",
        primary: "#778DA9",
        "text-icons": "#FFFFFF",
        accent: "#415A77",
        "primary-text": "#212121",
        "secondary-text": "#757575",
        divider: "#BDBDBD",
      },
    },
  },
  plugins: [],
};
