import { useEffect, useState } from "react";
import Create from "../components/Create";
import Nav from "../components/Nav";
import { ethers } from "ethers";

const Upload = () => {
  const [account, setAccount] = useState("");
  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
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
  return (
    <div className="h-screen bg-hero-pattern text-secondary overlay">
      <Nav account={account} setAccount={setAccount} />
      <h1 className="text-3xl font-bold text-white text-center">Upload</h1>
      <Create />
    </div>
  );
};

export default Upload;
