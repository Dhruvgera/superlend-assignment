# SuperLend Protocol

A simple DeFi lending protocol simulation consisting of a backend API and a smart contract.

## Overview

This project implements a minimal DeFi lending protocol with:

1. **Backend API** - A NestJS-based REST API that provides user lending stats
2. **Smart Contract** - A Solidity contract that simulates a basic lending vault

## Backend API

The backend API provides endpoints to retrieve user lending statistics.

### Setup and Installation

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The API will be available at http://localhost:3000

### API Endpoints

#### GET /user-stats/address

Returns lending statistics for a specific Ethereum address.

Addresses which can be used as mock-data: 0x1234567890123456789012345678901234567890 or 0xabcdef0123456789abcdef0123456789abcdef01

Response includes:
- Total supplied assets and their USD value
- Total borrowed assets and their USD value
- Health factor
- Net APY

Example Response:
```json
{
  "address": "0x1234567890123456789012345678901234567890",
  "suppliedAssets": [
    { "symbol": "ETH", "amount": 2.5, "usdValue": 5000 },
    { "symbol": "USDC", "amount": 1000, "usdValue": 1000 }
  ],
  "borrowedAssets": [
    { "symbol": "DAI", "amount": 2000, "usdValue": 2000 }
  ],
  "healthFactor": 2.5,
  "netApy": 0.025,
  "totalSuppliedUsd": 6000,
  "totalBorrowedUsd": 2000
}
```

### Implementation Details

The API currently uses mock data for demonstration purposes. In a production environment, it could integrate with actual protocols like Aave using their SDKs, GraphQL subgraphs, or direct contract calls.

## Smart Contract

A minimal Solidity contract that implements a basic lending vault functionality.

### Setup and Installation

```bash
# Navigate to the contracts directory
cd contracts

# Install dependencies
npm install

# Compile the contract
npx hardhat compile
```

### Deployment

```bash
# Deploy to a local Hardhat network
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

### Contract Features

- `deposit(uint256 amount)`: Allows users to deposit tokens into the vault
- `withdraw(uint256 amount)`: Allows users to withdraw tokens from the vault
- `getUserDeposit(address user)`: Returns the total deposit for a specific user
- Events are emitted on deposit and withdrawal operations

### Testing

```bash
# Run the test suite
npx hardhat test
```

## Architecture Decisions

1. **Backend API**
   - Used NestJS for its module structure and dependency injection
   - Implemented clean separation of concerns with DTOs, interfaces, services, and controllers
   - Added validation for Ethereum addresses
   - Designed for easy integration with real DeFi protocols

2. **Smart Contract**
   - Used Hardhat for development environment
   - Implemented minimal required functionality (deposit, withdraw, balance check)
   - Added events for better tracking and transparency
   - Included proper validation and error handling

## Future Improvements

1. **Backend API**
   - Integrate with real DeFi protocols using SDKs or subgraphs
   - Add caching layer for better performance
   - Implement more comprehensive error handling
   - Add user history tracking

2. **Smart Contract**
   - Integrate with ERC20 tokens for real token deposits
   - Add interest accrual functionality
   - Implement borrow/repay operations
   - Add liquidation mechanisms
