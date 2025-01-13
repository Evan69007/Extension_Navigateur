const progressBar = document.querySelector('#pomodoro');
const timer = document.querySelector('#timer');
const restartButton = document.querySelector('#restart');
const audio = document.querySelector('#audio');
const StartStopButton = document.querySelector('#startStop');
const image = document.querySelector('#playStop');

let progressValue = (localStorage.getItem("pomodoro_progress") ? 600 - localStorage.getItem("pomodoro_progress") : 600)
let timeLeft
let time = (localStorage.getItem("pomodoro_timer") ? localStorage.getItem("pomodoro_timer").split(":") : [])
let min = (time.length != 0 ? parseInt(time[0]) : 10)
let sec = (time.length != 0 ? time[1] : 0)
let timerID

const startTimer = () => {
	timerID = setInterval(() => {
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
		updateTimer()
		localStorage.setItem("pomodoro_timer", timeLeft)
		localStorage.setItem("pomodoro_progress", 600 - progressValue)
		if (progressValue <= 0)
		{
			clearInterval(timerID)
			audio.play()
		}
	}, 1000)
}

function updateTimer()
{
	progressBar.value = 600 - progressValue
	timeLeft = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
	timer.innerHTML = timeLeft
}

restartButton.addEventListener('click', () => {
	localStorage.removeItem("pomodoro_timer")
	localStorage.removeItem("pomodoro_progress")
	StartStopButton.removeEventListener("click", Start);
    StartStopButton.addEventListener("click", Stop);
	image.src = "pauseButton.png"
	clearInterval(timerID)
	min = 10
	sec = 0
	progressValue = 600
	updateTimer()
	startTimer()
})

StartStopButton.addEventListener("click", Start);

function Start(){
	image.src = "pauseButton.png"
	image.style.height = "64px"
	startTimer()
    StartStopButton.removeEventListener("click", Start);
    StartStopButton.addEventListener("click", Stop);
}

function Stop(){
	image.src = "playButton.png"
	image.style.height = "64px"
	clearInterval(timerID)
    StartStopButton.removeEventListener("click", Stop);
    StartStopButton.addEventListener("click", Start);
}

updateTimer()