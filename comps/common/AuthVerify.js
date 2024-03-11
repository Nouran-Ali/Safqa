import jwt_decode from "jwt-decode";
import { deleteCookie, getCookie } from "cookies-next";

const AuthVerify = () => {
  let token = getCookie("token");
  // console.log("AuthVerify token: ", token);
  if (token) {
    let decoded = jwt_decode(token);
    let exp_date = (decoded.exp - 3600 ) + 15;  // in seconds 
    let now_date = new Date().getTime() / 1000; // in seconds

    // console.log("now_date: ", now_date);
    // console.log("exp_date: ", exp_date);
    // console.log("expired in : ", exp_date - now_date, "seconds");


    // if invalid token logout
    if (now_date > exp_date) {
      deleteCookie("token");
      alert("Your Session 's been expired. Please login.");
      window.location.reload();
    }
  }

  return <div></div>;
};

export default AuthVerify;
