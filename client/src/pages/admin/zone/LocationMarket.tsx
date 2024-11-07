import { Marker, Popup, useMapEvents } from "react-leaflet";

const LocationMarker = ({
  position,
  setPosition,
  isSelecting,
  setIsSelecting,
}: {
  position: [number, number] | null;
  setPosition: (position: [number, number]) => void;
  isSelecting: boolean;
  setIsSelecting: (isSelecting: boolean) => void;
}) => {
  useMapEvents({
    click(e: { latlng: { lat: number; lng: number } }) {
      if (isSelecting) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        setIsSelecting(false);
      }
    },
  });

  return position ? (
    <Marker position={position}>
      <Popup>The location you choose</Popup>
    </Marker>
  ) : null;
};

export default LocationMarker;
