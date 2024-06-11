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
      <header className="flex justify-between items-center p-5 text-secondary shadow-botoom">
        <div id="logo" className="w-[40%] md:w-[30%]">
          <a className="text-md flex p-3 " href="/">
            NFT Marketplace <FaShopify />
          </a>
        </div>
        <nav className="flex gap-3 w-[50%] md:w-[30%] p-3 *:text-[0.8rem] *:p-3  ">
          <a
            href="/"
            className={
              window.location.href === "/"
                ? "underline underline-offset-4"
                : "text-secondary"
            }
          >
            Home
          </a>
          <a
            href="/create"
            className={
              window.location.href === "/create"
                ? "underline underline-offset-4"
                : "text-secondary"
            }
          >
            Create
          </a>
          <a
            href="/dashboard"
            className={
              window.location.href === "/dashboard"
                ? "underline underline-offset-4"
                : "text-secondary"
            }
          >
            Dashboard
          </a>
          <a
            href="/marketplace"
            className={
              window.location.href === "/marketplace"
                ? "underline underline-offset-4"
                : "text-secondary"
            }
          >
            Marketplace
          </a>
        </nav>
        <div id="profile" className=" p-3 ">
          {account ? (
            <button
              type="button"
              disabled
              className=" text-[0.8rem] bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
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
              className=" text-[0.8rem] bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
            >
              <span>connect your</span> <FaWallet />
            </button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Nav;
