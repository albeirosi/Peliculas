import {pelicula} from './peliculas.model.d';
import  css from "./Pelicula.module.css";

export default function PeliculaIndividual (props:peliculaIndividualProps){
   const construirLink =()=>`/pelicula/${props.pelicula.id}`;
   
    return(
        <div className={css.div}>
            <a href={construirLink()}>
                <img alt="Poster" src={props.pelicula.poster}  />
            </a>
            <p>
                <a href={construirLink()}>{props.pelicula.titulo}</a>
            </p>
        </div>


    )
}

interface peliculaIndividualProps{
    pelicula:pelicula;
}
