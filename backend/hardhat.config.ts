import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
  networks: {
    hardhatMetamask: {
      url: "http://localhost:8545",
      accounts: [process.env.PK as string],
      chainId: 31337,
    },
    ganache: {
      url: process.env.GANACHE_URL,
      accounts: [process.env.PRIVATE_KEY as string],
    },
    sepolia: {
      url: process.env.API_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  paths: {
    artifacts: "../frontend/src/artifacts",
  },
};

export default config;
