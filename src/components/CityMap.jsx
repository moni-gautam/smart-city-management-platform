import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useState } from "react";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// =========================
// Custom Icons
// =========================

const trafficIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const wasteIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const emergencyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const energyIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function CityMap() {
  const [showTraffic, setShowTraffic] = useState(true);
  const [showWaste, setShowWaste] = useState(true);
  const [showEmergency, setShowEmergency] = useState(true);
  const [showEnergy, setShowEnergy] = useState(true);

  return (
    <div className="bg-slate-800 rounded-2xl p-4 mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Live City Map
      </h2>

      {/* Filters */}

      <div className="flex gap-6 mb-4 flex-wrap text-white">
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showTraffic}
            onChange={() => setShowTraffic(!showTraffic)}
            className="mr-1"
          />
          🚦 Traffic
        </label>

        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showWaste}
            onChange={() => setShowWaste(!showWaste)}
            className="mr-1"
          />
          🗑 Waste
        </label>

        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showEmergency}
            onChange={() => setShowEmergency(!showEmergency)}
            className="mr-1"
          />
          🚑 Emergency
        </label>

        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={showEnergy}
            onChange={() => setShowEnergy(!showEnergy)}
            className="mr-1"
          />
          ⚡ Energy
        </label>
      </div>

      <MapContainer
        center={[25.3176, 82.9739]}
        zoom={13}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Traffic */}

        {showTraffic && (
          <Marker
            position={[25.3176, 82.9739]}
            icon={trafficIcon}
          >
            <Popup>
              <div>
                <h3><b>🚦 Traffic Alert</b></h3>
                <p>Location: Lanka Crossing</p>
                <p>Severity: High</p>
                <p>Delay: 25 mins</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Waste */}

        {showWaste && (
          <Marker
            position={[25.3100, 82.9800]}
            icon={wasteIcon}
          >
            <Popup>
              <div>
                <h3><b>🗑 Waste Alert</b></h3>
                <p>Bin ID: B12</p>
                <p>Fill Level: 95%</p>
                <p>Status: Collection Required</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Emergency */}

        {showEmergency && (
          <Marker
            position={[25.3200, 82.9600]}
            icon={emergencyIcon}
          >
            <Popup>
              <div>
                <h3><b>🚑 Emergency Incident</b></h3>
                <p>Location: BHU Road</p>
                <p>Severity: Critical</p>
                <p>Ambulance Dispatched</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Energy */}

        {showEnergy && (
          <Marker
            position={[25.3250, 82.9850]}
            icon={energyIcon}
          >
            <Popup>
              <div>
                <h3><b>⚡ Power Outage</b></h3>
                <p>Sector: 4</p>
                <p>Affected Homes: 120</p>
                <p>Restoration ETA: 30 mins</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default CityMap;