import { useState, useEffect } from "react";
import API from "../services/api";
import socket from "../services/socket";

export function useSensorData() {
  const [latest, setLatest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    try {
      const res = await API.get("/sensors/latest");
      setLatest(res.data.latest);
    } catch (err) {
      console.log("Sensor fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchLatest();

    // Socket.io — listen for real-time sensor updates
    // When backend emits "sensor:update", update our state instantly
    socket.on("sensor:update", (newReadings) => {
      console.log("Live sensor update received:", newReadings.length, "readings");
      // Re-fetch latest to get updated values per type
      fetchLatest();
    });

    // Fallback polling every 30s in case socket disconnects
    const interval = setInterval(fetchLatest, 30000);

    return () => {
      socket.off("sensor:update");
      clearInterval(interval);
    };
  }, []);

  return { latest, loading };
}

export function useAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/alerts?status=active&limit=10");
      setAlerts(res.data.alerts);
    } catch (err) {
      console.log("Alert fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const resolveAlert = async (id) => {
    try {
      await API.patch(`/alerts/${id}/resolve`);
      setAlerts((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.log("Resolve error:", err);
    }
  };

  useEffect(() => {
    fetchAlerts();

    // Socket.io — listen for new alerts in real-time
    // When backend creates an alert, show it instantly without waiting 30s
    socket.on("alert:new", (newAlert) => {
      console.log("New alert received:", newAlert.severity, newAlert.type);
      setAlerts((prev) => {
        // Avoid duplicate alerts
        const exists = prev.find((a) => a._id === newAlert._id);
        if (exists) return prev;
        return [newAlert, ...prev];
      });
    });

    const interval = setInterval(fetchAlerts, 30000);

    return () => {
      socket.off("alert:new");
      clearInterval(interval);
    };
  }, []);

  return { alerts, loading, resolveAlert };
}

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/resources/recommendations")
      .then((res) => setRecommendations(res.data.recommendations))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    // Refresh recommendations every time new sensor data arrives
    socket.on("sensor:update", () => {
      API.get("/resources/recommendations")
        .then((res) => setRecommendations(res.data.recommendations))
        .catch((err) => console.log(err));
    });

    return () => {
      socket.off("sensor:update");
    };
  }, []);

  return { recommendations, loading };
}