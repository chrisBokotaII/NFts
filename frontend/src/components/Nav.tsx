/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers, BrowserProvider, Eip1193Provider } from "ethers";
import { FaEthereum, FaShopify, FaWallet } from "react-icons/fa";
import { jsNumberForAddress } from "react-jazzicon";
import Jazzicon from "react-jazzicon/dist/Jazzicon";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}
// @ts-ignore
const Nav = ({ account, setAccount, balance }) => {
  const connectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      setAccount(account);
    }
  };
  const disconectWallet = async () => {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("wallet_revokePermissions", [account]);
      window.location.reload();
    }
  };
  return (
    <div className="border-b border-green-500">
      <header className="flex flex-col md:flex-row justify-between items-center p-5 text-secondary shadow-bottom bg-transparent">
        <nav className="flex flex-wrap   w-1/2 items-center gap-6">
          <a
            className="text-[1rem] flex items-center space-x-2 font-bold"
            href="/"
          >
            <span className="text-green-500">NFT</span>
            <FaShopify />
          </a>
          <div className="flex gap-3 ml-4">
            <a
              href="/"
              className={
                window.location.pathname === "/"
                  ? "border-b-2  text-white text-[0.7rem] flex items-center space-x-2 font-bold"
                  : "text-green-500 text-[0.7rem] flex items-center space-x-2 font-bold"
              }
            >
              Home
            </a>
            <a
              href="/create"
              className={
                window.location.pathname === "/create"
                  ? "border-b-2  text-white text-[0.7rem] flex items-center space-x-2 font-bold"
                  : "text-green-500 text-[0.7rem] flex items-center space-x-2 font-bold"
              }
            >
              Create
            </a>
            <a
              href="/dashboard"
              className={
                window.location.pathname === "/dashboard"
                  ? "border-b-2  text-white text-[0.7rem] flex items-center space-x-2 font-bold"
                  : "text-green-500 text-[0.7rem] flex items-center space-x-2 font-bold"
              }
            >
              Dashboard
            </a>
            <a
              href="/marketplace"
              className={
                window.location.pathname === "/marketplace"
                  ? "border-b-2  text-white text-[0.7rem] flex items-center space-x-2 font-bold"
                  : "text-green-500 text-[0.7rem] flex items-center space-x-2 font-bold"
              }
            >
              Marketplace
            </a>
          </div>
        </nav>
        <div
          id="profile"
          className="flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0"
        >
          {account ? (
            <div className="flex items-center gap-4">
              <Jazzicon diameter={30} seed={jsNumberForAddress(account)} />
              <span className="text-[0.7rem]">
                {account.slice(0, 5) + "...." + account.slice(38, 42)}
              </span>
              <div className="text-[0.7rem] flex items-center space-x-2 bg-green-500 px-2 py-1 rounded">
                <span>{balance.slice(0, 5)}</span> <FaEthereum />
              </div>
              <button
                type="button"
                onClick={disconectWallet}
                className="text-sm bg-red-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-red-600 transition-all duration-300 ease-in-out"
              >
                <span>Disconnect Wallet</span> <FaWallet />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={connectWallet}
              className="text-sm bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              <span>Connect Wallet</span> <FaWallet />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Nav;
