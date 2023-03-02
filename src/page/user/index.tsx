import React, { useEffect, useState } from "react";
import { getTextOfJSDocComment } from "typescript";
import Card from "../../components/card";
import { CONTRACT_NAME, MARKET_CONTRACT_NAME } from "../../config";
import Layout from "../../layout";
import { useAppDispatch, useAppSelector } from "../../store";

const User = () => {
  const date = new Date();

  const dispatch = useAppDispatch();
  const nftContract = useAppSelector((state) => state.wallet.nftContract);
  const marketContract = useAppSelector((state) => state.wallet.marketContract);
  const walletConnection = useAppSelector(
    (state) => state.wallet.walletConnection
  );

  const [tokens, setTokens] = useState<any>([]);

  useEffect(() => {
    console.log("flag");
    async function getTokensForOwner() {
      console.log("entry");
      console.log("a:", nftContract);
      console.log("b:", walletConnection);
      let info = await nftContract.nft_tokens_for_owner({
        account_id: walletConnection.getAccountId(),
        from: "0",
        limit: 64,
      });
      setTokens(info);
      console.log("tokens:", tokens);
    }
    if (nftContract != null) {
      console.log("entry if");
      getTokensForOwner();
    }
    console.log("flag2");
  }, [nftContract]);

  const sendStorageDeposit = async () => {
    await marketContract.storage_deposit(
      {},
      "300000000000000",
      "1000000000000000000000000"
    );
  };

  const approveNFTForSale = async (token_id: string) => {
    console.log(token_id);
    sendStorageDeposit();
    let sale_conditions = {
      sale_conditions: "0.25",
    };
    await nftContract.nft_approve(
      {
        token_id: token_id,
        account_id: MARKET_CONTRACT_NAME,
        msg: JSON.stringify(sale_conditions),
      },
      "300000000000000",
      "1000000000000000000000000"
    );
  };

  return (
    <>
      <p className="w-full flex justify-center mb-16 font-roboto-slab text-5xl mb-2 font-bold text-[#d2d2d2]">
        YOUR ASSET
      </p>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-x-24 gap-y-16">
          {tokens.map((i: any) => {
            return (
              <div className="max-w-fit flex  flex-col items-center">
                <Card
                  ownerId={i.metadata.owner_id}
                  title={i.metadata.title}
                  des={i.metadata.description}
                  expAt={date}
                  price={0.25}
                  uri={i.metadata.media}
                />
                <button
                  onClick={() => approveNFTForSale(i.token_id)}
                  className="h-[2rem]  mt-4 bg-caribbean rounded-[3.125rem] w-[10rem] font-roboto-slab text-xl font-normal"
                >
                  Sell now
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default User;
