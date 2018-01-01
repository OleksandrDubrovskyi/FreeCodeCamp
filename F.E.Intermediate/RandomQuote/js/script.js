const quotes = [
	"Hello there, glad to see you!",
	"Mr and Mrs Smith are gone with the wind.",
	"True crime is not true literature.",
	"Let's play once in a while."
];

const colors = [
	"crimson",
	"darkblue",
	"cornflowerblue",
	"darkcyan",
	"chocolate",
	"darkgreen",
	"DarkOliveGreen",
	"darkmagenta",
	"indigo",
	"maroon",
	"olive",
	"PaleVioletRed"
];


generateQuote = function() {
	
	let randColor = Math.floor(Math.random() * colors.length);
	let randQuote = Math.floor(Math.random() * quotes.length);

	document.getElementById("quoteArea").style.color = colors[randColor];
	document.getElementById("qButton").style.backgroundColor = colors[randColor];
	document.getElementById("twtButton").style.backgroundColor = colors[randColor];
	document.getElementById("quoteArea").innerText = quotes[randQuote];
	document.body.style.backgroundColor = colors[randColor];
	document.getElementById("tweet").href = "https://twitter.com/intent/tweet?text=" + quotes[randQuote];
}

generateQuote();
document.getElementById("qButton").onclick = generateQuote;
/*
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));
*/