import { ReactElement, useState  } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'
import { actorPeliculaDTO } from './actores.model'


export default function TypeaheadAutores(props: typeaheadAutoresProps) {

    const actores: actorPeliculaDTO[] = [
        { id: 1, nombre: 'Emma Watson', personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BZWY5YWVjZmItM2JhYy00MzRjLWIwNzQtOWUxODBmYzA5OWZhXkEyXkFqcGdeQXVyMzQ3Nzk5MTU@._V1_UX99_CR0,0,99,99_AL_.jpg' },
        { id: 2, nombre: 'El Samuel Jason', personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg' },
        { id: 3, nombre: 'Angelina Jolie', personaje: '', foto: 'https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_UY317_CR22,0,214,317_AL_.jpg' }
    ]

    const seleccion: actorPeliculaDTO[] = [];
    const [elementoArrastrado, setElementoArrastrado ] = useState<actorPeliculaDTO | undefined>(undefined);

    function manejarDragStart(actor:actorPeliculaDTO)
    {
        setElementoArrastrado(actor);
    }

    function manejarDragOver(actor:actorPeliculaDTO) 
    {
        if(!elementoArrastrado){return;}

        if(actor.id !== elementoArrastrado.id){
            const elementoArrastradoIndice=props.actores.findIndex(x => x.id === elementoArrastrado.id)

            const actorIndice= props.actores.findIndex(x => x.id === actor.id);
            
            const actores =  [...props.actores];
            actores[actorIndice]=elementoArrastrado;
            actores[elementoArrastradoIndice]=actor;

            props.onAdd(actores);



        }
        
    }

    return (
        <>
            <label>Actores</label>
            <Typeahead
                id="typeahead"
                onChange={actores => {
                    if (props.actores.findIndex(x => x.id === actores[0].id) === -1) {
                        props.onAdd([...props.actores, actores[0]]);
                    }


                }}

                options = {actores}
                labelKey = {actor => actor.nombre}
                filterBy = {['nombre']}
                placeholder = "Escriba el nombre del actor"
                minLength = {2}
                flip = {true}
                selected = {seleccion}
                renderMenuItemChildren = {actor => (
                    <>
                        <img alt="imagen actor " src = {actor.foto}
                            style = {{
                                height: '64px',
                                marginRight: '64px',
                                width: '64px'
                            }} />
                        <span>{actor.nombre}</span>

                    </>
                )}
            />
            <ul className='list-group'>
                {
                    props.actores.map(actor =>
                        <li 
                            draggable = {true}
                            onDragStart = {() => manejarDragStart(actor)}
                            onDragOver = {() => manejarDragOver(actor)}
                            className ='list-group-item list-group-item-action'
                            key = {actor.id}
                           >

                            {props.listadoUI(actor)}

                            <span className = 'badge badge-primary badge-pill pointer'
                                style = {{ marginLeft: '0.5rem' }}
                                onClick = {() => props.onRemove(actor)}>
                                X
                            </span>
                        </li>
                    )
                }
            </ul>
        </>
    )
}

interface typeaheadAutoresProps {
    actores: actorPeliculaDTO[];
    onAdd(actores: actorPeliculaDTO[]): void;
    listadoUI(actor: actorPeliculaDTO): ReactElement;
    onRemove(actor: actorPeliculaDTO): void;
}