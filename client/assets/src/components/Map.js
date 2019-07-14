import React, { Fragment, useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";

const Map = props => {
  const [ selected, setSelected ] = useState(null);
  return (
    <GoogleMap
      defaultZoom={props.zoom}
      center={props.center}
    >
      {props.places.map(place => {
        return (
          <Fragment key={place._id}>
            <Marker
              position={{
                lat: parseFloat(place.geo.coordinates[1]),
                lng: parseFloat(place.geo.coordinates[0])
              }}
              onClick={() => {
                setSelected(place);
              }}
            />
            {
              selected &&
              <InfoWindow
                position={{
                  lat: selected.geo.coordinates[1],
                  lng: selected.geo.coordinates[0]
                }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  {selected.name}
                </div>
              </InfoWindow>
            }
          </Fragment>
        );
      })}
    </GoogleMap>
  );
}

export default React.memo(withScriptjs(withGoogleMap(Map)));