import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { cineDTO } from '../cines/cines.model'
import { generoDTO } from '../generos/generos.model'
import Cargando from '../Utilidades/Cargando'
import { urlPeliculas } from '../Utilidades/endpoints'
import { convertirPeliculaAFormData } from '../Utilidades/FormDataUtils'
import MostrarErrores from '../Utilidades/MostrarErrores'

import FormularioPeliculas from './FormularioPeliculas'
import { peliculaCreacionDTO, peliculasPostGetDTO } from './peliculas.model'

export default function CrearPeliculas() {

const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<generoDTO[]>([]);
const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<cineDTO[]>([]);
const [cargado, setCargado] = useState(false);
const history = useHistory();
const [errores, setErrores] = useState<string[]>([]);

    useEffect(()=>{
        axios.get(`${urlPeliculas}/postget`)
        .then((respuesta: AxiosResponse<peliculasPostGetDTO>)=>{
            setGenerosNoSeleccionados(respuesta.data.generos);
            setCinesNoSeleccionados(respuesta.data.cines);
            setCargado(true);
        })
    },[])
    
    async function crear(pelicula:peliculaCreacionDTO){
        try
        {
            const formData= convertirPeliculaAFormData(pelicula);
            await axios({
                method:'post',
                url:urlPeliculas,
                data:formData,
                headers:{'Content-Type': 'multipart/form-data'}
            }).then((respuesta:AxiosResponse<number>)=>{
                history.push(`/pelicula/${respuesta.data}`)
            })
        }
        catch(error){

            setErrores(error.response.data);
        }
    }
    

    return (
        <>
            <h1>Crear Películas</h1>   
            <MostrarErrores errores={errores}/>
            {
            cargado?
                <FormularioPeliculas
            
                    actoresSeleccionados={[]}
                    generosNoSeleccionados={generosNoSeleccionados}
                    generosSeleccionados={[]}
                    cinesSeleccionados={[]}
                    cinesNoSeleccionados={cinesNoSeleccionados}
                    modelo = {{titulo:'', enCines:false, trailer:''}}
                    onSubmit={async valores=>await crear(valores)}
                />
            :<Cargando/>
        }


            
        </>

    )
}