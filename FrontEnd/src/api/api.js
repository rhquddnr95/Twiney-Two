import axios from "axios";

/** 헤더에 토큰을 첨부하는 axios 인스턴스 */
export const axiosBase = axios.create({
  baseURL: `http://${window.location.hostname}:5000/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});

/** 일반 axios 인스턴스 */
export const axiosBaseWithToken = axios.create({
  baseURL: `http://${window.location.hostname}:5000/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  },
});
