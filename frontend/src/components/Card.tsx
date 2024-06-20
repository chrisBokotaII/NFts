import axios from "axios";
import { Addressable } from "ethers";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

interface Imeta {
  id: string;
  name: string;
  description: string;
  external_url: string;
  price: string;
  image: string;
}

const Card = ({
  contract,
  provider,
  market,
}: {
  contract: ethers.Contract;
  provider: ethers.BrowserProvider;
  market: ethers.Contract;
}) => {
  const [nfts, setNfts] = useState<Imeta[]>([]);
  const [tokens, setTokens] = useState<string[]>([]);
  const [admin, setAdmin] = useState<Addressable | undefined>();
  const [user, setUser] = useState<string>();

  useEffect(() => {
    const getBalanceAndMetadata = async () => {
      if (contract && provider) {
        try {
          const balance = async (address: Addressable) => {
            const amount = await contract.balanceOf(address);
            const tokens: string[] = [];
            for (let i = 1; i <= amount; i++) {
              tokens.push(
                String(await contract.tokenOfOwnerByIndex(address, i - 1))
              );
            }
            setTokens([...tokens]);
          };
          await balance(market.target as Addressable);

          const uris = await Promise.all(
            tokens?.map(async (id: string) => {
              const uri = await contract.tokenURI(id);
              return { id: id.toString(), uri };
            })
          );

          const metaDatas = await Promise.all(
            uris.map(async ({ id, uri }) => {
              const response = await axios.get(
                `https://blush-advisory-shark-880.mypinata.cloud/ipfs/${uri}`
              );
              const metadata: Imeta = { id, ...response.data };
              return metadata;
            })
          );

          setNfts(metaDatas);
        } catch (error) {
          console.error("Error fetching balance and URIs:", error);
        }
      }
    };

    getBalanceAndMetadata();
  }, [contract, provider, market, tokens]);
  const buyNft = async (id: string, price: string) => {
    if (market) {
      try {
        const signer = await provider.getSigner();
        const tx = await market
          .connect(signer)
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          .buyNFT(id, {
            value: ethers.parseEther(price),
          });
        window.location.reload();
        console.log(tx);
      } catch (error) {
        console.error("Error buying NFT:", error);
      }
    }
  };
  useEffect(() => {
    const getOwner = async () => {
      const signer = await provider?.getSigner();
      const address = signer.address;
      setUser(address);
      const getId = await market.admin();
      setAdmin(getId);
    };

    getOwner();
  }, [market, provider]);

  return nfts.map((item, index) => (
    <div
      className="p-4 bg-white shadow-lg rounded-xl flex flex-col gap-4 mb-4 "
      key={index}
    >
      <h1 className="text-lg font-bold text-gray-800 sm:text-sm">
        {item.name}
      </h1>
      <img
        src={`https://blush-advisory-shark-880.mypinata.cloud/ipfs/${item.image.substring(
          7
        )}`}
        alt={item.name}
        className="w-full h-48 rounded-xl object-cover"
      />
      <p className="text-[0.8rem] text-gray-600">{item.description}</p>
      <p className="text-[0.7rem] text-green-500 font-semibold">{item.price}</p>

      {admin == user ? (
        <button
          type="button"
          onClick={() => buyNft(item.id, item.price)}
          className="text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          cancel
        </button>
      ) : (
        <button
          type="button"
          onClick={() => buyNft(item.id, item.price)}
          className="text-sm text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors"
        >
          Buy
        </button>
      )}
    </div>
  ));
};

export default Card;
