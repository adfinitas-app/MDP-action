$(document).foundation();

$("#logo").click(function () {
    woopra.track('interaction', {category:"LOGO_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#logo-small").click(function () {
    woopra.track('interaction', {category:"LOGO_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#cta").click(function () {
    woopra.track('interaction', {category:"DON-CTA_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#cta-small").click(function () {
    woopra.track('interaction', {category:"DON-CTA_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#eq1").click(function () {
    woopra.track('interaction', {category:"DON-CTA-55_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#eq2").click(function () {
    woopra.track('interaction', {category:"DON-CTA-100_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#eq3").click(function () {
    woopra.track('interaction', {category:"DON-CTA-165_FA19",action:"clic",url:document.location.href,title: document.title});
});

$("#autre").click(function () {
    woopra.track('interaction', {category:"DON-CTA-AUTRE_FA19",action:"clic",url:document.location.href,title: document.title});
});

var interval;

function increase_number() {
    var number = document.getElementById("number");
    var value = number.innerHTML;

    value = value.slice(0, 3) + value.slice(4);
    value = parseInt(value) + 75;

    if (value >= 150000) {
        value = 150000;
        clearInterval(interval);
    }
    value = value.toString();
    while (value.length < 6) {
        value = "0" + value;
    }
    number.innerHTML = value.slice(0, 3) + " " + value.slice(3);
}

$(function () {
    document.getElementById("number").innerHTML = "000 000";
    interval = setInterval("increase_number()", 1);
});