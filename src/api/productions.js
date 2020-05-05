import request from "./request";

export default {
  /**
   * Get all productions
   * @return {Promise}
   */
  getProductions: async () => {
    let query = `{
        productions{
          id
          producedBy
          producedFor
          editor
        }
      }
        `;

    let res = await request.post("/graphql", { query: query });

    return (await res.json()) || [];
  },
};
