import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapKey } from '../../../shared/constants';
 import { GoogleMap, useJsApiLoader, LoadScript, Marker } from '@react-google-maps/api';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

// class Maps extends Component {
//   static defaultProps = {
//     center: {
//       lat: 59.95,
//       lng: 30.33,
//     },
//     zoom: 11,
//   };

//   render() {
//     return (
//       // Important! Always set the container height explicitly

//       <div style={{ height: '50vh', width: '100%' }}>
//         <GoogleMapReact
//           bootstrapURLKeys={{ key: MapKey }}
//           defaultCenter={this.props?this.props:this.props.center}
//           defaultZoom={this.props.zoom}
//         >
//           <AnyReactComponent lat={this.props.lat} lng={this.props.lng} text="My Marker" />
//         </GoogleMapReact>
//       </div>
//     );
//   }
// }

// export default Maps;

 
// const Maps = ({ lat, lng }) => {
//   console.log('====================================');
//   console.log(lat,lng);
//   console.log('====================================');
//    const renderMarkers = (map, maps) => {
//      let marker = new maps.Marker({
//        position: { lat: lat, lng: lng },
//        map,
//        title: 'Hello World!',
//      });
//      return marker;
//    };

//   return (
//     <div style={{ height: '50vh', width: '100%' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: MapKey }}
//         defaultCenter={{ lat: lat, lng: lng }}
//         defaultZoom={12}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
//       >
//         <AnyReactComponent lat={ lat} lng={ lng} text="My Marker" />
//       </GoogleMapReact>
//     </div>
//   );
// };

// export default Maps;

 
 




function Maps({lat,lng}) {
  
    const [map, setMap] = React.useState(null);

const center = {
  lat: lat,
  lng: lng,
};

 
const containerStyle = {
  width: '100%',
  height: '50vh',
};
 

  return (
    <LoadScript googleMapsApiKey="AIzaSyCXCZxpNJ3Y8KzXGkrJUkdZ7vyT2M9T-c4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {/* Child components, such as markers, info windows, etc. */}
        
      </GoogleMap>
    </LoadScript>
  );
}

export default  Maps;