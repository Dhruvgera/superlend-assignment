const { expect } = require("chai");
const { ethers } = require("hardhat");

// Tests for our basic lending vault contract
describe("LendingVault", function () {
  // These will be populated in beforeEach
  let lendingVault;
  let owner;
  let user1;
  let user2;
  // For tracking test balances
  let initialBalance = 500;

  beforeEach(async function () {
    // Get test accounts
    [owner, user1, user2] = await ethers.getSigners();

    // Deploy a fresh contract before each test
    const LendingVault = await ethers.getContractFactory("LendingVault");
    lendingVault = await LendingVault.deploy();
    await lendingVault.waitForDeployment();

    // For debugging - uncomment if needed
    // console.log("Deployed to:", await lendingVault.getAddress());
  });

  // Test basic deposit functionality
  describe("Deposits", function () {
    it("lets a user deposit tokens", async function () {
      // Try a basic deposit with user1
      const tx = await lendingVault.connect(user1).deposit(100);
      await tx.wait(); // wait for tx to be mined
      
      // Make sure their balance updated correctly
      const balance = await lendingVault.getUserDeposit(user1.address);
      expect(balance).to.equal(100);
    });

    it("emits the Deposit event", async function () {
      // Here we use a different style of testing the event
      const depositAmount = 200;
      await expect(lendingVault.connect(user1).deposit(depositAmount))
        .to.emit(lendingVault, "Deposit")
        .withArgs(user1.address, depositAmount);
    });

    it("reverts if amount is zero", async function () {
      // Nobody should be able to deposit zero
      await expect(lendingVault.connect(user1).deposit(0))
        .to.be.revertedWith("Deposit amount must be greater than 0");
    });
  });

  // Test withdrawals
  describe("Withdrawals", function () {
    // Before each withdrawal test, let's fund the user
    beforeEach(async function () {
      // Give user1 some tokens to play with
      await lendingVault.connect(user1).deposit(initialBalance);
    });

    it("Should allow users to withdraw tokens", async function () {
      // User1 withdraws 200 tokens
      await lendingVault.connect(user1).withdraw(200);
      
      // Should have the remaining amount left
      const expectedRemaining = initialBalance - 200;
      expect(await lendingVault.getUserDeposit(user1.address)).to.equal(expectedRemaining);
    });

    it("Should emit Withdraw event", async function () {
      // Expect the Withdraw event with correct parameters
      await expect(lendingVault.connect(user1).withdraw(300))
        .to.emit(lendingVault, "Withdraw")
        .withArgs(user1.address, 300);
    });

    it("fails if trying to withdraw 0", async function () {
      // Test that validation works for zero withdrawals
      await expect(lendingVault.connect(user1).withdraw(0))
        .to.be.revertedWith("Withdraw amount must be greater than 0");
    });

    it("Should fail if user has insufficient balance", async function () {
      // Expect transaction to be reverted with specific message
      await expect(lendingVault.connect(user1).withdraw(600))
        .to.be.revertedWith("Insufficient balance");
    });
  });

  // Test balance checking function
  describe("getUserDeposit function", function () {
    it("returns 0 for new users", async function () {
      // User2 hasn't deposited anything yet
      const balance = await lendingVault.getUserDeposit(user2.address);
      expect(balance).to.equal(0);
    });

    it("Should return correct balance for users with deposits", async function () {
      // User1 deposits 750 tokens
      await lendingVault.connect(user1).deposit(750);
      
      const balance = await lendingVault.getUserDeposit(user1.address);
      expect(balance).to.equal(750);
    });
  });
}); 