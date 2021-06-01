import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]

});


L.Marker.prototype.options.icon = DefaultIcon;
const position = [4.647483, -74.063147];
export default function Mapa(props: mapaProps) {

    return (
        <>
            <div>

               <MapContainer
                    center={[4.647483, -74.063147]}
                    zoom={14} scrollWheelZoom={false} >

                    <TileLayer attribution="React Peliculas" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {/* <Marker position={[4.647483, -74.063147]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                    </Marker>  */}
                </MapContainer>
            </div>
        </>
    )
}
interface mapaProps {
    height: string;
}
Mapa.defaultProps = {
    height: '250px'
}

