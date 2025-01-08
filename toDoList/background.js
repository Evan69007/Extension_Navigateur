chrome.action.onClicked.addListener(() => {
	chrome.windows.create({
		url: 'popup.html',
		type: 'panel', width: 400, height: 400,
	 });
});