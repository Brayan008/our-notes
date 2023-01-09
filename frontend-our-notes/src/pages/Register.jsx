import React, { useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import authController from '../controllers/authController';
import {Link} from "react-router-dom";
import passwordIMg from "../img/password.png"

function Register() {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpass, setConfpass] = useState("");

    async function register() {
        if (user === "" || email === "" || password === "" || confpass === "") {
            return NotificationManager.error('Todos los campos son requeridos');
        }

        if (password.length <= 7) {
            return NotificationManager.warning('La contrasena debe ser mayor o igual a 8 caracteres.');
        }

        if (password !== confpass) {
            return NotificationManager.error('Las contrasenas no son iguales.');
        }

        const res = await authController.authRegister(user, email, password)

        if (res.error === true || res.status === 400 || res.status === 401) {
            return NotificationManager.error(res.message);
        }

        setUser("")
        setEmail("")
        setPassword("")
        setConfpass("")
        return NotificationManager.success(res.message);

    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 align="center">Registro de Usuarios</h1>
                    <div align="center">
                        <img src={passwordIMg} height="300" alt='img-register'></img>
                    </div>
                    <NotificationContainer />
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text"
                            class="form-control"
                            value={user}
                            onChange={(e) => { setUser(e.target.value) }}
                            id="inpUsername"
                            aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input
                            type="email"
                            class="form-control"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Confirmar Password</label>
                        <input type="password"
                            value={confpass}
                            onChange={(e) => { setConfpass(e.target.value) }}
                            class="form-control"
                            id="confPass" />
                    </div>

                    <div class="col col-12" align="center">
                        <button class="btn btn-primary"
                            onClick={() => { register() }}>Registrar</button>
                        <br />
                        <br />
                        <p><Link to="/">Iniciar sesion</Link></p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register