tailwind.config = {
  theme: {
    extend: {
      animation: {
        "spin-x": "spin-x 7s linear infinite",
        scroll: "scroll 40s linear infinite",
      },
      keyframes: {
        "spin-x": {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(-360deg)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-200px * 7))" },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};
