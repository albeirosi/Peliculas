import FormularioActores from "./FormularioActores";
import { urlActores } from '../Utilidades/endpoints';
import { actorCreacionDTO,actorDTO } from './actores.model';
import EditarEntidad from './../Utilidades/EditarEntidad';
import { convertirActorAFormData } from "../Utilidades/FormDataUtils";


export default function EditarActores() {
    const transformar = (actor:actorDTO)=>{
        return {
            nombre: actor.nombre,
            fotoURL: actor.foto,
            fechaNacimiento: new Date(actor.fechaNacimiento)
        }
    }
    return (
        <EditarEntidad<actorCreacionDTO, actorDTO>
            url={urlActores} 
            urlIndice="/actores" 
            nombreEntidad="Actores" 
            transformarFormData = {convertirActorAFormData} 
            transformar={transformar}
            >
                
            {(entidad, editar) =>
                <FormularioActores
                    modelo={entidad} onSubmit={
                        async valores => { await editar(valores); }
                    }
                ></FormularioActores>
            }
        </EditarEntidad>
    )
}