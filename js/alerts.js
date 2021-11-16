
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

function rules () {

Swal.fire({
    title: 'Escolhe 15 jogadores para a tua equipa',
    text: "GR: 2 | DE: 5 | MD: 5 | AT: 3 ",
    icon: 'info',
    width: 600,
    padding: '3em',
    backdrop: `
    rgba(0,0,123,0.4)
    url("/img/gifarbitro.gif")
    left top
    no-repeat
  `
})}