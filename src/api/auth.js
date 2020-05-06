import request from "./request";
const options = {
  mode: "cors",
  cache: "no-cache",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
  },
  redirect: "follow",
  referrer: "no-referrer",
};

export default {
  async login(email, password) {
    const res = await request.post("/auth/login", { email, password });

    if (res.status !== 200) {
      throw new Error("Invalid credentials");
    }

    const token = await res.text();
    console.log(token);
    localStorage.setItem("token", token);
    return token;
  },

  async refresh() {
    const res = await fetch("http://localhost:3000/auth/refresh", {
      method: "POST",
      headers: {
        token: localStorage.getItem("token"),
      },
      ...options,
    });

    if (res.status !== 200) {
      throw new Error("Invalid token");
    }

    const token = await res.text();
    localStorage.setItem({ token });
    return token;
  },

  logout() {
    localStorage.removeItem("token");
  },

  isAdmin () {
    return JSON.parse(atob(localStorage.token.split('.')[1])).Admin
  },

  check () {
    return !!localStorage.getItem('token')
  }
};
