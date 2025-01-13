chrome.action.onClicked.addListener(async () => {
	window = await chrome.windows.create({
		url: 'hub.html',
		type: 'panel', width: 440, height: 480,
		top: 150,
		left: 590,
	 });
});