import { useContractRead } from "wagmi";
import crvUsdControllerAbis from "../app/abis/curvUSD_Controller.json";
import { useState, useEffect } from "react";

export default function Test() {
  const [inputValue, setInputValue] = useState(
    "0x96be3d4B507b11831Bb5d3B8aD5e612262AcCaB6"
  );

  const { data, isError, isLoading } = useContractRead({
    address: "0x100dAa78fC509Db39Ef7D04DE0c1ABD299f4C6CE",
    abi: crvUsdControllerAbis,
    functionName: "user_prices",
    args: [inputValue],
  });

  // Convert the BigInt array to strings before rendering them in the component.
  const dataString = (data as bigint[])
    ? (data as bigint[]).map((element) => element.toString())
    : [];

  return (
    <div>
      <div>Liquidation range:</div>
      <div>
        First range: {parseFloat((Number(dataString[0]) / 10 ** 18).toFixed(1))}
      </div>
      <div>
        Second range:{" "}
        {parseFloat((Number(dataString[1]) / 10 ** 18).toFixed(1))}
      </div>
    </div>
  );
}
