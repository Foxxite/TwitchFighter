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
let impactEffect = new Audio("../assets/audio/impact02.ogg");

let awaitAudio = setInterval(function () {
	if (backgroundMusic.readyState == 4) {
		startMusic();
	}
}, 150);

async function startMusic() {
	try {
		await backgroundMusic.play();
		backgroundMusic.loop = true;
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
	}, 500);
}

function pressStart() {
	let start = document.querySelector("#start");
	let players = document.querySelector("#players");

	setTimeout(function () {
		start.style.display = "block";
	}, 500);

	setTimeout(function () {
		select4.play();
		flash();
		start.style.display = "none";
		players.style.display = "block";

		playerSelector();
	}, 500 + 2000);
}

function playerSelector() {
	let switchCount = 0;

	let switchPlayer = setInterval(function () {
		if (switchCount == 4) {
			clearInterval(switchPlayer);

			let title = document.getElementsByClassName("title")[0];
			title.style.display = "none";

			impactEffect.play();
			flash();

			let selection = document.getElementsByClassName("selection")[0];
			selection.style.display = "block";
		} else {
			jumpEffect.play();

			let selected = document.getElementsByClassName("selected")[0];
			let unselected = document.getElementsByClassName("unselected")[0];

			selected.classList.remove("selected");
			selected.classList.add("unselected");

			unselected.classList.remove("unselected");
			unselected.classList.add("selected");

			switchCount++;

			if (switchCount == 4) {
				let player1 = document.getElementById("player1");
				player1.classList.add("blink");
			}
		}
	}, 1200);
}

function flash() {
	let flash = document.getElementsByClassName("flash")[0];

	flash.style.display = "block";

	setTimeout(function () {
		flash.style.display = "none";
	}, 100);
}
