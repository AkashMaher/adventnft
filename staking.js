"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal
let account;
let contract;
let nft;
let salestarted
let price
let supply;
let EarnedTokens;
let provider;
let selectedAccount;
let tnxHash;
let Counts;
let stakedNFTs;
let web3;


const NFTABI = [{ "inputs": [{ "internalType": "uint256", "name": "_startPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_wlPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_maxPerMint", "type": "uint256" }, { "internalType": "uint256", "name": "_maxwlperwallet", "type": "uint256" }, { "internalType": "string", "name": "_uri", "type": "string" }, { "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEVELOPER_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "developer", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "DEV_TEAM", "outputs": [{ "internalType": "string", "name": "web_url", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "Giveaway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "MintByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "SaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WL_Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "uint256", "name": "reservedAmount", "type": "uint256" }], "name": "addPresaleAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWlPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "presaleList", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "provenanceHash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxPerMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxWLMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newprice", "type": "uint256" }], "name": "setPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_provenanceHash", "type": "string" }], "name": "setProvenanceHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newWlPrice", "type": "uint256" }], "name": "setWLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }], "name": "setwithdrawWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startingIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const NFTADDRESS = "0xa779ec5e25E759c7A048929D923360E0F8066889";

const ABI = [{ "inputs": [{ "internalType": "contract AdventNFT", "name": "_nft", "type": "address" }, { "internalType": "contract AdventTokens", "name": "_token", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTStaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTUnstaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "Legendary", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LegendaryId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Original", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Rare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "RareId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetLegendaryRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetOrginalRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetRareRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addLegendaryIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addRareIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "approveAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claimForAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "earningInfo", "outputs": [{ "internalType": "uint256[1]", "name": "info", "type": "uint256[1]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getCounts", "outputs": [{ "internalType": "uint256[3]", "name": "counts", "type": "uint256[3]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_myAddress", "type": "address" }], "name": "setMyAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakedTokenId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "tokensOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "ownerTokens", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStaked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vault", "outputs": [{ "internalType": "uint24", "name": "tokenId", "type": "uint24" }, { "internalType": "uint48", "name": "timestamp", "type": "uint48" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }]

const ADDRESS = "0xf5B8b39D930A85C4D94E4FD60BcAdF715d5e0C21";

const ChainID = '4'

let nfts = []

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
                    <p class="staking"><button id="stake" class="stake">Stake Now</button></p>
                    <p class="staking"><button id="unstake" class="stake">Unstake Now</button></p>
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
        theme: {
            background: "#4c08a5",
            main: "rgb(199, 199, 199)",
            secondary: "rgb(136, 136, 136)",
            border: "rgba(195, 195, 195, 0.14)",
            hover: "rgb(16, 26, 32)"
        },
        cacheProvider: true, // optional
        providerOptions, // required
    });

    if (!window.ethereum) return document.getElementById('addtoken').style.display='none';

    toastr.options.progressBar = true;
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';

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
    if(account) return toastr.info('Wallet Already Connected', 'INFO')

    console.log("connecting wallet...");
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();

        web3 = new Web3(provider);
        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }]
        });
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        
        nft = new web3.eth.Contract(NFTABI,NFTADDRESS);

        contract = new web3.eth.Contract(ABI, ADDRESS);

        supply = await contract.methods.totalStaked().call();
        Counts = await contract.methods.getCounts().call();


        stakedNFTs = await contract.methods.tokensOfOwner(account).call();
        EarnedTokens = await contract.methods.earningInfo(stakedNFTs).call()
        EarnedTokens = web3.utils.fromWei(`${EarnedTokens}`, 'ether');
        EarnedTokens = parseFloat(EarnedTokens)
        EarnedTokens = EarnedTokens.toFixed(2)
        document.getElementById("stakedBalance").textContent = `BALANCE : ${EarnedTokens} $ADV`;
        console.log(EarnedTokens)


        console.log(Counts)
        document.getElementById("Legendary").textContent = `${Counts[0]}/`;
        document.getElementById("Rare").textContent = `${Counts[1]}/`;
        document.getElementById("Original").textContent = `${Counts[2]}/`;

        // document.getElementById("supply").textContent = supply;

        document.getElementById('connectName').innerHTML = 'Connected';

        console.log("Provider is ", provider, "till here")
        console.log('check', provider.isMetamask)

        sessionStorage.setItem('isWalletConnected', true)
        toastr.success('Wallet Connected Successfully', 'SUCCESS')
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
}


