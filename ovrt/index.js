function init() {
	if (!window.SpawnOverlay || !window.SetContents || !window.CloseOverlay || !window.SetKeyboardFocus) {
		window.requestAnimationFrame(init);
	} else {
		for (let input of document.querySelectorAll("input")) {
			input.addEventListener("focus", event => {
				window.SetKeyboardFocus(true);
			});
			input.addEventListener("blur", event => {
				window.SetKeyboardFocus(false);
			});
		}
		
		for (let preset of document.querySelectorAll("button[id^=preset-]")) {
			switch (preset.id.split("-")[1]) {
				case "arrow":
					preset.addEventListener("click", event => {
						document.querySelector("#posX").value = 0.001;
						document.querySelector("#posY").value = 0.001;
						document.querySelector("#posZ").value = 0.001;
						document.querySelector("#rotX").value = 90.0;
						document.querySelector("#rotY").value = 0.0;
						document.querySelector("#rotZ").value = 0.0;
						document.querySelector("#size").value = 0.15;
						document.querySelector("#opacity").value = 0.5;
						document.querySelector("#curvature").value = 0.0;
						document.querySelector("#framerate").value = 1;
						document.querySelector("#ecoMode").checked = true;
						document.querySelector("#lookHiding").checked = false;
						document.querySelector("#attachedDevice").value = 0;
						document.querySelector("#shouldSave").checked = true;
						document.querySelector("#url").value = "/ovrt/arrow.html";
						document.querySelector("#width").value = 1000;
						document.querySelector("#height").value = 1000;
					});
					break;
				case "soundboard":
					preset.addEventListener("click", event => {
						document.querySelector("#posX").value = 0.001;
						document.querySelector("#posY").value = 0.001;
						document.querySelector("#posZ").value = 0.001;
						document.querySelector("#rotX").value = 90.0;
						document.querySelector("#rotY").value = 0.0;
						document.querySelector("#rotZ").value = 0.0;
						document.querySelector("#size").value = 0.3;
						document.querySelector("#opacity").value = 1.0;
						document.querySelector("#curvature").value = 0.0;
						document.querySelector("#framerate").value = 60;
						document.querySelector("#ecoMode").checked = true;
						document.querySelector("#lookHiding").checked = false;
						document.querySelector("#attachedDevice").value = 3;
						document.querySelector("#shouldSave").checked = true;
						document.querySelector("#url").value = "/ovrt/soundboard.html";
						document.querySelector("#width").value = 1000;
						document.querySelector("#height").value = 2000;
					});
					break;
			}
		}
		
		document.querySelector("button#spawn").addEventListener("click", event => {
			if (window.uid !== undefined) {
				window.CloseOverlay(window.uid.toString());
			}
			
			let transformInfo = {
				posX: parseFloat(document.querySelector("#posX").value),
				posY: parseFloat(document.querySelector("#posY").value),
				posZ: parseFloat(document.querySelector("#posZ").value),
				rotX: parseFloat(document.querySelector("#rotX").value),
				rotY: parseFloat(document.querySelector("#rotY").value),
				rotZ: parseFloat(document.querySelector("#rotZ").value),
				size: parseFloat(document.querySelector("#size").value),
				opacity: parseFloat(document.querySelector("#opacity").value),
				curvature: parseFloat(document.querySelector("#curvature").value),
				framerate: parseInt(document.querySelector("#framerate").value),
				ecoMode: !!document.querySelector("#ecoMode").checked,
				lookHiding: !!document.querySelector("#lookHiding").checked,
				attachedDevice: parseInt(document.querySelector("#attachedDevice").value),
				shouldSave: !!document.querySelector("#shouldSave").checked
			};
			
			console.log("transformInfo:", transformInfo);
			window.SpawnOverlay(JSON.stringify(transformInfo), "overlaySpawned");
		});
	}
}
init();

function overlaySpawned(uid) {
	window.uid = uid;
	let contents = {
		url: window.location.origin + document.querySelector("#url").value,
		width: parseFloat(document.querySelector("#width").value),
		height: parseFloat(document.querySelector("#height").value)
	};
	
	console.log("uid:", uid);
	console.log("contents:", contents);
	
	window.SetContents(uid.toString(), 0, JSON.stringify(contents));
}
