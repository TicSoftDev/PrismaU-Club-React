import toast from 'react-hot-toast';

export const alertSucces = (text) => {
    toast.success(text);
}

export const alertError = (text) => {
    toast.error(text);
}

export const alertWarning = (text) => {
    toast.error(text, { icon: '⚠️' });
}
