// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Chai {

    struct Memo{
        string  name;
        string message;
        uint timestamp;
        address from;

    }
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }
    Memo [] memo;

    function buyChai(string memory name , string memory message) external payable {
        require(msg.value > 1,'Pay more than 1 ether');
        owner.transfer(msg.value);
        memo.push(Memo(name,message,block.timestamp,msg.sender));


    }

    function getMemos() external view returns(Memo[] memory){

     return memo;
    }
}