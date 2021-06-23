import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import axios from 'axios';
import { useState } from "react";
import { urlCuentas } from './../Utilidades/endpoints';
import MostrarErrores from './../Utilidades/MostrarErrores'

export default function Registro() {

     const [errores, setErrores] = useState<string[]>([]);

    async function registrar(credenciales: credencialesUsuario) 
    {
        try
        {            
            const respuesta = await axios.post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales);    
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
