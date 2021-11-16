
const maxGoalkeepers= 2;
const maxDefenders = 6;
const maxMidfielders = 4;
const maxAttacker = 3;
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

    if (count > maxOfSameTeam){
        return false;
    }

    return true;
}

// Valida a lista final de jogadores
// Verifica cada condição e devolve potenciais erros no final
function validatePLayerList() {

    const players = getListFromLocalStorage();
    let isValid = true;
    let errorMsg = "";

    if(validateTeamSize(players) === false){
        errorMsg += "Jogadores em excesso. ";
        isValid = false;
    }

    if(validateGoalkeepers(players) === false){
        errorMsg += "Guarda-redes em excesso. ";
        isValid = false;
    }

    if(validateDefenders(players) === false){
        errorMsg += "Defensas em excesso. ";
        isValid = false;
    }

    if(validateMidfielders(players) === false){
        errorMsg += "Meio campo em excesso. ";
        isValid = false;
    }

    if(validateAttackers(players) === false){
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
function validateTeamSize(players) {

    return true;
}


// Valida o numero maximo de guarda-redes
// Retorna true se o limite for respeitado
function validateGoalkeepers(players) {

    let count = 0;

    $.each(players, function( key, player ) {

        var playerInfo = JSON.parse(player);
        var playerPosition = playerInfo.statistics[0].games.position;

        console.log(playerInfo.player.id + " - " + playerPosition);

        if(playerPosition === "Goalkeeper") {
            count++;
        }
    });

    if(count > maxGoalkeepers) {
        return false
    }
    else {
    return true;
    }
}

// Valida o numero maximo de defensas
// Retorna true se o limite for respeitado
function validateDefenders(players) {

    $.each(players, function( key, player ) {

        var playerInfo = JSON.parse(player);
        var playerPosition = playerInfo.statistics[0].games.position;

        console.log(playerInfo.player.id + " - " + playerPosition)

    });



    return true;
}

// Valida o numero maximo de meio campo
// Retorna true se o limite for respeitado
function validateMidfielders(players) {
    return true;
}

// Valida o numero maximo de atacantes
// Retorna true se o limite for respeitado
function validateAttackers(players) {
    return true;
}