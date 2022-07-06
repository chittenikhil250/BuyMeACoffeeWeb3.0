//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract BuyMeACoffe {

    address payable public me;
    
    event transfer(address from, uint256 amount, uint256 timestamp);

    constructor(){
        me = payable(msg.sender);
    }

    struct transferStruct{
        address from;
        uint amount;
        uint timestamp;
    }

    transferStruct[] transferss;

    function addToBlockchain(uint256 amount) public payable {
        require(msg.value > 0, "can't buy coffe with 0 ether");
        transferss.push(transferStruct(msg.sender, amount, block.timestamp));
        emit transfer(msg.sender, amount, block.timestamp);
    }

    function withdrawTips() public {
        require(me.send(address(this).balance));
    }

}
