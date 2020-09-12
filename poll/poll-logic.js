/** @format */

const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("id");

let userData = null;

let canVote = false;

let votes = [0, 0, 0, 0];

let curHighestVote = 4;

console.log("Starting Selected: " + curHighestVote);

getUserData(userID, setupDisplay);

function setupDisplay(_userData) {
	userData = _userData;

	console.log(userData);

	// Setup Slots
	for (let i = 0; i < 4; i++) {
		let name = $("#char" + (i + 1) + "_name");
		let img = $("#char" + (i + 1) + "_img");

		name.text(userData.userData[i].name);
		img.attr("src", userData.userData[i].image);
	}

	// Setup license stuff
	setupLicense(userData);

	startPoll(userData);
}

function setupLicense(userData) {
	let licenseEnd = Date.parse(userData.userInfo.license);
	let currTime = Date.now();

	if (licenseEnd > currTime) {
		$(".watermark").hide();

		let colorSettings = JSON.parse(userData.userInfo.colors);
		let langSettings = JSON.parse(userData.userInfo.lang);

		console.log(colorSettings);
		console.log(langSettings);

		// Colors
		if (!(Object.keys(colorSettings).length === 0 && colorSettings.constructor === Object)) {
			document.getElementById("char1").style.backgroundColor = colorSettings[0];
			document.getElementById("char2").style.backgroundColor = colorSettings[1];
			document.getElementById("char3").style.backgroundColor = colorSettings[2];
			document.getElementById("char4").style.backgroundColor = colorSettings[3];
		}

		// Language
		if (!(Object.keys(langSettings).length === 0 && langSettings.constructor === Object)) {
			console.info("Custom Language");

			if (langSettings.title != "") $("#title").text(langSettings.title);
			if (langSettings.subtitle != "") $("#subtitle").text(langSettings.subtitle);
			if (langSettings.choice != "") $("#choice").text(langSettings.choice);
			if (langSettings.instruction != "") $("#instruction").text(langSettings.instruction);
			if (langSettings.winner != "") $("#winner").text(langSettings.winner);
		}
	}
}

function authTwitch(userData) {
	// Provide your token, username and channel. You can generate a token
	// here: https://twitchapps.com/tmi/
	const clientId = TwitchInfo.clientId;
	const username = userData.userInfo.username;

	const channel = username;

	console.log("Client: " + clientId);
	console.log("Channel: " + channel);
	console.log(userData);

	// Instantiate clients.
	const { chat } = new TwitchJs({ clientId });

	const handleMessage = (message) => {
		if (message.event == "PRIVMSG") {
			console.log(message.message);

			updateVotes(message.message);
		}
	};

	// Listen for all events.
	chat.on("PRIVMSG", handleMessage);

	// Connect ...
	chat.connect().then(() => {
		// ... and then join the channel.
		chat.join(channel);
	});

	// Update the poll visual every 0.75s
	updateVisual();

	decreaseTime();
}

function strip(html) {
	var doc = new DOMParser().parseFromString(html, "text/html");
	return doc.body.textContent || "";
}

function updateVotes(message) {
	if (!isNaN(message)) {
		console.log("Counting vote for: " + message);

		message = Number.parseInt(message);

		switch (message) {
			case 1:
				votes[0] = votes[0] + 1;
				break;
			case 2:
				votes[1] = votes[1] + 1;
				break;
			case 3:
				votes[2] = votes[2] + 1;
				break;
			case 4:
				votes[3] = votes[3] + 1;
				break;
			default:
				console.log(message + " is an invalid option!");
				break;
		}

		console.log(votes);
	}
}

let countDown;
let updateVote;
let inactiveTime = 0;

function updateVisual() {
	updateVote = setInterval(function () {
		mostVotes = findHighScore();

		let hasChanged = false;

		if (mostVotes < curHighestVote) {
			curHighestVote--;
			hasChanged = true;
		} else if (mostVotes > curHighestVote) {
			curHighestVote++;
			hasChanged = true;
		}

		let charSlots = $(".charslot");

		if (hasChanged) {
			charSlots.each(function () {
				$(this).addClass("grayscale");
			});

			$("#char" + (curHighestVote + 1)).removeClass("grayscale");

			let rnd = Math.floor(Math.random() * 3);

			switch (rnd) {
				case 0:
					select1.play();
					break;
				case 1:
					select2.play();
					break;
				case 2:
					select3.play();
					break;
			}
		} else if (inactiveTime > Math.floor(Math.random() * 20)) {
			curHighestVote = Math.floor(Math.random() * 4) + 1;
			inactiveTime = 0;
		} else {
			inactiveTime++;
		}
	}, 750);
}

function decreaseTime() {
	countDown = setInterval(function () {
		let timeLeft = Number.parseInt($("#time").text());

		timeLeft--;

		$("#time").text(timeLeft);

		if (timeLeft == 0) {
			clearInterval(updateVote);
			clearInterval(countDown);

			showWinner();
		}
	}, 1000);
}

function showWinner() {
	let selection = document.getElementsByClassName("selection")[0];
	let winner = document.getElementsByClassName("winner")[0];

	let winnerName = document.getElementById("win-name");
	let winnerImg = document.getElementById("win-img");
	let totalVotes = document.getElementById("total-votes");

	winnerName.innerHTML = userData.userData[mostVotes].name;
	totalVotes.innerHTML = votes[mostVotes];

	winnerImg.src = userData.userData[mostVotes].image;

	select4.play();
	flash();

	selection.style.display = "none";
	winner.style.display = "block";
}

function findHighScore() {
	var highScoreSoFar = 0;
	var result = 0;
	for (var i = 0; i < votes.length; i++) {
		if (votes[i] > highScoreSoFar) {
			result = i;
			highScoreSoFar = votes[i];
		}
	}
	return result;
}
