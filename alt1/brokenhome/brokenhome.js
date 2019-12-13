let steps = [
	"<br><b>Start</b>",
	"Open south door on western wall (safe room).",
	"Search the chest to get mystery meat.",
	"Open north then west door.",
	"Take the raven key and clock hands. Leave the room to the east.",
	"Open south door (safe room).",
	"Use the clock hands on the grandfather clock to receive an eye gem.",
	"Open the east door.",
	"Unlock then open east door in the lobby with the raven key.",
	"<br><b>Raven door</b>",
	"After the cutscene, open south then east door.",
	"Sort the pile of books for two eye gems.",
	"Leave via west then north door.",
	"Open east then north door.",
	"Open middle door on the southern wall.",
	"<br><b>Statue puzzle</b>",
	"Solve the statue puzzle:",
	"Push the west statue.",
	"Walk two steps south, push the east statue.",
	"Walk one step south, push the west statue.",
	"Push the south-westmost statue.",
	"Walk one step north-east, push east statue.",
	"Push the south statue.",
	"Push the west statue.",
	"Take the fourth eye gem from the table.",
	"Leave via north door.",
	"<br><b>Continuing</b>",
	"Ascend the stairs.",
	"Open east door.",
	"After the cutscene, open east, then south-west door.",
	"Search Ingram's research notes for the spider key and scroll.",
	"Leave via east door.",
	"Open northern west then west door.",
	"Unbolt and open south door to get to the upstairs lobby.",
	"<br><b>Spider door</b>",
	"Unlock then open west door with the spider key",
	"Open south door.",
	"Search the dead servant for an eye gem.",
	"Open west door. Draw back curtain, search servant for statue key.",
	"<br><b>Statue door</b>",
	"Leave via east then north, north, east doors.",
	"Unlock and open the south door in the middle with the statue key.",
	"Take the eye gem.",
	"Investigate the statue twice; open west door.",
	"Investigate the second statue twice; open south door.",
	"Investigate the third statue twice; open east door.",
	"Take the scythe key.",
	"Return to the hallway: west, north, east, north doors.",
	"<br><b>Scythe door</b>",
	"Open west, south, then east door to return to the upstairs lobby.",
	"Unlock and open east door with the scythe key.",
	"Open south-east door (safe room).",
	"Investigate the shrine for the grand piano key and skull key.",
	"Leave the room via north door.",
	"<br><b>Skull door</b>",
	"Peek through the west door after a scream. Click Go Back.",
	"Unbolt then open north-east door.",
	"Open northern west then west door.",
	"Descend the stairs.",
	"Open south-eastern door.",
	"Open west door.",
	"<b>Warning: The windows shatter. Purple rooms inflict damage.</b>",
	"Open west door. Lobby is now purple.",
	"Open southern west door (safe room).",
	"Open north door.",
	"Unlock and open north door with the skull key.",
	"Open southern east door.",
	"Search Ormod's scribblings for a scroll fragment.",
	"Leave the room via west door.",
	"Open north then west door.",
	"Play the piano.",
	"Open purple south hidden door. Search skeleton in south-east corner for eye gem.",
	"Leave though the hidden north door.",
	"Leave the piano room via east door.",
	"Open south-east door",
	"Descend the stairs.",
	"Open the northern door on the western wall.",
	"Search the butler for the cleaver key. Leave the room.",
	"<br><b>Cleaver door</b>",
	"Unlock and open east door on the north wall with the cleaver key.",
	"<b>Walk</b> to the south-east door while avoiding knives.",
	"You can run again. Open middle door in the northern wall.",
	"Search the chest of drawers for a large pipette. Leave the room.",
	"Open north-east door.",
	"Use pipette on pig to get large pipette of pig bile. Leave the room.",
	"Open east door.",
	"Search the furnace for human ashes. Leave the room.",
	"Use the pipette of pig bile and human ashes on the cauldron.",
	"Use the pipette on the cauldron to get alkaline concoction.",
	"Use the concoction on the southern door, then open it.",
	"Open west door.",
	"Investigate the frozen servant for the doll key.",
	"Leave the room through the east door.",
	"<br><b>Snake door and doll door</b>",
	"Open northern east door.",
	"Take the snake key from the key hooks next to the ladder.",
	"Climb the ladder with the snake key (leads to purple).",
	"Use the stairs, then open west door.",
	"Open west door with the doll key.",
	"Ascend the stairs.",
	"Take the tusks key. (speak to the ghost)",
	"<br><b>Tusks door</b>",
	"Descend the stairs. Leave the room.",
	"Open north then east door.",
	"Unlock and open south-east door with the tusks key.",
	"Investigate the bust.",
	"Enter the trap door in the south-west.",
	"Search the thief for an eye gem.",
	"Climb the ladder. Leave the room.",
	"Open middle door on the south wall.",
	"<br><b>Statues door again</b>",
	"Follow the path: west, south, east doors.",
	"Investigate the statue twice. Open secret east door (safe room).",
	"Take the mother's hairbrush from the shrine.",
	"Return to the hallway: west, west, north, east, north doors.",
	"Open west, south, then west doors.",
	"Ascend the stairs.",
	"Talk to the spirit. Finish the dialogue for the noose key.",
	"<br><b>Noose door<br>Warning: A monster now chases you through most corridors.</b>",
	"Leave the room with the stairs. Open east door.",
	"Unbolt and open north door in the upstairs lobby.",
	"Open north-east door, then quickly open the south door with the noose key.",
	"Open and climb into the cupboard. (The basement is safe)",
	"<br><b>Basement</b>",
	"Follow the path. Peek through the peephole along the north wall.",
	"Unbolt and open west door.",
	"Open northern east door.",
	"Descend the stairs.",
	"Open east door.",
	"Descend the stairs.",
	"Move all but the north statue, then stand on the middle plate.",
	"Descend the stairs.",
	"Descend two flights of stairs.",
	"Climb down the rope (safe room).",
	"<br><b>Chains door</b>",
	"Open east door.",
	"Search the reception desk for Nabor's notes and the chains key.",
	"Open north then east door.",
	"Open east door with the chains key.",
	"Head south and open the east door when you reach the rubble.",
	"Open the east door.",
	"Take the dagger key in the south-west cell.",
	"Return to the safe room: west, west, west, west, south, west.",
	"Climb the rope.",
	"Ascend four flights of stairs.",
	"Open west door. Ascend the stairs.",
	"Ascend the stairs.",
	"<br><b>Dagger door<br>Warning: The monster chases you after you leave this room.</b>",
	"Open north, south-west, south, then south-west doors (safe room).",
	"Open east door (<b>Purple</b>).",
	"Climb the stairs. Move the servant and open east door.",
	"<b>Quickly</b> open southern west door.",
	"Search Ingram's rantings for the last scroll fragment.",
	"Combine the fragments to make the Break curse scroll.",
	"Leave via north door, run east, use scroll on monster.",
	"Finish the dialogue.",
];

for (let step of steps) {
		let stepLine = document.createElement("div");
		stepLine.innerHTML = step;
		stepLine.addEventListener("mousedown", e => { if (e.buttons == 1) {
			stepLine.classList.toggle("done");
		}});

		document.querySelector("#step-list").appendChild(stepLine);
}

if (window.alt1 && alt1.versionint > 1001000) { alt1.identifyAppUrl("appconfig.json"); }
