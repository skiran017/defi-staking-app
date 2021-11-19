pragma solidity ^0.5.0;

import "./Kiri.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Kiri public rwd;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Kiri _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    //staking function
    function depositTokens(uint256 _amount) public {
        //requirere staking amount to be greater than zero
        require(_amount > 0, "amount cannot be 0");

        //transfer tether tokens to this contract address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking balance
        isStaking[msg.sender] = true;
        hasStaked[msg.sender] = true;
    }
}
