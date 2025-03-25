/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Adjust based on your project's file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e40af", // Deep Blue
        // secondary: "#232D3F", 
        "light-blue": "#3b82f6", // Light Blue
        "dark-blue": "#1e3a8a", // Dark Blue
        "sky-blue": "#0ea5e9", // Sky Blue
        "navy-blue": "#1e293b", // Navy Blue
        "soft-gray": "#6b7280", // Soft Gray
        bg: "#F8FAFF", // Background color
        // bg: "#F7FBFC", // Background color
      },
    },
  },
  plugins: [],
};
