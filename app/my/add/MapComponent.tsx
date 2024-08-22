import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  selectedLocation: { lat: number; lng: number } | null;
  setSelectedLocation: React.Dispatch<React.SetStateAction<{ lat: number; lng: number } | null>>;
}

const MapComponent: React.FC<MapComponentProps> = ({ selectedLocation, setSelectedLocation }) => {
  const LocationPicker = () => {
    useMapEvents({
      click: (e) => {
        setSelectedLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });

    return selectedLocation ? (
      <Marker 
        position={[selectedLocation.lat, selectedLocation.lng]}
        icon={L.icon({
          iconUrl: '/images/marker-icon.png',
          iconRetinaUrl: '/images/marker-icon-2x.png',
          shadowUrl: '/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })}
      />
    ) : null;
  };

  return (
    <MapContainer
      center={[18.0742, -15.9619]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationPicker />
    </MapContainer>
  );
};

export default MapComponent;
