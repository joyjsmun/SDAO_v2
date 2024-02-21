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
  //   const [progress, setProgress] = React.useState(13);

  // Array of states to track mouse hover for each icon
  const [hoveredStates, setHoveredStates] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  // Function to update hovered state for a specific icon
  const handleHover = (index: number, isHovered: boolean) => {
    const newHoveredStates = [...hoveredStates];
    newHoveredStates[index] = isHovered;
    setHoveredStates(newHoveredStates);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);

    // fetch('dsada').then(res => setProgress(res));
    //   fetch("dsada").then((res) => setProgress(res));
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

  const health = useContractRead({
    address: "0x100dAa78fC509Db39Ef7D04DE0c1ABD299f4C6CE",
    abi: crvUsdControllerAbis,
    functionName: "health",
    args: ["0x975793c7A6a077221aCa4E4FB9B7f9A46378463a"],
  });

  //number / 1e18 / number / (10 * 10 ^ 18)

  let healthInfo;

  if (typeof health.data === "number" || typeof health.data === "bigint") {
    console.log(health.data);
    healthInfo = Number(health.data) / (10 * 10 ** 16);
    healthInfo = healthInfo.toFixed(1);
    console.log("health", healthInfo);
  } else {
    console.error("health.data is not a number or bigint");
  }
  console.log("totalUsdcAmount", usdcAmount.data);
  console.log("totalWsthethDeposited", wsthethDeposited.data);
  console.log("crvUSDBorrowed", crvUSDBorrowed.data);

  // Modify the data as needed before rendering or storing it.
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

  console.log("totalUsdcAmount", modifiedUsdcAmount);
  console.log("wsthethDeposited", modifiedWstheth);
  console.log("crvUSDBorrowed", modifiedCrvUSDBorrowed);

  // Convert the modified data to a string before rendering it in the component.
  const usdcAmountString = modifiedUsdcAmount.toString();
  const wsthethDepositedString = modifiedWstheth.toString();
  const crvUSDBorrowedString = modifiedCrvUSDBorrowed.toString();

  return (
    <div className=" md:px-5 flex flex-col md:gap-4">
      <div className="bg-[#101217] grid md:rounded-2xl px-8 py-4 ">
        <div className="flex flex-col text-2xl leading-7 md:gap-2 mb-3 ">
          ETH Leverage Yield Strategy Overview
        </div>
        <div className=" text-sm md:text-lg font-light md:font-medium leading-[1.375rem] text-s-gray">
          This strategy is designed to maximize your Wrapped Staked Ether
          (wstETH) holdings. Utilizing the synergy between crvUSD, Aura Finance,
          and Paladin, this strategy offers a seamless method to enhance your
          yields on staked ETH without the manual complexities.
        </div>
      </div>
      <div className="bg-[#101217]   grid-cols-2 grid md:grid-cols-4  md:rounded-2xl px-4 py-5 gap-3 ">
        <div className="bg-gradient-to-r from-[#337ec2] via-[#1d4a55] to-[#477655] p-[0.025rem] rounded-2xl ">
          <div className="bg-black rounded-2xl   md:py-4 md:px-14 text-xl pl-3 ">
            <div className="flex items-center">
              {/* ANNUAL PERCENT RATE */}
              <div
                className="flex items-center relative"
                onMouseEnter={() => handleHover(0, true)}
                onMouseLeave={() => handleHover(0, false)}
              >
                <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                  ANNUAL PERCENT RATE (APR)
                </div>
                <div
                  className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                  style={{
                    backgroundImage: `url('images/information.png')`,
                    backgroundPosition: "center",
                  }}
                ></div>
                {/* Description box */}
                {hoveredStates[0] && (
                  <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                    This percentage reflects the annual rate of return on your
                    investments, taking into account the effect of compounding
                    over a year.
                  </div>
                )}
              </div>
            </div>
            <div className="text-s-aqua text-[0.7rem] px-2  md:text-lg ">
              <APR />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#337ec2] via-[#1d4a55] to-[#477655] p-[0.025rem] rounded-2xl ">
          <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
            <div className="flex items-center">
              {/* TOTAL VALUE LOCKED */}
              <div
                className="flex items-center relative"
                onMouseEnter={() => handleHover(1, true)}
                onMouseLeave={() => handleHover(1, false)}
              >
                {" "}
                <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                  TOTAL VALUE LOCKED (TVL)
                </div>
                <div
                  className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                  style={{
                    backgroundImage: `url('images/information.png')`,
                    backgroundPosition: "center",
                  }}
                ></div>
                {/* Description box */}
                {hoveredStates[1] && (
                  <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                    Represents the aggregate amount of assets staked in our
                    strategy, indicating the strategy&apos;s size and
                    participation level.
                  </div>
                )}
              </div>
            </div>
            <div className=" text-[0.7rem] px-2  md:text-lg ">
              ${usdcAmountString}
            </div>
          </div>
        </div>
        <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
          <div className="flex  items-center">
            {/* wstETH */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(2, true)}
              onMouseLeave={() => handleHover(2, false)}
            >
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                wstETH
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[2] && (
                <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  Stands for wrapped staked Ether. It&apos;s your staked ETH
                  that has been wrapped to interact with different DeFi
                  protocols and earn additional yields.
                </div>
              )}
            </div>
          </div>
          <div className=" text-[0.7rem] px-2  md:text-lg ">
            ${wsthethDepositedString}
          </div>
        </div>
        <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
          <div className="flex  items-center">
            {/* TOTAL DEBT */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(3, true)}
              onMouseLeave={() => handleHover(3, false)}
            >
              {" "}
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                TOTAL DEBT
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[3] && (
                <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  The sum of all funds borrowed against the collateral in the
                  strategy.
                </div>
              )}
            </div>
          </div>
          <div className=" text-[0.7rem] px-2  md:text-lg ">
            ${crvUSDBorrowedString}
          </div>
        </div>
      </div>
      <div className="bg-[#101217]  grid-cols-3 grid md:grid-cols-4  lg:grid-cols-4  justify-between md:rounded-2xl px-2 md:px-4 py-5 gap-2 md:gap-3 ">
        <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
          <div className="flex  items-center">
            {/* STATUS */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(4, true)}
              onMouseLeave={() => handleHover(4, false)}
            >
              {" "}
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                STATUS
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[4] && (
                <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  Shows the current operational status of the strategy, such
                  healthy, soft liquidation or hard liquidation.
                </div>
              )}
            </div>
          </div>
          <div className=" text-s-aqua text-[0.7rem] px-2  md:text-lg ">
            Healthy
          </div>
        </div>
        <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
          <div className="flex  items-center">
            {/* HEALTH */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(5, true)}
              onMouseLeave={() => handleHover(5, false)}
            >
              {" "}
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                HEALTH
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[5] && (
                <div className="absolute top-0 w-full left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  A measure of the safety margin of your position. High health
                  suggests a low risk of liquidation, while low health indicates
                  increased risk.
                </div>
              )}
            </div>
          </div>
          <div className="text-s-aqua text-[0.7rem] px-2  md:text-lg ">
            {healthInfo}
          </div>
        </div>
        <div className="hidden md:block bg-black  rounded-2xl  py-4 px-14 text-xl ">
          <div className="flex items-center">
            {/* LIQUIDATION RANGE */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(6, true)}
              onMouseLeave={() => handleHover(6, false)}
            >
              {" "}
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                LIQUIDATION RANGE
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[6] && (
                <div className="absolute top-0 left-20 bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  It shows the price range in which the soft liquidation starts
                  and when it leads to a hard liquidation.
                </div>
              )}
            </div>
          </div>
          <div className="text-sm hidden md:block">
            {" "}
            {modifiedLiquidationRange[1]} - {modifiedLiquidationRange[0]}
          </div>
        </div>
        <div className="bg-black rounded-2xl  md:py-4 md:px-14 text-xl pl-3 ">
          <div className="flex  items-center">
            {/* BORROW RATE */}
            <div
              className="flex items-center relative"
              onMouseEnter={() => handleHover(7, true)}
              onMouseLeave={() => handleHover(7, false)}
            >
              {" "}
              <div className="hidden md:block text-s-gray font-light text-[0.7rem] md:text-lg px-1">
                BORROW RATE
              </div>
              <div
                className="bg-cover bg-no-repeat bg-center w-3 h-3 md:w-4 md:h-4 block md:ml-2"
                style={{
                  backgroundImage: `url('images/information.png')`,
                  backgroundPosition: "center",
                }}
              ></div>
              {/* Description box */}
              {hoveredStates[7] && (
                <div className="absolute top-0 left-20 w- bg-gray-800 text-white text-sm p-2 rounded opacity-70">
                  The interest rate you&apos;re charged for borrowing assets
                  within the strategy, typically expressed as an annual
                  percentage. This rate is variable and can change based on
                  market conditions.
                </div>
              )}
            </div>
          </div>
          <div className="text-[0.7rem] px-2  md:text-lg">10.10%</div>
        </div>
      </div>
      <div className=" grid grid-cols-5 rounded-2xl gap-4 ">
        <div className="hidden md:block  bg-[#101217] md:col-span-3  rounded-2xl  px-8 py-6">
          <div className="text-2xl mb-8">
            Increase your wstETH holdings by staking in high yield farms.
          </div>
          <div className="text-s-gray mb-4 ">
            Introducing SupremeDAO&apos;s ETH Leverage Yield Strategy – an
            automated solution for enhancing your Ethereum investments.
          </div>
          <div className="text-s-gray mb-4  ">
            By integrating with Aura Finance, crvUSD, and Paladin, this strategy
            automates the complex process of yield generation. To leverage your
            wrapped staked ETH (wstETH), our Power Agent creates a debt on Curve
            in crvUSD, then stakes these funds in high-yield Aura Finance pools.
            To mitigate risks, a portion of the generated yield is automatically
            used to close the Collateralized Debt Position (CDP), with another
            portion optimized for additional returns on Paladin. This approach
            not only simplifies your investment process by eliminating the need
            for manual token selling, position locking, or bribe round
            participation but also aims to deliver a substantial yield on your
            ETH.
          </div>
          <div className="text-s-gray mb-2 ">
            Prior to engaging with SupremeDAO&apos;s strategy, thoroughly review
            the documentation and terms and conditions provided. Keep in mind
            that returns can fluctuate; we recommend using the user interface to
            preview both deposits and withdrawals for current performance
            estimates. By proceeding with your deposit, you acknowledge and
            accept these terms and assert your understanding of the
            strategy&apos;s mechanics and inherent market risks.
          </div>
        </div>

        {/* tab menu */}
        <Tabs
          defaultValue="staking"
          className="w-full bg-[#101218]  col-span-5 md:col-span-2  md:h-[35vh] md:rounded-2xl  flex-col gap-10 "
        >
          <TabsList className="grid w-full grid-cols-2 bg-[#101218] ">
            <TabsTrigger value="staking" className="text-sm md:text-2xl py-2">
              Staking
            </TabsTrigger>
            <TabsTrigger value="withdraw" className="text-sm md:text-2xl py-2">
              Withdraw
            </TabsTrigger>
          </TabsList>
          <TabsContent value="staking">
            <div className="p-4 md:px-10 md:py-8 flex-col  ">
              <div className="flex gap-4 md:gap-7 md:justify-center my-4 md:my-8 ">
                {/* Gradient Border */}
                <div className="block md:w-full  bg-gradient-to-r from-[#337ec2] via-[#1d4a55] to-[#477655] p-[0.07rem] rounded-xl md:rounded-md ">
                  <div className="bg-black flex border border-[#1A1D23]  md:justify-between p-2 rounded-xl md:rounded-md text-[0.7rem] md:text-lg">
                    <div className="md:pl-3 md:pr-8 text-[#8C9096] text-[0.7rem] pr-4  md:text-lg">
                      WSTETH
                    </div>
                    <span className="text-[#8C9096] hidden md:block">|</span>
                    <div>
                      <input
                        className="bg-[#101218] focus:bg-none focus:outline-0 text-right"
                        placeholder="1.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 text-sm items-center md:pr-5 text-[0.7rem]">
                  <span>Available</span>
                  <span>1.5</span>
                </div>
              </div>
              <Button className="w-full md:text-[1.15rem]  rounded-full py-3 md:px-2 md:py-6 bg-gradient-to-br from-[#BAC6EF] via-[#65ABE9] to-[#8BF2E8] text-black">
                Stake
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="withdraw">
            <div className="bg-[#101218] px-10 py-8 flex-col">
              <div className="grid grid-cols-5 md:flex border border-[#1A1D23] md:w-full md:justify-between p-2 rounded-md mb-4">
                <div className="col-span-4 p-1 md:pl-3 md:pr-8  text-[#8C9096] text-[0.7rem] md:text-lg">
                  CLAIMABLE REWARDS
                </div>
                <div>
                  <input
                    className="bg-[#101218] focus:bg-none focus:outline-0 md:text-right pr-2 text-[0.7rem]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-5 md:flex border border-[#1A1D23] w-full justify-between p-2 rounded-md mb-8">
                <div className=" col-span-4 p-1 md:pl-3 md:pr-8  text-[#8C9096] text-[0.7rem] md:text-lg">
                  SHARES
                </div>

                <div>
                  <input
                    className="bg-[#101218] focus:bg-none focus:outline-0 md:text-right pr-2 text-[0.7rem]"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <Button className="w-full md:text-[1.15rem]  rounded-full py-3 md:px-2 md:py-6 bg-gradient-to-br from-[#BAC6EF] via-[#65ABE9] to-[#8BF2E8] text-black">
                Withdraw
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
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
