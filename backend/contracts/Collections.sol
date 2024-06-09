// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Collections is ERC721, ERC721URIStorage {
    uint256 public _nextTokenId;

    mapping(address =>uint256[]) public _balanceOf;

    constructor()
        ERC721("Colletcion", "CCC")
        
    {}

    function safeMint(address to, string memory uri) public{
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _balanceOf[to].push(tokenId);

    }
    function indexOf(uint256[] memory arr, uint256 searchFor) private pure returns (uint256) {
  for (uint256 i = 0; i < arr.length; i++) {
    if (arr[i] == searchFor) {
      return i;
    }
  }
  return arr.length ; // not found
}
    function remove(address owner, uint256 tokenId) internal {
        uint256 index = indexOf(_balanceOf[owner], tokenId);
        require(_balanceOf[owner][index] == tokenId, "ERC721: invalid token ID");
        require( index<_balanceOf[owner].length, "ERC721: invalid token ID");
        for(uint256 i = index; i < _balanceOf[owner].length-1; i++){
            _balanceOf[owner][i] = _balanceOf[owner][i+1];

        }
        _balanceOf[owner].pop();
        
    }
    function getBalanceOf(address owner) public view returns(uint256[] memory){
        return _balanceOf[owner];
    }
    function approve( address to, uint256 tokenId) public override(ERC721,IERC721) {
        remove(msg.sender, tokenId);
        _balanceOf[to].push(tokenId);
        super.approve(to, tokenId);
    }
    

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

