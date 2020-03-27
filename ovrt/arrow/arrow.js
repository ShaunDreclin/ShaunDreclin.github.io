function init() {
	if (!window.SetBrowserTitle) {
		window.requestAnimationFrame(init);
	} else {
		window.SetBrowserTitle("Arrow");
	}
}
init();
