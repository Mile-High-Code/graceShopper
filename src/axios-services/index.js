import axios from "axios";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

export async function getUsers() {
  try {
    const { data: users } = await axios.get("/api/users");
    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function getUserById(id) {
  try {
    const { data: user } = await axios.get(`/api/users/${id}`);
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function logoutUser() {
  try {
    const { data } = await axios.post(`/api/auth/logout`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function registerUser(username, password, name, address) {
  // const { data } = await axios.post("/api/auth/register", {
  //   username: username,
  //   password: password,
  //   name: name,
  //   address: address,
  // });
  const response = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      address: address,
    }),
  });
  const result = await response.json();
  return result;
}

export async function loginUser(username, password) {
  const response = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  const result = await response.json();
  return result;
}

export async function updateUser(id, username, password, name, address) {
  const response = await fetch(`/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
      name: name,
      address: address,
    }),
  });
  const result = await response.json();
  return result;
}

export async function getMe() {
  const response = await fetch(`/api/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
