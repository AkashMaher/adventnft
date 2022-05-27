"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal
let account;
let contract;
let salestarted
let price
let supply
let provider;
let selectedAccount;



const ABI = [{ "inputs": [{ "internalType": "contract AdventNFT", "name": "_nft", "type": "address" }, { "internalType": "contract AdventTokens", "name": "_token", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Claimed", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTStaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "NFTUnstaked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "Legendary", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LegendaryId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Original", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Rare", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "RareId", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetLegendaryRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetOrginalRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "SetRareRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addLegendaryIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "bool", "name": "a", "type": "bool" }], "name": "addRareIds", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "claimForAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "earningInfo", "outputs": [{ "internalType": "uint256[1]", "name": "info", "type": "uint256[1]" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "bytes", "name": "", "type": "bytes" }], "name": "onERC721Received", "outputs": [{ "internalType": "bytes4", "name": "", "type": "bytes4" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_myAddress", "type": "address" }], "name": "setMyAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "tokensOfOwner", "outputs": [{ "internalType": "uint256[]", "name": "ownerTokens", "type": "uint256[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalStaked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }], "name": "unstake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "vault", "outputs": [{ "internalType": "uint24", "name": "tokenId", "type": "uint24" }, { "internalType": "uint48", "name": "timestamp", "type": "uint48" }, { "internalType": "address", "name": "owner", "type": "address" }], "stateMutability": "view", "type": "function" }]

const ADDRESS = "0x0F2E15ccE60F16DCDd1870B13C77Bf296DA00529";

const ChainID = '4'

document.write(`<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="popup">
                <div class = "popup-content" >
                
                    <p class="popup-top-text"><b>Enter NFT Token ID</b></p>
                    <input type="text" id="tokenID" name="fname"><br><br>
                    <p class="staking"><button id="stake" class="stake">Stake Now</button></p>
                    <p class="staking"><button id="unstake" class="stake">Unstake Now</button></p>
                    <p class="staking"><button id="claim" class="stake">Claim Rewards</button></p>
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
        contract = new web3.eth.Contract(ABI, ADDRESS);

        supply = await contract.methods.totalStaked().call();

        document.getElementById("supply").textContent = supply;

        console.log("Provider is ", provider, "till here")
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

}

async function onStake() {

    document.getElementById("myModal").style.display = "block";

    document.getElementById('stake').onclick = () => {
        let nftToken = document.getElementById("tokenID").value;
        nftToken = parseInt(nftToken);
        contract.methods.stake([nftToken]).send({ from: account});

    }

    document.getElementById('unstake').onclick = () => {
        let nftTokken = document.getElementById("tokenID").value;
        contract.methods.unstake([nftTokken]).send({ from: account });

    }
    document.getElementById('claim').onclick = () => {
        let nftTokken = document.getElementById("tokenID").value;
        contract.methods.claim([nftTokken]).send({ from: account });

    }
}



window.addEventListener('load', async () => {
    init();
    document.querySelector("#connect").addEventListener("click", onConnect);
    document.querySelector("#Stake").addEventListener("click", onStake);
    // document.querySelector("#unstake").addEventListener("click", onUnstake);
});