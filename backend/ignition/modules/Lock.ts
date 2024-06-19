import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("CollectionsModulev3", (m) => {
  const lock = m.contract("Collections");

  return { lock };
});

export default LockModule;
