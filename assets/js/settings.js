/** @format */

const urlParams = new URLSearchParams(window.location.search);
const userID = urlParams.get("id");

const authCookie = getCookie("twitchAuth");

if (atob(authCookie).split("=")[1] != userID) {
	document.location.replace("https://foxxite.com/twitch");
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(";");
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

let userData = getUserData(userID, setupSettings);

function setupSettings(userData) {
	console.log(userData);

	$("#display_name").text(userData.userInfo.displayname);
	$("#profile-img").attr("src", userData.userInfo.image);

	$("#userid_in").val(userID);

	let url = window.location.href;

	$("#pollUrl").val(url.substring(0, url.lastIndexOf("/") + 1) + "poll?id=" + userID);

	$("#volume").val(userData.userInfo.volume);
	$("#volume_display").text(userData.userInfo.volume);

	licenseCheck(userData);

	// Setup Settings
	for (let i = 0; i < 4; i++) {
		let nameInput = $("#char" + (i + 1) + "_name_in");
		let imgInput = $("#char" + (i + 1) + "_img_in");

		nameInput.val(userData.userData[i].name);
		imgInput.val(userData.userData[i].image);
	}

	// Setup Preview
	for (let i = 0; i < 4; i++) {
		let name = $("#char" + (i + 1) + "_name");
		let img = $("#char" + (i + 1) + "_img");

		name.text(userData.userData[i].name);
		img.attr("src", userData.userData[i].image);
	}
}

$("#volume").on("input", function (e) {
	e.preventDefault();

	$("#volume_display").text($(this).val());
});

function licenseCheck(userData) {
	let licenseText = $("#license-end");

	let licenseSettings = document.getElementsByClassName("premium")[0];

	let licenseEnd = Date.parse(userData.userInfo.license);
	let currTime = Date.now();

	if (licenseEnd < currTime) {
		licenseText.text("No active license, contact foxxite@foxxite.com.");
		licenseSettings.style.display = "none";
	} else {
		licenseText.text(userData.userInfo.license);
	}

	let colorSettings = JSON.parse(userData.userInfo.colors);
	let langSettings = JSON.parse(userData.userInfo.lang);

	console.log(colorSettings);
	console.log(langSettings);

	// Colors
	if (!(Object.keys(colorSettings).length === 0 && colorSettings.constructor === Object)) {
		console.info("Custom Colors");

		$("#p_slot1_color").val(colorSettings[0]);
		$("#p_slot2_color").val(colorSettings[1]);
		$("#p_slot3_color").val(colorSettings[2]);
		$("#p_slot4_color").val(colorSettings[3]);

		document.getElementById("char1").style.backgroundColor = colorSettings[0];
		document.getElementById("char2").style.backgroundColor = colorSettings[1];
		document.getElementById("char3").style.backgroundColor = colorSettings[2];
		document.getElementById("char4").style.backgroundColor = colorSettings[3];
	} else {
		console.info("Non Custom Colors");

		$("#p_slot1_color").val("#f5f500");
		$("#p_slot2_color").val("#00a2f5");
		$("#p_slot3_color").val("#f50000");
		$("#p_slot4_color").val("#00f500");
	}

	// Language
	if (!(Object.keys(langSettings).length === 0 && langSettings.constructor === Object)) {
		console.info("Custom Language");

		$("#p_title").val(langSettings.title);
		$("#p_subtitle").val(langSettings.subtitle);
		$("#p_choice").val(langSettings.choice);
		$("#p_instruction").val(langSettings.instruction);
		$("#p_winner").val(langSettings.winner);
	}
}
