import { FaShopify, FaWallet } from "react-icons/fa";

const Nav = () => {
  return (
    <div>
      <header className="flex justify-between items-center p-5 text-secondary shadow-botoom">
        <div id="logo" className="w-[40%] md:w-[30%]">
          <a className="text-md flex p-3 " href="/">
            NFT Marketplace <FaShopify />
          </a>
        </div>
        <nav className="flex gap-3 w-[50%] md:w-[30%] p-3 *:text-[0.8rem] *:p-3  ">
          <a href="/collections">Collections</a>
          <a href="collections/create">Create</a>
          <a href="collections/dashboard">Dashboard</a>
        </nav>
        <div id="profile" className=" p-3 ">
          <button
            type="button"
            className=" text-[0.8rem] bg-green-500 text-white font-bold py-2 px-6 rounded flex items-center gap-2 hover:bg-green-600 transition-all duration-300 ease-in-out"
          >
            <span>connect your</span> <FaWallet />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Nav;
