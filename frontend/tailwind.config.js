/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      "5xl": "4rem",
      "4xl": "3rem",
      "3xl": "2.8rem",
      "2xl": "2rem",
      xl: "1.5rem",
      lg: "1.8rem",
      md: "1rem",
      sm: "0.5rem",
      xs: "0.3rem",
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700,
    },
    extend: {
      colors: {
        primary: "#000000",
        secondary: "#FFFFFF",
        action: "#2B2B2B",
      },
      boxShadow: {
        bottom: "0 0 15px 0 rgba((34 197 94 )",
        top: "0 0 -15px 0 rgba(0,0,0,0.2)",
        left: "0 0 15px 0 rgba(0,0,0,0.2)",
        right: "0 0 -15px 0 rgba(0,0,0,0.2)",
        all: "0 0 15px 0 rgba(0,0,0,0.2)",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(to bottom, rgba(0, 0, 0, 0.9),rgba(0, 0, 0, 0.6)),url('/static/images/bg.jpg')",
        "footer-texture": "url('../static/images/bg.jpg')",
      },
      backgroundSize: {
        "hero-pattern": "cover",
        cover: "cover",
        contain: "contain",
        "50%": "50%",
        16: "4rem",
      },
      backgroundPosition: {
        "hero-pattern": "bottom",
        center: "center",
        left: "left",
        right: "right",
        top: "top",
      },
      animation: {
        "flip-horizontal-bottom":
          "flip-horizontal-bottom 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;",
      },

      keyframes: {
        "flip-horizontal-bottom": {
          "100%": {
            "-webkit-transform": "rotateX(0);",
            transform: "rotateX(0);",
          },

          "0%": {
            "-webkit-transform": "rotateX(-180deg);",
            transform: "rotateX(-180deg);",
          },
        },
      },
    },
  },
  plugins: [],
};
