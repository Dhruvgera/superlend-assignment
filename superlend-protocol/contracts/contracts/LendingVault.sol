// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LendingVault
 * @dev A minimal lending vault for the SuperLend protocol
 * @notice This is a simplified implementation without actual tokens
 * @author Dhruv Gera
 */
contract LendingVault {
    // Track how much each user has deposited
    mapping(address => uint256) private userDeposits;
    
    // Events
    event Deposit(address indexed user, uint256 amount);
    event Withdraw(address indexed user, uint256 amount);

    // Some statistics
    uint256 public totalDeposited; // track total deposits across all users
    
    // Constructor - nothing needed for now
    constructor() {
        // can add owner/admin logic
    }

    /**
     * @dev Let a user deposit tokens into the vault
     * @param amount How many tokens to deposit
     */
    function deposit(uint256 amount) external {
        // Make sure they're actually depositing something
        require(amount > 0, "Deposit amount must be greater than 0");
        
        // Update the user's balance
        userDeposits[msg.sender] += amount;
        
        // Update stats
        totalDeposited += amount;
        
        // Let the world know
        emit Deposit(msg.sender, amount);
    }
    
    /**
     * @dev Allows a user to withdraw their tokens 
     * @param amount Amount to withdraw
     */
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(userDeposits[msg.sender] >= amount, "Insufficient balance");
        
        // Update balances
        userDeposits[msg.sender] -= amount;
        totalDeposited -= amount;
        
        emit Withdraw(msg.sender, amount);
    }
    
    /**
     * @dev Check how much a user has deposited
     * @param user Address to check
     */
    function getUserDeposit(address user) external view returns (uint256) {
        return userDeposits[user];
    }

    // Future scope:
    // - borrow()
    // - repay()
    // - liquidate()
} 