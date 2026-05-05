/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        heading: ["Space Grotesk", "Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        night: "#071112",
        graphite: "#132022",
        glass: "rgba(255,255,255,0.08)",
        cyber: "#00E0FF",
        volt: "#C8FF54",
        coral: "#FF6B5F",
        linen: "#F6F1E8",
      },
      boxShadow: {
        glow: "0 0 60px rgba(0, 224, 255, 0.18)",
        lift: "0 24px 80px rgba(0, 0, 0, 0.42)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
