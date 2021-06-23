import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import axios from 'axios';
import { useState } from "react";
import { urlCuentas } from './../Utilidades/endpoints';
import MostrarErrores from './../Utilidades/MostrarErrores'

export default function Loging() {

    const [errores, setErrores] = useState<string[]>([]);

    async function login(credenciales: credencialesUsuario) {
        try {
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/login`, credenciales);
            console.log(respuesta);
        }
        catch (error) {
            setErrores(error.response.data);
        }
    }

    return (
        <>
        <h3>Login</h3>
        <MostrarErrores errores={errores}/>
            <FormularioAuth
                modelo={{ email: '', password: '' }}
                onSubmit={async valores => await login(valores)}
            />
        </>
    )
}