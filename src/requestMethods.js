// import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
// /*const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";*/

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;
// console.log("user", user);
// console.log("currentUser", currentUser);
// console.log(TOKEN);
// export const publicRequest = axios.create({
//   baseURL: BASE_URL,
// });

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${TOKEN}` },
// });

import axios from "axios";

// const BASE_URL = "https://dark-red-coral-wrap.cyclic.cloud/api/";
// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://cronos-api-99mk.onrender.com/api/";

//const TOKEN =
//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
