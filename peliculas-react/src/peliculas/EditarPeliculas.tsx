import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Cargando from '../Utilidades/Cargando';
import { urlPeliculas } from '../Utilidades/endpoints';
import { convertirPeliculaAFormData } from '../Utilidades/FormDataUtils';
import MostrarErrores from '../Utilidades/MostrarErrores';
// import { generoDTO } from '../generos/generos.model'
import FormularioPeliculas from './FormularioPeliculas';
import { peliculaCreacionDTO, peliculasPutGetDTO } from './peliculas.model';

export default function EditarPeliculas() {

    const [pelicula, setPelicula]=useState<peliculaCreacionDTO>();
    const [peliculaPutGet, setPeliculaPutGet]=useState<peliculasPutGetDTO>();
    const [errores,setErrores]=useState<string[]>();
    const history =useHistory();
    const{id}:any=useParams();

    useEffect(()=>{
      
    axios.get(`${urlPeliculas}/PutGet/${id}`)
        .then((respuesta:AxiosResponse<peliculasPutGetDTO>)=>{
            const modelo: peliculaCreacionDTO = {
                titulo:respuesta.data.pelicula.titulo,
                enCines:respuesta.data.pelicula.enCines,
                trailer:respuesta.data.pelicula.trailer,
                posterURL:respuesta.data.pelicula.poster,
                resumen:respuesta.data.pelicula.resumen,
                fechaLanzamiento:new Date(respuesta.data.pelicula.fechaLanzamiento)
            };
            setPelicula(modelo);
            setPeliculaPutGet(respuesta.data);
           
        });
    },[id])


    async function Editar(peliculaEditar:peliculaCreacionDTO) {
        
        try{
            const formData = convertirPeliculaAFormData(peliculaEditar);
            await axios({
                method:'put',
                url:`${urlPeliculas}/${id}`,
                data:formData,
                headers:{'Content-Type':'multipart/from-data'}

            });
            history.push(`/pelicula/${id}`);
        }
        catch(error){
            setErrores(error.response.data);
        }
    }
        
    
    return (
        <>
            <h1>Editar Películas</h1>
            <MostrarErrores errores={errores}/>

            {pelicula && peliculaPutGet? <FormularioPeliculas
                actoresSeleccionados = {peliculaPutGet.actores}
                generosSeleccionados={peliculaPutGet.generosSeleccionados}
                generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
                cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
                cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
                modelo={pelicula}
                onSubmit={async valores =>await Editar(valores)}

            />:<Cargando/>
        }
        </>

    )
}