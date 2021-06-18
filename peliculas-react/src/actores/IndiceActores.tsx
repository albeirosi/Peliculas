import { urlActores } from '../Utilidades/endpoints';
import IndiceEntidad from './../Utilidades/IndiceEntidad';
import { actorDTO } from './actores.model';
import './ActoresTabla.css';
export default function IndiceActores() {
    const widtFoto = '200px';
    // const divStyle = { marginTop: '10px', height: '190px' }
    const imgStyle = { width: '150px',maxHeight:'185px' }

    return (

        <IndiceEntidad<actorDTO> url={urlActores} urlCrear="actores/crear" titulo="Actores" nombreEntidad="Actor" >

            {(actores, botones) => <>
                <thead>
                    <tr>
                        <th  style={{width:widtFoto }}>Foto</th>
                        <th >Nombre</th>
                        <th >Fecha de Nacimiento</th>
                        <th style={{ width: '25px' }}>Editar</th>
                        <th style={{ width: '25px' }}>Eliminar</th>
                    </tr>
                </thead>
                <tbody>

                    {actores?.map(actor =>
                        <tr key={actor.id} >
                            <td>{
                                actor.foto ?
                                    <div  >
                                        <div className='foto' >
                                            <img style={imgStyle} alt="Imagen actor" src={actor.foto} />
                                        </div>
                                    </div> : null

                            }</td>
                            <td >{actor.nombre}</td>
                            <td  >{actor.fechaNacimiento}</td>
                            {botones(`actores/editar/${actor.id}`, actor.id)}
                        </tr>)}
                </tbody>
            </>}

        </IndiceEntidad>
    )
}