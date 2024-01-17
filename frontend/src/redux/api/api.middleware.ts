import axios from "axios";

const config  =  {
    baseURL: process.env.REACT_APP_API_URL,
    ResponseType: "json"
}

export const API = axios.create(config);