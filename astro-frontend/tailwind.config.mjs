/* Configuración de Tailwind CSS */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		fontFamily: {
		  page: ['Poppins', 'sans-serif'],
		  sans: ['Poppins', 'sans-serif'],
		},
		colors: {
		  primary: '#142957',
		  secondary: '#fab91d',
		  background: '#F5F5F5',
		},
		/* Para bordes */
		borderRadius: {
		  '3xl': '3rem',
		},
	  },
	},
	plugins: [],
  };
  