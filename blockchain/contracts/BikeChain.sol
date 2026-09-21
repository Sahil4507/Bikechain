// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title BikeChain
 * @notice Tamper-resistant digital motorcycle history and document integrity ledger.
 * @dev Implements role-based access control (Admin, Dealer, Workshop) and ownership custody.
 */
contract BikeChain is AccessControl {
    bytes32 public constant DEALER_ROLE = keccak256("DEALER_ROLE");
    bytes32 public constant WORKSHOP_ROLE = keccak256("WORKSHOP_ROLE");

    struct Bike {
        string bikeId;
        bytes32 vinHash;
        address currentOwner;
        uint16 productionYear;
        uint256 currentOdometer;
        bool isRegistered;
    }

    struct ServiceRecord {
        uint256 timestamp;
        uint256 odometer;
        bytes32 documentHash;
        string serviceCenter;
    }

    struct OwnershipTransfer {
        uint256 timestamp;
        address from;
        address to;
        uint256 odometer;
    }

    // bikeId => Bike
    mapping(string => Bike) private bikes;
    
    // bikeId => ServiceRecord[]
    mapping(string => ServiceRecord[]) private serviceRecords;

    // bikeId => OwnershipTransfer[]
    mapping(string => OwnershipTransfer[]) private transferHistory;

    // Events
    event BikeRegistered(
        string indexed bikeId, 
        bytes32 indexed vinHash, 
        address indexed initialOwner, 
        uint16 productionYear, 
        address dealer
    );

    event OwnershipTransferred(
        string indexed bikeId, 
        address indexed from, 
        address indexed to, 
        uint256 odometer,
        uint256 timestamp
    );

    event ServiceRecordAdded(
        string indexed bikeId, 
        uint256 odometer, 
        bytes32 indexed documentHash, 
        string serviceCenter,
        uint256 timestamp
    );

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DEALER_ROLE, msg.sender);
        _grantRole(WORKSHOP_ROLE, msg.sender);
    }

    /**
     * @notice Register a new motorcycle and issue its digital identity.
     * @dev Restricted to authorized DEALER_ROLE.
     */
    function registerBike(
        string calldata bikeId,
        bytes32 vinHash,
        address initialOwner,
        uint16 productionYear
    ) external onlyRole(DEALER_ROLE) {
        require(bytes(bikeId).length > 0, "BikeChain: bikeId cannot be empty");
        require(!bikes[bikeId].isRegistered, "BikeChain: bike already registered");
        require(vinHash != bytes32(0), "BikeChain: vinHash cannot be zero");
        require(initialOwner != address(0), "BikeChain: initialOwner cannot be zero address");
        require(productionYear >= 1900 && productionYear <= 2100, "BikeChain: invalid production year");

        bikes[bikeId] = Bike({
            bikeId: bikeId,
            vinHash: vinHash,
            currentOwner: initialOwner,
            productionYear: productionYear,
            currentOdometer: 0,
            isRegistered: true
        });

        transferHistory[bikeId].push(OwnershipTransfer({
            timestamp: block.timestamp,
            from: address(0),
            to: initialOwner,
            odometer: 0
        }));

        emit BikeRegistered(bikeId, vinHash, initialOwner, productionYear, msg.sender);
    }

    /**
     * @notice Transfer ownership title of a registered motorcycle to a new owner.
     * @dev Restricted to current owner of the motorcycle.
     */
    function transferOwnership(
        string calldata bikeId,
        address newOwner,
        uint256 currentOdometer
    ) external {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        require(msg.sender == bikes[bikeId].currentOwner, "BikeChain: caller is not current owner");
        require(newOwner != address(0), "BikeChain: new owner cannot be zero address");
        require(newOwner != msg.sender, "BikeChain: cannot transfer to self");
        require(currentOdometer >= bikes[bikeId].currentOdometer, "BikeChain: odometer rollback rejected");

        address previousOwner = bikes[bikeId].currentOwner;
        bikes[bikeId].currentOwner = newOwner;
        bikes[bikeId].currentOdometer = currentOdometer;

        transferHistory[bikeId].push(OwnershipTransfer({
            timestamp: block.timestamp,
            from: previousOwner,
            to: newOwner,
            odometer: currentOdometer
        }));

        emit OwnershipTransferred(bikeId, previousOwner, newOwner, currentOdometer, block.timestamp);
    }

    /**
     * @notice Add a certified maintenance record with document hash and verified odometer reading.
     * @dev Restricted to authorized WORKSHOP_ROLE. Enforces strictly non-decreasing odometer.
     */
    function addServiceRecord(
        string calldata bikeId,
        uint256 odometer,
        bytes32 documentHash,
        string calldata serviceCenter
    ) external onlyRole(WORKSHOP_ROLE) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        require(documentHash != bytes32(0), "BikeChain: documentHash cannot be zero");
        require(bytes(serviceCenter).length > 0, "BikeChain: serviceCenter required");
        require(odometer >= bikes[bikeId].currentOdometer, "BikeChain: odometer rollback rejected");

        bikes[bikeId].currentOdometer = odometer;

        serviceRecords[bikeId].push(ServiceRecord({
            timestamp: block.timestamp,
            odometer: odometer,
            documentHash: documentHash,
            serviceCenter: serviceCenter
        }));

        emit ServiceRecordAdded(bikeId, odometer, documentHash, serviceCenter, block.timestamp);
    }

    /**
     * @notice Retrieve core vehicle record data.
     */
    function getBikeRecord(string calldata bikeId) external view returns (Bike memory) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        return bikes[bikeId];
    }

    /**
     * @notice Get service and transfer history counts for a bike.
     */
    function getRecordCounts(string calldata bikeId) external view returns (uint256 serviceCount, uint256 transferCount) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        return (serviceRecords[bikeId].length, transferHistory[bikeId].length);
    }

    /**
     * @notice Check whether a given SHA-256 document hash is registered for the specified motorcycle.
     * @dev Returns true if the hash matches any recorded service invoice fingerprint.
     */
    function verifyDocumentHash(string calldata bikeId, bytes32 documentHash) external view returns (
        bool isMatch,
        uint256 recordIndex,
        uint256 timestamp
    ) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        ServiceRecord[] memory records = serviceRecords[bikeId];
        for (uint256 i = 0; i < records.length; i++) {
            if (records[i].documentHash == documentHash) {
                return (true, i, records[i].timestamp);
            }
        }
        return (false, 0, 0);
    }

    /**
     * @notice Get specific service record by index.
     */
    function getServiceRecord(string calldata bikeId, uint256 index) external view returns (
        uint256 timestamp,
        uint256 odometer,
        bytes32 documentHash,
        string memory serviceCenter
    ) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        require(index < serviceRecords[bikeId].length, "BikeChain: record index out of bounds");
        ServiceRecord memory r = serviceRecords[bikeId][index];
        return (r.timestamp, r.odometer, r.documentHash, r.serviceCenter);
    }

    /**
     * @notice Get specific ownership transfer record by index.
     */
    function getTransferRecord(string calldata bikeId, uint256 index) external view returns (
        uint256 timestamp,
        address from,
        address to,
        uint256 odometer
    ) {
        require(bikes[bikeId].isRegistered, "BikeChain: bike not registered");
        require(index < transferHistory[bikeId].length, "BikeChain: index out of bounds");
        OwnershipTransfer memory t = transferHistory[bikeId][index];
        return (t.timestamp, t.from, t.to, t.odometer);
    }
}
