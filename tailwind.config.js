/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        chart: "url('../public/chart.svg')",
        players: "url('../public/players.svg')",
        play: "url('../public/play.svg')",
        star: "url('../public/star.svg')",
      },
    },
  },
  plugins: [],
};
