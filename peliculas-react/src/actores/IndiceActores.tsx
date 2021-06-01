import { urlActores } from '../Utilidades/endpoints';
import IndiceEntidad from './../Utilidades/IndiceEntidad';
import { actorDTO } from './actores.model';

export default function IndiceActores() {
    const divStyle = { marginTop: '10px', height: '200px' }
    const imgStyle = { width: '150px', }

    return (

        <IndiceEntidad<actorDTO> url={urlActores} urlCrear="actores/crear" titulo="Actores" nombreEntidad="Actor" >

            {(actores, botones) => <>
                <thead>
                    <tr>
                        <th style={{ width: '250px' }}>Editar</th>
                        <th >Nombre</th>
                        <th >Fecha de Nacimiento</th>
                        <th >Foto</th>
                    </tr>
                </thead>
                <tbody>

                    {actores?.map(actor =>
                        <tr key={actor.id}>
                            <td>{botones(`actores/editar/${actor.id}`, actor.id)}</td>
                            <td >{actor.nombre}</td>
                            <td >{actor.fechaNacimiento}</td>
                            <td >{
                                actor.foto ?
                                    <div>
                                        <div style={divStyle}>
                                            <img style={imgStyle} alt="Imagen actor" src={actor.foto} />
                                        </div>
                                    </div> : null

                            }</td>

                        </tr>)}
                </tbody>
            </>}

        </IndiceEntidad>
    )
}