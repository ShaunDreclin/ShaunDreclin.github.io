const PATH = '/ovrt/';
//window.location.href = window.location.origin + PATH + "soundboard.html";

if (!navigator.userAgent.includes("ZFBrowser")) {
	window.SpawnOverlay = function() {};
	window.SetContents = function() {};
	window.CloseOverlay = function() {};
	window.SetKeyboardFocus = function() {};
}

String.prototype.replaceCharAt = function(index, replace) {
	return this.substring(0, index) + replace + this.substring(index + 1);
}

function init() {
	if (!window.SpawnOverlay || !window.SetContents || !window.CloseOverlay || !window.SetKeyboardFocus) {
		window.requestAnimationFrame(init);
	} else {
		for (let input of document.querySelectorAll('input')) {
			input.addEventListener('focus', event => { window.SetKeyboardFocus(true); });
			input.addEventListener('blur', event => { window.SetKeyboardFocus(false); });
			input.addEventListener('input', e => {
				let cursorPos = input.selectionStart;
				
				switch (e.data) {
					case '½':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "-");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '»':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "=");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case 'û':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "[");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case 'ý':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "]");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '°':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, ";");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case 'þ':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "'");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '¼':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, ",");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '¾':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, ".");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '¿':
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "?");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case 'à': //backtick
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "`");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
					case '&': //up
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "");
						input.setSelectionRange(0, 0);
						break;
					case '(': //down
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "");
						input.setSelectionRange(input.value.length, input.value.length);
						break;
					case '%': //left
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "");
						input.setSelectionRange(cursorPos-2, cursorPos-2);
						break;
					case "'": //right
						if (!navigator.userAgent.includes("ZFBrowser")) { break; }
						input.value = input.value.replaceCharAt(cursorPos-1, "");
						input.setSelectionRange(cursorPos, cursorPos);
						break;
				}
			});
		}
		
		for (let preset of document.querySelectorAll('button[id^=preset-]')) {
			switch (preset.id.split('-')[1]) {
				case 'arrow':
					preset.addEventListener('click', event => {
						window.uid = null;
						document.querySelector('#posX').value = 0.001;
						document.querySelector('#posY').value = 0.001;
						document.querySelector('#posZ').value = 0.001;
						document.querySelector('#rotX').value = 90.0;
						document.querySelector('#rotY').value = 0.0;
						document.querySelector('#rotZ').value = 0.0;
						document.querySelector('#size').value = 0.15;
						document.querySelector('#opacity').value = 0.5;
						document.querySelector('#curvature').value = 0.0;
						document.querySelector('#framerate').value = 1;
						document.querySelector('#ecoMode').checked = true;
						document.querySelector('#lookHiding').checked = false;
						document.querySelector('#attachedDevice').value = 0;
						document.querySelector('#shouldSave').checked = true;
						document.querySelector('#url').value = "arrow.html";
						document.querySelector('#width').value = 1000;
						document.querySelector('#height').value = 1000;
					});
					break;
				case 'soundboard':
					preset.addEventListener('click', event => {
						window.uid = null;
						document.querySelector('#posX').value = 0.001;
						document.querySelector('#posY').value = 1.0;
						document.querySelector('#posZ').value = 0.5;
						document.querySelector('#rotX').value = 45.0;
						document.querySelector('#rotY').value = 0.0;
						document.querySelector('#rotZ').value = 0.0;
						document.querySelector('#size').value = 0.35;
						document.querySelector('#opacity').value = 1.0;
						document.querySelector('#curvature').value = 0.0;
						document.querySelector('#framerate').value = 60;
						document.querySelector('#ecoMode').checked = false;
						document.querySelector('#lookHiding').checked = true;
						document.querySelector('#attachedDevice').value = 0;
						document.querySelector('#shouldSave').checked = true;
						document.querySelector('#url').value = "soundboard.html";
						document.querySelector('#width').value = 750;
						document.querySelector('#height').value = 1000;
					});
					break;
				case 'tts':
					preset.addEventListener('click', event => {
						window.uid = null;
						document.querySelector('#posX').value = 0.075;
						document.querySelector('#posY').value = 1.0;
						document.querySelector('#posZ').value = 0.75;
						document.querySelector('#rotX').value = 45.0;
						document.querySelector('#rotY').value = 0.0;
						document.querySelector('#rotZ').value = 0.0;
						document.querySelector('#size').value = 1.1;
						document.querySelector('#opacity').value = 1.0;
						document.querySelector('#curvature').value = 0.0;
						document.querySelector('#framerate').value = 60;
						document.querySelector('#ecoMode').checked = false;
						document.querySelector('#lookHiding').checked = false;
						document.querySelector('#attachedDevice').value = 0;
						document.querySelector('#shouldSave').checked = true;
						document.querySelector('#url').value = "tts.html";
						document.querySelector('#width').value = 750;
						document.querySelector('#height').value = 100;
					});
					break;
			}
		}
		
		document.querySelector("button#spawn").addEventListener("click", event => {
			if (window.uid != null) {
				window.CloseOverlay(window.uid.toString());
			}
			
			let transformInfo = {
				posX: parseFloat(document.querySelector('#posX').value),
				posY: parseFloat(document.querySelector('#posY').value),
				posZ: parseFloat(document.querySelector('#posZ').value),
				rotX: parseFloat(document.querySelector('#rotX').value),
				rotY: parseFloat(document.querySelector('#rotY').value),
				rotZ: parseFloat(document.querySelector('#rotZ').value),
				size: parseFloat(document.querySelector('#size').value),
				opacity: parseFloat(document.querySelector('#opacity').value),
				curvature: parseFloat(document.querySelector('#curvature').value),
				framerate: parseInt(document.querySelector('#framerate').value),
				ecoMode: !!document.querySelector('#ecoMode').checked,
				lookHiding: !!document.querySelector('#lookHiding').checked,
				attachedDevice: parseInt(document.querySelector('#attachedDevice').value),
				shouldSave: !!document.querySelector('#shouldSave').checked
			};
			
			console.log("transformInfo:", transformInfo);
			window.SpawnOverlay(JSON.stringify(transformInfo), 'overlaySpawned');
		});
	}
}
init();

function overlaySpawned(uid) {
	window.uid = uid;
	let contents = {
		url: window.location.origin + PATH + document.querySelector('#url').value,
		width: parseFloat(document.querySelector('#width').value),
		height: parseFloat(document.querySelector('#height').value)
	};
	
	console.log("uid:", uid);
	console.log("contents:", contents);
	
	window.SetContents(uid.toString(), 0, JSON.stringify(contents));
}
