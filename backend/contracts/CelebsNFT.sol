// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import OpenZeppelin Contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// inherit from OpenZeppelin Contracts
contract CelebsNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    // passing symbol and name
    constructor() ERC721("CelebsNFT", "CNFT") {
        address owner = msg.sender;
    }

    // mint your nft
    function safeMint() public onlyOwner {
        // set the new id
        uint256 tokenId = _tokenIds.current();
        // add 1 to id counter for the next mint
        _tokenIds.increment();
        // mint to the sender
        _safeMint(msg.sender, tokenId);
        // returnt he metadata
        tokenURI(tokenId);
    }

    // set the metadata
    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_exists(_tokenId));
        return "https://jsonkeeper.com/b/3I5A";
    }
}
