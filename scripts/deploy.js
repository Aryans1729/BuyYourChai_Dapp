// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners(); //signers provide us with test accounts on hardhat
  const chai = await hre.ethers.getContractFactory("Chai"); //used to deploy our contract
  const Contract = await chai.deploy();

  await Contract.deployed();
  console.log("Address of Contract", Contract.address);

  const addresses = [
    owner.address,
    from1.address,
    from2.address,
    from3.address,
  ];
  console.log("Before Buying Chai");
  await Balances(addresses);

  const Amount = { value: hre.ethers.utils.parseEther("1") };
  await Contract.connect(from1).buyChai("from1", "Large Cafe Mocha", Amount);
  await Contract.connect(from2).buyChai(
    "from2",
    "Double DOuble Frappuccino",
    Amount
  );
  await Contract.connect(from3).buyChai("from1", "Small Latte", Amount);
  console.log("After Buying Chai");
  await Balances(addresses);

  const Memos = await Contract.getMemos();
  consoleMemos(Memos);
}

const getBalance = async (address) => {
  const balance = await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balance); // in ethers
};

const Balances = async (addresses) => {
  let counter = 0;
  for (const address of addresses) {
    console.log(`Address ${counter} balance:`, await getBalance(address));
    counter++;
  }
};

const consoleMemos = async (memos) => {
  for (const memo of memos) {
    const name = memo.name;
    const timestamp = memo.timestamp;
    const message = memo.message;
    const from = memo.from;
    console.log(
      `At  time ${timestamp} , name ${name} , address ${from} , has placed an order of ${message} , `
    );
  }
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
