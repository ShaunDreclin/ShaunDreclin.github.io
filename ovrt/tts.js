if (!navigator.userAgent.includes("ZFBrowser")) {
	window.SetBrowserTitle = function() {};
	window.SetKeyboardFocus = function() {};
}

function init() {
	if (!window.SetBrowserTitle || !window.SetKeyboardFocus) {
		window.requestAnimationFrame(init);
	} else {
		window.SetBrowserTitle("TTS");

		let ttsData = JSON.parse(localStorage.ttsData || "{}");
		
		let clip = new Audio();
		clip.addEventListener('canplaythrough', event => {
			clip.play();
		});
		
		 /***********\
		|	Edit Box	|
		\***********/
		
		let editMode = false;
		let editButton = document.querySelector('#edit-button');
		let editBox = document.querySelector('#edit-box');
		editButton.addEventListener('click', event => {
			if (!editMode) { //Clicked edit
				editMode = true;
				window.SetKeyboardFocus(true);
				editButton.innerHTML = "Save";
				editBox.style.visibility = 'visible';

				editBox.value = stringify(ttsData);				
			} else { //Clicked save
				editMode = false;
				window.SetKeyboardFocus(false);
				editButton.innerHTML = "Edit";
				editBox.style.visibility = 'hidden';

				ttsData = JSON.parse(editBox.value);
				localStorage.ttsData = JSON.stringify(ttsData);
				updateVoices();
			}
		});
		
		function stringify(ttsData) {
			let output = `{`;
			
			output += `\n\t"voice": "${ttsData.voice}",`;

			output += `\n\t"keys": [`
			for (let key of ttsData.keys) { output += `\n\t\t[ "${key[0]}", "${key[1]}" ],`; }
			output = output.replace(/,$/, "");
			output += `\n\t],`;
			
			output += `\n\t"replacements": [`
			for (let replacement of ttsData.replacements) { output += `\n\t\t[ "${replacement[0]}", "${replacement[1]}" ],`; }
			output = output.replace(/,$/, "");
			output += `\n\t]`;
			
			output += `\n}\n`;
			return output;
		}
		
		
		
		
		
		 /*********************\
		|	Soundboard Drawing	|
		\*********************/
		
		String.prototype.replaceCharAt = function(index, replace) {
			return this.substring(0, index) + replace + this.substring(index + 1);
		}
		
		let ttsText = document.querySelector('#tts-text');
		let ttsVoice = document.querySelector('#tts-voice');
		
		ttsText.addEventListener('focus', e => { window.SetKeyboardFocus(true); });
		ttsText.addEventListener('blur', e => { window.SetKeyboardFocus(false); });
		ttsText.addEventListener('input', e => {
			let cursorPos = ttsText.selectionStart;
			
			switch (e.data) {
				case '½':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "-");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case '»':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "=");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case 'û':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "[");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case 'ý':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "]");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case '°':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, ";");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case 'þ':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "'");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case '¼':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, ",");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case '¾':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, ".");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case '¿':
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "?");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case 'à': //backtick
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					ttsText.setSelectionRange(cursorPos-1, cursorPos-1);
					clip.play();
					break;
				case '&': //up
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					ttsText.setSelectionRange(0, 0);
					break;
				case '(': //down
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					ttsText.setSelectionRange(ttsText.value.length, ttsText.value.length);
					break;
				case '%': //left
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					ttsText.setSelectionRange(cursorPos-2, cursorPos-2);
					break;
				case "'": //right
					if (!navigator.userAgent.includes("ZFBrowser")) { break; }
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					ttsText.setSelectionRange(cursorPos, cursorPos);
					break;
				case 'ü': //backslash
				case '\\': //backslash
					ttsText.value = ttsText.value.replaceCharAt(cursorPos-1, "");
					let text = ttsText.value;
					for (let replacement of ttsData.replacements) {
						text = text.replace(new RegExp('\\b' + replacement[0] + '\\b', 'g'), replacement[1]);
					}
					
					fetch(ttsData.keys[0][1] + '/v1/synthesize?voice=' + ttsVoice.selectedOptions[0].dataset.name, {
						method: 'POST',
						headers: new Headers({
							'Authorization': 'Basic ' + btoa('apikey:' + ttsData.keys[0][0]),
							'Content-Type': 'application/json',
							'X-Watson-Learning-Opt-Out': 'true'
						}),
						body: JSON.stringify({
							text: text
								.replace(/</g, " less than ")
								.replace(/>/g, " greater than ")
						})
					})
					.then(response => response.blob())
					.then(blob => { clip.src = URL.createObjectURL(blob); });

					ttsText.value = "";
					//ttsText.blur();

					ttsData.keys.push(ttsData.keys.shift());
					localStorage.ttsData = JSON.stringify(ttsData);
					break;
			}
		});
		
		ttsVoice.addEventListener('input', event => {
			ttsData.voice = ttsVoice.selectedOptions[0].dataset.name;
			localStorage.ttsData = JSON.stringify(ttsData);
		});

		
		
		function updateVoices() {
			if (ttsData.voice) {
				let option = document.createElement('option');
				option.textContent = ttsData.voice;
				option.dataset.name = ttsData.voice;
				ttsVoice.appendChild(option);
			}

			let selectedVoice = ttsVoice.selectedOptions.length > 0 ? ttsVoice.selectedOptions[0] : null;
			ttsVoice.innerHTML = "";

			fetch('https://cors-anywhere.herokuapp.com/' + ttsData.keys[0][1] + '/v1/voices', {
				method: 'GET',
				headers: new Headers({
					'Authorization': 'Basic ' + btoa('apikey:' + ttsData.keys[0][0]),
					'X-Watson-Learning-Opt-Out': 'true'
				})
			})
			.then(response => response.json())
			.then(json => {
				let voices = json.voices
					.filter(a => a.name.startsWith("en-"))
					//.filter(a => a.gender == "male")
					.sort((a, b) => a.name.localeCompare(b.name));

				for (let voice of voices) {
					let option = document.createElement('option');
					option.textContent = `${voice.description.split(":")[0]} (${voice.name})`;
					option.dataset.name = voice.name;
					option.dataset.description = voice.description;
					ttsVoice.appendChild(option);
				}

				if (selectedVoice != null) {
					for (let option of ttsVoice.querySelectorAll('option')) {
						if (option.dataset.name == selectedVoice.dataset.name) { option.selected = true; }
					}
				}
			});
		}
		updateVoices();
	}
}
init();
