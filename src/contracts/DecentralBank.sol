pragma solidity ^0.5.0;

import "./Kiri.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Kiri public rwd;

    constructor(Kiri _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
    }
}
