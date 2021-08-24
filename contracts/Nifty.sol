// SPDX-License-Identifier: UNLICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Nifty is ERC721 {
    constructor() ERC721("Nifty", "NFT") {}

    uint256 idTracker;

    function mintOne() public {
        internalMint(msg.sender);
    }

    function mintMany(uint256 number) public {
        for (uint256 i; i < number; i++) {
            internalMint(msg.sender);
        }
    }

    function internalMint(address to) internal {
        _safeMint(to, idTracker);
        idTracker++;
    }
}
