import generateH3Text from './jsxtest.jsx';

require('./main.css');
require('./index.scss');

var sub = require('./sub');

// 这个也不需要了 因为$, jQuery, window.jQuery都可以直接使用了
// import $ from 'jquery';
// 或
// require('jquery');
import './jquery-shade.js';

var moment = require('moment');

var app = document.createElement('div');
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(sub());
app.appendChild(generateH3Text());
$('body').append('<p>look at me! now is ' + moment().format() + '</p>');

//call our jquery plugin!
$('p').greenify();