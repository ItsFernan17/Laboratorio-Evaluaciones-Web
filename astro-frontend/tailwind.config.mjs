/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
		  fontFamily: {
			page: ['Inter'],
		  },
		  colors: {
			primary: '#142957',
			secondary: '#fab91d',
			background: '#D9D9D9',
		  },
		},
	  },
	plugins: [],
}