async function connectRefresh() {

    let isConnected = sessionStorage.getItem('isWalletConnected');
    console.log(isConnected)
    if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();


    console.log("connecting wallet");
    console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();

        web3 = new Web3(provider);

        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4" }]
        });
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];

        nft = new web3.eth.Contract(NFTABI, NFTADDRESS);

        contract = new web3.eth.Contract(ABI, ADDRESS);

        // supply = await contract.methods.totalStaked().call();

        Counts = await contract.methods.getCounts().call();

        stakedNFTs = await contract.methods.tokensOfOwner(account).call();
        EarnedTokens = await contract.methods.earningInfo(stakedNFTs).call()
        EarnedTokens = web3.utils.fromWei(`${EarnedTokens}`, 'ether');
        EarnedTokens = parseFloat(EarnedTokens)
        EarnedTokens = EarnedTokens.toFixed(2)
        document.getElementById("stakedBalance").textContent = `BALANCE : ${EarnedTokens} $ADV`;
        console.log(EarnedTokens)


        console.log(Counts)
        document.getElementById("Legendary").textContent = `${Counts[0]}/`;
        document.getElementById("Rare").textContent = `${Counts[1]}/`;
        document.getElementById("Original").textContent = `${Counts[2]}/`;

        // document.getElementById("supply").textContent = supply;

        document.getElementById('connectName').innerHTML = 'Connected';

        console.log("Provider is ", provider, "till here")
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

}

async function onAddToken() {

    const tokenAddress = '0xd61Ee2ea29A699A5Fc792Daa81D604df0E1ce6F9';
    const tokenSymbol = 'ADV';
    const tokenDecimals = 18;
    // const tokenImage = 'http://placekitten.com/200/300';

    try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20', // Initially only supports ERC20, but eventually more!
                options: {
                    address: tokenAddress, // The address that the token is at.
                    symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                    decimals: tokenDecimals, // The number of decimals in the token
                    // image: tokenImage, // A string url of the token logo
                },
            },
        });

        if (wasAdded) {
            console.log('Thanks for your interest!');
        } else {
            console.log('Your loss!');
        }
    } catch (error) {
        console.log(error);
    }
}





async function onApprove(){
    
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');
    let checkApproved = await nft.methods.isApprovedForAll(account,ADDRESS).call();
    console.log(checkApproved)
    if(checkApproved == true) return toastr.info(`You have already Approved. You can proceed to stake your NFT`,'INFO');
    await nft.methods.setApprovalForAll(ADDRESS,true).send({from:account})
        .on('transactionHash', function (hash) {
            console.log(hash);
            tnxHash = hash;
        })
    toastr.success(`You were approved contract successfully, now you can stake your nfts <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
}
async function onStake() {
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');

    toastr.info('Enter Token Id that you wants to stake', 'Processing...')
    let nftToken;
    document.getElementById("myModal").style.display = "block";
    document.getElementById("unstake").style.display = "none";
    document.getElementById("stake").style.display = "block";

    document.getElementById('stake').onclick = () => {
        toastr.info('Confirm Transaction in wallet', 'Processing...')
        nftToken = document.getElementById("tokenID").value;
        nftToken = parseInt(nftToken);
        contract.methods.stake([nftToken]).send({ from: account})
        .on('transactionHash', function (hash) {
            console.log(hash);
            tnxHash = hash;
        })
        toastr.success(`Token Id ${nftToken} were staked, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })

    }
}

