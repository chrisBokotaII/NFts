/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers, BrowserProvider, Eip1193Provider } from "ethers";
import { FaShopify, FaWallet } from "react-icons/fa";

declare global {
  interface Window {
    ethereum: Eip1193Provider & BrowserProvider;
  }
}
// @ts-ignore
const Nav = ({ account, setAccount }) => {
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

  return (
    <div>
      <header className="flex flex-col md:flex-row justify-between items-center p-5 text-secondary shadow-bottom bg-transparent">
        <div
          id="logo"
          className="w-full md:w-auto flex justify-center md:justify-start mb-4 md:mb-0"
        >
          <a className="text-lg flex items-center space-x-2" href="/">
            <span>NFT Marketplace</span>
            <FaShopify />
          </a>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-4 w-full md:w-auto">
          <a
            href="/"
            className={
              window.location.pathname === "/"
                ? "underline underline-offset-4 text-blue-500"
                : "text-white"
            }
          >
            Home
          </a>
          <a
            href="/create"
            className={
              window.location.pathname === "/create"
                ? "underline underline-offset-4 text-blue-500"
                : "text-white"
            }
          >
            Create
          </a>
          <a
            href="/dashboard"
            className={
              window.location.pathname === "/dashboard"
                ? "underline underline-offset-4 text-blue-500"
                : "text-white"
            }
          >
            Dashboard
          </a>
          <a
            href="/marketplace"
            className={
              window.location.pathname === "/marketplace"
                ? "underline underline-offset-4 text-blue-500"
                : "text-white"
            }
          >
            Marketplace
          </a>
        </nav>
        <div
          id="profile"
          className="flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0"
        >
          {account ? (
            <button
              type="button"
              disabled
              className="text-sm bg-green-500 text-white font-bold py-2 px-4 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              <span>
                {account.slice(0, 5) + "...." + account.slice(38, 42)}
              </span>{" "}
              <FaWallet />
            </button>
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
