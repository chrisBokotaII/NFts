// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC721 {
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function ownerOf(uint256 tokenId) external view returns (address);
}

contract Marketplace {
    error PriceGeaterThanZero( string name, uint256 value );

    IERC721 public immutable token;
    address public immutable admin;
 
    struct NFT {
        uint256 tokenId;
        address owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => NFT) public idTonft;
    bool private locked = false;

    // List of NFTs
    NFT[] public allNfts; 

    modifier onlyOwner(uint256 _tokenId) {
        require(token.ownerOf(_tokenId) == msg.sender, "Not the owner");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not the admin");
        _;
    }

    modifier nonReentrant() {
        require(!locked, "Reentrant call");
        locked = true;
        _;
        locked = false;
    }

    event NFTListed(uint256 indexed tokenId, address indexed owner, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event NFTCanceled(uint256 indexed tokenId, address indexed owner);

    constructor(address _nftAddress) {
        require(_nftAddress != address(0), "Invalid NFT address");
        token = IERC721(_nftAddress);
        admin = msg.sender;
    }

    function listNFT(uint256 _tokenId, uint256 _price) external onlyOwner(_tokenId) {
        if(_price <= 0){
            revert PriceGeaterThanZero("Price must be greater than zero", _price);
        }
        // Transfer the NFT from the owner to the marketplace contract
        token.transferFrom(msg.sender, address(this), _tokenId);

        // Create a new NFT struct and push it to the array
        NFT memory newNFT = NFT({
            tokenId: _tokenId,
            owner: msg.sender,
            price: _price,
            sold: false
        });
    
        allNfts.push(newNFT);

        // List the NFT
        idTonft[_tokenId] = newNFT;

        emit NFTListed(_tokenId, msg.sender, _price);
    }

    function buyNFT(uint256 _tokenId) external payable nonReentrant {
        NFT storage nft = idTonft[_tokenId];
        require(!nft.sold, "NFT already sold");
        require(nft.price == msg.value, "Incorrect price");
        require(nft.owner != msg.sender, "Cannot buy your own NFT");

        nft.sold = true;
        address seller = payable(nft.owner);

        // Transfer the NFT from the marketplace contract to the buyer
        token.safeTransferFrom(address(this), msg.sender, _tokenId);

        // Transfer the payment to the seller
        (bool sent, ) = seller.call{value: msg.value}("");
        require(sent, "Failed to send payment");

        emit NFTSold(_tokenId, msg.sender, msg.value);

        // Remove the NFT from the listings
        removeNFTFromArray(_tokenId);
    }

    function cancelNFT(uint256 _tokenId) external onlyAdmin {
        NFT storage nft = idTonft[_tokenId];
        require(!nft.sold, "NFT already sold");

        // Transfer the NFT back to the owner
        token.safeTransferFrom(address(this), nft.owner, _tokenId);

        emit NFTCanceled(_tokenId, nft.owner);

        // Remove the NFT from the listings
        removeNFTFromArray(_tokenId);
    }

    function getNFT(uint256 _tokenId) external view returns (NFT memory) {
        return idTonft[_tokenId];
    }

    function getAllNFTs() external view returns (NFT[] memory) {
        return allNfts;
    }


function removeNFTFromArray(uint256 _tokenId) internal {
        uint256 length = allNfts.length;
        for (uint256 i = 0; i < length; i++) {
            if (allNfts[i].tokenId == _tokenId) {
                // Swap the NFT with the last element and pop the last element
                allNfts[i] = allNfts[length - 1];
                allNfts.pop();
                break;
            }
        }
    }
}