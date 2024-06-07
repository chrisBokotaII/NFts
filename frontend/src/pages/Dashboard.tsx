import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Table from "../components/Table";
import { ethers } from "ethers";

const Dashboard = () => {
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
  }, [account]);
  return (
    <div className="bg-black h-screen">
      <Nav account={account} setAccount={setAccount} />
      <h1 className="text-3xl font-bold text-white text-center">Dashboard</h1>
      <Table />
    </div>
  );
};

export default Dashboard;
