const hre = require("hardhat");

async function main() {
  const chai = await hre.ethers.getContractFactory("Chai"); //used to deploy our contract
  const Contract = await chai.deploy();

  await Contract.deployed();
  console.log("Address of Contract", Contract.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
