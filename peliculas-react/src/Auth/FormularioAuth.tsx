import {credencialesUsuario} from './auth.model';
import {Formik,Form, FormikHelpers} from 'formik';
import FormGroupText from './../Utilidades/FormGroupText'
import Button from './../Utilidades/Button';
import * as Yup from 'yup';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FormularioAuth(props: formularioAuthProps) {
   
    
    return (
        <Formik initialValues = {props.modelo} onSubmit = {props.onSubmit} validationSchema={Yup.object({

            email:Yup.string().required('Este campo es requerido')
            .email('Debe colocar un email valido'),
            password: Yup.string().required('Este campo es requerido')
        })}>
        
        {formikProps =>(
            <Form>
                <FormGroupText label ="Email" campo ="email"/>
                <FormGroupText label ="Password" campo ="password" type="password"/>

                <Button disabled={formikProps.isSubmitting} type="submit" >Envíar</Button>
                <Link className = 'btn btn-secondary' to="/">Cancelar</Link>
                
            </Form>

        )}
        </Formik>
    )
}

interface formularioAuthProps{
    modelo: credencialesUsuario;
    onSubmit(valores:credencialesUsuario, acciones:FormikHelpers<credencialesUsuario>):void
}
