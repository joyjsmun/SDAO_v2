import { useEffect, useState } from "react";

const axios = require("axios");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
//const { DateTime } = require("luxon");

// Define the GraphQL endpoint
const ENDPOINT = "https://data.aura.finance/graphql";

// Define the GraphQL query and variables
const QUERY = `
query PoolApr($poolId: String!, $chainId: Int ) {
  pool(id: $poolId, chainId: $chainId) {
    aprs {
      total
      }
    }
  }
`;

const VARIABLES = {
  // it supposed to 107
  //poolId: "107",
  poolId: "100",
  chainId: 1,
};

// Send the GraphQL query

export default function AuraAPR() {
  const [data, setDatas] = useState();
  useEffect(() => {
    axios
      .post(ENDPOINT, { query: QUERY, variables: VARIABLES })
      .then((response: any) => {
        console.log(response);
        const data = response.data.data.pool.aprs.total;
        setDatas(data);
      })
      .catch((error: string) => {
        console.error("Error:", error);
      });
  }, []);

  return <div>{data} %</div>;
}
