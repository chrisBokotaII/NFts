import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { ethers } from "ethers";

const LandingPage = () => {
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
    <div className="h-screen bg-hero-pattern overlay ">
      <Nav account={account} setAccount={setAccount} />
      <section>
        <div className="mt-8 w-full text-center ">
          <h1 className="text-5xl font-bold text-white">NFT Marketplace</h1>
          <p className="text-white mb-5">Buy, Sell and Discover NFTs</p>
          <button
            type="button"
            className="text-md m-auto bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            <span>Let's Get Started</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
