import React, { useState } from "react";
import { cardProps } from "./type";

const Card = (props: cardProps) => {
  const { ownerId, title, des, expAt, uri, price } = props;
  const [popup, setPopup] = useState<boolean>(false);
  console.log(popup);
  return (
    <div className="w-[15rem] h-[23rem] rounded-[1.25rem] p-0 border-solid border-[0.2rem] border-[#1c82ad]">
      <img
        src={uri}
        className="w-full h-[70%] object-cover overflow-hidden rounded-t-[1.1rem]"
      />
      <p className="font-roboto-slab text-sm font-normal text-[#d2d2d2]/60 px-[1rem] mt-1">
        {ownerId}
      </p>

      <li className="list-none truncate font-roboto-slab text-2xl mb-2 font-normal text-[#d2d2d2] px-[1rem]">
        {title}
      </li>
      <p className="font-roboto-slab text-lg font-normal text-[#d2d2d2]/60 px-[1rem]">
        {price} NEAR
      </p>

      <img
        src="/info.svg"
        className="none md:visible md:relative md:bottom-4 md:right-[-12.5rem] md:w-[2rem] md:h-[2rem]"
        onMouseEnter={() => setPopup(true)}
        onMouseLeave={() => setPopup(false)}
      />
      <div
        className={`bg-black/60 backdrop-blur-80  min-h-max w-32 text-lightGray relative bottom-10 right-[-15rem] p-2 ${
          popup ? "visible" : "invisible"
        }`}
      >
        {des}
      </div>
    </div>
  );
};

export default Card;
