/** @type {import('tailwindcss').Config} */
export default {
  content: [
	 "./src/**/*.{html,js,jsx}",
	 "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./src/views/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
		fontFamily: {
			caveat: ["Caveat"],
			lemonada: ["Lemonada"],
			salsa: ["Salsa"],
			borel: ["Borel"]
		},
		colors: {
			'bg-purple': '#3B3486',
			'bg-pink': '#fd47bf',
			'bg-green': '#47fd85',
			'bg-blue': '#4764fd',
			'bg-dirty-green': '#7f8634'
		}
	},
  },
  plugins: []
}

