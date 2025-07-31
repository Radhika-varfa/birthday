import React, { useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MemoryContext } from '../context/MemoryContext';
import { motion } from 'framer-motion';
import '../styles/MapPage.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const MapPage = () => {
  const { memories } = useContext(MemoryContext);

  // Default position (center of the map)
  const defaultPosition = [20.5937, 78.9629]; // Center of India

  return (
    <div className="map-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Journey Map
      </motion.h1>
      
      <div className="map-container">
        <MapContainer 
          center={defaultPosition} 
          zoom={5} 
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {memories.map(memory => (
            memory.location && (
              <Marker 
                key={memory._id} 
                position={[memory.location.coordinates[1], memory.location.coordinates[0]]}
              >
                <Popup>
                  <h3>{memory.title}</h3>
                  <p>{memory.description}</p>
                  <p>{new Date(memory.date).toLocaleDateString()}</p>
                  {memory.images.length > 0 && (
                    <img 
                      src={memory.images[0]} 
                      alt={memory.title} 
                      style={{ width: '100px', height: 'auto' }}
                    />
                  )}
                </Popup>
              </Marker>
            )
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;