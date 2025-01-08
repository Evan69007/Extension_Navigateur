const launchPage = document.querySelector('launchPage');
const stickyNotes = document.querySelector('#StickyNotes');
const pomodoro = document.querySelector('#POMODORO');
const favorites = document.querySelector('#Favorites');
const toDoList = document.querySelector('#ToDoList');

let pomodoroWindow
let favoritesWindow
let toDoListWindow
let sitckyNotesWindow
let launchPageWindow

pomodoro.addEventListener('click', async () => {
	if (pomodoro.checked)
	{
		pomodoroWindow = await chrome.windows.create({
			url: 'pomodoro.html',
			type: 'panel', width: 230, height: 260,
		});
	}
	else
	{
		chrome.windows.remove(pomodoroWindow.id)
	}
})

favorites.addEventListener('click', async () => {
	if (favorites.checked)
	{
		favoritesWindow = await chrome.windows.create({
			url: 'index.html',
			type: 'panel', width: 300, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(favoritesWindow.id)
	}
})

toDoList.addEventListener('click', async () => {
	if (toDoList.checked)
	{
		toDoListWindow = await chrome.windows.create({
			url: 'popup.html',
			type: 'panel', width: 400, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(toDoListWindow.id)
	}
})

stickyNotes.addEventListener('click', async () => {
	if (stickyNotes.checked)
	{
		sitckyNotesWindow = await chrome.windows.create({
			url: 'sticky.html',
			type: 'panel', width: 400, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(sitckyNotesWindow.id)
	}
})