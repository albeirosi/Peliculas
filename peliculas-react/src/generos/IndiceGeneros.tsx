import { urlGeneros } from './../Utilidades/endpoints';
import IndiceEntidad from './../Utilidades/IndiceEntidad';
import { generoDTO } from "./generos.model";





//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function IndiceGeneros() {
    return (
        <>

            <IndiceEntidad<generoDTO> url={urlGeneros} urlCrear="generos/crear" titulo="Géneros" nombreEntidad="Genero" >

                {(generos, botones) => <>
                    <thead>
                        <tr>
                            <th style={{ width: '250px' }}>Editar</th>
                            <th style={{ width: '250px' }}> Eliminar</th>
                            <th >Nombre</th>
                        </tr>
                    </thead>
                    <tbody>

                        {generos?.map(genero =>
                            <tr key={genero.id}>
                                <td>{botones(`generos/editar/${genero.id}`, genero.id)}</td>
                                <td >{genero.nombre}</td>

                            </tr>)}
                    </tbody>


                </>}

            </IndiceEntidad>










        </>

    )
}