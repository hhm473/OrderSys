module.exports = {
	publicPath: "./",
	css: {
		loaderOptions: {
			less: {
				lessOptions: {
					// If you are using less-loader@5 please spread the lessOptions to options directly
					// modifyVars: {
					// 	'primary-color': '#ec7d2e',
					// 	'link-color': '#ec7d2e',
					// 	'border-radius-base': '2px',
					// 	// @menu-dark-color: @text-color-secondary-dark;
					// 	// @menu-dark-bg: @primary-color;
					// 	// @menu-dark-arrow-color: #fff;
					// 	'menu-dark-submenu-bg': '#000c17',
					// 	'menu-highlight-color': '#ec7d2e',
					// 	'menu-item-boundary-margin':'0 px',
					// 	'menu-item-vertical-margin': '0 px',
					// },
					javascriptEnabled: true,
				},
			},
		},
	},
}
