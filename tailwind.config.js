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
			caveat: ["Caveat"]
		},
		colors: {
			'bg-purple': '#3B3486'
		}
	},
  },
  plugins: []
}

