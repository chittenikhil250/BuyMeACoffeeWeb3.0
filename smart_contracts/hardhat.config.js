require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const URL = process.env.GOERLI_URL;

module.exports = {
  solidity: "0.8.4",
  networks:{
    goerli:{
      url: URL,
      accounts: [PRIVATE_KEY]
    }
  }
};

// Contract deployed to: 0xfEFD3e3785DC9Cc0C2cFE98B426785A3123295dd