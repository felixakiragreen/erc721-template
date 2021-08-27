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

  beforeEach(async () => {
    // 1 - getting the wallet addresses for testing
    const signers = await ethers.getSigners()

    const [dep, other1, other2, ...others] = signers

    deployer = dep

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

  describe("promo minting", async () => {
    // 1. make sure checking promocode
    // 2. make sure reverting promo limit
    // 3. make sure promo uses is incrementing
  })
})
