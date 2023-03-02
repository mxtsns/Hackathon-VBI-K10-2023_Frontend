import { captureRejectionSymbol } from "events";
import React, { useEffect, useState } from "react";
import Card from "../../components/card";
import { CONTRACT_NAME } from "../../config";
import Layout from "../../layout";
import { useAppSelector } from "../../store";

const HomePage = () => {
  const walletConnection = useAppSelector(
    (state) => state.wallet.walletConnection
  );

  const nftContract = useAppSelector((state) => state.wallet.nftContract);
  const marketContract = useAppSelector((state) => state.wallet.marketContract);

  const [nftMarketResult, setNftMarketResults] = useState<any>([]);

  useEffect(() => {
    const loadSaleItems = async () => {
      let nftTokens = await nftContract.nft_tokens({
        from_index: "0",
        limit: 64,
      });

      console.log(
        Object.keys(nftTokens[3].approved_account_ids).some(
          (v: string) => v == "market_contract.flyingtung.testnet"
        )
      );

      let saleTokens = await marketContract.get_sales_by_nft_contract_id({
        nft_contract_id: CONTRACT_NAME,
        from_index: "0",
        limit: 64,
      });

      console.log(saleTokens);
      // => []

      let sales = [];

      for (let i = 0; i < nftTokens.length; i++) {
        // const { token_id } = nftTokens[i];
        // let saleToken = saleTokens.find((t: any) => t.token_id === token_id);
        // if (saleToken !== undefined) {
        //   sales[i] = Object.assign(nftTokens[i], saleToken);
        // }
        if (
          Object.keys(nftTokens[i].approved_account_ids).some(
            (v: string) => v == "market_contract.flyingtung.testnet"
          ) == true
        ) {
          sales.push(nftTokens[i]);
        }
      }

      console.log("flas: ", sales);
      setNftMarketResults(sales);
    };
    if (nftContract != null && marketContract != null) {
      loadSaleItems();
    }
  }, [nftContract, marketContract]);

  const resolve_purchase = async (
    nft_contract_id: string,
    token_id: string
  ) => {
    await marketContract.offer(
      {
        nft_contract_id: CONTRACT_NAME,
        token_id: token_id,
      },
      "300000000000000",
      "1000000000000000000000000"
    );
  };

  const date = new Date();
  return (
    <>
      <p className="w-full flex justify-center mb-16 font-roboto-slab text-5xl mb-2 font-bold text-[#d2d2d2]">
        MARKET
      </p>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-4 gap-x-24 gap-y-16">
          {nftMarketResult.map((e: any) => {
            return (
              <div className="max-w-fit flex  flex-col items-center">
                <Card
                  ownerId={e.owner_id}
                  title={e.metadata.title}
                  des={e.description}
                  expAt={date}
                  price={0.25}
                  uri={e.metadata.media}
                />
                <button
                  onClick={() => resolve_purchase(CONTRACT_NAME, e.token_id)}
                  className="h-[2rem]  mt-4 bg-caribbean rounded-[3.125rem] w-[10rem] font-roboto-slab text-xl font-normal"
                >
                  Purchase
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default HomePage;
