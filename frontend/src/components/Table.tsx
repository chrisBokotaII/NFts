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
      const marketplaceAddress = import.meta.env
        .VITE_MARKETPLACE_CONTRACT_ADDRESS;
      const tokenId = id;
      const priceInWei = price;

      // Check if the NFT is already approved for the marketplace contract
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const currentApproval = await nftContract.getApproved(tokenId);
      if (currentApproval.toLowerCase() !== marketplaceAddress.toLowerCase()) {
        // Approve the marketplace contract to transfer the NFT
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const approvalTx = await nftContract.approve(
          marketplaceAddress,
          tokenId
        );
        await approvalTx.wait(1);
      }

      // List the NFT on the marketplace
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      const listTx = await marketContract.listNFT(tokenId, priceInWei);

      console.log("NFT listing transaction:", listTx.hash);
    } catch (error) {
      console.error("Error listing NFT:", error);
    }
  };

  if (!nfts || nfts.length === 0)
    return <div className="w-[90%] m-auto text-center pt-20">No NFTs</div>;

  return (
    <div className="w-[100%] m-auto">
      <div className="overflow-x-auto p-3  h-[67vh] w-full m-auto">
        <table className="table-auto bg-white text-[0.7rem] border-separate border-spacing-2 border bordr-slate-500 w-full p-2">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                #ID
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                Image
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                Description
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                Price
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-green-900 text-[1rem]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-[0.7rem]">
            {nfts &&
              nfts.map((nft, index) => (
                <tr key={index} className="cursor-pointer hover:bg-slate-400">
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {nft.id}
                  </td>
                  <td>
                    <img
                      src={`https://blush-advisory-shark-880.mypinata.cloud/ipfs/${nft.image.substring(
                        7
                      )}`}
                      onClick={() => togglePop(nft)}
                      alt="img"
                      className="w-[40%] h-[150px] rounded-lg text-center object-fit"
                    />
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {nft.name}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-wrap">
                    {nft.description}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {nft.price}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    <button
                      className="text-[0.8rem] bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
                      type="button"
                      onClick={() => list(nft.id, nft.price)}
                    >
                      List
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {toggle && <Preview home={home} togglePop={togglePop} />}
    </div>
  );
};

export default Table;
