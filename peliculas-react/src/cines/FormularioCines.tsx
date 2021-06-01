import { Form, Formik, FormikHelpers } from "formik";
import { cineCreacionDTO } from "./cines.model";
import FormGroupText from './../Utilidades/FormGroupText'
import * as Yup from 'yup'
import Button from "./../Utilidades/Button";
import { Link } from "react-router-dom";
import Mapas from '../Utilidades/Mapa';

export default function FormularioCines(props:formularioCinesProps){


    return(
        <>
            <Formik
                initialValues={props.modelo}
                onSubmit={props.onSubmit}
                validationSchema={Yup.object({
                    nombre: Yup.string().required("Este campo es requerido").primeraLetraMayuscula()
                })}
            >
                {(formikProps)=>(
                    <Form>
                        <FormGroupText label="Nombre" campo="nombre"/>
                       <div style={{marginBottom:'1rem'}}>
                           <Mapas height='250px' />
                        </div>

                        <Button disabled={formikProps.isSubmitting} type="submit">Guardar</Button>
                        <Link className="btn btn-secondary" to="/cines">Cancelar</Link>
                    </Form>

                )}

            </Formik>
<br/>
        </>
    )
}

interface formularioCinesProps{
    modelo:cineCreacionDTO;
    onSubmit(valores:cineCreacionDTO, acciones:FormikHelpers<cineCreacionDTO>):void;
}