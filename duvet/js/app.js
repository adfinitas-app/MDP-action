$(document).foundation()

$(document).ready(handleCounter());

let img = document.getElementById("photoDuvet");

function unzipDuvet() {
    img.setAttribute("src", "/duvet/assets/duvetOuvert.png");
    img.setAttribute("alt", "duvet ouvert");
}

function zipDuvet() {
    img.setAttribute("src", "/duvet/assets/duvetFerme.png");
    img.setAttribute("alt", "duvet fermé");
}

function getNbrDuvetBought() {
    $.ajax({
        url: "https://donner.miedepain.asso.fr/api/counter/get?user_api=umdpapi&pwd_api=drR3tmYQ&campaigns=59",
        type: 'GET',
        dataType: 'text',
        headers: {
            'Access-Control-Allow-Origin': 'https://golden-map.cloudvent.net/',
        },
        crossDomain: true,
        success: function(content, statut) {
            alert("success");
        },
        error: function(resultat, statut, error) {
            alert("error: " + error);
        },
        complete: function() {
            alert("complete");
        }
    });
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