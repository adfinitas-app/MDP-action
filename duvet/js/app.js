var OBJECTIVE = 1000;

var progressBar = undefined;
function ProgressBar() {
    this.state = {
        angle: 0,
        size: 0,
        stop: false,
        number: 0,
        i: 0
    };

    this.counterStatus = document.getElementById("counterStatus");
    this.numberElement = document.getElementById("nbrDuvets");
    this.element = document.getElementById("progressBar");
    this.interval = undefined;

    this.startProgression = function() {
        this.interval = setInterval((function() {
            if (this.state.number === 0) {
                this.render(0, 0)
                clearInterval(this.interval);
                return;
            }
            if (this.state.i >= this.state.number)
                clearInterval(this.interval);
            else {
                this.state.i++;
                this.state.size = this.state.i * 100 / OBJECTIVE;
                if (this.state.size > 100)
                    this.state.size = 100;
                else if (this.state.size < 0)
                    this.state.size = 0;
            }
            this.render(this.state.size, this.state.i);
        }).bind(this), 10);
    };

    this.stop = function(value) {
        this.state.stop = true;
        this.state.number = value;
    };

    this.render = function(size, number, angle) {
        if (size !== null)
            this.element.style.width = size + "%";
        if (number !== null)
            this.numberElement.textContent = number + " duvet" + ((number === 0 || number === 1) ? "" : "s") + " acheté" + ((number === 0 || number === 1) ? "" : "s");
        if (angle !== null)
            this.counterStatus.style.transform = "rotate(" + angle + "deg)";
    };

    this.startAnimation = function () {
        this.interval = setInterval((function() {
            if (this.state.stop === true && this.state.angle === 0) {
                clearInterval(this.interval);
                this.startProgression();
            } else {
                this.state.angle++;
                if (this.state.angle >= 360)
                    this.state.angle = 0;
            }
            this.render(null, null, this.state.angle);
        }).bind(this), 5);
    };
}

$(document).foundation();

$(document).ready(setPage());

window.onresize = setTopBar;

window.onscroll = setStickyButton;
window.onscroll = handleSideBarScroll;

function handleSideBarScroll() {
    let sideBar = $("#sideBarStickyContainer");

    let limit = parseInt(sideBar.css("height")) - window.innerHeight;
    if ($(window).scrollTop() > limit && window.innerWidth > 64*16) {
        sideBar.addClass("sticky-isfloating");
        sideBar.removeClass("sticky-isanchored");
        sideBar.css("top", -limit + "px");
    } else {
        sideBar.removeClass("sticky-isfloating");
        sideBar.addClass("sticky-isanchored");
        sideBar.css("top", "0");
    }
}

function setStickyButton() {
    let button = document.getElementById("smallStickyButton");

    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
        button.style.display = "block";
        button.classList.add("is-stuck");
        button.classList.remove("is-anchored");
    } else {
        button.style.display = "none";
        button.classList.remove("is-stuck");
        button.classList.add("is-anchored");
    }
}

var img = document.getElementById("photoDuvet");

img.addEventListener('onmouseover', unzipDuvet, {passive: false});
img.addEventListener('onmouseout', zipDuvet, {passive: false});

function updateSideBarButtonValue(value = undefined) {
    var element = $('.sideBarEquiv[selected] .sideBarEquivAmount')[0];
    var amount = $('#sideBarButtonAmount');
    var link = $('#sideBarAmountLink');
    const baseURL = 'https://donner.miedepain.asso.fr/181/?reserved_code_media=WD20-1-LP&amount=';

    if (value === undefined && element)
        value = parseInt(element.innerHTML);

    amount.text(value);
    link.attr('href', baseURL + (value * 100));
}

function handleSideBarEquivClick(e) {
    $('.sideBarEquiv').removeAttr("selected");
    var element = e.target;

    while (!element.classList.contains("sideBarEquiv") && element.parentElement)
        element = element.parentElement;
    element.setAttribute("selected", "true");
    if (element.classList.contains("otherAmount")) {
        $("#sideBarEquivInput").focus();
    }
    $('#sideBarEquivInput').val("");
    $('#sideBarAutreMontant').text("");
    updateSideBarButtonValue();
}

function handleSideBarEquivOtherAmountReducClick() {
    var value = $('#sideBarEquivInput').val();
    var result = 0;

    if (value > 1000) {
        result += 250;
        value -= 1000;
        result += 0.34 * value;
    } else {
        result = 0.25 * value;
    }
    $('#sideBarAutreMontant').text(Math.round(100 * result) / 100);
    updateSideBarButtonValue(value);
}

function setSideBar() {
    $('.sideBarEquiv').click(function(event) {
        handleSideBarEquivClick(event);
    })
    $('#sideBarEquivInput').on('input', function() {
        handleSideBarEquivOtherAmountReducClick()
    })

}

function setTopBar() {
    if (window.innerWidth > 640) {
        document.getElementById("logoContainer").style.width = getComputedStyle(document.getElementById("donateButton"), null).getPropertyValue("width");
    } else {
        document.getElementById("logoContainer").style.width = null;
    }
}

function setPage() {
    handleCounter();
    setSideBar();
    setTopBar();
}

function unzipDuvet() {
    img.style.backgroundPosition = `0px 314px`;
}
function zipDuvet() {
    img.style.backgroundPosition = `0px 0px`;
}

function getPercent(number) {
    let res = 100 * number / OBJECTIVE;

    return (res);
}

function getNbrDuvetBought(progressBar) {
    let res = 0;
    let obj;

    $.ajax({
        url: "//duvet-mdp-iraiser-proxy.herokuapp.com/",
        type: "GET",
        dataType: "text",
        success: function(response) {
            obj = JSON.parse(response);
            if (obj.error === true) {
                console.log("Error: ", obj.message);
            }
            for (let i = 0; i < obj.products.length; i++) {
                let tmp = parseInt(obj.products[i]);
                if (tmp)
                    res += tmp;
            }
            res = Math.trunc(res / 3000);
            progressBar.stop(res);
        }
    });
}

function handleCounter() {
    progressBar = new ProgressBar();
    progressBar.startAnimation();
    getNbrDuvetBought(progressBar);
}