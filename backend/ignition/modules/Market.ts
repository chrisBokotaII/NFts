import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
const nftAdress = "0xb0B940CA4327F49f436d37c7FE5111f695613d6d";
const Admin = "0xE8495F857774bB61647f280e0FB87987B3A18e3B";

const MarketModule = buildModule("MarketModulev1", (m) => {
  const AdminAdress = m.getParameter("_admin", Admin);
  const nft = m.getParameter("_nftAddress", nftAdress);

  const Market = m.contract("Marketplace", [AdminAdress, nft]);
  return { Market };
});
export default MarketModule;
//0xC469e7aE4aD962c30c7111dc580B4adbc7E914DD
