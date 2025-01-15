const progressBar = document.querySelector('#pomodoro');
const timer = document.querySelector('#timer');
const resetButton = document.querySelector('#reset');
const audio = document.querySelector('#audio');
const StartStopButton = document.querySelector('#startStop');
const image = document.querySelector('#playStop');
const inputTime = document.querySelector('#time');

let nb_sec = (localStorage.getItem("nb_sec") ? localStorage.getItem("nb_sec") : 600)
let progressValue = (localStorage.getItem("pomodoro_progress") ? nb_sec - localStorage.getItem("pomodoro_progress") : nb_sec)
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
		localStorage.setItem("pomodoro_progress", nb_sec - progressValue)
		if (progressValue <= 0)
		{
			clearInterval(timerID)
			audio.play()
		}
	}, 1000)
}

function updateTimer()
{
	progressBar.value = nb_sec - progressValue
	if (min <= 0 && sec <= 0)
	{
		timer.innerHTML = "00:00"
		clearInterval(timerID)
		image.src = "playButton.png"
		image.style.height = "20px"
		return
	}
	timeLeft = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec)
	timer.innerHTML = timeLeft
}

resetButton.addEventListener('click', () => {
	min = nb_sec / 60
	sec = 0
	progressValue = nb_sec
	progressBar.value = 0
	updateTimer()
	localStorage.removeItem("pomodoro_timer")
	localStorage.removeItem("pomodoro_progress")
	localStorage.removeItem("nb_sec")

	clearInterval(timerID)
	StartStopButton.removeEventListener("click", Start);
	StartStopButton.removeEventListener("click", Stop);
    StartStopButton.addEventListener("click", firstStart);

	inputTime.style.display = "inline-block"
	/* progressBar.style.marginLeft = "43px" */
	/* timer.style.marginLeft = "82px" */
	/* document.querySelector('#title').style.marginLeft = "30px" */

	image.src = "playButton.png"
	image.style.height = "20px"
})

updateTimer()

if(localStorage.getItem("nb_sec"))
{
	inputTime.style.display = "none"
	/* progressBar.style.marginLeft = "13px"
	timer.style.marginLeft = "52px"
	document.querySelector('#title').style.marginLeft = "0px" */
}
else
{
	inputTime.style.display = "inline-block"
	/* progressBar.style.marginLeft = "43px"
	timer.style.marginLeft = "82px"
	document.querySelector('#title').style.marginLeft = "30px" */
}

(localStorage.getItem("nb_sec") ? StartStopButton.addEventListener("click", Start) : StartStopButton.addEventListener("click", firstStart))

function firstStart(){
	inputTime.style.display = "none"
	/* progressBar.style.marginLeft = "13px" */
	/* timer.style.marginLeft = "52px" */
	/* document.querySelector('#title').style.marginLeft = "0px" */
	min = (inputTime.value ? inputTime.value : 10)
	sec = 0
	progressValue = min * 60
	nb_sec = min * 60
	progressBar.max = nb_sec
	localStorage.setItem("nb_sec", nb_sec)
	inputTime.value = ""
	updateTimer()
	image.src = "pauseButton.png"
	image.style.height = "20px"
	startTimer()
    StartStopButton.removeEventListener("click", firstStart);
    StartStopButton.addEventListener("click", Stop);
}

function Start()
{
	progressBar.max = nb_sec
	inputTime.style.display = "none"
	/* progressBar.style.marginLeft = "13px" */
	/* timer.style.marginLeft = "52px" */
	/* document.querySelector('#title').style.marginLeft = "0px" */
	image.src = "pauseButton.png"
	image.style.height = "20px"
	startTimer()
    StartStopButton.removeEventListener("click", Start);
    StartStopButton.addEventListener("click", Stop);
}

function Stop(){
	image.src = "playButton.png"
	image.style.height = "20px"
	clearInterval(timerID)
    StartStopButton.removeEventListener("click", Stop);
    StartStopButton.addEventListener("click", Start);
}