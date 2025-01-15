chrome.action.onClicked.addListener(async () => {
	window = await chrome.windows.create({
		url: 'hub.html',
		type: 'panel', width: 440, height: 500,
		top: 0,
		left: 0,
	 });
});