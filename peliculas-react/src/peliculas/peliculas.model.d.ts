import { actorPeliculaDTO } from "../actores/actores.model";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/generos.model";

export interface peliculaDTO{
    id:number;
    titulo:string;
    poster:string;
    enCines:boolean;
    trailer:string;
    resumen?:string;
    fechaLanzamiento:Date;
    cines:cineDTO[];
    generos:generoDTO[];
    actores:actorPeliculaDTO[];
}

export interface peliculaCreacionDTO{
    titulo:string;
    poster?:File;
    enCines:boolean;
    trailer:string;
    resumen?:string;
    fechaLanzamiento?:Date;
    cinesIds?:number[];
    generosIds?:number[];
    actores?: actoresPeliculaDTO[];
    posterURL?:string;   
}

export interface landingPageDTO{
    enCines?:peliculaDTO[];
    proximosEstrenos?:peliculaDTO[];
}

export interface peliculasPostGetDTO{
    generos: generoDTO[];
    cines: cineDTO[];
}

export interface peliculasPutGetDTO{

    pelicula:peliculaDTO;
    generosSeleccionados:generoDTO[];
    generosNoSeleccionados:generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actores:actorPeliculaDTO[];
}