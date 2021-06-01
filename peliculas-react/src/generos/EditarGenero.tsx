
import React from "react";
import { urlGeneros } from "../Utilidades/endpoints";
import EditarEntidad from './../Utilidades/EditarEntidad';
import FormulariosGeneros from "./FormulariosGeneros";
import { generoCreacionDTO, generoDTO } from "./generos.model";

export default function EditarGeneros() {

    return (
       
            <EditarEntidad<generoCreacionDTO,generoDTO> 
            url={urlGeneros} urlIndice = "/generos" nombreEntidad = "Géneros">
                {(entidad, editar) =>
                        <FormulariosGeneros
                            modelo = {entidad} onSubmit = {async valores => {
                                await editar(valores);
                            }}
                        />
                }

            </EditarEntidad>       
    )
}