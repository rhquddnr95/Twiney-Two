import axios from "axios";

const axiosBase = axios.create({
  baseURL: `http://${window.location.hostname}:5000/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});

export const getUserDataByToken = async () => {
  if (JSON.parse(localStorage.getItem("token"))) {
    const data = await axiosBase.get(`api/users/auth/verifyToken`);
    return data.data;
  } else {
    return;
  }
};

export const deleteUserDataByToken = async () => {
  if (JSON.parse(localStorage.getItem("token"))) {
    const data = await axiosBase.delete("http://34.22.85.44:5000/api/users/");
    return data.data;
  } else {
    return;
  }
};
