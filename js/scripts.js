const x_rapidapi_host = "api-football-v1.p.rapidapi.com";
const x_rapidapi_key = "a06cb32d05mshcec7ac543b257ffp1ba284jsne9c15de7c013";


getStandingsByLeagueIDAndSeason(94, 2020);

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
            console.log(data);

            var standings = data.response[0].league.standings[0];

            var teamId = standings[0].team.id;

            console.log(standings);

            renderStandings(standings);

            getPlayersByTeamId(teamId);

        })
        .catch(err => {
            console.error(err);
        });
}

function getPlayersByTeamId(teamId) {
    fetch("https://api-football-v1.p.rapidapi.com/v3/players?team=" + teamId + "&season=2020", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": x_rapidapi_host,
            "x-rapidapi-key": x_rapidapi_key
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {
        console.log(data);
    })
        .catch(err => {
            console.error(err);
        });
}


// no onclick passar a id da equipa certo

function renderStandings(standings) {

    $.each(standings, function (key, value) {
        console.log(key + ": " + value.team.name);
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
                '<ul class="list-group" id="jogadores'+value.team.id+'"></ul>'+
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

        console.log('render players')
        console.log(teamID)

        fetch("https://api-football-v1.p.rapidapi.com/v3/players?team=" + teamID + "&season=2020", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
                "x-rapidapi-key": "a06cb32d05mshcec7ac543b257ffp1ba284jsne9c15de7c013"
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
            console.log(data);

            var players = data.response;

            // collapse228
            $.each(players, function (key, value) {
                console.log(key + ": " + value.player.name);

                // escrever apenas no body-accordion certo
                //ver selectors de jQuery para escrever apenas no sitio certo

                $(jogId).append
                ('<button type="button" data-toggle="modal" data-target=".bd-example-modal-lg">' +
                    '<li class="list-group-item" id=' + value.player.id + '><img alt="perfil" src="' + value.player.photo + '">' + value.player.name + '</li>' +
                    '</button>' +
                    '<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog modal-lg">' +
                    '<div class="modal-content">' +
                    'Awesome' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                );
            });
        })
            .catch(err => {
                console.error(err);
            });
    }
}

