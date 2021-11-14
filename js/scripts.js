const x_rapidapi_host = "api-football-v1.p.rapidapi.com";
const x_rapidapi_key = "a06cb32d05mshcec7ac543b257ffp1ba284jsne9c15de7c013";

localStorage.clear();


getStandingsByLeagueIDAndSeason(94, 2021);

function getStandingsByLeagueIDAndSeason(teamID, season) {
    fetch("https://api-football-v1.p.rapidapi.com/v3/standings?season=" + season + "&league=" + teamID, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": x_rapidapi_host,
            "x-rapidapi-key": x_rapidapi_key
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            var standings = data.response[0].league.standings[0];
            var teamId = standings[0].team.id;

            renderStandings(standings);
            getPlayersByTeamId(teamId);

        })
        .catch(err => {
            console.error(err);
        });
}

function getPlayersByTeamId(teamId) {
    fetch("https://api-football-v1.p.rapidapi.com/v3/players?team=" + teamId + "&season=2021", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": x_rapidapi_host,
            "x-rapidapi-key": x_rapidapi_key
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.error(err);
        });
}


// no onclick passar a id da equipa certo

function renderStandings(standings) {

    $.each(standings, function (key, value) {

        $("#ligaPortuguesa").append
        ('<div class="accordion-item">' +
            '<h2 class="accordion-header" id="heading' + value.team.id + '">' +
                '<button class="accordion-button collapsed" onclick="renderPlayerList('+value.team.id+')" type="button" ' +
                'data-bs-toggle="collapse" data-bs-target="#collapse'+value.team.id+'"'+
                ' aria-expanded="false" aria-controls="collapse'+value.team.id+'">' +
                ' '+value.team.name+' '+
                '</button>'+
                '<div id="collapse'+value.team.id+'" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">' +
                '<div class="accordion-body" id="acc-body'+value.team.id+'">'+
                '<ul class="row list-group" style="flex-direction: row" id="jogadores'+value.team.id+'"></ul>'+
                '</div>'+
            '</div>' +
            '</h2>' +
        '</div>');
    })
}

function renderPlayerList(teamID) {

    // id da Equipa para dar os jogadores de cada uma
    var jogId = $("#jogadores" + teamID);

    if (jogId.is(":empty")) {
        fetch("https://api-football-v1.p.rapidapi.com/v3/players?team=" + teamID + "&season=2021", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": x_rapidapi_host,
                "x-rapidapi-key": x_rapidapi_key
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {

            var players = data.response;

            $.each(players, function (key, value) {

                // escrever apenas no body-accordion certo
                //ver selectors de jQuery para escrever apenas no sitio certo

                $(jogId).append
                ('<button type="button" class="btn col-md-4 rounded" onclick="openModal(' + value.player.id + ')" data-toggle="modal" data-target="#modalJogadores" >' +
                    '<li class="list-group-item display-5 fs-4" style="display: block; text-align: start" id=' + value.player.id + '>' +
                        '<img class="img-thumbnail rounded-circle float-left m-3" alt="perfil" src="' + value.player.photo + '">' + value.player.name +
                    '</li>' +
                '</button>'
                );
            });
        })
        .catch(err => {
            console.error(err);
        });
    }
}

async function fetchPlayer(playerID) {
    try {
        const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/players?id=" + playerID + "&season=2021", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": x_rapidapi_host,
                "x-rapidapi-key": x_rapidapi_key
            }
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

async function openModal(playerID) {
    // referência do modal
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});

    //dados do jogador

    var player = await fetchPlayer(playerID);

    var playerInfo = player.response[0].player
    var playerStats = player.response[0].statistics

    console.log(player.response[0].player);
    console.log(player.response[0].statistics);

    var modalText = document.getElementById('modalText');

    //modalText.innerText = playerInfo.name;

    if(playerStats[0].games.appearences == null) {
        playerStats[0].games.appearences = 0;
    }

    $("#modalText").append("<h2>" + playerInfo.name + "</h2>" +
        '<hr>' +
        '<h3>'+"Jogos: " + playerStats[0].games.appearences+'</h3>'+
        "<button onclick='addPlayerMyList(" + playerID + ")' type='button' class='btn btn-primary'>Add Player</button>" +
        "<hr>");


    myModal.show();
}

function addPlayerMyList(playerID) {

    console.log("add player id: " + playerID)

    // Retrieve the object from storage
    var players = JSON.parse(localStorage.getItem("playerList"));


    console.log(players);

    // inicializar caso não exista
    if (players === null) {
        players = [];
    }

    // adicionar jogador ao array
    players.push(playerID);


    // Put the object into storage
    localStorage.setItem("playerList", JSON.stringify(players));

    var myModalEl = document.getElementById('exampleModal')

    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance

    modal.hide();

}

function removePlayerMyList(playerID) {
    localStorage.removeItem(playerID);
}
