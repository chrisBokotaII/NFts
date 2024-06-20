import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const nftAdress = "0x3718fceCc4eff85dCe3Be74aE39FAfA325ffF115";
// const Admin = "0xE8495F857774bB61647f280e0FB87987B3A18e3B";

const MarketModule = buildModule("MarketModulev1_0", (m) => {
  const nft = m.getParameter("_nftAddress", nftAdress);

  const Market = m.contract("Marketplace", [nft]);
  return { Market };
});
export default MarketModule;
//0x75E1B7A615e9ad48530C6f7EF6DC0C24936072Fa
