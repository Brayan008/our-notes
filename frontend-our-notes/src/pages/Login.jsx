import React, { useState } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import authController from '../controllers/authController';
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../img/web-notes.png";

function Login() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    if (authController.authUser() !== null) {
        navigate('/tasks');
    }

    async function login() {
        if (user === "" || password === "") {
            return NotificationManager.error('Todos los campos son requeridos');
        }

        const res = await authController.authLogin(user, password)

        if (res.error === true || res.status === 400 || res.status === 401) {
            return NotificationManager.error(res.message);
        }

        localStorage.setItem('sesionData', JSON.stringify(res.data))

        setUser("")
        setPassword("")
        navigate('/tasks')
        return NotificationManager.success(res.message);

    }

    return (
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <h1 align="center">Our Notes - V2.0</h1>
                    <div align="center">
                        <img src={imgLogin} height="300" alt='img'></img>
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
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            class="form-control"
                            id="exampleInputPassword1" />
                    </div>
                    <div class="col col-12" align="center">
                        <button class="btn btn-primary"
                            onClick={() => { login() }}>Iniciar sesion</button>
                        <br />
                        <br />
                        <p>No tienes cuenta? <Link to="register">Registrate</Link></p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login