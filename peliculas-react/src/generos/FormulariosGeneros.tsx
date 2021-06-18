import { Link } from "react-router-dom";
// , useHistory
import Button from './../Utilidades/Button';
import {  Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import FormGroupText from './../Utilidades/FormGroupText';
import {generoCreacionDTO} from './generos.model.d';



export default function FormulariosGeneros(props:formulariosGenerosProps) {

    return (
        <>
            <Formik initialValues={props.modelo}
                onSubmit={props.onSubmit}

                validationSchema={Yup.object({
                    nombre: Yup.string()
                    .required("Este campo es requerido")
                    .primeraLetraMayuscula()
                    .max(50, "La longitud máxima es de 50 caracteres")

                })}
            >
                {(formikProps) => (
                    <Form>
                        <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del género" />
                        <Button disabled={formikProps.isSubmitting} type="submit">  Guardar</Button>
                        <Link to="/generos" className="btn btn-outline-secondary ml-1 " >Cancelar</Link>

                    </Form>

                )}


            </Formik>

        </>
    )
}


interface formulariosGenerosProps{
    modelo:generoCreacionDTO;
    onSubmit(valores:generoCreacionDTO,accion:FormikHelpers<generoCreacionDTO>):void;
}