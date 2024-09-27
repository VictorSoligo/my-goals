/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["App.tsx", "./src/**/*.tsx"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}