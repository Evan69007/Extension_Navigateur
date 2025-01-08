const progressBar = document.querySelector('#pomodoro');
const timer = document.querySelector('#timer');
const restartButton = document.querySelector('#restart');
const audio = document.querySelector('#audio');
let progressValue = (localStorage.getItem("pomodoro_progress") ? 600 - localStorage.getItem("pomodoro_progress") : 600)
let timeLeft
let time = (localStorage.getItem("pomodoro_timer") ? localStorage.getItem("pomodoro_timer").split(":") : [])
let min = (time.length != 0 ? parseInt(time[0]) : 10)
let sec = (time.length != 0 ? time[1] : 0)
let timerID

timer.innerHTML = "Chargement des données"

const startTimer = () => {
	timerID = setInterval(() => {
		progressBar.value = 600 - progressValue
		progressValue--
		if (sec == 0 && min > 0)
		{
			sec = 59
			min--
		}
		else if (min >= 0)
		{
			sec--
		}
		timeLeft = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
		timer.innerHTML = timeLeft
		localStorage.setItem("pomodoro_timer", timeLeft)
		localStorage.setItem("pomodoro_progress", 600 - progressValue)
		if (progressValue <= 0)
		{
			clearInterval(timerID)
			audio.play()
		}
	}, 1000)
}

restartButton.addEventListener('click', () => {
	localStorage.removeItem("pomodoro_timer")
	localStorage.removeItem("pomodoro_progress")
	clearInterval(timerID)
	min = 10
	sec = 0
	progressValue = 600
	progressBar.value = 0
	timeLeft = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
	timer.innerHTML = timeLeft
	startTimer()
})


startTimer()