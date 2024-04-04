import Swal from 'sweetalert2';

export const alertSucces = (text) => {
    Swal.fire({
        icon: 'success',
        title: 'Realizado',
        text: text,
        showConfirmButton: false,
        timer: 1500
    })
}

export const alertError = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: text,
        showConfirmButton: false,
        timer: 1500
    })
}

export const alertWarning = (text) => {
    Swal.fire({
        icon: 'warning',
        title: 'Incompleto',
        text: text,
        showConfirmButton: false,
        timer: 3000
    })
}
