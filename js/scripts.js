// Constante com host e com a key da API

const x_rapidapi_host = "api-football-v1.p.rapidapi.com";
const x_rapidapi_key = "a06cb32d05mshcec7ac543b257ffp1ba284jsne9c15de7c013";

function getStandingsByLeagueIDAndSeason(leagueID, season) {
    fetch("https://api-football-v1.p.rapidapi.com/v3/standings?season=" + season + "&league=" + leagueID, {
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

            renderStandings(standings);
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

    console.log("render player list: " + teamID)

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
                    openModal(JSON.stringify(value));
                });
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
                imgJogador.className = "img-thumbnail rounded-circle float-left m3 foto-jogador";
                imgJogador.alt = "perfil";
                imgJogador.src = value.player.photo;

                var nomeJogador = document.createElement('span');
                nomeJogador.textContent = value.player.name;
                nomeJogador.color = 'black';

                listJogador.append(imgJogador);
                listJogador.append(nomeJogador);
                btnModal.append(listJogador);

                $(jogId).append(btnModal);
            });
        })
            .catch(err => {
                console.error(err);
            });
    }
}

// // Fetch do jogador de forma assíncrona
// async function fetchPlayer(playerID) {
//     try {
//         const response = await fetch("https://api-football-v1.p.rapidapi.com/v3/players?id=" + playerID + "&season=2021", {
//             "method": "GET",
//             "headers": {
//                 "x-rapidapi-host": x_rapidapi_host,
//                 "x-rapidapi-key": x_rapidapi_key
//             }
//         });
//
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//     }
// }

// Abrir Modal
async function openModal(player) {
    // referência do modal
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {});

    // dados do jogador
    //var player = await fetchPlayer(playerID);
    //console.log(player);

    var playerToJson = JSON.parse(player);

    // nome do jogador e estatísticas
    var playerInfo = playerToJson.player;
    var playerStats = playerToJson.statistics;

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
    assists.innerText = "Assistências:" + assistencias

    // Render do Conteúdo
    $("#modalText").append(name);
    $("#modalText").append(position);
    $("#modalText").append(linha);
    $("#modalText").append(games);
    $("#modalText").append(goals);
    $("#modalText").append(assists);

    // Botão de adicionar
    // Tirar evento de click anterior
    $('#addButton').unbind('click');

    // Adicionar novo evento
    $('#addButton').click(function(){
        addPlayerMyList(player)
    });

    $('#removeButton').unbind('click');
    // Adicionar novo evento
    $('#removeButton').click(function(){
        removePlayerMyList(player)
    });

    myModal.show();
}

// Retrieve the object from storage
function getListFromLocalStorage() {
    return JSON.parse(localStorage.getItem("playerList"));
}

// Put the object into storage
function setListFromLocalStorage(playerList) {
    localStorage.setItem("playerList", JSON.stringify(playerList));
}

//Acrescentar jogador à lista
function addPlayerMyList(player) {
    var players = getListFromLocalStorage();

    // Inicializar caso não exista
    if (players === null) {
        players = [];
    }

    // Verificar se já existe no array
    if (jQuery.inArray( player, players ) === -1){
        // Adicionar jogador ao array
        players.push(player);
    }

    setListFromLocalStorage(players);
    closeModal();
}

function removePlayerMyList(player) {
    // Retrieve the object from storage
    var players = getListFromLocalStorage();

    // remove player from list
    players = jQuery.grep(players, function(value) {
        return value != player;
    });

    // Put the object into storage
    localStorage.setItem("playerList", JSON.stringify(players));

    setListFromLocalStorage(players);
    closeModal();
}

function closeModal() {
    var myModalEl = document.getElementById('exampleModal')
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function renderMyPlayersTable() {
    // Retrieve the object from storage
    var players = getListFromLocalStorage();

    $.each(players, function (key, value) {

        $("#myPlayersListRows").append
        ("<tr>" +
            "<th scope=\"row\">1</th>" +
            "            <td>Mark</td>\n" +
            "        </tr>");
    })
}