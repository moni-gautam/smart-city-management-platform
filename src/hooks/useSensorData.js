import { useState, useEffect } from "react";
import API from "../services/api";

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
    fetchLatest();
    // Refresh every 30 seconds to match seed job
    const interval = setInterval(fetchLatest, 30000);
    return () => clearInterval(interval);
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
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
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
  }, []);

  return { recommendations, loading };
}