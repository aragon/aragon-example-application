pragma solidity ^0.4.0;

import "./aragon/App.sol";

contract Counter is App {
    /// Events
    event Increment(uint indexed blockNumber);
    event Decrement(uint indexed blockNumber);

    /// State
    int public value;

    /// ACL
    bytes32 constant public INCREMENT_ROLE = bytes32(1);
    bytes32 constant public DECREMENT_ROLE = bytes32(2);
    
    function increment() auth(INCREMENT_ROLE) external {
        value += 1;
        Increment(block.number);
    }

    function decrement() auth(DECREMENT_ROLE) external {
        value -= 1;
        Decrement(block.number);
    }
}
