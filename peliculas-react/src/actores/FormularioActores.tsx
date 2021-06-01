import { Formik, FormikHelpers, Form } from "formik";
import { actorCreacionDTO } from "./actores.model";
import FormGroupText from './../Utilidades/FormGroupText'
import Button from './../Utilidades/Button';
import { Link } from "react-router-dom";
import * as Yup from 'yup'
import FormGroupFecha from './../Utilidades/FormGroupFecha'
import FormGroupImagen from './../Utilidades/FormGroupImagen'


export default function FormularioActores(props:formularioActoresProps){

    return(
        <Formik initialValues={props.modelo} onSubmit={props.onSubmit}
        validationSchema={Yup.object({
            nombre: Yup.string().required("Este campo es requerido").primeraLetraMayuscula(),
            fechaNacimiento:Yup.date().nullable().required("Este campo es requerido")

        })}
        >
                {(formikProps)=>(
                    <Form>
                        <FormGroupText campo="nombre" label="Nombre"/> 
                        <FormGroupFecha campo="fechaNacimiento" label="Fecha de Nacimiento"/>
                        <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL}/>

                        <Button disabled={formikProps.isSubmitting}  type="submit">Guardar</Button>
                        <Link className="btn btn-secondary" to="/actores">Cancelar</Link>
                    </Form>
                )}
        </Formik>
    )

}

interface formularioActoresProps{
    modelo:actorCreacionDTO;
    onSubmit(valores:actorCreacionDTO, acciones:FormikHelpers<actorCreacionDTO>):void;
}