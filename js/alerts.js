
function showAlertError(msgTxt = "Ocorreu um erro.") {
    Swal.fire({
        title: 'Erro!',
        text: msgTxt,
        icon: 'error',
        confirmButtonText: 'Ok...',
        timer: 1500
    })
}

function showAlertSucess(msgTxt = "Operação concluída com sucesso.") {
    Swal.fire({
        title: 'Sucesso!',
        text: msgTxt,
        icon: 'success',
        confirmButtonText: 'Cool',
        timer: 1500
    })
}

function showAlertInfo(msgTxt = "") {
    Swal.fire({
        title: 'Informação!',
        text: msgTxt,
        icon: 'info',
        confirmButtonText: 'Cool',
        timer: 1500
    })
}