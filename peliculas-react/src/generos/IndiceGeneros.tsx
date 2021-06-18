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
                            <th >Nombre</th>
                            <th style={{ width: '25px' }}>Editar</th>
                            <th style={{ width: '25px' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>

                        {generos?.map(genero =>
                            <tr key={genero.id}>

                                <td >{genero.nombre}</td>
                                {botones(`generos/editar/${genero.id}`, genero.id)}

                            </tr>)}
                    </tbody>


                </>}

            </IndiceEntidad>










        </>

    )
}