import request from "./request";

export default {
  /**
   * Get all programs
   * @return {Promise}
   */
  getPrograms: async () => {
    let getProgramsQuery = `{
          programs{
            id
            programId
            title
            airTimeTo
            airTimeFrom
          }
        }
          `;

    let res = await request.post("/graphql", { query: getProgramsQuery });
    return (await res.json()) || [];
  },
  /**
   * Get program
   * @param {int} id
   * @return {Promise}
   */
  getProgram: async (id) => {
    let query = `{
          program(id:${id}){
            id
            programId
            title
            teaser
            description
          }
        }
          `;
    let res = await request.post("/graphql", { query: query });
    return (await res.json()) || [];
  },

  /**
   * Accept credits
   * @param {int} id
   * @return {Promise}
   */
  acceptCredits: async (id) => {
    return await request.post("/credits/accept", { ProgramID: id });
  },


};
