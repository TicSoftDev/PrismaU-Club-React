import axios from "axios";

// const URL_PERSONAL = "https://www.apiclubsincelejo.prismau.co/api/personal";
const URL_PERSONAL = "http://127.0.0.1:8000/api/personal";

export async function createPersonal(personal) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(URL_PERSONAL, personal, options);
    return res.data;
};

export async function updatePersonal(personal, id) {
    const res = await axios.put(URL_PERSONAL + "/" + id, personal);
    return res.data;
};

export async function updateImagePersonal(foto, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    const res = await axios.post(URL_PERSONAL + "/imagen/" + id, foto, options);
    return res.data;
};

export async function deletePersonal(id) {
    const res = await axios.delete(URL_PERSONAL + "/" + id);
    return res.data;
};