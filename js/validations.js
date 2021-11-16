
const maxGoalkeepers= 2;
const maxDefenders = 5;
const maxMidfielders = 5;
const maxAttacker = 3;
const minTeamSize = 11;
const maxTeamSize = 15;
const maxOfSameTeam = 2;

// Verificar se na lista de jogagadores existem mais do que X jogadores da mesma equipa
// Retorna true se o limite não foi excedido ou false caso contrário

function checkMaxOfSameTeam(players, player) {

    var addedPlayer = JSON.parse(player);
    var addedTeam = addedPlayer.statistics[0].team.id;
    var count = 0;

    $.each( players, function( key, player ) {

        var playerInfo = JSON.parse(player);
        var playerTeam = playerInfo.statistics[0].team;

        console.log(playerTeam);
        console.log(playerTeam.id + " - " + playerTeam.name)

        if (addedTeam === playerTeam) {
            count++;
        }

        if (count < maxOfSameTeam){
            return true;
        } else {
            return false;
        }
    });
}

// valida a lista final de jogadores
// verifica cada condição e devolve potenciais erros no final
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

    if(validateMidfilders(players) === false){
        errorMsg += "Meios campos em excesso. ";
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

// Valida se o numero minimo e maximo de jogadores é respeitado
function validateTeamSize(players) {

    return true;
}


// Valida o número maximo de guarda-redes
// Retorna true se o limite for respeitado
function validateGoalkeepers(players) {

    $.each(players, function( key, player ) {

        var playerInfo = JSON.parse(player);
        var playerPosition = playerInfo.statistics[0].games.position;

        console.log(playerInfo.player.id + " - " + playerPosition)

    });

    return true;
}

// Valida o numero maximo de defensas
// Retorna true se o limite for respeitado
function validateDefenders(players) {
    return true;
}

// Valida o numero maximo de meio campo
// Retorna true se o limite for respeitado
function validateMidfilders(players) {
    return true;
}

// Valida o numero maximo de atacantes
// Retorna true se o limite for respeitado
function validateAttackers(players) {
    return true;
}