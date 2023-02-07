/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-desktop":
          "url('https://occ-0-606-41.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABd3r5roiWdkWvAs49NuKgxuFeX96lH5sjXUMKPeR_bX4WWfi7rdziLpNIkyvoYXA6UByixGKAMh67ZMkaiC7lYJ4ce7_8w-bDlhl.jpg?r=662')",
        "hero-mobile":
          "url('https://occ-0-606-41.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABTh11e96GvfQoUIu3uclCMPQXo-eQhkWYXXmxjaCWsilO4ekYHwgiXXOREGjZitrscvEzoW44RN42VKrzLK345Xf7y1F9LoVB10W.jpg?r=8cf')",
      },
      colors: {
        red: {
          50: "#f2848a",
          100: "#ef6b72",
          200: "#ed535b",
          300: "#ea3a43",
          400: "#e8222c",
          500: "#e50914",
          600: "#ce0812",
          700: "#b70710",
          800: "#a0060e",
          900: "#89050c",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
