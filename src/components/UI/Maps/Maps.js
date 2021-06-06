import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { MapKey } from '../../../shared/constants';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Maps extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: MapKey }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={this.props.lat} lng={this.props.lng} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Maps;
