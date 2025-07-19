export const crearStorage = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data));
}

export const crearStorageString = (itemName, data) => {
    localStorage.setItem(itemName, data);
}

export const removerStorage = (itemName) => {
    localStorage.removeItem(itemName);
}

export const usarStorage = (itemName) => {
    const localstorageItem = localStorage.getItem(itemName);
    return JSON.parse(localstorageItem);
}

export const usarStorageString = (itemName) => localStorage.getItem(itemName);



