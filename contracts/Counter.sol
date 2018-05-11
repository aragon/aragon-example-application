pragma solidity ^0.4.4;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract Counter is AragonApp {
    // Events
    event Increment(address entity);
    event Decrement(address entity);

    // State
    int public value;

    // Roles
    bytes32 constant public INCREMENT_ROLE = keccak256("INCREMENT_ROLE");
    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");
    
    /**
     * @notice Increment the counter by 1
     */
    function increment() auth(INCREMENT_ROLE) external {
        value += 1;
        Increment(msg.sender);
    }

    /**
     * @notice Decrement the counter by 1
     */
    function decrement() auth(DECREMENT_ROLE) external {
        value -= 1;
        Decrement(msg.sender);
    }
}
