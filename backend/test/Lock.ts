import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";
const converter = (n: string): bigint => {
  return hre.ethers.parseEther(n);
};

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  async function deployOneYearLockFixture() {
    // Contracts are deployed using the first signer/account by default
    const [seller, admin, buyer] = await hre.ethers.getSigners();

    const Lock = await hre.ethers.getContractFactory("Collections");
    const lock = await Lock.deploy(seller.address);
    await lock.waitForDeployment();

    const Market = await hre.ethers.getContractFactory("Marketplace");
    const market = await Market.deploy(lock.target, admin.address);

    return { lock, seller, admin, buyer, market };
  }

  describe("Deployment", function () {
    it("should set the right address", async function () {
      const { lock, seller, admin, market } = await loadFixture(
        deployOneYearLockFixture
      );
      expect(await lock.owner()).to.equal(seller.address);
      expect(await market.admin()).to.equal(admin.address);
      expect(await market.nftAddress()).to.equal(lock.target);
    });
    it("should mint", async function () {
      const { lock, seller, admin, market, buyer } = await loadFixture(
        deployOneYearLockFixture
      );
      const tx1 = await lock
        .connect(seller)
        .safeMint(seller.address, "ipfs://");
      // const tx2 = await lock
      //   .connect(seller)
      //   .safeMint(seller.address, "ipfs://");
      const getTokens = await lock.getBalanceOf(seller.address);
      console.log(getTokens);

      expect(await lock.balanceOf(seller.address)).to.equal(1);
      expect(await lock.ownerOf(0)).to.equal(seller.address);

      // expect(await lock.ownerOf(1)).to.equal(seller.address);
      const tx3 = await lock.connect(seller).approve(market.target, 0);
      // const tx4 = await lock.connect(seller).approve(market.target, 1);
      const tx5 = await market.connect(seller).listNFT(0, converter("1"));
      // const tx6 = await market.connect(seller).listNFT(1, converter("1"));

      const getTokens2 = await lock.getBalanceOf(market.target);

      expect(await lock.balanceOf(seller.address)).to.equal(0);
      expect(await lock.ownerOf(0)).to.equal(market.target);
      // expect(await lock.ownerOf(1)).to.equal(market.target);
      expect(await lock.balanceOf(seller.address)).to.equal(0);
      expect(await lock.balanceOf(market.target)).to.equal(1);

      const tx7 = await market
        .connect(buyer)
        .buyNFT(0, { value: converter("1") });
      // const tx8 = await market
      //   .connect(buyer)
      //   .buyNFT(1, { value: converter("1") });
      const tx11 = await market.nfts(0);
      // const tx12 = await market.getNFT(1);
      const tx13 = await market.id();

      expect(await lock.balanceOf(seller.address)).to.equal(0);
      // expect(await hre.ethers.provider.getBalance(seller.address)).to.equal(
      //   hre.ethers.parseEther("1")
      // );

      expect(await lock.ownerOf(0)).to.equal(buyer.address);
      // expect(await lock.ownerOf(1)).to.equal(buyer.address);
      expect(await lock.balanceOf(seller.address)).to.equal(0);
      expect(await lock.balanceOf(market.target)).to.equal(0);
      expect(await lock.balanceOf(buyer.address)).to.equal(1);

      const tx14 = await lock.connect(buyer).approve(market.target, 0);
      // const tx15 = await lock.connect(buyer).approve(market.target, 1);
      const tx16 = await market.connect(buyer).listNFT(0, converter("3"));
      // const tx17 = await market.connect(buyer).listNFT(1, converter("1"));
      const getTokens3 = await lock.getBalanceOf(market.target);

      console.log(await market.getListedNFTs());

      expect(await lock.balanceOf(buyer.address)).to.equal(0);
      expect(await lock.ownerOf(0)).to.equal(market.target);
      // expect(await lock.ownerOf(1)).to.equal(market.target);
      expect(await lock.balanceOf(buyer.address)).to.equal(0);
      expect(await lock.balanceOf(market.target)).to.equal(1);

      const tx17 = await market
        .connect(seller)
        .buyNFT(1, { value: converter("3") });
      // expect(await hre.ethers.provider.getBalance(buyer.address)).to.equal(
      //   hre.ethers.parseEther("1")
      // );
      console.log(await market.getListedNFTs());
    });
  });
});
