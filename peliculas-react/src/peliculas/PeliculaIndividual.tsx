import {peliculaDTO} from './peliculas.model.d';
import  css from "./Pelicula.module.css";
import { Link } from 'react-router-dom';
import Button from '../Utilidades/Button';
import confirmar from '../Utilidades/Confirmar';
import axios from 'axios';
import { urlPeliculas } from '../Utilidades/endpoints';
import { useContext } from 'react';
import AlertaContext from './../Utilidades/AlertaContext'
import Autorizado from './../Auth/Autorizado'

export default function PeliculaIndividual (props:peliculaIndividualProps){
   const construirLink =()=>`/pelicula/${props.pelicula.id}`;
   const alerta = useContext(AlertaContext);

   function borrarPelicula(){
    axios.delete(`${urlPeliculas}/${props.pelicula.id}`)
    .then(()=>{
        alerta();
    })
   }
   
    return(
        <div className={css.div} >
            <a href={construirLink()}>
                <img alt="Poster" src={props.pelicula.poster}  />
            </a>
            <p>
                <a href={construirLink()}>{props.pelicula.titulo}</a>
            </p>
            <Autorizado role='admin' autorizado={
                 <div style={{marginBottom:'2rem', marginTop:'2px'}}>
                    <Link style={{marginRight:'1rem'}} className="btn btn-info" to={`/peliculas/editar/${props.pelicula.id}`}>Editar</Link>
                    <Button className="btn btn-danger"
                    onClick={()=>confirmar(()=>borrarPelicula())}
                    > Borrar</Button>
                </div>
            }
           
            />
        </div>


    )
}

interface peliculaIndividualProps{
    pelicula:peliculaDTO;
}
