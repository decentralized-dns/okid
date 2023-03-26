// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Okid {

    address public owner;

    struct Domain {
        address owner;
        uint256 expiration;
    }

    mapping(string => Domain) private domains;

    event DomainRegistered(string domainName, address owner, uint256 expiration);
    event DomainRenewed(string domainName, uint256 expiration);
    event DomainRevoked(string domainName);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    uint256 public constant DOMAIN_EXPIRATION_TIME = 31536000; // 1 year
    uint256 public constant DOMAIN_PRICE = 0.01 ether;

    function registerDomain(string memory domainName) public payable {
    // need to attach >0.01 ether fund from tx sender while calling this func
        require(msg.value >= DOMAIN_PRICE, "INSUFFICIENT FUNDS");
        require(domains[domainName].owner == address(0), "DOMAIN ALREADY REGISTERED");
        domains[domainName] = Domain(msg.sender, block.timestamp + DOMAIN_EXPIRATION_TIME);
        // return extra ether
        refundIfOver(DOMAIN_PRICE);
        emit DomainRegistered(domainName, msg.sender, block.timestamp + DOMAIN_EXPIRATION_TIME);
    }

    function renewDomain(string memory domainName) public payable {
        require(msg.value >= DOMAIN_PRICE, "INSUFFICIENT FUNDS");
        require(domains[domainName].owner != address(0), "DOMAIN NOT REGISTERED");
        require(msg.sender == domains[domainName].owner, "ONLY OWNER CAN RENEW DOMAIN");

        domains[domainName].expiration += DOMAIN_EXPIRATION_TIME;
        refundIfOver(DOMAIN_PRICE);
        emit DomainRenewed(domainName, domains[domainName].expiration);
    }

    function revokeDomain(string memory domainName) public {
        require(domains[domainName].owner != address(0), "DOMAIN NOT REGISTERED");
        require(msg.sender == domains[domainName].owner, "ONLY OWNER CAN REVOKE DOMAIN");

        payable(domains[domainName].owner).transfer(address(this).balance);
        delete domains[domainName];

        emit DomainRevoked(domainName);
    }

    function getDomain(string memory domainName) public view returns (Domain memory) {
        return domains[domainName];
    }

    function getDomainOwner(string memory domainName) public view returns (address) {
        return domains[domainName].owner;
    }

    function getDomainExpiration(string memory domainName) public view returns (uint256) {
        return domains[domainName].expiration;
    }

    receive() external payable {}

    fallback() external payable {}

    function getContractOwner() public view returns (address) {
        return owner;
    }

    function refundIfOver(uint256 totalCost) private {
        require(msg.value >= totalCost, "Need to send more fund.");
        if (msg.value > totalCost) {
            payable(msg.sender).transfer(msg.value - totalCost);
        }
    }
}
