/** @format */

// Audio Clips
let backgroundMusic = new Audio("../assets/audio/mighty_8bit_ranger.ogg");

let swishEffect = new Audio("../assets/audio/swish_01.ogg");
let dingEffect = new Audio("../assets/audio/ding.ogg");
let jumpEffect = new Audio("../assets/audio/jump1.ogg");
let select1 = new Audio("../assets/audio/select_screen1.ogg");
let select2 = new Audio("../assets/audio/select_screen2.ogg");
let select3 = new Audio("../assets/audio/select_screen3.ogg");
let select4 = new Audio("../assets/audio/select_screen4.ogg");

let awaitAudio = setInterval(function () {
	if (backgroundMusic.readyState == 4) {
		startMusic();
	}
}, 150);

async function startMusic() {
	try {
		await backgroundMusic.play();
		startAnims();
	} catch (err) {
		alert("Audio is used for timing, please allow auto play for audio and reload");
	}
}

function startAnims() {
	clearInterval(awaitAudio);

	backgroundMusic.play();

	let title = document.querySelector("#header h1");
	let subTitle = document.querySelector("#header h2");

	// Play swish effect
	title.style.display = "block";
	title.classList.add("fall");
	swishEffect.play();

	setTimeout(function () {
		subTitle.style.display = "block";
		subTitle.classList.add("zoom");
		dingEffect.play();

		pressStart();
	}, 200);
}

function pressStart() {
	let start = document.querySelector("#start");
	let players = document.querySelector("#players");

	setTimeout(function () {
		start.style.display = "block";
	}, 500);

	setTimeout(function () {
		select4.play();
		start.style.display = "none";
		players.style.display = "block";
	}, 500 + 1750);
}
