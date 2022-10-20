module.exports = {
	darkMode: 'class',
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				navBar: '#000000FF',
				navText: '#F3F3F3FF',

				bodyDark: '#000000FF',
				bodyLight: '#F4F4F6FF',

				btnOne: '#007CF0ff',
				btnTwo: '#06B6D4FF',
				btnText: '#F3F3F3FF',

				borderLight: '#DBDBDBFF',
				borderDark: '#222222AA',

				settingsBorder: '#27272AFF',
				settingsBG: '#18181BFF',
			},
		},
	},
	plugins: [],
};
