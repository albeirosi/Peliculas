import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { urlGeneros } from '../Utilidades/endpoints';
import FormulariosGeneros from './FormulariosGeneros'
import { generoCreacionDTO } from './generos.model';
import MostrarErrores from './../Utilidades/MostrarErrores'

export default function CrearGeneros() {
    const history = useHistory();
    const [errores, setErrores] = useState<string[]>([])

    async function crear(genero: generoCreacionDTO) {
        try {
            await axios.post(urlGeneros, genero);
            history.push('/generos')
        }
        catch (error) {                       
            setErrores(error.response.data);
        }
    }
    return (
        <>

            <h1>Nuevo Genero </h1>

            <MostrarErrores errores={errores} />
            <FormulariosGeneros
                modelo={{ nombre: '' }} onSubmit={async valores => {
                    await crear(valores);
                }}
            />


        </>
    )
}