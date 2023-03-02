import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../../components/card";
import Layout from "../../layout";
import { viewsPageProps } from "./type";

const View = () => {
  const date = new Date();
  const param = useParams();
  console.log(param.tokenId);
  return (
    <>
      <p className="w-full px-20 flex justify-begin mb-12 font-roboto-slab text-5xl font-bold text-[#d2d2d2]">
        NAME
      </p>
      <div className="w-full flex justify-center px-20">
        <div className="flex gap-24">
          <Card
            ownerId="cquan.testnet"
            title="NAME #1"
            des="description"
            expAt={date}
            price={0.25}
            uri="aaaa"
          />
          <div>
            <div className="w-[60%] mb-8">
              <p className="font-roboto-slab font-bold text-3xl text-lightGray">
                Title
              </p>
              <p className="font-roboto-slab font-normal text-xl text-lightGray">
                NAME# 1
              </p>
            </div>
            <div className="w-[80%] mb-8">
              <p className="font-roboto-slab font-bold text-3xl text-lightGray">
                Owner Id
              </p>
              <p className="font-roboto-slab font-normal text-xl text-lightGray">
                abc.testnet
              </p>
            </div>
            <div className="w-[80%] mb-8">
              <p className="font-roboto-slab font-bold text-3xl text-lightGray">
                Description
              </p>
              <p className="font-roboto-slab font-normal text-xl text-lightGray">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="w-[80%] mb-8">
              <p className="font-roboto-slab font-bold text-3xl text-lightGray">
                Price
              </p>
              <p className="font-roboto-slab font-normal text-xl text-lightGray">
                0.25 NEAR
              </p>
            </div>
            <button className="h-[2rem] bg-caribbean rounded-[3.125rem] w-[10rem] font-roboto-slab text-xl font-normal">
              Purchase
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default View;
