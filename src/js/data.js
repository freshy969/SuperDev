const allFeatures = [
	{
		title: 'Text Editor',
		icon: 'fa-pencil',
		id: 'textEditor',
		settings: {},
	},
	{
		title: 'Page Ruler',
		icon: 'fa-ruler-combined',
		id: 'pageRuler',
		settings: {},
	},
	{
		title: 'Color Picker',
		icon: 'fa-eye-dropper',
		id: 'colorPicker',
		settings: {
			checkboxColorPicker1: true,
			checkboxColorPicker2: false,
			checkboxColorPicker3: false,
		},
	},
	{
		title: 'Color Palette',
		icon: 'fa-swatchbook',
		id: 'colorPalette',
		settings: {
			checkboxColorPalette1: true,
			checkboxColorPalette2: false,
			checkboxColorPalette3: false,
		},
	},
	{
		title: 'Page Guideline',
		icon: 'fa-hashtag',
		id: 'pageGuideline',
		settings: {},
	},
	{
		title: 'Page Highlight',
		icon: 'fa-paintbrush',
		id: 'pageHighlight',
		settings: {
			checkboxPageHighlight1: false,
			checkboxPageHighlight2: true,
			checkboxPageHighlight3: false,
			checkboxPageHighlight4: false,
			checkboxPageHighlight5: false,
			checkboxPageHighlight6: false,
			checkboxPageHighlight7: false,
		},
	},
	{
		title: 'Move Element',
		icon: 'fa-arrows-up-down-left-right',
		id: 'moveElement',
		settings: {},
	},
	{
		title: 'Delete Element',
		icon: 'fa-trash-can',
		id: 'deleteElement',
		settings: {},
	},
	{
		title: 'Export Element',
		icon: 'fa-up-right-from-square',
		id: 'exportElement',
		settings: {
			checkboxExportElement1: true,
			checkboxExportElement2: false,
			checkboxExportElement3: false,
		},
	},
	// {
	// 	title: 'CSS Inspector',
	// 	icon: 'fa-search',
	// 	id: 'cssInspector',
	// 	settings: {},
	// },
	// {
	// 	title: 'Visualise Padding',
	// 	icon: 'fa-distribute-spacing-vertical',
	// 	id: 'visualisePadding',
	// 	settings: {},
	// },
	// {
	// 	title: 'Visualise Margin',
	// 	icon: 'fa-distribute-spacing-horizontal',
	// 	id: 'visualiseMargin',
	// 	settings: {},
	// },
	// {
	// 	title: 'Custom CSS',
	// 	icon: 'fa-code',
	// 	id: 'customCSS',
	// 	settings: {},
	// },
	// {
	// 	title: 'Custom JS',
	// 	icon: 'fa-brackets-curly',
	// 	id: 'customJS',
	// 	settings: {},
	// },
	// {
	// 	title: 'Site Fonts List',
	// 	icon: 'fa-font',
	// 	id: 'siteFontsList',
	// 	settings: {},
	// },
	// {
	// 	title: 'Font Inspector',
	// 	icon: 'fa-text-size',
	// 	id: 'fontInspector',
	// 	settings: {},
	// },
	// {
	// 	title: 'Font Changer',
	// 	icon: 'fa-font-case',
	// 	id: 'fontChanger',
	// 	settings: {},
	// },
	// {
	// 	title: 'Extract Media',
	// 	icon: 'fa-image',
	// 	id: 'extractMedia',
	// 	settings: {},
	// },
	// {
	// 	title: 'Take Screenshot',
	// 	icon: 'fa-aperture',
	// 	id: 'takeScreenshot',
	// 	settings: {},
	// },
	// {
	// 	title: 'View Responsive',
	// 	icon: 'fa-laptop-mobile',
	// 	id: 'viewResponsive',
	// 	settings: {},
	// },
	{
		title: 'Clear All Cache',
		icon: 'fa-recycle',
		id: 'clearAllCache',
		settings: {
			checkboxClearAllCache1: false,
			checkboxClearAllCache2: true,
			checkboxClearAllCache3: false,
			checkboxClearAllCache4: false,
			checkboxClearAllCache5: false,
			checkboxClearAllCache6: false,
		},
	},
	// {
	// 	title: 'Built With',
	// 	icon: 'fa-server',
	// 	id: 'builtWith',
	// 	settings: {},
	// },
];

export default allFeatures;
