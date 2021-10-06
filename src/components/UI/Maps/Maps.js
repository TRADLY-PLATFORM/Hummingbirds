/* eslint-disable react/prop-types */
import React from 'react';
 import Leaflet from 'leaflet';


 import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

  import 'leaflet/dist/leaflet.css';
Leaflet.Icon.Default.imagePath = '../node_modules/leaflet';
  delete Leaflet.Icon.Default.prototype._getIconUrl;

  Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });



const Maps = ({ lat, lng, address }) => {
 
  // const containerStyle = {};

  // const position = [51.505, -0.09];
  return (
    <>
      <MapContainer
        style={{ width: '100%', height: '50vh', overflow: 'hidden' }}
        center={[lat, lng]}
        zoom={1}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </>
  );
};
 
 export default Maps;
 