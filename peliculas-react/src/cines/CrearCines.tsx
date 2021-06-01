import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { urlCines } from '../Utilidades/endpoints'
import MostrarErrores from '../Utilidades/MostrarErrores'
import { cineCreacionDTO } from './cines.model'
import FormularioCines from './FormularioCines'

export default function CrearCines() {

    const histori = useHistory();
    const [errores, setErrores ]= useState<string[]>([]);

async function crear(cine:cineCreacionDTO){
    try {
        await axios.post(urlCines, cine)
    } catch (error) {
        setErrores(error.response.data);
    }
}

    return (
        <>
            <h1>Crear Cines</h1>
            <MostrarErrores errores={errores}/>
            <FormularioCines
                modelo={{ nombre: '' }}
                onSubmit={async valores => await crear(valores)}
            />



        </>
    )
}