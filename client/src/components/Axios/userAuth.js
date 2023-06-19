// Set config defaults when creating the instance
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:5000/api/'
  }); 
  let AUTH_TOKEN = localStorage.getItem('userToken')
  // Alter defaults after instance has been created
  axiosInstance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


  export default axiosInstance