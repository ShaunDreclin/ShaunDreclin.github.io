console.log = function () {
	let message = "";
	for (let i = 0; i < arguments.length; i++) {
		message += (typeof arguments[i] === "object") ? `${JSON.stringify(arguments[i])} ` : `${String(arguments[i])} `;
	}
	message = message.substring(0, message.length - 1);
	
	let today = new Date();
	let time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;
	
	document.querySelector("#console").innerHTML = `<p class="console-item log-item"><span class="timestamp">${time}</span>&nbsp;<span class="prefix">[LOG]</span>&nbsp;<span class="message">${message}</span></p>` + document.querySelector("#console").innerHTML;
}

window.onerror = function(errorMsg, url, lineNumber) {
	let today = new Date();
	let time = `${today.getHours()}:${today.getMinutes().toString().padStart(2, "0")}:${today.getSeconds().toString().padStart(2, "0")}`;
	
	document.querySelector("#console").innerHTML = `<p class="error-item log-item"><span class="timestamp">${time}</span>&nbsp;<span class="prefix">[ERROR]</span>&nbsp;<span class="message">${errorMsg}</span> - <span class="url">${url.split("/").pop()}</span><span class="lineNumber">:${lineNumber}</span></p>` + document.querySelector("#console").innerHTML;
	return true;
}
