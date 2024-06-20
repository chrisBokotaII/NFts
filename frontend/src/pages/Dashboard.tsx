import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { ethers } from "ethers";
import Collections from "../artifacts/contracts/Collections.sol/Collections.json";
import Marketplace from "../artifacts/contracts/Market.sol/Marketplace.json";

const Dashboard = () => {
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
    connectWallet();
  }, [account]);
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
  return (
    <div className="h-fit bg-hero-pattern text-secondary overlay flex flex-col">
      <Nav account={account} setAccount={setAccount} />
      <div className="flex flex-1 flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-white text-center my-8">
          Dashboard
        </h1>
        {provider && contract && market ? (
          <Table contract={contract} provider={provider} market={market} />
        ) : (
          <p className="text-xl text-white mt-8">Loading data...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
