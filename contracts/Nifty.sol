// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    constructor(uint256 startingId) ERC721("Nifty", "NFT") {
        idTracker = startingId;
    }

    uint256 idTracker;
    uint256 maxNumber = 1000;
    uint256 promoCode = 69420;
    uint256 promoUses;
    uint256 promoLimit = 10;

    function mintOne() public {
        internalMint(msg.sender);
    }

    function mintMany(uint256 number) public {
        for (uint256 i; i < number; i++) {
            internalMint(msg.sender);
        }
    }

    function mintPromo(uint256 _promoCode) public {
        // 1. check promocode
        require(_promoCode == promoCode, "Invalid promo code");
        // 2. check if promo uses is less than promo limit
        require(promoUses < promoLimit, "Promo limit reached");
        // 3. increment promoUses
        promoUses++;
        // 4. mint the token
        internalMint(msg.sender);
    }

    function internalMint(address to) internal {
        require(idTracker + 1 < maxNumber, "Max number reached.");

        _safeMint(to, idTracker);
        idTracker++;
    }
}
