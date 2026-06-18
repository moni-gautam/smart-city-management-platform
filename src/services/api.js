// const API_URL = "http://localhost:5000/api";

// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");

//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   };
// };

// export const getLatestSensors = async () => {
//   const response = await fetch(
//     `${API_URL}/sensors/latest`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch sensors");
//   }

//   return response.json();
// };

// export const getSensorStats = async () => {
//   const response = await fetch(
//     `${API_URL}/sensors/stats`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch stats");
//   }

//   return response.json();
// };

// export const getTrafficHistory = async () => {
//   const response = await fetch(
//     `${API_URL}/sensors?type=traffic&limit=20`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch traffic data");
//   }

//   return response.json();
// };

// export const getAlerts = async () => {
//   const response = await fetch(
//     `${API_URL}/alerts`,
//     {
//       headers: getAuthHeaders(),
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch alerts");
//   }

//   return response.json();
// };









const API_URL = "http://localhost:5000/api";

export const getLatestSensors = async () => {
  const response = await fetch(
    `${API_URL}/sensors/latest`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch sensors");
  }

  return response.json();
};

export const getSensorStats = async () => {
  const response = await fetch(
    `${API_URL}/sensors/stats`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch stats");
  }

  return response.json();
};

export const getTrafficHistory = async () => {
  const response = await fetch(
    `${API_URL}/sensors?type=traffic&limit=20`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch traffic data");
  }

  return response.json();
};

export const getAlerts = async () => {
  const response = await fetch(
    `${API_URL}/alerts`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
};