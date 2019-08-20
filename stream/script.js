function getIP(json) {
	let ip = json.ip;
	let url = window.location.protocol + "//" + window.location.host + window.location.pathname;
	let fragment = window.location.hash.substr(1);

	let usage = document.querySelector("#usage");
	usage.innerHTML = "<h1>Usage:</h1>" + url + "#ip<br>" + url + "#ip:port<br><br>Port defaults to 8080 if omitted.";
	
	let logo = document.querySelector("#logo");
	let watermark = document.querySelector("#watermark");
	watermark.innerHTML = url;

	if (fragment === "") {
		logo.style.display = "none";
		usage.style.display = "block";
		return;
	}

	let host, port;
	if (fragment.includes(":")) {
		host = fragment.split(":")[0];
		port = fragment.split(":")[1];
	} else {
		host = fragment;
		port = "8080";
	}
	
	if (host === ip) {
		host = "localhost";
	}
	
	for (let video of document.querySelectorAll("video")) { video.stop(); video.remove(); }

	let video = document.createElement("video");
	
	video.src = "http://" + host + ":" + port + "/";
	video.oncanplay = function() {
		logo.style.opacity = 0;
		watermark.style.opacity = 0;
		this.play();
	}
	
	video.onabort = function() { reload(ip); }
	video.onended = function() { reload(ip); }
	video.onerror = function() { reload(ip); }
	video.onstalled = function() { reload(ip); }
	
	document.body.appendChild(video);
}

function reload(ip) {
	for (let video of document.querySelectorAll("video")) { video.stop(); video.remove(); }
	logo.style.opacity = 1;
	watermark.style.opacity = 1;
	setTimeout(getIP, 1000, {"ip":ip});
}
