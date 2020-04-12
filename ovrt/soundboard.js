function init() {
	if (!window.SetBrowserTitle || !window.SetKeyboardFocus) {
		window.requestAnimationFrame(init);
	} else {
		window.SetBrowserTitle("Soundboard");

		let soundboardData = JSON.parse(localStorage.soundboardData || "{}");
		
		let clip = new Audio();
		clip.addEventListener("canplaythrough", event => {
			clip.volume = volume.value / 100;
			clip.play();
		});
		
		 /*********\
		| Controls |
		\*********/
		
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

				editBox.value = stringify(soundboardData);				
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
		
		function stringify(soundboardData) {
			let output = `{`;
			
			for (let [category, sounds] of Object.entries(soundboardData)) {
				output += `\n\t"${category}": [`;
				
				for (let sound of sounds) {
					let caption = sound[0];
					let url = sound[1];
					output += `\n\t\t[ "${caption}", "${url}" ],`;
				}
				output = output.replace(/,$/, "");
				
				output += `\n\t],`;
			}
			output = output.replace(/,$/, "");
			
			output += `\n}\n`;
			return output;
		}
		
		
		
		 /*************************\
		| Text-To-Speech Functions |
		\*************************/

		window.speechSynthesis.addEventListener('voiceschanged', function() { populateVoiceList(); });
		function populateVoiceList() {
			for (let select of document.querySelectorAll('select.tts-voice')) {
				let selectedVoice = select.selectedOptions.length > 0 ? select.selectedOptions[0] : null;
				select.innerHTML = "";

				for (let voice of window.speechSynthesis.getVoices()) {
					let option = document.createElement('option');
					option.textContent = `${voice.name} (${voice.lang})`;
					option.dataset.name = voice.name;
					option.dataset.lang = voice.lang;
					select.appendChild(option);
				}

				if (selectedVoice != null) {
					for (let option of select) {
						if (option.dataset.name == selectedVoice.dataset.name) { option.selected = true; }
					}
				}
			}
		}
		
		function textToSpeech(text, selectedVoice) {
			let utterance = new SpeechSynthesisUtterance();
			utterance.text = text;
			utterance.rate = 1;
			utterance.pitch = 0.5;

			for (let voice of window.speechSynthesis.getVoices()) {
				if (voice.name == selectedVoice.dataset.name && voice.lang == selectedVoice.dataset.lang) {
					utterance.voice = voice;
				}
			}
			
			window.speechSynthesis.speak(utterance);
		}
		
		
		
		 /*******************\
		| Soundboard Drawing |
		\*******************/
		
		let soundboard = document.querySelector("#soundboard");
		function drawSoundboard() {
			soundboard.innerHTML = "";
			
			for (let [category, sounds] of Object.entries(soundboardData)) {
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
				
				
				
				if (category.toLowerCase() == "text-to-speech" || category.toLowerCase() == "tts") { //TTS Category
					let ttsText = document.createElement("input");
					ttsText.type = "text";
					ttsText.classList.add("tts-text");
					buttons.appendChild(ttsText);
					
					let ttsVoice = document.createElement("select");
					ttsVoice.classList.add("tts-voice");
					buttons.appendChild(ttsVoice);
					
					if (sounds.length > 0) {
						let name = sounds[0][0];
						let lang = sounds[0][1];
						
						let option = document.createElement("option");
						option.textContent = `${name} (${lang})`;
						option.dataset.name = name;
						option.dataset.lang = lang;
						ttsVoice.appendChild(option);
					}
					
					ttsText.addEventListener("keydown", e => { if (e.key == "Enter") {
						textToSpeech(ttsText.value, ttsVoice.selectedOptions[0]);
						ttsText.value = "";
					} });
					
					ttsVoice.addEventListener("input", event => {
						soundboardData[category] = [[ttsVoice.selectedOptions[0].dataset.name, ttsVoice.selectedOptions[0].dataset.lang]];
						localStorage.soundboardData = JSON.stringify(soundboardData);
					});
					
					
					
				} else { //Regular category
					for (let sound of sounds) {
						let caption = sound[0];
						let url = sound[1];

						if (caption == "\n") { //Newline
							let br = document.createElement("br");
							buttons.appendChild(br);
						} else if (caption == "\t") { //Spacer
							let spacer = document.createElement("div");
							spacer.classList.add("spacer");
							buttons.appendChild(spacer);
						} else { //Regular button
							let button = document.createElement("button");
							button.innerHTML = caption;
							button.classList.add("sound");
							buttons.appendChild(button);

							button.addEventListener("mousedown", event => {
								clip.src = /^https?:\/\//.test(url) ? url : `https://www.myinstants.com/media/sounds/${url}.mp3`;
							});
						}
					}
				}
				
				categoryDiv.appendChild(buttons);
				soundboard.appendChild(categoryDiv);
				populateVoiceList();
			}
		}
		drawSoundboard();
	}
}
init();
