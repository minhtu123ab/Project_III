import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Button, Input, message, Modal } from "antd";
import axiosInstance from "../../../axios/axiosInstance";
import axios from "axios";
import LocationMarker from "./LocationMarket";

const Zone = () => {
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [radius, setRadius] = useState(200);
  const [isSelecting, setIsSelecting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [idZone, setIdZone] = useState("");

  const fetchLocation = async () => {
    try {
      const response = await axiosInstance("/zone");
      if (response.data.data.length > 0) {
        setPosition([
          response.data.data[0].latitude,
          response.data.data[0].longitude,
        ]);
        setIdZone(response.data.data[0]._id);
        setRadius(response.data.data[0].radius);
        return;
      }
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userPosition: [number, number] = [
              pos.coords.latitude,
              pos.coords.longitude,
            ];
            setPosition(userPosition);
          },
          (error) => {
            console.error(error);
            message.error("Unable to get your location.");
          }
        );
      }
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || "An error occurred");
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    const mapElement = document.querySelector(
      ".leaflet-container"
    ) as HTMLElement;
    if (mapElement) {
      mapElement.style.cursor = isSelecting ? "crosshair" : "grab";
    }
  }, [isSelecting]);

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number(e.target.value));
  };

  const handleSelectPosition = () => {
    setIsSelecting(!isSelecting);
  };

  const handleSubmit = async () => {
    try {
      await axiosInstance.post("/zone", {
        latitude: position[0],
        longitude: position[1],
        radius,
      });
      message.success("Location and radius saved successfully.");
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || "An error occurred");
      } else {
        message.error("An unexpected error occurred");
      }
    }
  };

  const handleSubmitResetLocation = async () => {
    try {
      await axiosInstance.delete(`/zone/${idZone}`);
      message.success("Location reset successfully.");
      fetchLocation();
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        message.error(err.response?.data?.message || "An error occurred");
      } else {
        message.error("An unexpected error occurred");
      }
    } finally {
      setVisible(false);
    }
  };
  const handleResetLocationModal = () => {
    setVisible(true);
  };
  return (
    <div>
      {position && (
        <MapContainer
          center={position}
          zoom={16}
          style={{
            height: "500px",
            width: "100%",
            overflow: "hidden",
            borderTopRightRadius: "10px",
            borderTopLeftRadius: "10px",
          }}
          key={position ? position.join(",") : undefined}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Circle
            center={position as [number, number]}
            pathOptions={{ color: "cyan" }}
            radius={radius || 100}
          />
          <LocationMarker
            position={position}
            setPosition={setPosition}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}
          />
        </MapContainer>
      )}
      <div className="flex justify-between items-center px-4 p-2 pt-3 bg-gray-100 shadow-md rounded-b-xl">
        <div className="space-y-2">
          <div>
            <Button
              className={`bg-cyan-400 hover:!bg-cyan-500 text-white font-medium ${
                isSelecting ? "bg-red-500 hover:!bg-red-600" : ""
              }`}
              type="primary"
              size="large"
              onClick={handleSelectPosition}
            >
              {isSelecting ? "Select location on map" : "Reselect location"}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <label className="text-gray-700 font-medium">Radius (m):</label>
            <Input
              type="range"
              value={radius}
              onChange={handleRadiusChange}
              min="50"
              max="500"
              className="w-40 h-2 bg-gray-300 rounded-lg overflow-hidden"
              style={{ accentColor: "#06B6D4" }}
            />
            <span className="text-gray-800 font-semibold">{radius} m</span>
          </div>
        </div>

        <div className="flex gap-5">
          <Button onClick={handleResetLocationModal} size="large">
            Reset to current position
          </Button>
          <Button
            size="large"
            onClick={handleSubmit}
            className="bg-green-500 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Submit
          </Button>
        </div>
        <Modal
          onOk={handleSubmitResetLocation}
          title="Reset location"
          open={visible}
          onCancel={() => setVisible(false)}
          okType="danger"
          destroyOnClose
        >
          <p>Are you sure you want to reset the location?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Zone;
