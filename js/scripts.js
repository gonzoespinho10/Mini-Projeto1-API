// Constante com host e com a key da API

const x_rapidapi_host = "api-football-v1.p.rapidapi.com";
const x_rapidapi_key = "a06cb32d05mshcec7ac543b257ffp1ba284jsne9c15de7c013";

// Limpar a Local Storage
localStorage.clear();


// Obter equipas por Liga e por Ano

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
            renderPlayerList(teamId);

        })
        .catch(err => {
            console.error(err);
        });
}

// No OnClick passar a id da equipa certa

function renderStandings(standings) {

    $.each(standings, function (key, value) {

        $("#ligaPortuguesa").append
        ('<div class="accordion-item">' +
            '<h2 class="accordion-header" id="heading' + value.team.id + '">' +
            '<button class="accordion-button collapsed" onclick="renderPlayerList(' + value.team.id + ')" type="button" ' +
            'data-bs-toggle="collapse" data-bs-target="#collapse' + value.team.id + '"' +
            ' aria-expanded="false" aria-controls="collapse' + value.team.id + '">' +
            ' ' + value.team.name + ' ' +
            '</button>' +
            '<div id="collapse' + value.team.id + '" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">' +
            '<div class="accordion-body" id="acc-body' + value.team.id + '">' +
            '<ul class="row list-group" style="flex-direction: row" id="jogadores' + value.team.id + '"></ul>' +
            '</div>' +
            '</div>' +
            '</h2>' +
            '</div>');
    })
}

// Render dos Jogadores
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

                // Escrever apenas no body-accordion certo
                // Ver selectors de jQuery para escrever apenas no sitio certo

                var playersID = value.player.id;

                // criar botão do jogador
                var btnModal = document.createElement('button');
                btnModal.type = 'button';
                btnModal.className = "btn col-md-4 rounded";
                btnModal.addEventListener("click", function (){
                    openModal(playersID);
                })
                btnModal.setAttribute("data-toggle", "modal");
                btnModal.setAttribute("data-target", "#modalJogadores");

                // Criar as listas
                var listJogador = document.createElement('li');
                listJogador.className = "list-group-item display-5 fs-4";
                listJogador.style.display = "block";
                listJogador.style.textAlign = "start";
                listJogador.id = playersID;

                //Criar imagem Jogador
                var imgJogador = document.createElement('img');
                imgJogador.className = "img-thumbail rounded-circle float-left m3";
                imgJogador.alt = "perfil";
                imgJogador.src = value.player.photo;

                var nomeJogador = document.createElement('span');
                nomeJogador.textContent = value.player.name;
                nomeJogador.color = 'black';

                console.log(value.player.name);

                listJogador.append(imgJogador);
                listJogador.append(nomeJogador);
                btnModal.append(listJogador);

                $(jogId).append(btnModal);

                // $(jogId).append
                // ('<button type="button" class="btn col-md-4 rounded" onclick="openModal(' + value.player.id + ')" data-toggle="modal" data-target="#modalJogadores" >' +
                //     '<li class="list-group-item display-5 fs-4" style="display: block; text-align: start" id=' + value.player.id + '>' +
                //     '<img class="img-thumbnail rounded-circle float-left m-3" alt="perfil" src="' + value.player.photo + '">' + value.player.name +
                //     '</li>' +
                //     '</button>'
                // );
            });
        })
            .catch(err => {
                console.error(err);
            });
    }
}

// Fetch do jogador de forma assíncrona
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

// Abrir Modal
async function openModal(playerID) {


    // referência do modal
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});

    // dados do jogador
    var player = await fetchPlayer(playerID);

    // nome do jogador e estatísticas
    var playerInfo = player.response[0].player
    var playerStats = player.response[0].statistics

    console.log(player.response[0].player);
    console.log(player.response[0].statistics);

    // Algoritmo para escrever 0 no número de jogadores caso seja null
    if (playerStats[0].games.appearences == null) {
        playerStats[0].games.appearences = 0;
    }

    if (playerStats[0].goals.assists == null) {
        playerStats[0].goals.assists = 0;
    }

    $('#modalText')[0].innerHTML = '';

    // Golos Marcados
    var golos = playerStats[0].goals.total;
    // Assistências
    var assistencias = playerStats[0].goals.assists;

    var posicao = playerStats[0].games.position;

    var nome = playerInfo.name;

    var jogos = playerStats[0].games.appearences;

    console.log(golos);

// Criar conteúdo do modal

    var name = document.createElement('h2');
    name.className = "display-5";
    name.style.textAlign = "center";
    name.innerText = ""+nome;

    var position = document.createElement('h3');
    position.className = "display-5 fs-5";
    position.style.textAlign = "center";
    position.innerText = "Posição:"+posicao

    linha = document.createElement('hr');

    var games = document.createElement('h3');
    games.className = "lead fs-2";
    games.style.textAlign = "center";
    games.innerText = "Jogos:"+jogos

    var goals = document.createElement('h3');
    goals.className = "lead fs-2";
    goals.style.textAlign = "center";
    goals.innerText = "Golos:"+golos

    var assists = document.createElement('h3');
    assists.className = "lead fs-2";
    assists.style.textAlign = "center";
    assists.innerText = "Assistências:"+assistencias


    // Render do Conteúdo
    $("#modalText").append(name);
    $("#modalText").append(position);
    $("#modalText").append(linha);
    $("#modalText").append(games);
    $("#modalText").append(goals);
    $("#modalText").append(assists);


    // Botão de adicionar
    addButton = document.getElementById('addButton');
    addButton.addEventListener('click', function () {
       addPlayerMyList(playerID)
    });
    console.log(addButton);

    myModal.show();
}

//Acrescentar jogador à lista
function addPlayerMyList(playerID) {

    console.log("add player id: " + playerID)

    // Retrieve the object from storage
    var players = JSON.parse(localStorage.getItem("playerList"));

    console.log(players);

    // Inicializar caso não exista
    if (players === null) {
        players = [];
    }

    // Adicionar jogador ao array
    players.push(playerID);


    // Put the object into storage
    localStorage.setItem("playerList", JSON.stringify(players));

    var myModalEl = document.getElementById('exampleModal')

    // Fechar modal ao clicar no botão
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();

}

function removePlayerMyList(playerID) {
    localStorage.removeItem(playerID);
}
