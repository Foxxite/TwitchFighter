/** @format */

function getUserData(userid, callback) {
	let dataurl = "./php/data.php";

	if (window.location.href.includes("poll")) {
		dataurl = "../php/data.php";
	} else {
		dataurl = "./php/data.php";
	}

	let xhr = new XMLHttpRequest();
	xhr.open("GET", dataurl + "?id=" + userid);

	xhr.send();

	xhr.onload = function () {
		callback(JSON.parse(xhr.response));
	};

	xhr.onerror = function () {
		// only triggers if the request couldn't be made at all
		alert(`Network Error ${xhr.status} ${xhr.response}`);
	};
}
