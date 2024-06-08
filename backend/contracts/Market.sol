// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _id
    ) external;
    function ownerOf(uint256 _id) external view returns(address);
    function approve(address _to, uint256 _id) external;
}
contract Marketplace{
    address public nftAddress;
    address payable  public seller;
    address public admin;
    uint256 public id;
    event NFTListed(uint256 indexed tokenId, address indexed owner, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed owner, uint256 price);
    event NFTCanceled(uint256 indexed tokenId, address indexed owner, uint256 price);

    constructor(address _nftAddress, address _admin) {
        nftAddress = _nftAddress;
        admin = _admin;
    }



    struct NFT{
        uint256 tokenId;
        address owner;
        uint256 price;
        bool sold;
    }
    

    mapping(uint256 => NFT) public nfts;
    uint256[] public listedNFTs;
    modifier onlyOwner(uint256 _tokenId){
        require(IERC721(nftAddress).ownerOf(_tokenId) == msg.sender);
        _;
    }
    modifier onlyAdmin(){
        require(msg.sender == admin);
        _;
    }

    function listNFT(uint256 _tokenId, uint256 _price) external onlyOwner(_tokenId){
       IERC721 (nftAddress).transferFrom(msg.sender, address(this), _tokenId);
        nfts[id] = NFT(_tokenId, msg.sender, _price, false);
        listedNFTs.push(id);
        id ++;
        emit NFTListed(_tokenId, msg.sender, _price);
      
    }
    function buyNFT(uint256 _tokenId) external payable{
        require(nfts[_tokenId].sold == false, "NFT already sold");
        require(nfts[_tokenId].price == msg.value, "Wrong price");
        require(nfts[_tokenId].owner != msg.sender, "You can't buy your own NFT");

        nfts[_tokenId].sold = true;
        nfts[_tokenId].price = 0;
       
        IERC721(nftAddress).approve(msg.sender, nfts[_tokenId].tokenId);
        IERC721(nftAddress).transferFrom(address(this), msg.sender, nfts[_tokenId].tokenId);
        
        payable(nfts[_tokenId].owner).transfer(msg.value);
        nfts[_tokenId].owner = msg.sender;
        removeListedNFT(_tokenId);
        delete nfts[_tokenId];
        emit NFTSold(_tokenId, msg.sender, msg.value);
    }

    function cancelNFT(uint256 _tokenId) external onlyAdmin {
        require(nfts[_tokenId].sold == false);
        
        IERC721(nftAddress).transferFrom(address(this), seller, _tokenId);
        removeListedNFT(_tokenId);
        delete nfts[_tokenId];
        emit NFTCanceled(_tokenId, seller, nfts[_tokenId].price);
    }
    // function tranferpay() external onlyAdmin {
    //     payable(seller).transfer(address(this).balance);
    // }
  function getListedNFTs() external view returns(uint256[] memory) {
        return listedNFTs;
    }

    function getNFT(uint256 _tokenId) external view returns(NFT memory) {
        return nfts[_tokenId];
    }

    function removeListedNFT(uint256 _tokenId) internal {
        uint256 length = listedNFTs.length;
        for (uint256 i = 0; i < length; i++) {
            if (listedNFTs[i] == _tokenId) {
                listedNFTs[i] = listedNFTs[length - 1];
                listedNFTs.pop();
                break;
            }
        }
    }
   

    
}