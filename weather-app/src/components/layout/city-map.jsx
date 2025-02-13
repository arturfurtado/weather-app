import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';


function MapUpdater({ center }) {
    const map = useMap();
    useEffect(() => {
        if (center[0] && center[1]) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
}

export default function CityMap({ lat, lon, city }) {
    if (!lat || !lon) return <p>Carregando mapa...</p>;

    return (
        <MapContainer center={[lat, lon]} zoom={13} style={{ height: '200px', width: '300px' }}>
            <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
                <Popup>{city || 'Você está aqui!'}</Popup>
            </Marker>
            <MapUpdater center={[lat, lon]} />
        </MapContainer>
    );
}
