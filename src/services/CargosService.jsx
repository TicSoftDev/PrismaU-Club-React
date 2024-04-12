import axios from "axios";

// const URL_CARGO = "https://www.apiclubsincelejo.prismau.co/api/cargos";
const URL_CARGO = "http://127.0.0.1:8000/api/cargos";

export async function createCargo(cargo) {
    const options = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = await axios.post(URL_CARGO, cargo, options);
    return res.data;
};

export async function getcCargos() {
    const res = await axios.get(URL_CARGO);
    return res.data; 
};

export async function updateCargo(cargo, id) {
    const res = await axios.put(URL_CARGO + "/" + id, cargo);
    return res.data;
};


export async function deleteCargo(id) {
    const res = await axios.delete(URL_CARGO + "/" + id);
    return res.data;
};
