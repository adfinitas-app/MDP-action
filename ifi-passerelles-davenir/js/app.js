$(document).foundation();

var minus = [];
var plus = [];
var text = [];
plus[0] = document.getElementById("plus1");
plus[1] = document.getElementById("plus2");
plus[2] = document.getElementById("plus3");
minus[0] = document.getElementById("minus1");
minus[1] = document.getElementById("minus2");
minus[2] = document.getElementById("minus3");
text[0] = document.getElementById("text1");
text[1] = document.getElementById("text2");
text[2] = document.getElementById("text3");

function showText(nb) {
    plus[nb].classList.remove("display");
    plus[nb].classList.add("notDisplay");
    minus[nb].classList.remove("notDisplay");
    minus[nb].classList.add("display");
    text[nb].classList.remove("notDisplay");
    text[nb].classList.add("display");
}

function hideText(nb) {
    plus[nb].classList.remove("notDisplay");
    plus[nb].classList.add("display");
    minus[nb].classList.remove("display");
    minus[nb].classList.add("notDisplay");
    text[nb].classList.remove("display");
    text[nb].classList.add("notDisplay");
}
