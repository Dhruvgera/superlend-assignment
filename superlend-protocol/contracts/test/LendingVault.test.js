const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("LendingVault", function () {
  let lendingVault;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    // Get signers
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy the contract
    const LendingVault = await ethers.getContractFactory("LendingVault");
    lendingVault = await LendingVault.deploy();
    await lendingVault.waitForDeployment();
  });

  describe("Deposits", function () {
    it("Should allow users to deposit tokens", async function () {
      // User1 deposits 100 tokens
      await lendingVault.connect(user1).deposit(100);
      
      // Check user1's balance
      expect(await lendingVault.getUserDeposit(user1.address)).to.equal(100);
    });

    it("Should emit Deposit event", async function () {
      // Expect the Deposit event with correct parameters
      await expect(lendingVault.connect(user1).deposit(200))
        .to.emit(lendingVault, "Deposit")
        .withArgs(user1.address, 200);
    });

    it("Should fail if deposit amount is 0", async function () {
      // Expect transaction to be reverted with specific message
      await expect(lendingVault.connect(user1).deposit(0))
        .to.be.revertedWith("Deposit amount must be greater than 0");
    });
  });

  describe("Withdrawals", function () {
    beforeEach(async function () {
      // User1 deposits 500 tokens before each test
      await lendingVault.connect(user1).deposit(500);
    });

    it("Should allow users to withdraw tokens", async function () {
      // User1 withdraws 200 tokens
      await lendingVault.connect(user1).withdraw(200);
      
      // Check user1's balance
      expect(await lendingVault.getUserDeposit(user1.address)).to.equal(300);
    });

    it("Should emit Withdraw event", async function () {
      // Expect the Withdraw event with correct parameters
      await expect(lendingVault.connect(user1).withdraw(300))
        .to.emit(lendingVault, "Withdraw")
        .withArgs(user1.address, 300);
    });

    it("Should fail if withdraw amount is 0", async function () {
      // Expect transaction to be reverted with specific message
      await expect(lendingVault.connect(user1).withdraw(0))
        .to.be.revertedWith("Withdraw amount must be greater than 0");
    });

    it("Should fail if user has insufficient balance", async function () {
      // Expect transaction to be reverted with specific message
      await expect(lendingVault.connect(user1).withdraw(600))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  describe("getUserDeposit", function () {
    it("Should return 0 for users with no deposits", async function () {
      // Check balance of a user who hasn't deposited
      expect(await lendingVault.getUserDeposit(user2.address)).to.equal(0);
    });

    it("Should return correct balance for users with deposits", async function () {
      // User1 deposits 750 tokens
      await lendingVault.connect(user1).deposit(750);
      
      // Check user1's balance
      expect(await lendingVault.getUserDeposit(user1.address)).to.equal(750);
    });
  });
}); 