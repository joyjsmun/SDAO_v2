import { useContractRead } from "wagmi";
import leverageStrategyAbi from "../app/abis/leverageStrategy.json";

export default function Test() {
  const usdcAmount = useContractRead({
    address: "0x91Ce6fEC501fc5e2dA8Ed6cB85603906ea4cd21F",
    abi: leverageStrategyAbi,
    functionName: "totalUsdcAmount",
  });

  // Modify the data as needed before rendering or storing it.
  const modifiedUsdcAmount: number = usdcAmount.data
    ? Number(usdcAmount.data) * 2
    : 0;

  // Continue with the same approach for other variables...

  console.log("totalUsdcAmount", modifiedUsdcAmount);

  // Convert the modified data to a string before rendering it in the component.
  const usdcAmountString = modifiedUsdcAmount.toString();

  return (
    <div>
      <div>totalUsdcAmount: {usdcAmountString}</div>
      {/* Continue with the same approach for other variables... */}
    </div>
  );
}
