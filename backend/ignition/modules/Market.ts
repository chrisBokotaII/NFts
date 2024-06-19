import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const nftAdress = "0x64a4a958715696c4a28Fd909C3f975D88cf5b3b5";
// const Admin = "0xE8495F857774bB61647f280e0FB87987B3A18e3B";

const MarketModule = buildModule("MarketModulev1_0", (m) => {
  const nft = m.getParameter("_nftAddress", nftAdress);

  const Market = m.contract("Marketplace", [nft]);
  return { Market };
});
export default MarketModule;
//0x95FF24EeE63e160Ab6Fc22AC5074c67C1674882C
