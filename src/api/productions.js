export default {
  getProductions: async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let getProductionsQuery = `{
        productions{
          id
          producedBy
          producedFor
          editor
        }
      }
        `;
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ query: getProductionsQuery }),
      redirect: "follow",
    };

    let res = await fetch("http://localhost:3000/graphql", requestOptions);

    const data = await res.json();
    return data || [];
  },
};
