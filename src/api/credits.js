import request from "./request";

export default {
  /**
   * Get credit groups
   * @return {Promise}
   */
  async getCreditGroups() {
    let res = await request.get("/credits/groups");

    return await res.json();
  },
  /**
   * Get program credits
   * @param {int} id
   * @return {Promise}
   */
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
    let res = await request.post("/graphql", { query: query });

    return (await res.json()) || [];
  },
  /**
   * Create credit
   * @param {Mixed} body
   * @return {Promise}
   */
  async createCredit(body) {
    let res = await request.post("/credits", body);
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
