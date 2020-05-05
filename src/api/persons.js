import request from "./request";

export default {
  /**
   * Get all people
   * @return {Promise}
   */
  async getPeople() {
    let res = await request.get("/people");
    return await res.json();
  },
  /**
   * Create new person
   * @param {Mixed} body
   * @return {Promise}
   */
  async createPerson(body) {
    let res = await request.post("/people", body);

    return (await res.json()) || [];
  },
};
