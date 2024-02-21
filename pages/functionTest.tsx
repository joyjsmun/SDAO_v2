import { useContractRead, useContractWrite } from "wagmi";
import { useState } from "react";
import wethABI from "../app/abis/weth.json";

export default function Test() {
  const [inputValue, setInputValue] = useState("");
  const [targetAddress, setTargetAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Call useContractWrite hook to obtain the contract function
  const { write: approveFunction } = useContractWrite({
    address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    abi: wethABI,
    functionName: "approve",
    args: ["0x91Ce6fEC501fc5e2dA8Ed6cB85603906ea4cd21F", 100000000],
  });

  const allowanceAmount = useContractRead({
    address: "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0",
    abi: wethABI,
    functionName: "allowance",
    args: [
      "0x97d7a75Bec591698e7FAd02c2e89f6b1E79D343C",
      "0x96be3d4B507b11831Bb5d3B8aD5e612262AcCaB6",
    ],
  });

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      console.log(allowanceAmount.data);
      // Call the contract function directly
      await approveFunction();
      console.log("Approval successful");
    } catch (error) {
      setIsError(true);
      console.error("Error occurred while approving:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleApprove} disabled={isLoading}>
        {isLoading ? "Approving..." : "Approve"}
      </button>
      {isError && <p>Error occurred while approving.</p>}
    </div>
  );
}
