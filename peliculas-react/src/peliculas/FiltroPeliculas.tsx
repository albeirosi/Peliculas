import { Field, Form, Formik } from "formik";

import { generoDTO } from "../generos/generos.model";
import Button from "./../Utilidades/Button";


export default function FiltroPeliculas() {

    const valorInicial:filtroPeliculasForm={
        titulo:'',
        generoId:0,
        proximosEstrenos:false,
        enCines:false
    }

    const generos:generoDTO[]=[{id:1,nombre:"Comedia"}, {id:2,nombre:"Acción"}, {id:3,nombre:"Drama"}]
    
    return (
        <>
            <h1>Filtrar Películas</h1>          
            <Formik initialValues={valorInicial}
                    onSubmit={valores=>console.log(valores)}
            
            >
{(formikProps)=>(
    <Form>
        <div className="form-inline">
            <div className="form-group mb-2">
                <label htmlFor="titulo" className="sr-only">Titulo</label>
                <input type="text" className="form-control" id="titulo"  placeholder="Título de la película"  {...formikProps.getFieldProps}/>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <select className="form-control"  {...formikProps.getFieldProps('generoId')}>
                    <option value="0">---Selecciones un género---</option>
                    {generos.map(genero=>
                        <option key={genero.id} value={genero.id} >{genero.nombre}</option>)}
                </select>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <Field className="form-check-input" id="proximosEstrenos" name="proximosEstrenos" type="checkbox" />
                <label className="form-check-label" htmlFor="proximosEstrenos">Próximos Estrenos</label>
            </div>
            <div className="form-group mx-sm-3 mb-2">
                <Field className="form-check-input" id="enCines" name="enCines" type="checkbox" />
                <label className="form-check-label" htmlFor="enCines">En Cines</label>
            </div>
            <Button className="btn btn-primary mb-2 mx-sm-3" onClick={()=>formikProps.submitForm()}>Filtrar</Button>
            <Button className="btn btn-secondary mb-2 mx-sm-3" onClick={()=>formikProps.setValues(valorInicial)}>Limpiar</Button>
        </div>
    </Form>
)}
            </Formik>
        </>

    )
}


interface filtroPeliculasForm{
    titulo:string;
    generoId:number;
    proximosEstrenos:boolean;
    enCines:boolean
}