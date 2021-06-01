import axios from 'axios'
import { useState } from 'react'
import { useHistory } from 'react-router'
import { urlActores } from '../Utilidades/endpoints'
import MostrarErrores from '../Utilidades/MostrarErrores'
import { actorCreacionDTO } from './actores.model'
import ForularioActores from './FormularioActores'
import { convertirActorAFormData } from './../Utilidades/FormDataUtils'

export default function CrearActores() {

    const [errores, setErrores] = useState<string[]>([]);
    const history = useHistory();


    async function crear(actor: actorCreacionDTO) {
        try {
            const formData = convertirActorAFormData(actor);
            await axios({
                method: 'post',
                url: urlActores,
                data: formData,
                headers: { 'content-Type': 'multipart/form-data' }
            });
            history.push('/actores')
        } catch (error) {
            setErrores(error.response.data);
        }
    }


    return (
        <>
            <h1>Crear Actor</h1>
            <MostrarErrores errores={errores} />
            <ForularioActores
                modelo={{ nombre: '', fechaNacimiento: undefined }}
                onSubmit={async valores => await crear(valores)}
            ></ForularioActores>


        </>
    )
}