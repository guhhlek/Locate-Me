import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from "prop-types";

const MapView = ({ selectedContact }) => {
  return (
    <MapContainer
      center={
        selectedContact?.location
          ? [selectedContact.location.lat, selectedContact.location.lng]
          : [20, 0]
      }
      zoom={selectedContact ? 10 : 2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedContact && (
        <Marker position={selectedContact.location}>
          <Popup>{selectedContact.name}</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
MapView.propTypes = {
  selectedContact: PropTypes.shape({
    location: PropTypes.arrayOf(PropTypes.number).isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default MapView;
