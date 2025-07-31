import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MemoryContext } from '../../context/MemoryContext';
import { motion } from 'framer-motion';
import './Map.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// Custom heart icon
const heartIcon = new L.Icon({
  iconUrl: '/images/heart-marker.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const Map = () => {
  const { memories } = useContext(MemoryContext);

  // Default position (center of the map)
  const defaultPosition = [20.5937, 78.9629]; // Center of India

  // Filter memories with location data
  const locatedMemories = memories.filter(memory => memory.location);

  return (
    <div className="map-container">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Journey Map
      </motion.h1>
      
      <motion.div 
        className="map-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <MapContainer 
          center={defaultPosition} 
          zoom={5} 
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {locatedMemories.map(memory => (
            <Marker 
              key={memory._id} 
              position={[memory.location.coordinates[1], memory.location.coordinates[0]]}
              icon={heartIcon}
            >
              <Popup>
                <h3>{memory.title}</h3>
                <p className="popup-date">{new Date(memory.date).toLocaleDateString()}</p>
                <p className="popup-desc">{memory.description}</p>
                {memory.images.length > 0 && (
                  <img 
                    src={memory.images[0]} 
                    alt={memory.title} 
                    className="popup-image"
                  />
                )}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default Map;