chrome.action.onClicked.addListener(() => {
	chrome.windows.create({
		url: 'hub.html',
		type: 'panel', width: 250, height: 360,
	 });
});