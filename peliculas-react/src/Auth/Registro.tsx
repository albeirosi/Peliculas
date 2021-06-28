import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import axios from 'axios';
import { useContext, useState } from "react";
import { urlCuentas } from './../Utilidades/endpoints';
import MostrarErrores from './../Utilidades/MostrarErrores'
import { GuardarTokenLocalStore, obtenerClaims } from "./manejadorJWT";
import AutenticacionContext from "./AutenticacionContext";
import { useHistory } from "react-router-dom";

export default function Registro() {

     const [errores, setErrores] = useState<string[]>([]);
     const {actualizar} = useContext(AutenticacionContext);
     const history = useHistory();

    async function registrar(credenciales: credencialesUsuario) 
    {
        try
        {            
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales);    
            GuardarTokenLocalStore(respuesta.data);
            actualizar(obtenerClaims());
            history.push("/");

            console.log(respuesta.data);
        }
        catch(error)
        {           
            setErrores(error.response.data);
        }
    }

    return (
        <>
            <h3>Registros</h3>
            <MostrarErrores errores={errores} />
            <FormularioAuth modelo={{ email: '', password: '' }}
                onSubmit={async valores => await registrar(valores)}

            />
        </>
    )

}
