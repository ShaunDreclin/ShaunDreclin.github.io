// Credit to Amm on the RuneApps forums (http://runeapps.org/forums/viewtopic.php?id=373)
// code revised by Skillbert
// further revised by Shaun Dreclin

fetch('https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/nemiforest/new.json?limit=1')
	.then(response => response.json())
	.then(json => {
		let post = json.data.children[0].data;

		document.querySelector("a").href = "https://www.reddit.com" + post.permalink;
		document.querySelector("a").innerText = post.link_flair_text ? `[${post.link_flair_text}] ` : `` + post.title;
		document.querySelector("img").src = post.url;
	});

if (window.alt1 && alt1.versionint > 1001000) { alt1.identifyAppUrl("appconfig.json"); }
