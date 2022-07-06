const hre = require("hardhat");

const main= async() => {

  const BuyMeACoffe = await hre.ethers.getContractFactory("BuyMeACoffe");
  const buyMeACoffee = await BuyMeACoffe.deploy();

  await buyMeACoffee.deployed();

  console.log("Contract deployed to:", buyMeACoffee.address);
}

const run = async() => {
  try{
    await main();
    process.exit(0);
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

run();