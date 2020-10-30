import axios from 'axios';
const token = localStorage.getItem('token');
const instance = axios.create({
   baseURL: 'http://localhost:8000/api',
   withCredentials: false,
  //  headers: {
  //    Authorization: token ? `Bearer ${token}` : '',
  //   }
});


export default instance;