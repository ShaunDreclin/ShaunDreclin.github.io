function init() {
	if (!window.SetKeyboardFocus) {
		window.requestAnimationFrame(init);
	} else {
		let soundboardData = JSON.parse(localStorage.soundboardData || "{}");

		let volume = document.querySelector("#volume");
		volume.addEventListener("input", event => {
			clip.volume = volume.value / 100;
		});

		let editMode = false;
		let editButton = document.querySelector("#edit-button");
		let editBox = document.querySelector("#edit-box");
		editButton.addEventListener("click", event => {
			if (!editMode) { //Clicked edit
				editMode = true;
				window.SetKeyboardFocus(true);
				editButton.innerHTML = "Save";
				editBox.style.visibility = "visible";

				editBox.value = JSON.stringify(soundboardData, null, "\t");				
			} else { //Clicked save
				editMode = false;
				window.SetKeyboardFocus(false);
				editButton.innerHTML = "Edit";
				editBox.style.visibility = "hidden";

				soundboardData = JSON.parse(editBox.value);
				localStorage.soundboardData = JSON.stringify(soundboardData);
				drawSoundboard();
			}
		});
		
		/**************/
		
		let clip = new Audio();
		clip.addEventListener("canplaythrough", event => {
			clip.volume = volume.value / 100;
			clip.play();
		});
		
		/**************/
		
		let soundboard = document.querySelector("#soundboard");
		function drawSoundboard() {
			soundboard.innerHTML = "";
			
			for (const [category, sounds] of Object.entries(soundboardData)) {
				let categoryDiv = document.createElement("div");
				
				let label = document.createElement("label");
				label.htmlFor = category.toLowerCase();
				label.innerHTML = category;
				categoryDiv.appendChild(label);
				
				let checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.checked = true;
				checkbox.classList.add("category-toggle");
				checkbox.id = category.toLowerCase();
				categoryDiv.appendChild(checkbox);
				
				let buttons = document.createElement("div");
				buttons.classList.add("category");
				for (let sound of sounds) {
					let caption = sound[0];
					let url = sound[1];
					
					if (caption == "\n") {
						let br = document.createElement("br");
						buttons.appendChild(br);
					} else if (caption == "\t") {
						let spacer = document.createElement("div");
						spacer.classList.add("spacer");
						buttons.appendChild(spacer);
					} else {
						let button = document.createElement("button");
						button.innerHTML = caption;
						button.classList.add("sound");
						buttons.appendChild(button);
	
						button.addEventListener("mousedown", event => {
							clip.src = /^https?:\/\//.test(url) ? url : `https://www.myinstants.com/media/sounds/${url}.mp3`;
						});
					}
				}
				
				categoryDiv.appendChild(buttons);
				soundboard.appendChild(categoryDiv);
			}
		}
		drawSoundboard();
	}
}
init();
