import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerIcon from '../../../node_modules/leaflet/dist/images/marker-icon.png';
import MarkerShadow from '../../../node_modules/leaflet/dist/images/marker-shadow.png';
import { useRouter } from 'next/navigation';

const MapPage = () => {
    const router = useRouter();
    const [markers, setMarkers] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://172.16.1.141:8000/activities/');
            const data = response.data;
            const newMarkers = data.map(activity => ({
                position: [parseFloat(activity.latitude), parseFloat(activity.longitude)],
                description: activity.description,
                activityId: activity.activityid,
                key: activity.id // assuming id is unique
            }));
            setMarkers(newMarkers);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div style={{ height: '80vh', width: '82vw' }}>
            <MapContainer style={{ height: '100%', width: '100%' }} center={[2.921300, 101.655900]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(marker => (
                    <Marker
                        key={marker.key}
                        position={marker.position}
                        icon={new L.Icon({
                            iconUrl: MarkerIcon.src,
                            iconRetinaUrl: MarkerIcon.src,
                            iconSize: [25, 41],
                            iconAnchor: [12.5, 41],
                            popupAnchor: [0, -41],
                            shadowUrl: MarkerShadow.src,
                            shadowSize: [41, 41]
                        })}
                    >
                        <Popup>
                            <p>{marker.description}</p>
                            <p>Activity ID: {marker.activityId}</p>
                            <p>Latitude: {marker.position[0]}, Longitude: {marker.position[1]}</p>
                            <button style={{ color:'white' }} class="btn btn-success" onClick={() => router.push(`/activity/view/${marker.key}`)}>Details</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default MapPage;
