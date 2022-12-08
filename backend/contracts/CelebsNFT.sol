// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import OpenZeppelin Contracts
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

// inherit from OpenZeppelin Contracts
contract CelebsNFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    string baseSvg1of3 =
        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 700 700" width="700" height="700"><defs><linearGradient gradientTransform="rotate(150, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="ffflux-gradient"><stop stop-color="';
    string baseSvg2of3 =
        '" stop-opacity="1" offset="0%"></stop><stop stop-color="';
    string baseSvg3of3 =
        '" stop-opacity="1" offset="100%"></stop></linearGradient><filter id="ffflux-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.005 0.003" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence><feGaussianBlur stdDeviation="20 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur><feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend><style>.base { fill: midnightblue; font-family: monospace; font-size: 32px; font-weight: bold }</style></filter></defs><rect width="700" height="700" fill="url(#ffflux-gradient)" filter="url(#ffflux-filter)"></rect><text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">';
    string[] firstWords = ["I ", "You ", "We ", "They "];
    string[] secondWords = [
        "love ",
        "bite ",
        "kiss ",
        "lick ",
        "hug ",
        "smack ",
        "caress ",
        "cuddle ",
        "kick ",
        "spy ",
        "envy ",
        "eat ",
        "fight ",
        "like ",
        "complete ",
        "study ",
        "draw ",
        "enter ",
        "fart on ",
        "stomp on ",
        "sit on ",
        "remember ",
        "dislike ",
        "doubt ",
        "feel ",
        "smell ",
        "understand ",
        "own "
        "please ",
        "promise "
    ];
    string[] thirdWords = ["you", "me", "us", "them", "her", "him"];
    string[] colors = [
        "red",
        "blue",
        "yellow",
        "orange",
        "green",
        "pink",
        "black",
        "gray",
        "aquamarine",
        "azure",
        "brown",
        "cadetblue",
        "chocolate",
        "chartreuse",
        "coral",
        "crimson",
        "darkblue",
        "darkcyan",
        "cyan",
        "darkmangeta",
        "darksalmon",
        "darkviolet",
        "dimgray",
        "hotpink",
        "indigo",
        "ivory",
        "khaki",
        "lawngreen",
        "lightcoral",
        "lightgreen",
        "lightskyblue",
        "navy",
        "violet"
    ];

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    // passing symbol and name
    constructor() ERC721("SquaresNFT", "SNFT") {
        console.log("This is my NFT contract. Woah!");
    }

    function pickRandomFirstWord(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("FIRST_WORD", Strings.toString(_tokenId)))
        );
        rand = rand % firstWords.length;
        console.log("first word %s %i", firstWords[rand], rand);
        return firstWords[rand];
    }

    function pickRandomSecondWord(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("SECOND_WORD", Strings.toString(_tokenId)))
        );
        rand = rand % secondWords.length;
        console.log("second word %s %i", secondWords[rand], rand);
        return secondWords[rand];
    }

    function pickRandomThirdWord(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("THIRD_WORD", Strings.toString(_tokenId)))
        );
        rand = rand % thirdWords.length;
        console.log("third word %s %i", thirdWords[rand], rand);
        return thirdWords[rand];
    }

    function pickRandomColor(uint256 _tokenId)
        public
        view
        returns (string memory)
    {
        uint256 rand = random(
            string(abi.encodePacked("COLOR", Strings.toString(_tokenId)))
        );
        rand = rand % colors.length;
        console.log("color %s %i", colors[rand], rand);
        return colors[rand];
    }

    function random(string memory _input) internal view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(_input, block.timestamp, block.difficulty)
                )
            );
    }

    // mint your nft
    function makeNFT() public {
        // set the new id
        uint256 newItemId = _tokenIds.current();
        string memory first = pickRandomFirstWord(newItemId);
        string memory second = pickRandomSecondWord(newItemId);
        string memory third = pickRandomThirdWord(newItemId);
        string memory color1 = pickRandomColor(newItemId);
        string memory color2 = pickRandomColor(newItemId);
        string memory combinedWord = string(
            abi.encodePacked(first, second, third)
        );

        string memory finalSvg = string(
            abi.encodePacked(
                baseSvg1of3,
                color1,
                baseSvg2of3,
                color2,
                baseSvg3of3,
                first,
                second,
                third,
                "</text></svg>"
            )
        );
        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        combinedWord,
                        '","description": "A highly acclaimed collection of squares with random messages.", "image": "data:image/svg+xml;base64,',
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );

        // prepend data:application/json;base64, to the data
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );
        console.log("=== final svg ===");
        console.log(finalSvg);

        console.log("=== link to svg metadata ===");
        console.log(finalTokenUri);
        console.log("=== link to svg metadata ===");
        console.log("The NFT with ID %i minted to %s", newItemId, msg.sender);

        // add 1 to id counter for the next mint
        _tokenIds.increment();
        // mint to the sender
        _safeMint(msg.sender, newItemId);
        // update the metadata
        _setTokenURI(newItemId, finalTokenUri);
        emit NewEpicNFTMinted(msg.sender, newItemId);
    }
}
