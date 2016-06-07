import './jquery-shade.js';

$(function() {
	let app = document.createElement('div');
	app.innerHTML = '<h1>Hello World mobile.html</h1>';
	document.body.appendChild(app);
	$('h1').greenify();
});