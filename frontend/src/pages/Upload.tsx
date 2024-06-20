import { useEffect, useState } from "react";
import Create from "../components/Create";
import Nav from "../components/Nav";
import { ethers } from "ethers";
import Collections from "../artifacts/contracts/Collections.sol/Collections.json";

const Upload = () => {
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState<ethers.BrowserProvider>();
  const [contract, setContract] = useState<ethers.Contract>();
  const collectionsAddress = import.meta.env
    .VITE_NFT_CONTRACT_ADDRESS as string;

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
  }, []);

  useEffect(() => {
    if (provider) {
      const contract = new ethers.Contract(
        collectionsAddress,
        Collections.abi,
        provider
      );
      setContract(contract);
    }
  }, [provider]);

  return (
    <div className="h-fit min-h-screen bg-hero-pattern text-secondary overlay">
      <Nav account={account} setAccount={setAccount} />
      <h1 className="text-3xl font-bold text-white text-center">Upload</h1>
      <Create provider={provider} contract={contract} />
    </div>
  );
};

export default Upload;
