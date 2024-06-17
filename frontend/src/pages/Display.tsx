import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { ethers } from "ethers";
import Card from "../components/Card";
import Collections from "../artifacts/contracts/Collections.sol/Collections.json";
import Marketplace from "../artifacts/contracts/Market.sol/Marketplace.json";

const Display = () => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [market, setMarket] = useState<ethers.Contract>();

  const collectionsAddress = import.meta.env
    .VITE_NFT_CONTRACT_ADDRESS as string;
  const marketplaceAddress = import.meta.env
    .VITE_MARKETPLACE_CONTRACT_ADDRESS as string;

  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account);
      window.ethereum.on("accountsChanged", async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        setAccount(account);

        window.location.reload();
      });
    }
  };
  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(
        collectionsAddress,
        Collections.abi,
        provider
      );
      const contract2 = new ethers.Contract(
        marketplaceAddress,
        Marketplace.abi,
        provider
      );
      setMarket(contract2);
      setContract(contract);
    }
  }, [provider]);

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div className="h-screen bg-hero-pattern text-secondary overlay">
      <Nav account={account} setAccount={setAccount} />
      <h1 className="text-3xl font-bold text-white text-center underline">
        Marketplace
      </h1>
      <div className="px-4 py-4 grid-cols-4 grid gap-5 mt-5 h-fit ">
        {provider && contract && market ? (
          <Card contract={contract} provider={provider} market={market} />
        ) : null}
      </div>
    </div>
  );
};

export default Display;
