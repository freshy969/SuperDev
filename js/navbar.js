// Start dark/light mode
// Add/remove class .dark on parent node based on settings present.
// Tailwind checks for class .dark on parent node (via output.css not JS) to check if dark mode is enabled.
if (
	(localStorage.theme === 'dark' && !document.documentElement.classList.contains('dark')) ||
	(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches && !document.documentElement.classList.contains('dark'))
) {
	document.documentElement.classList.add('dark');
} else if (
	(localStorage.theme === 'light' && document.documentElement.classList.contains('dark')) ||
	(!('theme' in localStorage) && !window.matchMedia('(prefers-color-scheme: dark)').matches && document.documentElement.classList.contains('dark'))
) {
	document.documentElement.classList.remove('dark');
}

function darkMode() {
	console.log('Function Call');
	if (localStorage.theme === 'dark' && !document.documentElement.classList.contains('dark')) {
		localStorage.theme = 'light';
		document.documentElement.classList.remove('dark');
	} else if (localStorage.theme === 'light' && document.documentElement.classList.contains('dark')) {
		localStorage.theme = 'dark';
		document.documentElement.classList.add('dark');
	}
}
// End dark/light mode
// End dark/light mode
