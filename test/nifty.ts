import { ethers } from "hardhat"
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import { Nifty__factory, Nifty } from "../typechain"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

chai.use(chaiAsPromised)
const { expect } = chai

describe("Nifty", () => {
  let contract: Nifty
  let deployer: SignerWithAddress
  let other1: SignerWithAddress

  beforeEach(async () => {
    // 1 - getting the wallet addresses for testing
    const signers = await ethers.getSigners()

    const [d, o1, other2, ...others] = signers

    deployer = d
    other1 = o1

    // 2
    const contractFactory = (await ethers.getContractFactory(
      "Nifty",
      deployer
    )) as Nifty__factory
    contract = await contractFactory.deploy(0)
    await contract.deployed()

    // 3
    expect(contract.address).to.properAddress
  })

  describe("minting", async () => {
    it("should mint one token", async () => {
      const balance0 = await contract.balanceOf(deployer.address)
      expect(balance0).to.eq(0)

      await contract.mintOne()

      const balance1 = await contract.balanceOf(deployer.address)

      console.log("balance", balance1)

      expect(balance1).to.eq(1)
    })

    it("should mint many tokens", async () => {
      const balance0 = await contract.balanceOf(deployer.address)
      expect(balance0).to.eq(0)

      await contract.mintMany(2)

      const balance1 = await contract.balanceOf(deployer.address)

      console.log("balance", balance1)

      expect(balance1).to.eq(2)
    })

    it("shouldn't more than max number", async () => {
      // await contract.mintMany(11)

      const contractFactory = (await ethers.getContractFactory(
        "Nifty",
        deployer
      )) as Nifty__factory
      const contract990 = await contractFactory.deploy(990)
      await contract990.deployed()

      await expect(contract990.mintMany(11)).to.be.revertedWith(
        "Max number reached."
      )
    })
  })

  describe("payments", async () => {
    //

    it("should SUCCESSFULLY mint when the full amount is paid for 1", async () => {
      const balanceBefore = await contract.balanceOf(deployer.address)
      // const totalSupply = await contract.totalSupply()

      console.log("balanceBefore", balanceBefore)

      await contract.payToMint(1, {
        value: ethers.utils.parseEther("0.01"),
      })

      const balanceAfter = await contract.balanceOf(deployer.address)
      console.log("balanceAfter", balanceAfter)

      expect(balanceAfter.toNumber()).to.eq(balanceBefore.toNumber() + 1)
    })

    it("should FAIL to mint when the full amount is not paid", async () => {
      await expect(
        contract.payToMint(1, {
          value: ethers.utils.parseEther("0.001"),
        })
      ).to.be.revertedWith("Not enough ETH")

      await expect(contract.payToMint(1)).to.be.revertedWith("Not enough ETH")
    })

    it("should SUCCESSFULLY mint when the full amount is paid for 10", async () => {
      const balanceBefore = await contract.balanceOf(deployer.address)
      // const totalSupply = await contract.totalSupply()

      console.log("balanceBefore", balanceBefore)

      await contract.payToMint(10, {
        value: ethers.utils.parseEther("0.1"),
      })

      const balanceAfter = await contract.balanceOf(deployer.address)
      console.log("balanceAfter", balanceAfter)

      expect(balanceAfter.toNumber()).to.eq(balanceBefore.toNumber() + 10)
    })
  })
})
