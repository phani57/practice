import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/profile-api`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Sends a POST request to upload the cropped profile image file using FormData
// const uploadProfileImage = async (formData) => {

//changed for base64
const uploadProfileImage = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/profile-image`,
    // formData,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export default {
  getProfile,
  uploadProfileImage,
};
