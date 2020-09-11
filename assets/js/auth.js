/** @format */

let authResponse = parseTwitchResponse(document.location.hash);

getTwitchData(authResponse);

function parseTwitchResponse(queryString) {
	var query = {};
	var pairs = (queryString[0] === "#" ? queryString.substr(1) : queryString).split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pair = pairs[i].split("=");
		query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
	}
	return query;
}

function getTwitchData(authResponse) {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "https://api.twitch.tv/helix/users");
	xhr.setRequestHeader("Authorization", "Bearer " + authResponse.access_token);
	xhr.setRequestHeader("Client-ID", TwitchInfo.clientId);

	xhr.send();

	xhr.onload = function () {
		processResponse(xhr.response);
	};

	xhr.onerror = function () {
		// only triggers if the request couldn't be made at all
		alert(`Network Error ${xhr.status} ${xhr.response}`);
	};
}

function processResponse(response) {
	response = JSON.parse(response);
	response = response.data[0];

	console.log(response);

	var data = new FormData();
	data.append("id", response.id);
	data.append("username", response.login);
	data.append("displayname", response.display_name);
	data.append("image", response.profile_image_url);

	let xhr = new XMLHttpRequest();
	xhr.open("POST", "./php/auth.php");

	xhr.send(data);

	xhr.onload = function () {
		if (this.responseText == "OK") {
			document.location.replace("./settings?id=" + response.id);
		} else {
			alert("Something went wrong, please report the error to Foxxite.");

			document.getElementById("output").innerHTML = this.responseText;
		}
	};

	xhr.onerror = function () {
		// only triggers if the request couldn't be made at all
		alert(`Network Error ${xhr.status} ${xhr.response}`);
	};
}
