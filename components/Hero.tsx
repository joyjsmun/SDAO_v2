"use client";
import React from "react";
import Image from "next/image";

import Link from "next/link";

const Hero = () => {
  return (
    <section className=" h-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-14">
        <div className="col-span- place-self-center text-center sm:text-center justify-self-cente w-[70%] md:w-[60%]">
          <h1 className=" mb-4 text-2xl md:text-5xl lg:leading-normal  ">
            Increase your wstETH holdings by staking in high yield farms
            <br></br>
          </h1>
          <p className="text-s-aqua  text-2xl sm:text-lg mb-6 lg:text-[32px] font-light">
            Current APR 85%
          </p>
          <div>
            <Link
              href="/stake"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500  text-white mt-3"
            >
              <button className="  bg-gradient-to-br from-[#BAC6EF] via-[#65ABE9] to-[#8BF2E8] text-black rounded-full  py-3 px-20 text-center  lg:px-44 lg:py-3  text-lg lg:text-lg ">
                Stake{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
