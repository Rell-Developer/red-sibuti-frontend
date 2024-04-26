import { useState } from 'react';
// Libreria para el mapa
import { MapContainer, TileLayer, Marker, useMapEvents, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '/public/css/custom-leaflet.css';


const Map = ({editMode, position}) => {

    // States
    const [location, setLocation] = useState(position);

    // Marcado de la locacion
    const LocationMarker = ({editMode}) => {
        const map = useMapEvents({
            // cuando hagan clic en el mapa
            click({latlng}) {
                if (editMode) {
                    // Tomamos la posicion seleccionada
                    setLocation(latlng);
                }
            }
        })
        
        return location === null ? null : (
            <Marker position={location}>
                <Popup>
                    <div className="flex flex-col">
                        Lugar Seleccionado
                        <em className="text-gray-500 text-sm font-bold">{location.lat},{location.lng}</em>
                    </div>
                </Popup>
            </Marker>
        )
    }

    return (
        <>
            <MapContainer 
                center={{ lat:'10.470575609172524', lng:'-66.90410224619053'}} 
                zoom={6}
                scrollWheelZoom={false}
            >
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker editMode={editMode}/>
            </MapContainer>
        </>
    )
}


export default Map;