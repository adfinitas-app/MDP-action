var OBJECTIVE = 400;

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
            this.numberElement.textContent = number + " duvet" + ((number === 0 || number === 1) ? " " : "s ") + "acheté" + ((number === 0 || number === 1) ? "" : "s");
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

var img = document.getElementById("photoDuvet");

img.addEventListener('onmouseover', unzipDuvet, {passive: false});
img.addEventListener('onmouseout', zipDuvet, {passive: false});

function setTopBar() {
    document.getElementById("logoContainer").style.width = getComputedStyle(document.getElementById("donateButton"), null).getPropertyValue("width");
}

function setPage() {
    handleCounter();
    setTopBar();
}

function unzipDuvet() {
    img.style.backgroundPosition = `0px 314px`;
}
function zipDuvet() {
    img.style.backgroundPosition = `0px 0px`;
}

function getNbrDuvetBought() {
    var res;

    $.ajax({
        url: "//duvet-mdp-iraiser-proxy.herokuapp.com/",
        type: "GET",
        dataType: "text",
        success: function(response) {
            res = JSON.parse(response);
            res = parseInt(res.products[0]) + parseInt(res.products[1]);
            res = Math.trunc(res / 3000);
            progressBar.stop(0);
        }
    });
}

function handleCounter() {
    progressBar = new ProgressBar();
    progressBar.startAnimation();
    getNbrDuvetBought();
}