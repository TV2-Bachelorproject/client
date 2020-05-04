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
  async getPeople() {
    let res = await fetch("http://localhost:3000/people", {
      method: "GET",
      ...options,
    });

    return await res.json();
  },
  async createPerson(body) {
    let res = await fetch(`http://localhost:3000/people`, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });

    return (await res.json()) || [];
  },
};
