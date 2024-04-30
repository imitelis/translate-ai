import withMT from "@material-tailwind/react/utils/withMT";

// Configuration object for Tailwind CSS
const config = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});

// Apply the configuration directly
export default config;
