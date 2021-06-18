import { useFormikContext } from "formik";
import { coordenadasDTO } from "./Coordenadas.model";
import Mapa from './Mapa'


export default function MapaFormulario(props: mapaformularioProps) {

    const {values}=useFormikContext<any>();

function actulizarCampo(coordenadas:coordenadasDTO){
    
    values[props.campoLat]= coordenadas.lat;
    values[props.campoLng]=coordenadas.lng;

}
    return (
        <>
            <Mapa 
                coordenadas={props.coordenadas}
                manejarClickMapa={actulizarCampo}
            />
        </>
    )
}

interface mapaformularioProps {

    coordenadas: coordenadasDTO[];
    campoLat: string;
    campoLng: string;

}

MapaFormulario.defaultProps = {
    coordenadas: []
}