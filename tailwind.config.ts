import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./styles/**/*.{css}", 
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "#102A44", // Dark blue main background
          component: "#173A5E", // Slightly lighter dark blue component background
          border: "#1F4D79", // Noticeable blue border that contrasts well
        },
        text: {
          primary: "#E3EDF4", // Light text for contrast against dark background
          secondary: "#B0C5D8", // Softer, muted blue-gray for secondary text
        },
        accent: {
          primary: "#3F7FAE", // Vibrant blue for buttons/links (from previous hover)
          hover: "#5197CA", // Lighter, noticeable hover effect
          clicked: "#2C6C94", // Darker blue for active state
        },
        complementary: {
          coral: "#DA6851", // Keeping the warm secondary accent for contrast
          mutedGold: "#C49A6C",
        },
        feedback: {
          success: "#2F8F65", // Green for success (unchanged)
          warning: "#F4A259", // Warm orange for warning (unchanged)
          error: "#D9534F", // Red for error (unchanged)
        },
      },
      screens: {
        "mobile-range": { raw: "(min-width: 375px) and (max-width: 430px)" },
      },
      spacing: {
        25: "6.25rem",
        20: "5rem",
      },
    },
  },
  plugins: [
		require('tailwind-scrollbar-hide')
	],
};

export default config;
