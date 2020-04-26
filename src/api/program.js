export default {
  getPrograms: async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
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
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ query: getProgramsQuery }),
      redirect: "follow",
    };

    let res = await fetch("http://localhost:3000/graphql", requestOptions);

    const data = await res.json();
    return data || [];
  },
};
