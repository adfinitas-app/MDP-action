$(document).foundation()

$(document).ready(handleCounter());

let img = document.getElementById("photoDuvet");

function unzipDuvet() {
    img.setAttribute("src", "assets/duvetOuvert.png");
    img.setAttribute("alt", "duvet ouvert");
}

function zipDuvet() {
    img.setAttribute("src", "assets/duvetFerme.png");
    img.setAttribute("alt", "duvet fermé");
}

function getNbrDuvetBought() {
    return (0); //Pour l'instant, variable représentant le nombre de duvets achetés. La vraie fonction arrive soon ;)
}

function getPercentDuvetBought(nbr, objective) {
    let res = (nbr * 100) / objective;

    if (res < 4)
        return (4);
    if (res > 100)
        return (100);
    return (res);
}

function handleCounter() {
    let nbr = getNbrDuvetBought();
    let nbrElement = document.getElementById("nbrDuvets");
    let objective = 400;
    let percent = getPercentDuvetBought(nbr, objective);
    let progressBar = document.getElementById("progressBar");

    nbrElement.textContent = nbr;
    progressBar.style.width = percent + "%";
}