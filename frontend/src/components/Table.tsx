import { useEffect, useState } from "react";
import Preview from "./Preview";
import { ethers } from "ethers";
import axios from "axios";

interface Imeta {
  id: string;
  name: string;
  description: string;
  external_url: string;
  price: string;
  image: string;
}

const Table = ({
  contract,
  provider,
  market,
}: {
  contract: ethers.Contract;
  provider: ethers.BrowserProvider;
  market: ethers.Contract;
}) => {
  const [toggle, setToggle] = useState(false);
  const [home, setHome] = useState<Imeta | undefined>(undefined);
  const [nfts, setNfts] = useState<Imeta[]>([]);

  const togglePop = (home?: Imeta) => {
    setHome(home);
    setToggle(!toggle);
  };
  useEffect(() => {
    const fetchTokensAndMetadata = async () => {
      if (contract && provider) {
        try {
          const signer = await provider.getSigner();
          const address = await signer.getAddress();
          const amount = await contract.balanceOf(address);
          const tokenIds = [];

          for (let i = 0; i < amount; i++) {
            const tokenId = await contract.tokenOfOwnerByIndex(address, i);
            tokenIds.push(tokenId.toString());
          }

          const uris = await Promise.all(
            tokenIds.map(async (id) => {
              const uri = await contract.tokenURI(id);
              return { id, uri };
            })
          );

          const metaDatas = await Promise.all(
            uris.map(async ({ id, uri }) => {
              const response = await axios.get(
                `https://blush-advisory-shark-880.mypinata.cloud/ipfs/${uri}`
              );
              return { id, ...response.data };
            })
          );

          setNfts(metaDatas);
        } catch (error) {
          console.error("Error fetching tokens and metadata:", error);
        }
      }
    };

    fetchTokensAndMetadata();
  }, [contract, provider, market]);
  const list = async (id: string, price: string) => {
    try {
      const signer = await provider.getSigner();
      const nftContract = contract.connect(signer);
      const marketContract = market.connect(signer);

      console.log(signer.address, market.target);
      // Check if the NFT is already approved for the marketplace contract
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const currentApproval = await nftContract.getApproved(id);
      if (
        currentApproval.toLowerCase() !==
        (market.target as string).toLowerCase()
      ) {
        // Approve the marketplace contract to transfer the NFT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const approvalTx = await nftContract.approve(market.target, id);
        await approvalTx.wait(1);
      }

      // List the NFT on the marketplace
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const listTx = await marketContract.listNFT(id, ethers.parseEther(price));

      console.log("NFT listing transaction:", listTx.hash);
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  if (!nfts || nfts.length === 0) return;

  return (
    <div className=" w-full max-w-ful p-6 rounded-lg shadow-lg text-white">
      <div className="  h-fit w-full px-3 flex flex-row  flex-shrink-0 flex-wrap justify-evenly gap-2 pb-3 rounded-lg shadow-sm shadow-white  ">
        {nfts &&
          nfts.map((nft, index) => (
            <div
              key={index}
              className="cursor-pointer w-1/4 m-auto shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ease-in-out transform"
            >
              <span className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 border-b border-gray-200 bg-gray-100">
                {nft.id}
              </span>
              <div className="border-b border-gray-200">
                <img
                  src={`https://blush-advisory-shark-880.mypinata.cloud/ipfs/${nft.image.substring(
                    7
                  )}`}
                  onClick={() => togglePop(nft)}
                  alt="NFT"
                  title="Click to view details"
                  className="w-full h-[300px] object-cover cursor-pointer transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="px-4 py-2 bg-white">
                <h1 className="whitespace-nowrap text-gray-700 text-lg font-bold border-b border-gray-200 py-2">
                  {nft.name}
                </h1>
                <p className="whitespace-wrap text-gray-700 text-sm py-2 border-b border-gray-200">
                  {nft.description.length > 100
                    ? `${nft.description.substring(0, 100)}...`
                    : nft.description}
                </p>
                <p className="whitespace-nowrap text-gray-700 text-sm py-2 border-b border-gray-200">
                  {nft.price}
                </p>
                <div className="py-2 text-center">
                  <button
                    className="text-[0.8rem] w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-all duration-300 ease-in-out"
                    type="button"
                    onClick={() => list(nft.id, nft.price)}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {toggle && <Preview home={home} togglePop={togglePop} />}
    </div>
  );
};

export default Table;
