import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { generoDTO } from "../generos/generos.model";
import { urlGeneros, urlPeliculas } from "../Utilidades/endpoints";
import Button from "./../Utilidades/Button";
import ListadoPeliculas from "./ListadoPeliculas";
import { peliculaDTO } from "./peliculas.model";

import Paginacion from "./../Utilidades/Paginacion"


export default function FiltroPeliculas() {

    const valorInicial:filtroPeliculasForm={
        titulo:'',
        generoId:0,
        proximosEstrenos:false,
        enCines:false,
        pagina:1,
        recordsPorPagina:1
    };

    const [generos, setGeneros] = useState<generoDTO[]>([]);
    const [peliculas, setPeliculas] = useState<peliculaDTO[]>([]);
    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [totalDeRegistros, setTotalDeRegistros] = useState(0);
    const [pagina, setPagina] = useState(1);

    const history=useHistory();
    const query =new URLSearchParams(useLocation().search);

    //const generos:generoDTO[]=[{id:1,nombre:"Comedia"}, {id:2,nombre:"Acción"}, {id:3,nombre:"Drama"}]

    useEffect(()=>{    
        axios.get(`${urlGeneros}/todos`)
        .then((respuesta:AxiosResponse<generoDTO[]>)=>{
            setGeneros(respuesta.data);  
            
        });
    },[]);

    useEffect(()=>{
     
        if(query.get('titulo')){valorInicial.titulo = query.get('titulo')!;}
        if(query.get('generoId')){ valorInicial.generoId = parseInt(query.get('generoId')!,10); }
        if(query.get('proximosEstrenos')){ valorInicial.proximosEstrenos = true;}
        if(query.get('enCines')){valorInicial.enCines = true;}

        if(query.get('pagina')){ valorInicial.pagina = parseInt(query.get('pagina')!,10); }        
        buscarPeliculas(valorInicial);
        // eslint-disable-next-line 
    }, [pagina,  totalDeRegistros])

    function buscarPeliculas(valores:filtroPeliculasForm){    
    
        modificarURL(valores);
        axios.get(`${urlPeliculas}/filtrar`, {params:valores})
        .then((respuesta:AxiosResponse<peliculaDTO[]>)=>{
            setTotalDeRegistros(parseInt(respuesta.headers['cantidadtotalregistro'], 10));
            setTotalDePaginas(Math.ceil(totalDeRegistros /valorInicial.recordsPorPagina));
           
            setPeliculas(respuesta.data);
        });

    }

    function modificarURL(valores:filtroPeliculasForm){
       
        const queryString:string[]=[];

       if(valores.titulo){queryString.push(`titulo=${valores.titulo}`);}

        if(valores.generoId !==0){ queryString.push(`generoId=${valores.generoId}`);}

        if(valores.proximosEstrenos){queryString.push(`proximosEstrenos=${valores.proximosEstrenos}`);}

        if(valores.enCines){ queryString.push(`enCines=${valores.enCines}`);}

        queryString.push(`pagina=${valores.pagina}`);       

        history.push( `/peliculas/filtropeliculas?${queryString.join('&')}`);

    }


    
    return (
        <>
            <h1>Filtrar Películas</h1>          
            <Formik initialValues={valorInicial}
                    onSubmit={valores=> {
                        valores.pagina = 1;
                        buscarPeliculas(valores);                    
                    }}
            
            >
                {(formikProps)=>(
                    <> 
                       <Form>
                        <div className="form-inline">
                            <div className="form-group mb-2 ">
                                <label htmlFor="titulo" className="sr-only">Titulo</label>
                                <input type="text" className="form-control" id="titulo"  placeholder="Título de la película"  {...formikProps.getFieldProps('titulo')}/>
                            </div>
                            <div className="form-group mx-sm-3 mb-2 ">
                                <select className="form-control"  {...formikProps.getFieldProps('generoId')}>
                                    <option value="0">---Selecciones un género---</option>
                                    {generos.map(genero=>
                                        <option key={genero.id} value={genero.id} >{genero.nombre}</option>)}
                                </select>
                            </div>
                            <div className="form-group mx-sm-3 mb-2 ">
                                <Field className="form-check-input" id="proximosEstrenos" name="proximosEstrenos" type="checkbox" />
                                <label className="form-check-label" htmlFor="proximosEstrenos">Próximos Estrenos</label>
                            </div>
                            <div className="form-group mx-sm-3 mb-2 ">
                                <Field className="form-check-input" id="enCines" name="enCines" type="checkbox" />
                                <label className="form-check-label" htmlFor="enCines">En Cines</label>
                            </div>
                            <div className="form-group mx-sm-3 mb-2 ">
                            <Button className="btn btn-primary mb-2 mx-sm-3" onClick={()=>formikProps.submitForm()}>Filtrar</Button>
                            <Button className="btn btn-secondary mb-2 mx-sm-3" onClick={()=>{
                                formikProps.setValues(valorInicial);
                                buscarPeliculas(valorInicial);
                               
                            }}>Limpiar</Button>
                            </div>
                        </div>
                    </Form>
                

                        <ListadoPeliculas peliculas={peliculas}/>

                        {/* <div className="row justify-content-center">
                            <div className="col-xs-12 ">                            
                            <div className="form-group  ">                                   
                                    <Paginacion   
                                    CantidadTotalPaginas={totalDePaginas} 
                                    paginaActual={formikProps.values.pagina} 
                                    onChange={nuevaPagina => {                                       
                                        formikProps.values.pagina = nuevaPagina;
                                        buscarPeliculas(formikProps.values);
                                    }} />
                                </div>     
                            </div> */}
                            {/* <div className="col-12">
                                <div className="text-center border"> Página: {formikProps.values.pagina} de {totalDePaginas} Total Registros: {totalDeRegistros}</div>
                            </div> */}
                        {/* </div> */}
                    </>
                )}
            </Formik>

            <div className="row justify-content-center">
                            <div className="col-xs-12 ">                            
                            <div className="form-group  ">                                   
                                    <Paginacion   
                                    CantidadTotalPaginas={totalDePaginas} 
                                    paginaActual={pagina}                                    
                                    onChange={nuevaPagina => {                                       
                                        setPagina(nuevaPagina);
                                       
                                        // buscarPeliculas(formikProps.values);
                                    }} />
                                </div>     
                            </div>
                            {/* <div className="col-12">
                                <div className="text-center border"> Página: {formikProps.values.pagina} de {totalDePaginas} Total Registros: {totalDeRegistros}</div>
                            </div> */}
                        </div>
            
        </>

    )
}


interface filtroPeliculasForm{
    titulo:string;
    generoId:number;
    proximosEstrenos:boolean;
    enCines:boolean,
    pagina:number,
    recordsPorPagina:number
}