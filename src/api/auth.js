const options = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
   'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

let refreshInterval


export default {
  async login (email, password) {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        ...options
    });

    if (res.status != 200) {
      throw new Error('Invalid credentials')
    }

    const token = await res.text()
    localStorage.setItem('token', token)
    return token
  },

  async refresh() {
    const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          'token': localStorage.getItem('token'),
        },
        ...options
    });

    if (res.status != 200) {
      throw new Error('Invalid token')
    }

    const token = await res.text()
    localStorage.setItem({token})
    return token
  },

  logout () {
    localStorage.removeItem('token')
  },

  check () {
    return !!localStorage.getItem('token')
  }
};