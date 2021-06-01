import axios, { AxiosResponse } from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from './../Utilidades/Button';
import confirmacion from './../Utilidades/Confirmar';
import SelectGeneric from '../Utilidades/SelectGeneric';
import Paginacion from "./../Utilidades/Paginacion";
import ListadoGenerico from "../Utilidades/ListadoGenerico";

export default function IndiceEntidad<T>(props: indiceEntidadProps<T>) {

    const [entidades, setEntidades] = useState<T[]>();
    const [totalDePaginas, setTotalDePaginas] = useState(0);
    const [recordsPorPagina, setRecordsPorPagina] = useState(10);
    const [pagina, setPagina] = useState(1);
    const [totalDeRegistros, setTotalDeRegistros] = useState(0)


    useEffect(() => {
        cargarDatos();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagina, recordsPorPagina, totalDeRegistros])

    function cargarDatos() {
        axios.get(props.url, {
            params: { pagina, recordsPorPagina }
        })
            .then((respuesta: AxiosResponse<T[]>) => {
                setTotalDeRegistros(parseInt(respuesta.headers['cantidadtotalregistro'], 10));
                setTotalDePaginas(Math.ceil(totalDeRegistros / recordsPorPagina));
                setEntidades(respuesta.data);
            })
    }

    async function borrar(id: number) {
        try {
            await axios.delete(`${props.url}/${id}`);
            cargarDatos();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const botones = (urlEditar: string, id: number) => <>
        <td>
            <Link className="btn btn-info" to={urlEditar}> Editar</Link>
        </td>
        <td>
            <Button className="btn btn-danger" onClick={() => confirmacion(() => borrar(id))}>Eliminar </Button>
        </td>

    </>

    return (
        <>
            <h1 ><i style={{ borderBottom: '1px solid #6868' }}>{props.titulo}</i>   <Link to={props.urlCrear} className='btn btn-primary mt-1 float-right'>Crear {props.nombreEntidad} </Link> </h1>


            {/* <Link to='generos/editar' className='btn btn-secondary ml-1'>Editar Género </Link> */}
            <br />
            <div className="row">
                <div className="col-sm-12 col-md-2 ">


                    <div className="form-group">
                        <SelectGeneric onChangeSelect={(e) => setRecordsPorPagina(e)} onPaginaSelect={(e) => setPagina(e)} />
                    </div>


                </div>
                <div className="col-xs-12 col-md-10">
                    <div className="form-group float-right ">
                        <label></label>
                        <Paginacion CantidadTotalPaginas={totalDePaginas} paginaActual={pagina} onChange={nuevaPagina => setPagina(nuevaPagina)} />
                    </div>
                </div>
            </div>

            <div className="col-sm-12 table-responsive">
                <ListadoGenerico listado={entidades}>
                    <>
                        <table className="table table-striped ">
                            {props.children(entidades!, botones)}
                        </table>
                        <div className="row justify-content-center">
                            <div className="col-xs-12 ">
                            
                                <div className="form-group  ">
                                   
                                    <Paginacion   CantidadTotalPaginas={totalDePaginas} paginaActual={pagina} onChange={nuevaPagina => setPagina(nuevaPagina)} />
                                    </div>                                  
                               
                            </div>
                            <div className="col-12">
                                <div className="text-center border"> Página: {pagina} de {totalDePaginas} Total Registros: {totalDeRegistros}</div>
                            </div>
                        </div >
                    </>
                </ListadoGenerico>
            </div>


        </>
    )


}

interface indiceEntidadProps<T> {

    url: string;
    urlCrear: string;
    children(entidad: T[], botones: (urlEditar: string, id: number) => ReactElement): ReactElement;
    titulo: string;
    nombreEntidad: string;


}