import { useContractRead } from "wagmi";
import leverageStrategyAbi from "../app/abis/leverageStrategy.json";

export default function Test() {
  const usdcAmount = useContractRead({
    address: "0x91Ce6fEC501fc5e2dA8Ed6cB85603906ea4cd21F",
    abi: leverageStrategyAbi,
    functionName: "totalUsdcAmount",
  });

  const wsthethDeposited = useContractRead({
    address: "0x91Ce6fEC501fc5e2dA8Ed6cB85603906ea4cd21F",
    abi: leverageStrategyAbi,
    functionName: "totalWsthethDeposited",
  });

  const crvUSDBorrowed = useContractRead({
    address: "0x91Ce6fEC501fc5e2dA8Ed6cB85603906ea4cd21F",
    abi: leverageStrategyAbi,
    functionName: "crvUSDBorrowed",
  });

  console.log("totalUsdcAmount", usdcAmount.data);
  console.log("totalWsthethDeposited", wsthethDeposited.data);
  console.log("crvUSDBorrowed", crvUSDBorrowed.data);

  // Convert the BigInt to a string before rendering it in the component.
  const usdcAmountString = usdcAmount.data ? usdcAmount.data.toString() : "";
  const wsthethDepositedString = wsthethDeposited.data
    ? wsthethDeposited.data.toString()
    : "";
  const crvUSDBorrowedString = crvUSDBorrowed.data
    ? crvUSDBorrowed.data.toString()
    : "";

  return (
    <div>
      <div>totalUsdcAmount: {usdcAmountString}</div>
      <div>totalWsthethDeposited: {wsthethDepositedString}</div>
      <div>crvUSDBorrowed: {crvUSDBorrowedString}</div>
    </div>
  );
}
