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
  async getCreditGroups() {
    let res = await fetch("http://localhost:3000/credits/groups", {
      method: "GET",
      ...options,
    });

    return await res.json();
  },
  getProgramCredits: async (id) => {
    let query = `
    {
      program(id: ${id}) {
        credits {
          id
          accepted
          persons {
            id
            name
          }
          creditGroup {
            name
          }
        }
      }
    }
    `;

    let res = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      body: JSON.stringify({ query: query }),
      ...options,
    });

    return (await res.json()) || [];
  },
  /**
   * Create credit
   * @param {Mixed} body
   * @return {Promise}
   */
  async createCredit(body) {
    let res = await fetch(`http://localhost:3000/credits`, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });

    return res.ok || [];
  },
  /**
   * Delete exisintg credit through body
   * @param {Mixed} body
   * @return {Promise}
   */
  async deleteCredit(body) {
    let res = request.delete("/credits", body);
    return res.ok;
  },
};