async function onStakeAll() {
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');

    toastr.info('Please wait...', 'Fetching NFT info', {timeOut:20*1000})
    let totalnfts = await nft.methods.totalSupply().call();
    console.log(totalnfts)
    document.getElementById('stakeAll').innerHTML = 'Checking NFTs...';
    for (let i = 0; i < totalnfts; i++) {

        // console.log(nft.methods.ownerOf(0).call())
        let addr = await nft.methods.ownerOf(i).call()
        // console.log(addr)
        if (addr == account) {
            nfts.push(i)
        }
    }
    console.log(nfts)
    if(nfts.length == 0){ 
        toastr.error(`You don't have Advent NFTs`,'ERROR'),
        document.getElementById('stakeAll').innerHTML = 'Stake All';
    } else {
        toastr.info('Processing...','Fetched NFT info')
    document.getElementById('stakeAll').innerHTML = 'Staking All NFTs..';
    await contract.methods.stake(nfts).send({ from: account })
        .on('transactionHash', function (hash) {
            console.log(hash);
            tnxHash = hash;
        })
        toastr.success(`You were staked your all ${nfts.length} Advent NFTs, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
    
        document.getElementById('stakeAll').innerHTML = 'Staked All NFTs';
    }
}


async function onUnstakeAll() {
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');
    toastr.info('Please wait', 'Processing')
    document.getElementById('unstakeAll').innerHTML = 'Please Wait...';
    
    // let stakedNFTs = await contract.methods.tokensOfOwner(account).call();
    console.log(stakedNFTs)
    if (stakedNFTs.length == 0) {
        toastr.warning(`You don't have any staked NFTs`,'WARNING'),
            document.getElementById('unstakeAll').innerHTML = 'Unstake All';
    } else {
        document.getElementById('unstakeAll').innerHTML = 'unstaking All NFTs';
        await contract.methods.unstake(stakedNFTs).send({ from: account })
            .on('transactionHash', function (hash) {
                console.log(hash);
                tnxHash = hash;
            })
        toastr.success(`You were unstaked your all ${stakedNFTs.length} Advent NFTs, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })

        document.getElementById('unstakeAll').innerHTML = 'unstaked All NFTs';
    }
}

async function onUnstake() {
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');

    toastr.info('Enter Token Id That You wants to Unstake',`INFO`);
    let nftTokken;
    document.getElementById("myModal").style.display = "block";
    document.getElementById("unstake").style.display = "block";
    document.getElementById("stake").style.display = "none";

    document.getElementById('unstake').onclick = async function () {
        toastr.info('Processing...')
        nftTokken = document.getElementById("tokenID").value;
        await contract.methods.unstake([nftTokken]).send({ from: account })
        .on('transactionHash', function (hash) {
            console.log(hash);
            tnxHash = hash;
        })
        toastr.success(`Token Id ${nftTokken} were unstaked, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
    }


}



async function onClaim() {
    if (!account) return toastr.error(`Please Connect Wallet First`,'ERROR');

        // let stakedNFTs = await contract.methods.tokensOfOwner(account).call();
        console.log(stakedNFTs)
        if (stakedNFTs.length == 0) return toastr.warning(`You don't have any staked NFTs to claim rewards`,'WARNING');

        toastr.info('Please wait...', 'PROCESSING!')
        
        EarnedTokens = await contract.methods.earningInfo(stakedNFTs).call()
        EarnedTokens = web3.utils.fromWei(`${EarnedTokens}`, 'ether');
        EarnedTokens = parseFloat(EarnedTokens)
        EarnedTokens = EarnedTokens.toFixed(2)
        console.log(EarnedTokens)

        await contract.methods.claim(stakedNFTs).send({ from: account })
            .on('transactionHash', function (hash) {
                console.log(hash);
                tnxHash = hash;
            })
            console.log(tnxHash)
    toastr.success(`Tokens Claimed Successfully, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
            

    }



$(document).ready(function () {
    document.getElementById("connect").addEventListener("click", onConnect);
});

window.addEventListener('load', async () => {
    init();
    connectRefresh();
    document.getElementById("connect").addEventListener("click", onConnect);
    document.querySelector("#Stake").addEventListener("click", onStake);
    document.querySelector("#stakeAll").addEventListener("click", onStakeAll);
    document.querySelector("#unstakeAll").addEventListener("click", onUnstakeAll);
    document.querySelector("#approve").addEventListener("click", onApprove);
    document.querySelector("#Unstake").addEventListener("click", onUnstake);
    document.querySelector("#claim").addEventListener("click", onClaim);
    document.querySelector("#addtoken").addEventListener("click", onAddToken);
});