import { GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";

const MapView = ({ selectedContact }) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = selectedContact?.location
    ? { lat: selectedContact.location.lat, lng: selectedContact.location.lng }
    : { lat: 20, lng: 0 };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={selectedContact ? 20 : 2}
    >
      {selectedContact?.location && <Marker position={center}></Marker>}
    </GoogleMap>
  );
};

MapView.propTypes = {
  selectedContact: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    name: PropTypes.string.isRequired,
  }),
};

export default MapView;
