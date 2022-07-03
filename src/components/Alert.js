import Swal from 'sweetalert2';

function sendAlert(type, title, text) {
    Swal.fire({
        title: title,
        text: text,
        icon: type,
      })
}

function sendConfirm (type, title, text) {
    return Swal.fire({
        title: title,
        text: text,
        icon: type,
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar'
      })
}

export {
    sendAlert,
    sendConfirm,
}