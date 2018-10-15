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
        if (size)
            this.element.style.width = size + "%";
        if (number)
            this.numberElement.textContent = number + " duvets achetés";
        if (angle)
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

$(document).ready(handleCounter());

var img = document.getElementById("photoDuvet");

function unzipDuvet() {
    img.setAttribute("src", "assets/duvetOuvert.png");
    img.setAttribute("alt", "duvet ouvert");
}

function zipDuvet() {
    img.setAttribute("src", "assets/duvetFerme.png");
    img.setAttribute("alt", "duvet fermé");
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
            progressBar.stop(res);
            }
    });
}

function handleCounter() {
    progressBar = new ProgressBar();
    progressBar.startAnimation();
    getNbrDuvetBought();
}