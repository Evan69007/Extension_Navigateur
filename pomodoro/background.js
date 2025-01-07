chrome.action.onClicked.addListener(() => {
	chrome.windows.create({
		url: 'pomodoro.html',
		type: 'panel', width: 230, height: 260,
	 });
});