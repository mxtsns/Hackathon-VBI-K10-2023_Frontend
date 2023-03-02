import React, { useRef, useState } from "react";
import { CONTRACT_NAME } from "../../config";
import { useAppSelector } from "../../store";

const Upload = () => {
  const [values, setValues] = useState<any>({
    title: "",
    des: "",
    uri: "",
  });
  const marketContract = useAppSelector((state) => state.wallet.marketContract);
  const nftContract = useAppSelector((state) => state.wallet.nftContract);
  const walletConnection = useAppSelector(
    (state) => state.wallet.walletConnection
  );

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    console.log(values);
  };

  const mint = async () => {
    console.log("Values:", values);
    let mintResult = await nftContract.nft_mint(
      {
        token_id: values.title,
        metadata: {
          title: values.title,
          description: values.des,
          media: values.uri,
        },
        receiver_id: walletConnection.getAccountId(),
      },
      "300000000000000",
      "1000000000000000000000000"
    );
    console.log("res", mintResult);
  };

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        mint();
      }}
      className="w-full flex flex-col items-center mt-24"
    >
      <div className="flex flex-col mb-8 min-w-fit">
        <label
          id="title"
          htmlFor="title"
          className="text-lightGray font-bold text-2xl mb-2"
        >
          Title
        </label>
        <input
          name="title"
          value={values.title}
          onChange={handleInputChange}
          type="text"
          className="relative m-0 block w-[50vw] min-w-0 flex-auto rounded-[1.25rem] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-[#d2d2d2] outline-none transition duration-300 ease-in-out focus:border-[#03C988] focus:text-[#d2d2d2] focus:shadow-te-primary focus:outline-none dark:border-[#1C82AD] dark:text-[#d2d2d2] dark:placeholder:text-[#d2d2d2]/40"
        />
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="des" className="text-lightGray font-bold text-2xl mb-2">
          Description
        </label>
        <input
          name="des"
          onChange={handleInputChange}
          value={values.des}
          id="des"
          type="text"
          className="relative m-0 block w-[50vw] min-w-0 flex-auto rounded-[1.25rem] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-[#d2d2d2] outline-none transition duration-300 ease-in-out focus:border-[#03C988] focus:text-[#d2d2d2] focus:shadow-te-primary focus:outline-none dark:border-[#1C82AD] dark:text-[#d2d2d2] dark:placeholder:text-[#d2d2d2]/40"
        />
      </div>
      <div className="flex flex-col mb-8">
        <label htmlFor="uri" className="text-lightGray font-bold text-2xl mb-2">
          URI
        </label>
        <input
          id="uri"
          name="uri"
          onChange={handleInputChange}
          value={values.uri}
          type="text"
          className="relative m-0 block w-[50vw] min-w-0 flex-auto rounded-[1.25rem] border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-1.5 text-base font-normal text-[#d2d2d2] outline-none transition duration-300 ease-in-out focus:border-[#03C988] focus:text-[#d2d2d2] focus:shadow-te-primary focus:outline-none dark:border-[#1C82AD] dark:text-[#d2d2d2] dark:placeholder:text-[#d2d2d2]/40"
        />
      </div>
      <button
        type="submit"
        className="h-[2rem] bg-caribbean rounded-[3.125rem] w-[10rem] font-roboto-slab text-xl font-normal"
      >
        Upload
      </button>
    </form>
  );
};

export default Upload;
