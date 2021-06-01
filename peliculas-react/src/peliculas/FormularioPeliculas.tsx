import { Form, Formik, FormikHelpers } from "formik";
import { peliculaCreacionDTO } from './peliculas.model'
import * as Yup from 'yup'
import FormGroupText from './../Utilidades/FormGroupText'
import Button from './../Utilidades/Button'
import FormGroupCheckbox from './../Utilidades/FormGroupCheckbox'
import FormGroupFecha from './../Utilidades/FormGroupFecha'
import FormGroupImagen from './../Utilidades/FormGroupImagen'
import { Link } from "react-router-dom";
import SelectorMultiple, { selectorMultipleModel } from './../Utilidades/SelectorMultiple'
import { generoDTO } from "../generos/generos.model";
import React, { useState } from "react";
import { cineDTO } from "../cines/cines.model";
import TypeAheadActores from './../actores/TypeAheadActores'
import { actorPeliculaDTO } from "../actores/actores.model";

export default function FormularioPeliculas(props: formularioPeliculasProps) {

    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));

    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

    useState(mapear(props.cinesSeleccionados))

    const [actoresSeleccionados, setActoresSeleccionados]=useState<actorPeliculaDTO[]>(props.actoresSeleccionados)

    function mapear(arreglo: { id: number, nombre: string }[]): selectorMultipleModel[] {
        return arreglo.map(valor => {
            return { llave: valor.id, valor: valor.nombre }
        })

    }

    return (
        <>
            <Formik
                initialValues={props.modelo}
                onSubmit={(valores, acciones) => {
                    valores.generosIds = generosSeleccionados.map(valor => valor.llave);
                    valores.cinesIds = cinesSeleccionados.map(valor => valor.llave);
                    valores.actores = actoresSeleccionados;
                    props.onSubmit(valores, acciones);
                }
                }



                validationSchema={
                    Yup.object({
                        titulo: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
                    })
                }>
                {formikProps => (
                    <Form>
                        <FormGroupText label="Título" campo="titulo" />
                        <FormGroupCheckbox label="En cines" campo="enCines" />
                        <FormGroupText label="Trailer" campo="trailer" />
                        <FormGroupFecha campo="fechaLanzamiento" label="Fecha de Lanzamiento" />
                        <FormGroupImagen campo="poster" label="Poster" imagenURL={props.modelo.posterURL} />
                        <div className="form-group">
                            <label>Géneros:</label>
                            <SelectorMultiple seleccionados={generosSeleccionados}
                                noSeleccionados={generosNoSeleccionados}
                                onChange={(seleccionados, noSeleccionados) => {
                                    setGenerosSeleccionados(seleccionados);
                                    setGenerosNoSeleccionados(noSeleccionados);
                                }} />

                        </div>

                        <div className="form-group">
                            <label>Cines:</label>
                            <SelectorMultiple seleccionados={cinesSeleccionados}
                                noSeleccionados={cinesNoSeleccionados}
                                onChange={(seleccionados, noSeleccionados) => {
                                    setCinesSeleccionados(seleccionados);
                                    setCinesNoSeleccionados(noSeleccionados);
                                }} />

                        </div>
                        <div className="form-group">
                            <TypeAheadActores  
                            onAdd={actores=>{
                                setActoresSeleccionados(actores)
                            }}
                            onRemove={actor=>{
                                const actores = actoresSeleccionados.filter(x => x !==actor);
                                setActoresSeleccionados(actores);
                            }}
                            actores = {actoresSeleccionados} 
                            listadoUI = {(actor:actorPeliculaDTO)=>
                                <>
                                    {actor.nombre} / <input placeholder = "Personaje"
                                    type='text' value = {actor.personaje}
                                    onChange = { e => {
                                        const indice = actoresSeleccionados.findIndex(x=>x.id === actor.id);

                                        const actores = [...actoresSeleccionados];
                                        actores[indice].personaje = e.currentTarget.value;
                                        setActoresSeleccionados(actores);
                                    }}
                                    
                                    />

                            
                                </>
                            }/>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <Button disabled={formikProps.isSubmitting} type="submit" >Enviar</Button>
                        <Link className="btn btn-secondary" to="/">Cancelar</Link>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Form>
                )}
            </Formik>

        </>
    )


}

interface formularioPeliculasProps {
    modelo: peliculaCreacionDTO;
    onSubmit(valores: peliculaCreacionDTO, acciones: FormikHelpers<peliculaCreacionDTO>): void;
    generosSeleccionados: generoDTO[];
    generosNoSeleccionados: generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actoresSeleccionados:actorPeliculaDTO[];
}