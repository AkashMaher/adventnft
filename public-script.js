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
let tnxHash;
let mintCount;
let checkPrice;



const ABI = [{ "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }, { "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerIndexOutOfBounds", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TokenIndexOutOfBounds", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEVELOPER_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "developer", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "DEV_TEAM", "outputs": [{ "internalType": "string", "name": "web_url", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "Giveaway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "MintByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "SaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WL_Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "uint256", "name": "reservedAmount", "type": "uint256" }], "name": "addPresaleAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWlPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "presaleList", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "provenanceHash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxPerMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxWLMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newprice", "type": "uint256" }], "name": "setPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_provenanceHash", "type": "string" }], "name": "setProvenanceHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newWlPrice", "type": "uint256" }], "name": "setWLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }], "name": "setwithdrawWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startingIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const ADDRESS = "0x1f8752C327466E048d30F88038ED9331008E5eB9";

console.log(ADDRESS)
const ChainID = '4'

document.write(`<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="popup">
                <div class = "popup-content" >
                
                    <p class="popup-top-text"><b>Choose How Many to Mint</b></p>
                    <div class="dropdown-list">
                    <select name="mint-val" id="mint-val" class="mint-val">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                    </div>
                    <p class="mintt"><button id="mint" class="mint">Mint Now</button></p>
                    <p class="popup-last-text" >Minted: <span id="supply"></span> / 6666 ADV</p>
                    
                </div>
    </div >
  </div>

</div>
<div>`)
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
        cacheProvider: true, // optional
        providerOptions, // required
    });

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
    if (account) return toastr.info('Wallet Already Connected', 'INFO')

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

        supply = await contract.methods.totalSupply().call();

        var checkPrice = await contract.methods.getPrice().call()

        price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
        console.log(price)

        salestarted = await contract.methods.saleActive().call()
        console.log(salestarted)
        document.getElementById("supply").textContent = supply;
        sessionStorage.setItem('WalletConnected', true);
        document.getElementById('connectName').textContent = 'Connected';

        console.log("Provider is ", provider, "till here")
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

}

async function onRefreshPage() {

    let isConnected = sessionStorage.getItem('WalletConnected');
    console.log(isConnected)
    if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

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

        supply = await contract.methods.totalSupply().call();

        checkPrice = await contract.methods.getPrice().call()

        price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
        console.log(price)

        salestarted = await contract.methods.saleActive().call()
        console.log(salestarted)
        document.getElementById("supply").textContent = supply;

        console.log("Provider is ", provider, "till here")
        document.getElementById('connectName').textContent = 'Connected';


        setInterval(async function () {
            if (!account) return;
            let isConnected = sessionStorage.getItem('WalletConnected');
            if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

            salestarted = await contract.methods.saleActive().call();
            supply = await contract.methods.totalSupply().call();
            document.getElementById("supply").textContent = supply;
            checkPrice = await contract.methods.getPrice().call()
        }, 30000);

    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

}

async function onMint() {
    if (!account) return toastr.error(`Please Connect Wallet First`, 'ERROR');
    if (salestarted === true) {
        document.getElementById("myModal").style.display = "block";
        toastr.info('Select How Many You Wants to Mint and Click on Mint Button',"INFO")
    }
    else {
        toastr.info("Mint Not Started Yet","INFO")
    }

    document.getElementById('mint').onclick = async function () {
        document.getElementById('mint').innerHTML = 'Minting'
        toastr.info('Processing..','MINT')
        mintCount = document.getElementById("mint-val").value;
        let vall = price * mintCount
        var val = (vall).toLocaleString('fullwide', { useGrouping: false });
        await contract.methods.mint(mintCount).send({ from: account, value: val })
            .on('transactionHash', function (hash) {
                console.log(hash);
                tnxHash = hash;
            })
        toastr.success(`You have successfully minted ${mintCount} Advent NFTs, <a href="https://rinkeby.etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
        document.getElementById('mint').innerHTML = 'Mint Now'
        supply = await contract.methods.totalSupply().call();
        document.getElementById("supply").textContent = supply;
        

        
    }
}


window.addEventListener('load', async () => {
    init();
    onRefreshPage();
    document.querySelector("#connect").addEventListener("click", onConnect);
    document.querySelector("#mint-button").addEventListener("click", onMint);
});