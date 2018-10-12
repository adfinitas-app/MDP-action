var OBJECTIVE = 400;

var progressBar = undefined;
function ProgressBar() {
    this.state = {
        direction: 1,
        size: 0,
        stop: false,
        number: 0,
        i: 0
    };

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
            }
            this.render(this.state.size, this.state.i);
        }).bind(this), 10);
    };

    this.stop = function(value) {
        this.state.stop = true;
        this.state.number = value;
    };

    this.render = function(size, number) {
        this.element.style.width = size + "%";
        if (number)
            this.numberElement.textContent = number + " duvets achetés";
    };

    this.startAnimation = function () {
        this.interval = setInterval((function() {
            if (this.state.stop === true && this.state.size === 0) {
                clearInterval(this.interval);
                this.startProgression();
            } else {
                this.state.size += this.state.direction;
                if (this.state.size === 0 || this.state.size === 100)
                    this.state.direction *= -1;
            }
            this.render(this.state.size);
        }).bind(this), 5);
    };
}

$(document).foundation();

$(document).ready(handleCounter());

var img = document.getElementById("photoDuvet");
var animationInterval;

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
            progressBar.stop(150); //TODO res
            }
    });
}

function getPercentDuvetBought(nbr) {
    let res = (nbr * 100) / OBJECTIVE;

    if (res < 0)
        return (0);
    if (res > 100)
        return (100);
    return (res);
}

function animateProgressBar(action, value) {
    animateProgressBar.state.size += animateProgressBar.state.direction;
    if (animateProgressBar.state.size === 100 || animateProgressBar.state.size === 0) {
        animateProgressBar.state.direction *= -1;
        if (animateProgressBar.state.size === 0 && animateProgressBar.state.stop === 1) {
            let nbrElement = document.getElementById("nbrDuvets");
            let percent = getPercentDuvetBought(value);
            let progressBar = document.getElementById("progressBar");

            for (var i = 0; i <= animateProgressBar.state.value; i++) {
                console.log("je suis la!" + i + "/" + percent);
                nbrElement.textContent = i + " duvets achetés";
                percent = getPercentDuvetBought(i);
                progressBar.style.width = percent + "%";
            }
            clearInterval(animationInterval);
        }
    }
    animateProgressBar.state.element.style.width = animateProgressBar.state.size + "%";
}

function handleCounter() {
    progressBar = new ProgressBar();
    progressBar.startAnimation();
    getNbrDuvetBought();
}