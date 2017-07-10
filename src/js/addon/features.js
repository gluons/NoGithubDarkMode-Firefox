let lightenHeader = () => {
	let siteHeader = document.querySelector('.site-header');
	if (siteHeader) {
		siteHeader.classList.add('light');
	}
};

browser.storage.sync.get({
	enableOnFeaturesPage: true
})
	.then(retrievedOptions => {
		if (retrievedOptions.enableOnFeaturesPage) {
			lightenHeader();
		}
	})
	.catch(() => {
		lightenHeader(); // Fallback to light theme when can't retrieve the options
	});
