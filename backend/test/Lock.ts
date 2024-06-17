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
    const lock = await Lock.deploy();
    await lock.waitForDeployment();

    const Market = await hre.ethers.getContractFactory("Marketplace");
    const market = await Market.deploy(lock.target, admin.address);

    return { lock, seller, admin, buyer, market };
  }

  describe("Deployment", function () {
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
      const approved = await lock.connect(seller).approve(market.target, 0);
      await approved.wait();
      await tx1.wait();
      const tx2 = await market.connect(seller).listNFT(0, 1);

      await tx2.wait();
      const tx3 = await market
        .connect(buyer)
        .buyNFT(0, { value: converter("1") });
      await tx3.wait();
      expect(tx2).to.not.revertedWith;
      expect(tx3).to.not.revertedWith;
    });
  });
});
