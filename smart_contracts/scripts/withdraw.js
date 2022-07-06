const hre = require('hardhat');
const abi = require('../artifacts/contracts/BuyMeACoffe.sol/BuyMeACoffe.json');

const getBalance = async(provider, address) =>{
    const balanceBigInt = await provider.getBalance(address);
    return hre.ethers.utils.formatEther(balanceBigInt);
}

