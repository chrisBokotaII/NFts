import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { ethers } from "ethers";
import { data } from "../data";
import Card from "../components/Card";

const Display = () => {
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
  const renderCards = () => {
    return data
      .slice(0, 6)
      .map((item, index) => (
        <Card
          key={index}
          id={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
        />
      ));
  };

  return (
    <div className="h-fit bg-hero-pattern text-secondary overlay">
      <Nav account={account} setAccount={setAccount} />
      <h1 className="text-3xl font-bold text-white text-center underline">
        Marketplace
      </h1>
      <div className="px-4 py-4 grid-cols-4 grid gap-5 mt-5 ">
        {renderCards()}
      </div>
    </div>
  );
};

export default Display;
