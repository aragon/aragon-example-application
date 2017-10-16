pragma solidity ^0.4.0;

import "./IKernel.sol";

contract AppStorage {
    IKernel public kernel;
    bytes32 public appId;
}