// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LendingVault
 * @dev A minimal smart contract that allows users to deposit and withdraw tokens
 */
contract LendingVault {
    // Mapping from user address to deposit amount
    mapping(address => uint256) private userDeposits;
    
    // Event emitted when a user deposits tokens
    event Deposit(address indexed user, uint256 amount);
    
    // Event emitted when a user withdraws tokens
    event Withdraw(address indexed user, uint256 amount);

    /**
     * @dev Deposit tokens into the vault
     * @param amount The amount of tokens to deposit
     */
    function deposit(uint256 amount) external {
        require(amount > 0, "Deposit amount must be greater than 0");
        
        userDeposits[msg.sender] += amount;
        
        emit Deposit(msg.sender, amount);
    }
    
    /**
     * @dev Withdraw tokens from the vault
     * @param amount The amount of tokens to withdraw
     */
    function withdraw(uint256 amount) external {
        require(amount > 0, "Withdraw amount must be greater than 0");
        require(userDeposits[msg.sender] >= amount, "Insufficient balance");
        
        userDeposits[msg.sender] -= amount;
        
        emit Withdraw(msg.sender, amount);
    }
    
    /**
     * @dev Get the deposit amount for a specific user
     * @param user The address of the user
     * @return The user's deposit amount
     */
    function getUserDeposit(address user) external view returns (uint256) {
        return userDeposits[user];
    }
} 