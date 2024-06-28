import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { ethers } from "ethers";
// import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  // const navigate = useNavigate();
  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const account = await signer.getAddress();
      const balance = await provider.getBalance(account);
      setBalance(ethers.formatEther(balance));
      setAccount(account);
      window.ethereum.on("accountsChanged", async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const account = await signer.getAddress();
        const balance = await provider.getBalance(account);
        setBalance(ethers.formatEther(balance));
        setAccount(account);

        window.location.reload();
      });
    }
  };
  useEffect(() => {
    connectWallet();
  }, []);
  return (
    <div className="h-screen w-full bg-black ">
      <Nav account={account} setAccount={setAccount} balance={balance} />
      <section className="flex ">
        <div className="flex flex-col gap-3 text-white w-1/2 m-auto">
          <h1 className="text-4xl font-bold px-2 ">
            BUY,SELL & MINT <span className="text-green-500">RARE</span> NFTS
          </h1>
          <p className="text-white w-1/2 text-[0.8rem] p-3 leading-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            corrupti maiores unde delectus ea aspernatur rerum enim rem dolorem.
            Consequuntur praesentium expedita sit accusamus ex laudantium
            excepturi harum officia facere.
          </p>
          <div className="flex gap-3 px-2 ">
            <button
              type="button"
              className="bg-green-500 px-3 py-2 rounded-lg text-[1rem] border"
            >
              Mint Nfts
            </button>
            <button
              type="button"
              className="bg-green-500 px-3 py-2 rounded-lg text-[1rem] border"
            >
              Buy Nfts
            </button>
          </div>
        </div>
        <div className="w-1/2 py-2 animate-flip-horizontal-bottom ">
          <img
            src="./static/images/hm.jpg"
            alt=""
            className="w-[50%] h-[500px]  m-auto object-cover p-4 rounded-sm shadow-xl shadow-green-500 hover:shadow-white "
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
