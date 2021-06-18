
import { urlCines } from './../Utilidades/endpoints';
import IndiceEntidad from './../Utilidades/IndiceEntidad';
import { cineDTO } from "./cines.model";

export default function IndiceCines() {
    return (
        <>
            <IndiceEntidad<cineDTO> url={urlCines} urlCrear="cines/crear" titulo="Cines" nombreEntidad="Cines" >

                {(cines, botones) => <>
                    <thead>
                        <tr>    
                                                                 
                            <th >Nombre</th> 
                            <th style={{ width: '25px' }}>Editar</th>
                            <th style={{ width: '25px' }}>Eliminar</th>    
                           
                        </tr>
                    </thead>
                    <tbody>

                        {cines?.map(cine =>
                            <tr key={cine.id}>  
                           
                                <td>{cine.nombre}</td>  
                                {botones(`cines/editar/${cine.id}`, cine.id)}
                               
                               
                            </tr>)}
                    </tbody>


                </>}

            </IndiceEntidad>


        </>

    )
}