import BASE_URL_API from '../api/baseURL.js'

const errInt = {
    error: true,
    message: "Error interno consulta administracion  al correo mynotes@gmail.com - ",

}

const authRegister = async (username, email, pass) => {
    try {
        const res = await fetch(BASE_URL_API + "register", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: pass,
                email: email,
                role: []
            })
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}

const authLogin = async (username, pass) => {
    try {
        const res = await fetch(BASE_URL_API + "login", {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: pass,
            })
        })
        const data = await res.json();
        return data
    } catch (err) {
        errInt.message += err
        return errInt
    }
}

const authLogout = () => {
    try {
        localStorage.removeItem('sesionData');
    } catch (error) {
        console.log(error);
    }
};

const authUser = () => {
    try {
        const value = localStorage.getItem('sesionData');
        if (value !== null) {
            return JSON.parse(value)
        }
        return null
    } catch (error) {
        console.log(error);
    }
}


const authController = {
    authRegister,
    authLogin,
    authUser,
    authLogout
}

export default authController