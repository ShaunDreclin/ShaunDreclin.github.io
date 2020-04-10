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
