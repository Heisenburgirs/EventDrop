// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Interface to extend IERC721 to get enumerable functions
interface IERC721Enumerable is IERC721 {
    function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId);
}

contract EventDrop is ReentrancyGuard {
    // Enum representing token types
    enum TokenType { ERC20, ERC721 }

    /**************************************************************************
     * State Variables
     **************************************************************************/

    // Defines attributes of a campaign
    struct Campaign {
        address owner;           // Address of the campaign owner
        address tokenAddress;    // Address of the token (ERC20 or ERC721) being used in the campaign
        uint256 amount;          // Amount to distribute/claim per wallet/user
        bool isClaimable;        // Flag to check if tokens from the campaign can be claimed
        bool hasEnded;           // Flag to check if the campaign has ended
        TokenType tokenType;     // Enum value indicating if the campaign uses ERC20 or ERC721 tokens
        string claimToken;       // A secret token/string that might be required to claim the drop
    }

    // Public version of Campaign that excludes the secret claimToken
    struct PublicCampaign {
        address owner;
        address tokenAddress;
        uint256 amount;
        bool isClaimable;
        bool hasEnded;
        TokenType tokenType;
    }

    uint256 public campaignCount = 0;  // Counter to keep track of total campaigns created
    mapping(uint256 => Campaign) private campaigns;       // Mapping from campaignID to Campaign details
    mapping(address => uint256[]) private ownerToCampaignIDs;  // Mapping to track campaigns owned by an address
    mapping(uint256 => uint256) public campaignBalances;  // Mapping to keep track of token balances of a campaign
    mapping(uint256 => mapping(address => bool)) private hasClaimed; // Mapping to check if an address has claimed tokens in a campaign

    /**************************************************************************
     * Events
     **************************************************************************/
    // Emitted when a new campaign is created
    event CampaignCreated(uint256 indexed campaignID, address indexed owner, address tokenAddress, uint256 amount);
    // Emitted when a campaign's claimable status changes (started or stopped)
    event CampaignStatusChanged(uint256 indexed campaignID, bool isClaimable);
    // Emitted when a campaign ends
    event CampaignEnded(uint256 indexed campaignID);
    // Emitted when a campaign's attributes are edited (e.g., amount)
    event CampaignEdited(uint256 indexed campaignID, uint256 newAmount);
    // Emitted when tokens are deposited to a campaign
    event TokensDeposited(uint256 indexed campaignID, uint256 amount, address indexed owner);
    // Emitted when tokens are withdrawn from a campaign
    event TokensWithdrawn(uint256 indexed campaignID, address indexed owner);
    // Emitted when someone claims tokens from a campaign
    event CampaignClaimed(uint256 indexed campaignID, address indexed claimer);

    function createCampaign(address _tokenAddress, uint256 _amount, TokenType _tokenType, string memory _claimToken) external returns (uint256) {
        campaignCount++;
        Campaign storage newCampaign = campaigns[campaignCount];

        newCampaign.owner = msg.sender;
        newCampaign.tokenAddress = _tokenAddress;
        newCampaign.amount = _amount;
        newCampaign.isClaimable = false;
        newCampaign.hasEnded = false;
        newCampaign.tokenType = _tokenType;
        newCampaign.claimToken = _claimToken;

        ownerToCampaignIDs[msg.sender].push(campaignCount);

        emit CampaignCreated(campaignCount, msg.sender, _tokenAddress, _amount);
        return campaignCount;
    }

    /**************************************************************************
     * Campaign management
     **************************************************************************/

    // Allows the owner to start a campaign, enabling claims
    function startCampaign(uint256 _campaignID) external {
        require(campaigns[_campaignID].owner == msg.sender, "Not the campaign owner");
        require(!campaigns[_campaignID].hasEnded, "Campaign has ended");
        require(!campaigns[_campaignID].isClaimable, "Campaign already started!");

        // Check for ERC20 token balance
        if (campaigns[_campaignID].tokenType == TokenType.ERC20) {
            IERC20 token = IERC20(campaigns[_campaignID].tokenAddress);
            uint256 contractBalance = token.balanceOf(address(this));
            require(contractBalance >= campaigns[_campaignID].amount, "Insufficient ERC20 tokens for the campaign");
        } 

        // Check for ERC721 token balance
        else {
            IERC721 token = IERC721(campaigns[_campaignID].tokenAddress);
            uint256 contractBalance = token.balanceOf(address(this));
            require(contractBalance >= 1, "Insufficient ERC721 tokens for the campaign");
        }

        campaigns[_campaignID].isClaimable = true;

        emit CampaignStatusChanged(_campaignID, true);
    }

    // Allows the owner to stop a campaign, disabling claims
    function stopCampaign(uint256 _campaignID) external {
        require(campaigns[_campaignID].owner == msg.sender, "Not the campaign owner");
        require(!campaigns[_campaignID].hasEnded, "Campaign has ended");
        require(campaigns[_campaignID].isClaimable, "Campaign already stopped!");

        campaigns[_campaignID].isClaimable = false;

        emit CampaignStatusChanged(_campaignID, false);
    }

    function _withdrawTokens(uint256 _campaignID, uint256 _batchSize) internal {
        Campaign storage campaign = campaigns[_campaignID];
        
        if (campaign.tokenType == TokenType.ERC20) {
            IERC20 token = IERC20(campaign.tokenAddress);
            uint256 balance = campaignBalances[_campaignID];
            
            // Update the balance of this campaign first
            campaignBalances[_campaignID] = 0;

            // Transfer the tokens
            require(token.transfer(msg.sender, balance), "Token transfer failed");
        } else {
            // For ERC721 in batches
            IERC721Enumerable token = IERC721Enumerable(campaign.tokenAddress);
            uint256 remainingTokens = token.balanceOf(address(this));
            uint256 tokensToWithdraw = _batchSize < remainingTokens ? _batchSize : remainingTokens;
            
            for (uint256 i = 0; i < tokensToWithdraw; i++) {
                uint256 tokenId = token.tokenOfOwnerByIndex(address(this), i);
                token.transferFrom(address(this), msg.sender, tokenId);
            }

            // Update campaign balance after withdrawal
            campaignBalances[_campaignID] -= tokensToWithdraw;
        }
        
        emit TokensWithdrawn(_campaignID, msg.sender);
    }

    function deposit(uint256 _campaignID, uint256[] memory _amounts) external {
        Campaign storage campaign = campaigns[_campaignID];
        require(campaign.owner == msg.sender, "Not the campaign owner");

        if (campaign.tokenType == TokenType.ERC20) {
            require(_amounts.length == 1, "Only one amount should be provided for ERC20 tokens");
            IERC20 token = IERC20(campaign.tokenAddress);
            token.transferFrom(msg.sender, address(this), _amounts[0]);
            campaignBalances[_campaignID] += _amounts[0];

            emit TokensDeposited(_campaignID, _amounts[0], msg.sender);
        } else {
            IERC721 token = IERC721(campaign.tokenAddress);
            for (uint256 i = 0; i < _amounts.length; i++) {
                token.transferFrom(msg.sender, address(this), _amounts[i]);
            }
            // Update campaignBalances for ERC721 tokens
            campaignBalances[_campaignID] += _amounts.length;

            emit TokensDeposited(_campaignID, _amounts.length, msg.sender);
        }
    }

    // Allows the owner to withdraw all ERC20/ERC721 tokens from campaign
    function withdraw(uint256 _campaignID) external {
        Campaign storage campaign = campaigns[_campaignID];
        require(msg.sender == campaign.owner, "Only campaign owner can withdraw");
        
        _withdrawTokens(_campaignID, campaignBalances[_campaignID]);
    }

    // Allows the owner to end a campaign, withdraws all ERC20/ERC721 tokens
    function endCampaign(uint256 _campaignID, uint256 _batchSize) external {
        require(msg.sender == campaigns[_campaignID].owner, "Only campaign owner can end the campaign");
        
        _withdrawTokens(_campaignID, _batchSize);
    }

    // Allows the owner to edit how many tokens are to be claimed
    function editCampaign(uint256 _campaignID, uint256 _newAmount) external {
        require(campaigns[_campaignID].owner == msg.sender, "Not the campaign owner");

        campaigns[_campaignID].amount = _newAmount;
        
        emit CampaignEdited(_campaignID, _newAmount);
    }

    /**************************************************************************
     * Claiming
     **************************************************************************/

    // Allows a user to claim tokens from a campaign
    function claim(uint256 _campaignID, string memory _claimToken) external {
        Campaign storage campaign = campaigns[_campaignID];

        require(campaignBalances[_campaignID] > 0, "No tokens left to claim");
        require(campaign.isClaimable, "Campaign is not claimable currently");
        require(!campaign.hasEnded, "Campaign has ended");
        require(!hasClaimed[_campaignID][msg.sender], "You have already claimed tokens for this campaign");
        
        // Check if a claim token is required and if it's valid
        require(bytes(campaign.claimToken).length == 0 || keccak256(abi.encodePacked(campaign.claimToken)) == keccak256(abi.encodePacked(_claimToken)), "Invalid claim token");

        if (campaign.tokenType == TokenType.ERC20) {
            IERC20 token = IERC20(campaign.tokenAddress);
            require(token.balanceOf(address(this)) >= campaign.amount, "Not enough tokens in the contract");
            require(token.transfer(msg.sender, campaign.amount), "Token transfer failed");
            campaignBalances[_campaignID] -= campaign.amount;
        } else {
            IERC721Enumerable token = IERC721Enumerable(campaign.tokenAddress);
            require(token.balanceOf(address(this)) >= campaign.amount, "Not enough NFTs to claim");
            
            // Iterate over the required number of tokens to claim
            for(uint256 i = 0; i < campaign.amount; i++) {
                // The index of tokens might change after each transfer since a token is removed from the contract's list.
                // Thus, we always take the first token from the list
                uint256 tokenId = token.tokenOfOwnerByIndex(address(this), 0); 
                token.transferFrom(address(this), msg.sender, tokenId);
                campaignBalances[_campaignID] -= 1;
            }
        }

        // Update the hasClaimed mapping
        hasClaimed[_campaignID][msg.sender] = true;
        emit CampaignClaimed(_campaignID, msg.sender);
    }

    /**************************************************************************
     * Getter functions
     **************************************************************************/

    // Get details of a specific campaign
    function getCampaignsByOwner(address _owner) external view returns (uint256[] memory campaignIDs, PublicCampaign[] memory campaignDetails) {
        uint256[] storage ownerCampaignIDs = ownerToCampaignIDs[_owner];

        campaignIDs = new uint256[](ownerCampaignIDs.length);
        campaignDetails = new PublicCampaign[](ownerCampaignIDs.length);

        for (uint256 i = 0; i < ownerCampaignIDs.length; i++) {
            campaignIDs[i] = ownerCampaignIDs[i];
            Campaign storage currentCampaign = campaigns[ownerCampaignIDs[i]];
            campaignDetails[i] = PublicCampaign({
                owner: currentCampaign.owner,
                tokenAddress: currentCampaign.tokenAddress,
                amount: currentCampaign.amount,
                isClaimable: currentCampaign.isClaimable,
                hasEnded: currentCampaign.hasEnded,
                tokenType: currentCampaign.tokenType
            });
        }

        return (campaignIDs, campaignDetails);
    }

    // Check if a user has claimed tokens from a specific campaign
    function hasUserClaimed(uint256 _campaignID, address _user) external view returns (bool) {
        return hasClaimed[_campaignID][_user];
    }
}
