import BASE_URL_API from '../api/baseURL.js'

const errInt = {
    error: true,
    message: "Error interno consulta administracion  al correo mynotes@gmail.com - ",

}

const listCategorys = async () => {
    try {
        const res = await fetch(BASE_URL_API+"category", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}

export {
    listCategorys
}