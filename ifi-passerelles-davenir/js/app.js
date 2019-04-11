$(document).foundation();
$(document).ready( function() {
    var sliderlydia = document.getElementById("slider");
    sliderlydia.classList.add("notDisplay");
    if(window.location.href.indexOf("#Lydia") > -1) showSlider("lydia");
    if(window.location.href.indexOf("#Gerard") > -1) showSlider("gerard");
    if(window.location.href.indexOf("#Mohammad") > -1) showSlider("mohammad");
    if(window.location.href.indexOf("#calendrier") > -1) showCalendar();
    if(window.location.href.indexOf("#calculatrice") > -1) {
        var elem = new Foundation.Reveal($('#calculatriceIFI'));
        elem.open();
        showCalcIFI();
        //alert("je suis la");
        // window.location = '#';
        // window.scrollTo(0, 0);
    }
});
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
