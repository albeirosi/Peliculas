import { cineDTO } from '../cines/cines.model'
import { generoDTO } from '../generos/generos.model'
import FormularioPeliculas from './FormularioPeliculas'

export default function CrearPeliculas() {

    const generos:generoDTO[]=[
        {id:1,nombre:"Comedia"}, 
        {id:2,nombre:"Acción"},
         {id:3,nombre:"Drama"}]

    const cines:cineDTO[]=[{id:1,nombre:'C.C. Cinema del parque'}, {id:2, nombre:'C.C. la herradura'}, {id:3, nombre:'C.C. la 14'}]

    return (
        <>
            <h1>Crear Películas</h1>   

            <FormularioPeliculas
                actoresSeleccionados={[]}
                generosNoSeleccionados={generos}
                generosSeleccionados={[]}
                cinesSeleccionados={[]}
                cinesNoSeleccionados={cines}
                modelo = {{titulo:'', enCines:false, trailer:''}}
                onSubmit={valores=>console.log(valores)}
            />



            
        </>

    )
}