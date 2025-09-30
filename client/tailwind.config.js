/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      className: {
        inputClass: [
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-100 focus:border-sky-300 focus:ring",
        ],
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".nav-underline": {
          "@apply  before:content-[''] before:absolute before:left-1/2 before:bottom-[-2px] before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 before:ease-in-out before:transform before:-translate-x-1/2 before:origin-center hover:before:w-full":
            {},
        },
      });
    }),
    plugin(function ({ addComponents }) {
      addComponents({
        ".inputClass": {
          "@apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-sky-100 focus:border-sky-300 focus:ring":
            {},
        },
      });
    }),
  ],
};
