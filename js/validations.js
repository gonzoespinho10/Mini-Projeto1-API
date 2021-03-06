
const maxGoalkeepers= 2;
const maxDefenders = 6;
const maxMidfielders = 4;
const maxAttackers = 3;
const minTeamSize = 11;
const maxTeamSize = 15;
const maxOfSameTeam = 2;

// Verificar se na lista de jogagadores existem mais do que X jogadores da mesma equipa
// Retorna true se o limite não foi excedido ou false caso contrário
function checkMaxOfSameTeam(players, player) {

    let addedPlayerTeamID = JSON.parse(player).statistics[0].team.id;
    let count = 0 ;

    $.each( players, function( key, player ) {

        var playerInfo = JSON.parse(player);

        var playerTeamID = playerInfo.statistics[0].team.id;

        if (playerTeamID === addedPlayerTeamID){
            count ++
        }
    });

    return count <= maxOfSameTeam;
}

// Valida a lista final de jogadores
// Verifica cada condição e devolve potenciais erros no final
function validatePLayerList() {

    const players = getListFromLocalStorage();
    let isValid = true;
    let errorMsg = "";

    if(validateMinTeamSize(players) === false){
        errorMsg += "Jogadores a menos. ";
        isValid = false;
    }

    if(validateMaxTeamSize(players) === false){
        errorMsg += "Jogadores a mais. ";
        isValid = false;
    }

    if(validatePositionMax(players, "Goalkeeper", maxGoalkeepers) === false){
        errorMsg += "Guarda-redes em excesso. ";
        isValid = false;
    }

    if(validatePositionMax(players, "Defender", maxDefenders) === false){
        errorMsg += "Defensas em excesso. ";
        isValid = false;
    }

    if(validatePositionMax(players, "Midfield", maxMidfielders) === false){
        errorMsg += "Meio campo em excesso. ";
        isValid = false;
    }

    if(validatePositionMax(players, "Attacker", maxAttackers) === false){
        errorMsg += "Atacantes em excesso. ";
        isValid = false;
    }

    // Caso tenha passado todas as validações
    if (isValid) {
        showAlertSucess("boa puto")
        // faz coisas
    } else {
        showAlertInfo(errorMsg)
    }
}

// Valida se o numero mínimo e máximo de jogadores é respeitado
function validateMinTeamSize(players) {
    return players.length >= minTeamSize ;
}

// Valida se o numero maximo e máximo de jogadores é respeitado
function validateMaxTeamSize(players) {
    return players.length <= maxTeamSize;
}

// Valida o numero maximo de guarda-redes
// Retorna true se o limite for respeitado
function validatePositionMax(players, position, maxNumber) {
    let count = 0;

    $.each(players, function( key, player ) {
        var playerInfo = JSON.parse(player);
        var playerPosition = playerInfo.statistics[0].games.position;

        if(playerPosition === position) {
            count++;
        }
    });

    return count <= maxNumber;
}
