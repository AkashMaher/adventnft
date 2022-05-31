"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal
let account;
let contract;
let nft;
let salestarted
let price
let supply
let provider;
let selectedAccount;


const NFTABI = [{ "inputs": [{ "internalType": "uint256", "name": "_startPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_wlPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_maxPerMint", "type": "uint256" }, { "internalType": "uint256", "name": "_maxwlperwallet", "type": "uint256" }, { "internalType": "string", "name": "_uri", "type": "string" }, { "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEVELOPER_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "developer", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "DEV_TEAM", "outputs": [{ "internalType": "string", "name": "web_url", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "Giveaway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "MintByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "SaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WL_Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "uint256", "name": "reservedAmount", "type": "uint256" }], "name": "addPresaleAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWlPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "presaleList", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "provenanceHash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxPerMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxWLMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newprice", "type": "uint256" }], "name": "setPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_provenanceHash", "type": "string" }], "name": "setProvenanceHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newWlPrice", "type": "uint256" }], "name": "setWLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }], "name": "setwithdrawWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startingIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const NFTADDRESS = "0xa779ec5e25E759c7A048929D923360E0F8066889";

const ABI = [{ "inputs": [{ "internalType": "contract AdventNFT", "name": "_nft", "type": "address" }, { "internalType": "contract AdventTokens", "name": "_token", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTStaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTUnstaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "Legendary", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LegendaryId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Original", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Rare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "RareId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetLegendaryRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetOrginalRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetRareRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addLegendaryIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addRareIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "approveAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claimForAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "earningInfo", "outputs": [{ "internalType": "uint256[1]", "name": "info", "type": "uint256[1]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_myAddress", "type": "address" }], "name": "setMyAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "tokensOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "ownerTokens", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStaked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vault", "outputs": [{ "internalType": "uint24", "name": "tokenId", "type": "uint24" }, { "internalType": "uint48", "name": "timestamp", "type": "uint48" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }]

const ADDRESS = "0x02636F15cC8bb14b0a99b7f411C38968759DB8cb";

const ChainID = '4'

document.write(`<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="popup">
                <div class = "popup-content" >
                
                    <p class="popup-top-text"><b>Enter NFT Token ID</b></p>
                    <div class="input_id">
                    <input type="text" id="tokenID" name="fname"><br><br>
                    </div>
                    <p class="stake"><button id="stake" class="stake">Stake Now</button></p>
                    <p class="unstake"><button id="unstake" class="stake">Unstake Now</button></p>
                    <p class="claim"><button id="claim" class="stake">Claim Rewards</button></p>
                    <p class="popup-last-text" >Total Staked: <span id="supply"></span> / 6666 ADV</p>
                </div>
    </div >
  </div>

</div>`)
$(document).ready(function () {
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById("myModal").style.display = "none";
    });
});

window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
};


function init() {


    web3Modal = new Web3Modal({
        network: "rinkeby",
        theme: "dark",
        cacheProvider: false, // optional
        providerOptions, // required
    });

}

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "acb841f7dfdc4702a18f96fb9a6f68a6"
        }
    },
};



async function onConnect() {

    console.log("connecting wallet...");
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();

        var web3 = new Web3(provider);
        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }]
        });
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        
        nft = new web3.eth.Contract(NFTABI,NFTADDRESS);

        contract = new web3.eth.Contract(ABI, ADDRESS);

        supply = await contract.methods.totalStaked().call();

        document.getElementById("supply").textContent = supply;

        document.getElementById('connect').innerHTML = 'Connected';

        console.log("Provider is ", provider, "till here")
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

}


async function onApprove(){
    if(!account) return alert(`please connect wallet first`);
    await nft.methods.setApprovalForAll(ADDRESS,true).send({from:account});
    console.log(`You approved contract successfully, now you can stake your nfts`);
}
async function onStake() {
    if (!account) return alert(`please connect wallet first`);
    
    document.getElementById("myModal").style.display = "block";
    document.getElementById("unstake").style.display = "none";
    document.getElementById("claim").style.display = "none";
    document.getElementById("stake").style.display = "block";
    document.querySelector(".stake").style.background= `rgb(0, 0, 0)`;

    document.getElementById('stake').onclick = () => {
        let nftToken = document.getElementById("tokenID").value;
        nftToken = parseInt(nftToken);
        contract.methods.stake([nftToken]).send({ from: account});

    }

    
}

async function onUnstake() {
    if (!account) return alert(`please connect wallet first`);

    document.getElementById("myModal").style.display = "block";
    document.getElementById("unstake").style.display = "block";
    document.querySelector(".unstake").style.background = `rgb(0, 0, 0)`;
    document.getElementById("claim").style.display = "none";
    document.getElementById("stake").style.display = "none";

    document.getElementById('unstake').onclick = () => {
        let nftTokken = document.getElementById("tokenID").value;
        contract.methods.unstake([nftTokken]).send({ from: account });

    }


}

async function onClaim() {
    if (!account) return alert(`please connect wallet first`);

    document.getElementById("myModal").style.display = "block";
    document.getElementById("unstake").style.display = "none";
    document.getElementById("claim").style.display = "block";
    document.querySelector(".claim").style.background = `rgb(0, 0, 0)`;
    document.getElementById("stake").style.display = "none";

    
    document.getElementById('claim').onclick = () => {
        let nftTokken = document.getElementById("tokenID").value;
        contract.methods.claim([nftTokken]).send({ from: account });

    }


}

$(document).ready(function () {
    document.getElementById("connect").addEventListener("click", onConnect);
});

window.addEventListener('load', async () => {
    init();
    document.getElementById("connect").addEventListener("click", onConnect);
    document.querySelector("#Stake").addEventListener("click", onStake);
    document.querySelector("#approve").addEventListener("click", onApprove);
    document.querySelector("#Unstake").addEventListener("click", onUnstake);
    document.querySelector("#Claim").addEventListener("click", onClaim);
});