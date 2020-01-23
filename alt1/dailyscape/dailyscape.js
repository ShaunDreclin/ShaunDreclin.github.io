const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;

let savedTasks = JSON.parse(localStorage.savedTasks || "[]");
let scrollBar = localStorage.scrollBar || "";

function getCountdown(timestamp) {
	let days = Math.floor(timestamp / ONE_DAY).toString();
	let hours = Math.floor(timestamp % ONE_DAY / ONE_HOUR).toString().padStart(2, "0");
	let minutes = Math.floor(timestamp % ONE_HOUR / ONE_MINUTE).toString().padStart(2, "0");
	let seconds = Math.floor(timestamp % ONE_MINUTE / ONE_SECOND).toString().padStart(2, "0");
	let milliseconds = Math.floor(timestamp % ONE_SECOND).toString().padStart(3, "0");
	
	if (days > 0) { return `${days} day${days > 1 ? 's' : ''}`; }
	else if ( timestamp > 0 ) { return `${hours}:${minutes}:${seconds}`; }
	else { return "Ready"; }
}

function swapTasks(idxA, idxB) {
	if (idxA < idxB && idxB < savedTasks.length
	|| idxA > idxB && idxB >= 0) {
		let tmp = savedTasks[idxA];
		savedTasks[idxA] = savedTasks[idxB];
		savedTasks[idxB] = tmp;
	}
}

function drawTasks() {
	for (let [i, task] of savedTasks.entries()) {
		let taskLine = document.querySelector(`div[data-index="${i}"]`);
		
		if (taskLine == null) { //Add task line
			let taskLine = document.createElement("div");
			taskLine.dataset.index = i;
			taskLine.addEventListener("mousedown", e => { if (e.buttons == 1) {
				let task = savedTasks[taskLine.dataset.index];
				if (task.completed > 0) { task.completed = 0; }
				else { task.completed = Date.now(); }
			}});

			let name = document.createElement("div");
			name.classList.add("name");
			name.innerHTML = task.name;
				
			let time = document.createElement("div");
			time.classList.add("time");

			let options = document.createElement("div");
			options.classList.add("options");
			
			let moveUp = document.createElement("div");
			moveUp.innerHTML = "ᐱ";
			moveUp.addEventListener("mousedown", e => { if (e.buttons == 1) {
				e.stopPropagation();
				swapTasks(taskLine.dataset.index, +taskLine.dataset.index - 1);
			}});

			let remove = document.createElement("div");
			remove.innerHTML = "X";
			remove.addEventListener("mousedown", e => { if (e.buttons == 1) {
				e.stopPropagation();
				savedTasks.splice(taskLine.dataset.index, 1);
				taskLine.innerHTML = "";
				taskLine.remove();
				for (let [i, taskLine] of document.querySelectorAll("#task-list>div").entries()) {
					taskLine.dataset.index = i;
				}
			}});

			let moveDown = document.createElement("div");
			moveDown.innerHTML = "ᐯ";
			moveDown.addEventListener("mousedown", e => { if (e.buttons == 1) {
				e.stopPropagation();
				swapTasks(taskLine.dataset.index, +taskLine.dataset.index + 1);
			}});

			options.appendChild(moveUp);
			options.appendChild(remove);
			options.appendChild(moveDown);
			
			taskLine.appendChild(name);
			taskLine.appendChild(options);
			taskLine.appendChild(time);
			document.querySelector("#task-list").appendChild(taskLine);
			
		} else { //Update task line
			taskLine.querySelector(".name").innerHTML = task.name;

			let completed = new Date(task.completed);
			
			let nextReset;
			switch (task.interval) {
				case "daily": nextReset = new Date(Date.UTC(completed.getUTCFullYear(), completed.getUTCMonth(), completed.getUTCDate() + 1)); break;
				case "weekly": nextReset = new Date(Date.UTC(completed.getUTCFullYear(), completed.getUTCMonth(), completed.getUTCDate() + (completed.getUTCDay() < 3 ? 3 : 10)-completed.getUTCDay())); break;
				case "monthly": nextReset = new Date(Date.UTC(completed.getUTCFullYear(), completed.getUTCMonth() + 1)); break;
			}
			
			let countdown = getCountdown(nextReset - Date.now());
			taskLine.querySelector(".time").innerHTML = countdown;
			
			if (countdown == "Ready") { task.completed = 0; taskLine.classList.add("ready"); }
			else { taskLine.classList.remove("ready"); }
		}
	}
	
	localStorage.savedTasks = JSON.stringify(savedTasks);
	
	document.body.style.overflow = scrollBar ? "scroll" : "hidden";
	localStorage.scrollBar = scrollBar || "";
}

function addTask() {
	let task = {
		name: document.querySelector("#task-name").value,
		interval: document.querySelector("input[name='task-interval']:checked").id,
		completed: 0
	}
	
	document.querySelector("#task-name").value = "";
	savedTasks.push(task);
}

document.querySelector("#task-name").addEventListener("keydown", e => { if (e.key == "Enter") { addTask(); } });
document.querySelector("#task-submit").addEventListener("mousedown", e => { if (e.buttons == 1) { addTask(); } });
document.querySelector("#scroll-bar").addEventListener("mousedown", e => { if (e.buttons == 1) { scrollBar = !scrollBar; } });

setInterval(drawTasks, 100);
drawTasks();

if (window.alt1 && alt1.versionint > 1001000) { alt1.identifyAppUrl("appconfig.json"); }
