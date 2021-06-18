import FormularioCines from './FormularioCines'
import {cineCreacionDTO, cineDTO} from './cines.model'
import { urlCines } from '../Utilidades/endpoints';
import EditarEntidad from './../Utilidades/EditarEntidad'

export default function EditarCines() {
    return (
        <> 
           <EditarEntidad<cineCreacionDTO, cineDTO> 
                url={urlCines} urlIndice = "/cines" nombreEntidad = "Cines">
                    {(entidad, editar) =>
                            <FormularioCines
                                modelo = {entidad} onSubmit = {async valores => {
                                    await editar(valores);
                                }}
                            />
                    }

            </EditarEntidad>   
        </>
    )
}