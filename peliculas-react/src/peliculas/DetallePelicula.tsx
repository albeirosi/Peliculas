import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { urlPeliculas, urlRatings } from "../Utilidades/endpoints";
import { peliculaDTO } from "./peliculas.model";
import Cargando from "../Utilidades/Cargando";
import Mapa from "../Utilidades/Mapa";
import { coordenadasDTO } from "../Utilidades/Coordenadas.model";
import Rating from './../Utilidades/Rating';
import Swal from "sweetalert2";

export default function DetalleP() {

    const { id }: any = useParams();
    const [pelicula, setPelicula] = useState<peliculaDTO>();

    useEffect(() => {
        axios.get(`${urlPeliculas}/${id}`)
            .then((respuesta: AxiosResponse<peliculaDTO>) => {
                respuesta.data.fechaLanzamiento = new Date(respuesta.data.fechaLanzamiento);
                setPelicula(respuesta.data);
               
            });
    }, [id]);

    function generarURLYoutubeEmbebido(url: any): string {
        if (!url) { return ''; }

        var video_id = url.split('v=')[1];
        var posicionAmpersand = video_id.indexOf('&');
        if (posicionAmpersand !== -1) {
            video_id = video_id.substring(0, posicionAmpersand);
        }

        return `https://www.youtube.com/embed/${video_id}`
    }

    function transformarCoordenadas(): coordenadasDTO[] {
        if (pelicula?.cines) {
            const coordenadas = pelicula.cines.map(cine => {
                return {
                    lat: cine.latitud,
                    lng: cine.longitud,
                    nombre: cine.nombre
                } as coordenadasDTO;
            });

            return coordenadas;
        }
        return [];
    }

    async function onVote(voto: number) {
        await axios.post(urlRatings, { puntuacion: voto, peliculaId: id })
        Swal.fire({ icon: 'success', title: 'Voto recibido' });
    }

    return (
        <>
            {

                pelicula ? <div style={{ display: 'flex' }}>
                    <div>
                        <h2>{pelicula?.titulo}({pelicula.fechaLanzamiento.getFullYear()})</h2>
                        {pelicula.generos?.map(genero =>
                            <Link key={genero.id} style={{ marginRight: '5px' }}
                                className="btn btn-primary btn-sm rounded-pill"
                                to={`/peliculas/filtrar?generoId=${genero.id}`}
                            >{genero.nombre}</Link>)
                        }
                        | {pelicula.fechaLanzamiento.toDateString()}
                        | Voto Promedio: {pelicula.promedioVoto}
                        | Tu voto:  <Rating
                            maximoValor = {5}
                            valorSeleccionado = {pelicula.votoUsuario!}
                            onChange = {onVote}
                        />

                        <div style={{ display: 'flex', marginTop: '1rem' }}>
                            <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                                <img src={pelicula.poster} style={{ width: '225px', height: '315px' }} alt='poster' />
                            </span>
                            {pelicula.trailer ? <div>
                                <iframe
                                    title="youtube-trailer"
                                    width="560"
                                    height="315"
                                    src={generarURLYoutubeEmbebido(pelicula.trailer)}
                                    frameBorder={0}
                                    allow="accelerometer; autoplay; encryted-media; gyroscope; piture-in-piture"
                                    allowFullScreen
                                >

                                </iframe>                              
                            </div> : null
                            }
                        </div>

                        {pelicula.resumen ?
                            <div style={{ marginTop: '1rem' }}>
                                <h3>Resumen</h3>
                                <label>{pelicula.resumen}</label>
                            </div> : null}
                        {pelicula.actores && pelicula.actores.length > 0 ?
                            <div style={{ marginTop: '1rem' }}>
                                <h3>Actores</h3>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    {pelicula.actores?.map(actor =>
                                        <div key={actor.id} style={{ marginBottom: '2px' }}>
                                            <img alt="Foto" src={actor.foto} style={{ width: '50px', verticalAlign: 'middle' }} />
                                            <span style={{ display: 'inline-block', width: '200px', marginLeft: '1rem' }}>
                                                {actor.nombre}
                                            </span>
                                            <span style={{ display: 'inline-block', width: '45px' }}>...</span>
                                            <span>{actor.personaje}</span>

                                        </div>
                                    )}
                                </div>



                            </div>
                            : null}

                        {pelicula.cines && pelicula.cines.length > 0 ?
                            <div style={{ marginTop: '1rem' }}>

                                <h2>Mostrándose en los siguientes cines</h2>
                                <Mapa soloLectura={true} coordenadas={transformarCoordenadas()} />
                            </div>


                            : null}

                    </div>
                </div>
                    : <Cargando />
            }
        </>
    )

}

