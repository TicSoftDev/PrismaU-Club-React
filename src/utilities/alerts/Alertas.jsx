import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export const alertSucces = (text) => {
    toast.success(text);
}

export const alertError = (text) => {
    toast.error(text);
}

export const alertWarning = (text) => {
    toast.error(text, { icon: '⚠️' });
}

export const alertConfirm = async (title, confirmButtonText) => {
    const result = await Swal.fire({
        title,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText,
        cancelButtonText: "No, cancelar",
    });
    return result.isConfirmed;
};

export const alertOk = async (title, text, confirmButtonText) => {
    const result = await Swal.fire({
        icon: "warning",
        title,
        text,
        confirmButtonColor: "#3085d6",
        confirmButtonText,
        allowOutsideClick: false,
        allowEscapeKey: false,
    });
    return result.isConfirmed;
};