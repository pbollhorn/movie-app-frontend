const BASE_URL = "https://movie.jcoder.dk/api/";
const LOGIN_ENDPOINT = "auth/login";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

/* Insert utility-methods from later steps 
 here (REMEMBER to uncomment in the returned 
 object when you do)*/

function setToken(token) {
  localStorage.setItem("jwtToken", token);
}

function getToken() {
  return localStorage.getItem("jwtToken");
}

function loggedIn() {
  const loggedIn = getToken() != null;
  return loggedIn;
}

function logout() {
  localStorage.removeItem("jwtToken");
}

function login(user, password) {
  const options = makeOptions("POST", false, {
    username: user,
    password: password,
  });
  return fetch(BASE_URL + LOGIN_ENDPOINT, options)
    .then(handleHttpErrors)
    .then((res) => {
      setToken(res.token);
    });
}

function fetchData(endpoint, options) {
  /*TODO */
  // const options = makeOptions("GET", true); //True add's the token
  return fetch(BASE_URL + endpoint, options).then(handleHttpErrors);
}

function makeOptions(method, addToken, body) {
  var opts = {
    method: method,
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
  };
  if (addToken && loggedIn()) {
    opts.headers["Authorization"] = `Bearer ${getToken()}`;
  }
  if (body) {
    opts.body = JSON.stringify(body);
  }
  return opts;
}

function getUserRoles() {
  const token = getToken();
  if (token != null) {
    const payloadBase64 = getToken().split(".")[1];
    const decodedClaims = JSON.parse(window.atob(payloadBase64));
    const roles = decodedClaims.roles;
    return roles;
  } else return "";
}

function hasUserAccess(neededRole, loggedIn) {
  const roles = getUserRoles().split(",");
  return loggedIn && roles.includes(neededRole);
}

const facade = {
  makeOptions,
  setToken,
  getToken,
  loggedIn,
  login,
  logout,
  fetchData,
  getUserRoles,
  hasUserAccess,
};

export default facade;
