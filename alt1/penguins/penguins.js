const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

function timeInWords(timestamp) {
	let days = Math.floor(timestamp / ONE_DAY).toString();
	let hours = Math.floor(timestamp % ONE_DAY / ONE_HOUR);
	let minutes = Math.floor(timestamp % ONE_HOUR / ONE_MINUTE);
	let seconds = Math.floor(timestamp % ONE_MINUTE / ONE_SECOND);
	let milliseconds = Math.floor(timestamp % ONE_SECOND);
	
	let words = "";
	if (timestamp > ONE_DAY) { words += `${days} day${days > 1 ? 's' : ''} `; }
	if (timestamp > ONE_HOUR) { words += `${hours} hour${hours > 1 ? 's' : ''} `; }
	if (timestamp > ONE_MINUTE) { words += `${minutes} minute${minutes > 1 ? 's' : ''} ago`; }
	if (timestamp < ONE_MINUTE) { words = `less than 1 minute ago`; }
	
	return words;
}

function update() {
	fetch('https://cors-anywhere.herokuapp.com/https://jq.world60pengs.com/rest/cache/actives.json')
		.then(response => response.json())
		.then(penguins => {
			let bear = penguins.Bear[0];
			bear.disguise = "Bear";
			bear.points = 1;
			penguins.Activepenguin.push(bear);
		
			for (let [i,penguin] of penguins.Activepenguin.entries()) {
				let penguinLine = document.querySelectorAll("#penguin-list>div")[i];
				if (!penguinLine) {
					penguinLine = document.createElement("div");
					penguinLine.addEventListener("mousedown", e => { if (e.buttons == 1) {
						penguinLine.classList.toggle("done");
					}});
					
					document.querySelector("#penguin-list").appendChild(penguinLine);
				} else {
					penguinLine.innerHTML = "";
				}
				
				let icon = document.createElement("img");
				icon.classList.add("icon");
				icon.src = `${penguin.disguise.toLowerCase()}.png`;
				penguinLine.appendChild(icon);
				
				let name = document.createElement("div");
				name.classList.add("name");
				name.innerHTML += `${penguin.name} - ${penguin.disguise} (${penguin.points})`;
				name.innerHTML += penguin.requirements ? ` <span class="requirements" title="${penguin.requirements.replace(/\"/g, '&quot;')}">i</span>` : ``;
				name.innerHTML += penguin.warning ? ` <span class="warning" title="${penguin.warning.replace(/\"/g, '&quot;')}">!</span>` : ``;
				penguinLine.appendChild(name);
				
				let info = document.createElement("div");
				info.classList.add("info");
				info.innerHTML += (penguin.format == 1) ? `Confined to ${penguin.confined_to}<br>` : ``;
				info.innerHTML += `Last seen <span class="location">${penguin.last_location || penguin.location}</span> ${timeInWords(Date.now() - (penguin.time_seen*1000))}`;
				penguinLine.appendChild(info);
			}
		});
}

setInterval(update, ONE_MINUTE);
update();

if (window.alt1 && alt1.versionint > 1001000) { alt1.identifyAppUrl("appconfig.json"); }
