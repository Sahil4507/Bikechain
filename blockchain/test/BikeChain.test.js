import { expect } from "chai";
import hre from "hardhat";
const { ethers } = hre;

describe("BikeChain Smart Contract", function () {
  let bikeChain;
  let admin, dealer, workshop, owner1, owner2, unauthorized;

  const sampleBikeId = "BC-0001";
  const sampleVinHash = ethers.keccak256(ethers.toUtf8Bytes("ME3GR450***9821"));
  const sampleInvoiceHash = ethers.keccak256(ethers.toUtf8Bytes("Apex Service Invoice #01"));
  const alteredInvoiceHash = ethers.keccak256(ethers.toUtf8Bytes("Altered Service Invoice #01"));
  const productionYear = 2026;

  beforeEach(async function () {
    [admin, dealer, workshop, owner1, owner2, unauthorized] = await ethers.getSigners();

    const BikeChainFactory = await ethers.getContractFactory("BikeChain");
    bikeChain = await BikeChainFactory.deploy();
    await bikeChain.waitForDeployment();

    // Grant roles to test actors
    const DEALER_ROLE = await bikeChain.DEALER_ROLE();
    const WORKSHOP_ROLE = await bikeChain.WORKSHOP_ROLE();

    await bikeChain.connect(admin).grantRole(DEALER_ROLE, dealer.address);
    await bikeChain.connect(admin).grantRole(WORKSHOP_ROLE, workshop.address);
  });

  describe("1. Deployment & Roles", function () {
    it("Should set deployer as default admin", async function () {
      const DEFAULT_ADMIN_ROLE = await bikeChain.DEFAULT_ADMIN_ROLE();
      expect(await bikeChain.hasRole(DEFAULT_ADMIN_ROLE, admin.address)).to.be.true;
    });

    it("Should grant dealer and workshop roles correctly", async function () {
      const DEALER_ROLE = await bikeChain.DEALER_ROLE();
      const WORKSHOP_ROLE = await bikeChain.WORKSHOP_ROLE();

      expect(await bikeChain.hasRole(DEALER_ROLE, dealer.address)).to.be.true;
      expect(await bikeChain.hasRole(WORKSHOP_ROLE, workshop.address)).to.be.true;
      expect(await bikeChain.hasRole(DEALER_ROLE, unauthorized.address)).to.be.false;
    });
  });

  describe("2. Motorcycle Registration", function () {
    it("Should allow an authorized dealer to register a motorcycle", async function () {
      await expect(
        bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear)
      )
        .to.emit(bikeChain, "BikeRegistered")
        .withArgs(sampleBikeId, sampleVinHash, owner1.address, productionYear, dealer.address);

      const record = await bikeChain.getBikeRecord(sampleBikeId);
      expect(record.id).to.equal(sampleBikeId);
      expect(record.vinHash).to.equal(sampleVinHash);
      expect(record.currentOwner).to.equal(owner1.address);
      expect(record.productionYear).to.equal(productionYear);
      expect(record.currentOdometer).to.equal(0n);
      expect(record.isRegistered).to.be.true;
      expect(record.transferCount).to.equal(1n);
    });

    it("Should revert if an unauthorized account tries to register a bike", async function () {
      await expect(
        bikeChain.connect(unauthorized).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear)
      ).to.be.revertedWithCustomError(bikeChain, "AccessControlUnauthorizedAccount");
    });

    it("Should prevent registering the same bikeId twice", async function () {
      await bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear);
      await expect(
        bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear)
      ).to.be.revertedWith("BikeChain: bike already registered");
    });
  });

  describe("3. Ownership Transfers", function () {
    beforeEach(async function () {
      await bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear);
    });

    it("Should allow the current owner to transfer title", async function () {
      await expect(
        bikeChain.connect(owner1).transferOwnership(sampleBikeId, owner2.address, 1500)
      ).to.emit(bikeChain, "OwnershipTransferred");

      const record = await bikeChain.getBikeRecord(sampleBikeId);
      expect(record.currentOwner).to.equal(owner2.address);
      expect(record.currentOdometer).to.equal(1500n);
      expect(record.transferCount).to.equal(2n);
    });

    it("Should revert if someone other than the current owner attempts transfer", async function () {
      await expect(
        bikeChain.connect(unauthorized).transferOwnership(sampleBikeId, owner2.address, 1500)
      ).to.be.revertedWith("BikeChain: caller is not current owner");
    });

    it("Should reject odometer rollback during ownership transfer", async function () {
      // First transfer at 2000 km
      await bikeChain.connect(owner1).transferOwnership(sampleBikeId, owner2.address, 2000);

      // Attempt second transfer at lower odometer (1800 km)
      await expect(
        bikeChain.connect(owner2).transferOwnership(sampleBikeId, owner1.address, 1800)
      ).to.be.revertedWith("BikeChain: odometer rollback rejected");
    });
  });

  describe("4. Service Records & Odometer Integrity", function () {
    beforeEach(async function () {
      await bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear);
    });

    it("Should allow an authorized workshop to log maintenance", async function () {
      await expect(
        bikeChain.connect(workshop).addServiceRecord(sampleBikeId, 500, sampleInvoiceHash, "Apex Speedworks Workshop")
      ).to.emit(bikeChain, "ServiceRecordAdded");

      const record = await bikeChain.getBikeRecord(sampleBikeId);
      expect(record.currentOdometer).to.equal(500n);
      expect(record.serviceCount).to.equal(1n);
    });

    it("Should revert if an unauthorized account attempts to log maintenance", async function () {
      await expect(
        bikeChain.connect(owner1).addServiceRecord(sampleBikeId, 500, sampleInvoiceHash, "Fraudulent Workshop")
      ).to.be.revertedWithCustomError(bikeChain, "AccessControlUnauthorizedAccount");
    });

    it("Should reject odometer rollback when adding service records", async function () {
      await bikeChain.connect(workshop).addServiceRecord(sampleBikeId, 5000, sampleInvoiceHash, "Apex Speedworks");

      // Attempt to log lower odometer
      await expect(
        bikeChain.connect(workshop).addServiceRecord(sampleBikeId, 4500, sampleInvoiceHash, "Apex Speedworks")
      ).to.be.revertedWith("BikeChain: odometer rollback rejected");
    });
  });

  describe("5. SHA-256 Document Verification", function () {
    beforeEach(async function () {
      await bikeChain.connect(dealer).registerBike(sampleBikeId, sampleVinHash, owner1.address, productionYear);
      await bikeChain.connect(workshop).addServiceRecord(sampleBikeId, 500, sampleInvoiceHash, "Apex Speedworks");
    });

    it("Should verify and return isMatch=true for matching document hash", async function () {
      const result = await bikeChain.verifyDocumentHash(sampleBikeId, sampleInvoiceHash);
      expect(result.isMatch).to.be.true;
      expect(result.recordIndex).to.equal(0n);
    });

    it("Should return isMatch=false for an altered/different document hash", async function () {
      const result = await bikeChain.verifyDocumentHash(sampleBikeId, alteredInvoiceHash);
      expect(result.isMatch).to.be.false;
    });
  });
});
