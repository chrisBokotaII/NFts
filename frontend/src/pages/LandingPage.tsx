import Nav from "../components/Nav";

const LandingPage = () => {
  return (
    <div className="h-screen bg-hero-pattern ">
      <Nav />
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
