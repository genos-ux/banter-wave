import axios from "axios";


const url = "http://localhost:4000/api/v1"

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? url : "/api/v1",
    withCredentials: true
})