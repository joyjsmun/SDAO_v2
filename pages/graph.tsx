"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useContractRead } from "wagmi";
import leverageStrategyAbi from "../app/abis/leverageStrategy.json";
import crvUsdControllerAbis from "../app/abis/curvUSD_Controller.json";
import APR from "./auraAPR";

const Stake = () => {
  const [progress, setProgress] = React.useState(13);
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const [inputValue, setInputValue] = React.useState(
    "0x96be3d4B507b11831Bb5d3B8aD5e612262AcCaB6"
  );

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

  const liquidationRange = useContractRead({
    address: "0x100dAa78fC509Db39Ef7D04DE0c1ABD299f4C6CE",
    abi: crvUsdControllerAbis,
    functionName: "user_prices",
    args: [inputValue],
  });

  const modifiedUsdcAmount: number = usdcAmount.data
    ? Number(usdcAmount.data) * 2
    : 0;

  const modifiedWstheth: number = wsthethDeposited.data
    ? Number(wsthethDeposited.data) * 2
    : 0;

  const modifiedCrvUSDBorrowed: number = crvUSDBorrowed.data
    ? Number(crvUSDBorrowed.data) * 2
    : 0;

  const modifiedLiquidationRange = (liquidationRange.data as bigint[])
    ? (liquidationRange.data as bigint[]).map((element) =>
        parseFloat((Number(element) / 10 ** 18).toFixed(1))
      )
    : [];

  const calculateYellowBoxPosition = (start: number, finish: number) => {
    const totalGraphSize = 4000;
    const startPosition = (start / totalGraphSize) * 100;
    const finishPosition = (finish / totalGraphSize) * 100;
    return { start: startPosition, finish: finishPosition };
  };

  //liqudation Range Box on top of graph
  const liqudationBoxPosition = calculateYellowBoxPosition(1173, 1297);

  return (
    <div className=" md:px-5 flex flex-col md:gap-4">
      <div className="flex-col flex bg-[#101217] md:rounded-2xl px-4 py-5 mb-5 justify-center  ">
        <div className="hidden md:block md:pl-5 ">
          <div className=" gap-4 md:gap-8 flex justify-between w-[95%]  ">
            <div className="text-base  md:text-[1.3rem] mb-4">
              Liquidation range{" "}
            </div>
            <div className="flex gap-8 text-sm mb-4 md:mb-0">
              <div className="flex-col md:block mb-4">
                <div className="text-s-gray">
                  CURRENT BALANCE (EST) / DEPOSITED{" "}
                </div>
                <div className="text-left md:text-right">
                  <span>3.51835</span> <span>/</span> <span>3.51835 </span>
                </div>
              </div>
              <div className="block">
                <div className="flex gap-4">
                  <div>
                    <div className="text-s-gray">LOSS AMOUNT</div>
                    <div className="text-left md:text-right">0</div>
                  </div>
                  <div>
                    <div className="text-s-gray">%LOSS</div>
                    <div className="text-left md:text-right">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block md:hidden">
          <div className=" gap-4 md:gap-8 md:flex flex-col justify-between w-[95%]  ">
            <div className="text-base  md:text-[1.3rem] mb-4">
              Liquidation range{" "}
            </div>
            <div className="flex-col  md:flex gap-8 text-sm mb-4 md:mb-0">
              <div className="flex-col md:block mb-4">
                <div className="text-s-gray">
                  CURRENT BALANCE (EST) / DEPOSITED{" "}
                </div>
                <div className="text-left md:text-right">
                  <span>3.51835</span> <span>/</span> <span>3.51835 </span>
                </div>
              </div>
              <div className="block">
                <div className="flex gap-4">
                  <div>
                    <div className="text-s-gray">LOSS AMOUNT</div>
                    <div className="text-left md:text-right">0</div>
                  </div>
                  <div>
                    <div className="text-s-gray">%LOSS</div>
                    <div className="text-left md:text-right">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-[95%] flex-col mt-5 md:mt-20 ml-3 relative  ">
          <Progress
            value={Number(wsthethDeposited.data)}
            className="w-[100%]"
          />
          <div
            className="absolute bg-gray-50 bottom-0"
            style={{
              left: `${liqudationBoxPosition.start}%`,
              width: `${
                liqudationBoxPosition.finish - liqudationBoxPosition.start
              }%`,
              height: "2rem",
            }}
          ></div>
          <div className="absolute  w-2 h-4 md:h-8 bg-white  bottom-0 left-[Number(wsthethDeposited.data)]"></div>
          <div className="absolute text-[0.6rem] md:text-base  bottom-[-2.1rem] items-center left-[Number(wsthethDeposited.data)] ml-[-1rem]">
            Oracle
          </div>
          {/* <div className="absolute w-6 h-2 md:w-24 md:h-8  bottom-[0.1rem] left-[47%] bg-gray-50"></div> */}
        </div>
        <div className="flex justify-between text-sm w-[95%] ml-3 ">
          <div className="flex-cols">
            <div className="h-[1rem] w-[0.1rem] bg-gray-100 "></div>
          </div>
          <div className="flex-cols">
            <div className="h-[1rem] w-[0.1rem] bg-gray-100 "></div>
          </div>
          <div className="flex-cols">
            <div className="h-[1rem] w-[0.1rem] bg-gray-100 "></div>
          </div>
          <div className="flex-cols">
            <div className="h-[1rem] w-[0.1rem] bg-gray-100 "></div>
          </div>
          <div className="flex-cols">
            <div className="h-[1rem] w-[0.1rem] bg-gray-100 "></div>
          </div>
        </div>
        <div className="flex justify-between text-[0.4rem] md:text-sm w-[98.5%] mt-[1.5rem] ">
          <div className="flex-cols">
            <div>USD $0</div>
          </div>
          <div className="flex-cols">
            <div>USD $1000</div>
          </div>
          <div className="flex-cols">
            <div>USD $2000</div>
          </div>
          <div className="flex-cols">
            <div>USD $3000</div>
          </div>
          <div className="flex-cols">
            <div>USD $4000</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
