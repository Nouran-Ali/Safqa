import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';
import jwt_decode from 'jwt-decode';
import { NotifyMessage } from '../comps/Messages';

// let token = getCookie('token');

// export const AxiosJwt = axios.create({
//   baseURL: 'https://api.safqapay.com',
// });

// export const AxiosGlobal = axios.create({
//   baseURL: 'https://api.safqapay.com',
// });

// const isTokenExpired = (token) => {
//   let decoded = jwt_decode(token);
//   let exp_date = decoded.exp; // expires in exp_time in seconds
//   let now_date = new Date().getTime() / 1000; // now time in seconds

//   return now_date > exp_date;
// };

// middleware to check verification token
// AxiosJwt.interceptors.request.use((req) => {
//   if (req.headers.Authorization == undefined && token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }

//   if (token && req.url !== '/api/globalData') {
//     // console.log(req.url)
//     // console.log("Authorization is exists")
//     const is_expired = isTokenExpired(token);

//     if (is_expired) {
//       deleteCookie('token');
//       deleteCookie('myData');
//       // alert("Your Session 's been expired. Please login.");
//       // NotifyMessage({
//       //   type: 'error',
//       //   title: 'Forbidden',
//       //   description: "Authorization Error."
//       // })

//       return (window.location.href = '/login');
//     }
//   }
//   // console.log("Authorization is not exists")
//   return req;
// });
