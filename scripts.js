"use strict";

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
let web3Modal;
let account;
let contract;
let salestarted;
let price;
let supply;
let provider;
let selectedAccount;
let tnxHash;
let mintCount;
let checkPrice;
let MaxSupply;
let wl_price;
let vall;
let buf2hex;
let tree;
let wltree;
let wlbuf2hex;


const ABI = [{ "inputs": [{ "internalType": "string", "name": "_uri", "type": "string" }, { "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }, { "internalType": "bytes32", "name": "_wl", "type": "bytes32" }, { "internalType": "bytes32", "name": "_allow", "type": "bytes32" }, { "internalType": "uint256", "name": "_wltime", "type": "uint256" }, { "internalType": "uint256", "name": "_altime", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerIndexOutOfBounds", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TokenIndexOutOfBounds", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "AllowList", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "AllowStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "DEVELOPER_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "developer", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "MaxAllowedMints", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "Max_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "Max_Minted", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "MintByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "PauseMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newprice", "type": "uint256" }], "name": "Price", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_SetWLTime", "type": "uint256" }, { "internalType": "uint256", "name": "_SetAllowTime", "type": "uint256" }], "name": "StartMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newWlPrice", "type": "uint256" }], "name": "WLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WLStartTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Whitelist_OG", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValidAllowed", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32[]", "name": "proof", "type": "bytes32[]" }, { "internalType": "bytes32", "name": "leaf", "type": "bytes32" }], "name": "isValidWL", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }, { "internalType": "bytes32[]", "name": "sign", "type": "bytes32[]" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "_allowCode", "type": "bytes32" }, { "internalType": "bytes32", "name": "_wlCode", "type": "bytes32" }], "name": "setSigns", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "name": "setURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }], "name": "setwithdrawal", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" }], "name": "tokenOfOwnerByIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "wl_price", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]

const ADDRESS = "0xE521A06542a8D48587b905A6D74895fAAa660214";

// console.log(ADDRESS)
const ChainID = '1'

document.write(`<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close" id="closer">&times;</span>
    <div class="popup">
                <div class = "popup-content" >
                
                    <p class="popup-top-text"><b>Choose How Many to Mint</b></p>
                    <div class="dropdown-list">
                    <select name="mint-val" id="mint-val" class="mint-val">
                        <option id="11" value="1">1</option>
                        <option id="22" value="2">2</option>
                        <option id="33" value="3">3</option>
                    </select>
                    </div>
                    <p class="mintt"><button id="mint" class="mint">Mint Now</button></p>
                    <p class="popup-last-text" >Minted: <span id="supply"></span> / <span id="maxSupply"></span> ADV</p>
                    
                </div>
    </div >
  </div>

</div>
<div>`)
$(document).ready(function () {
    document.querySelector('#closer').addEventListener('click', function () {
        document.getElementById("myModal").style.display = "none";
    });
});

window.onclick = function (event) {
    if (event.target == document.getElementById("myModal")) {
        document.getElementById("myModal").style.display = "none";
    }
};

function checkBrowser() {
    // Get the user-agent string
    

    


}

async function walletConnect() {
    // await provider.enable();
    const provider = await web3Modal.connectTo("walletconnect");

    //  Create Web3 instance
    const web3 = new Web3(provider);


    var accounts = await web3.eth.getAccounts(); // get all connected accounts
    account = accounts[0];

    contract = new web3.eth.Contract(ABI, ADDRESS);

    supply = await contract.methods.totalSupply().call();

    var checkPrice = await contract.methods.price().call()

    price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
    // console.log(price)

    var checkWLPrice = await contract.methods.wl_price().call()

    wl_price = (checkWLPrice).toLocaleString('fullwide', { useGrouping: false });
    // console.log(wl_price)

    // salestarted = await contract.methods.saleActive().call()
    // console.log(salestarted)
    document.getElementById("supply").textContent = supply;
    sessionStorage.setItem('WalletConnected', true);
    document.getElementById('connectName').textContent = 'Connected';
    document.getElementById('connectName1').textContent = 'Connected';

    // console.log("Provider is ", provider, "till here")

    setInterval(async function () {
        if (!account) return;
        let isConnected = sessionStorage.getItem('WalletConnected');
        if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

        // salestarted = await contract.methods.saleActive().call();
        supply = await contract.methods.totalSupply().call();
        document.getElementById("supply").textContent = supply;
        checkPrice = await contract.methods.price().call()
        checkWLPrice = await contract.methods.wl_price().call()

        let mintednfts = await contract.methods.Max_Minted(account).call()
        mintednfts = parseInt(mintednfts)
        if (mintednfts == 1) {
            document.getElementById("33").style.display = "none";
        } else if (mintednfts == 2) {
            document.getElementById("33").style.display = "none";
            document.getElementById("22").style.display = "none";
        } else {
            // document.getElementById("myModal").style.display = "none";
        }
    }, 2000);
    // await closeBtnwc()
}

async function metamaskWallet() {
    
    await ethereum.request({ method: "eth_requestAccounts" });
    await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${ChainID}` }],
    });
    await window.ethereum.send('eth_requestAccounts');
    window.web3 = new Web3(window.ethereum)
    window.web3.eth.defaultChain = "mainnet"
    var accounts = await web3.eth.getAccounts(); // get all connected accounts
    account = accounts[0];

    contract = new web3.eth.Contract(ABI, ADDRESS);

    supply = await contract.methods.totalSupply().call();

    var checkPrice = await contract.methods.price().call()

    price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
    // console.log(price)

    var checkWLPrice = await contract.methods.wl_price().call()

    wl_price = (checkWLPrice).toLocaleString('fullwide', { useGrouping: false });
    // console.log(wl_price)

    // salestarted = await contract.methods.saleActive().call()
    // console.log(salestarted)
    document.getElementById("supply").textContent = supply;
    sessionStorage.setItem('WalletConnected', true);
    document.getElementById('connectName').textContent = 'Connected';
    document.getElementById('connectName1').textContent = 'Connected';

    // console.log("Provider is ", provider, "till here")

    setInterval(async function () {
        if (!account) return;
        let isConnected = sessionStorage.getItem('WalletConnected');
        if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

        // salestarted = await contract.methods.saleActive().call();
        supply = await contract.methods.totalSupply().call();
        document.getElementById("supply").textContent = supply;
        checkPrice = await contract.methods.price().call()
        checkWLPrice = await contract.methods.wl_price().call()

        let mintednfts = await contract.methods.Max_Minted(account).call()
        mintednfts = parseInt(mintednfts)
        if (mintednfts == 1) {
            document.getElementById("33").style.display = "none";
        } else if (mintednfts == 2) {
            document.getElementById("33").style.display = "none";
            document.getElementById("22").style.display = "none";
        } else {
            // document.getElementById("myModal").style.display = "none";
        }
    }, 2000);

    // await closeBtnmetamask()
}
async function init() {
    
    web3Modal = new Web3Modal({
        network: "mainnet",
        theme: "dark",
        cacheProvider: true, // optional
        providerOptions, // required
    });

    toastr.options.progressBar = true;
    toastr.options.showMethod = 'slideDown';
    toastr.options.hideMethod = 'slideUp';
    toastr.options.closeMethod = 'slideUp';

    let web3 = new Web3('https://cloudflare-eth.com/'); // https://mainnet.infura.io/v3/acb841f7dfdc4702a18f96fb9a6f68a6
    contract = new web3.eth.Contract(ABI, ADDRESS);
    supply = await contract.methods.totalSupply().call();
    MaxSupply = await contract.methods.MAX_SUPPLY().call()
    // document.getElementById("supply1").textContent = `${supply} / 6666`;
    document.getElementById("supply").textContent = supply;
    document.getElementById("maxSupply").textContent = MaxSupply;

    const leaves = al.map(x => keccak256(x))
    tree = new MerkleTree(leaves, keccak256, { sortPairs: true })
    buf2hex = x => '0x' + x.toString('hex')

    const leaveswl = wl.map(x => keccak256(x))
    wltree = new MerkleTree(leaveswl, keccak256, { sortPairs: true })
    wlbuf2hex = x => '0x' + x.toString('hex')

    // console.log(buf2hex(tree.getRoot()))
    // console.log(wlbuf2hex(wltree.getRoot()))

    

    let wltime = await contract.methods.WLStartTime().call()
    let Allowtime = await contract.methods.AllowStartTime().call()
    let currentTime = Date.now() / 1000

    
    if(currentTime>Allowtime && Allowtime>0) {
        document.getElementById("salestatus").textContent = "Allowlist Sale is Active";
    } else if ( currentTime>wltime && wltime>0){
        document.getElementById("salestatus").textContent = "Whitelist + OG Sale is Active";
    } else {
        document.getElementById("salestatus").textContent = "Sale is not Active";
    }

    setInterval(async function () {
        supply = await contract.methods.totalSupply().call();
        document.getElementById("supply").textContent = supply;
        // document.getElementById("supply1").textContent = `${supply} / 6666`;
    }, 2000);
    


}

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            infuraId: "acb841f7dfdc4702a18f96fb9a6f68a6"
        }
    },
};


async function detectBrowser(){
    let userAgentString =
        navigator.userAgent;

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;


    // Detect Opera
    let operaAgent =
        userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera     
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;

    // console.log(operaAgent)
    // console.log(chromeAgent)

}

detectBrowser()
async function onConnect() {
    if (account) return toastr.info('Wallet Already Connected', 'INFO')

    let userAgentString =
        navigator.userAgent;

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;


    // Detect Opera
    let operaAgent =
        userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera     
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;

    // console.log(operaAgent)
    // console.log(chromeAgent)
    // console.log(window.ethereum)

    if(operaAgent == true && window.ethereum){
        metamaskWallet()
    } else if (operaAgent == true && !window.ethereum){
        walletConnect()
    }
    else{

    

    // console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();
        var web3 = new Web3(provider);
        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }]
        });
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
    
        contract = new web3.eth.Contract(ABI, ADDRESS);

        supply = await contract.methods.totalSupply().call();

        var checkPrice = await contract.methods.price().call()

        price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
        // console.log(price)

        var checkWLPrice = await contract.methods.wl_price().call()

        wl_price = (checkWLPrice).toLocaleString('fullwide', { useGrouping: false });
        // console.log(wl_price)

        // salestarted = await contract.methods.saleActive().call()
        // console.log(salestarted)
        document.getElementById("supply").textContent = supply;
        sessionStorage.setItem('WalletConnected', true);
        document.getElementById('connectName').textContent = 'Connected';
        document.getElementById('connectName1').textContent = 'Connected';

        // console.log("Provider is ", provider, "till here")

        setInterval(async function () {
            if (!account) return;
            let isConnected = sessionStorage.getItem('WalletConnected');
            if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

            // salestarted = await contract.methods.saleActive().call();
            supply = await contract.methods.totalSupply().call();
            document.getElementById("supply").textContent = supply;
            checkPrice = await contract.methods.price().call()
            checkWLPrice = await contract.methods.wl_price().call()

            let mintednfts = await contract.methods.Max_Minted(account).call()
            mintednfts = parseInt(mintednfts)
            if (mintednfts == 1) {
                document.getElementById("33").style.display = "none";
            } else if (mintednfts == 2) {
                document.getElementById("33").style.display = "none";
                document.getElementById("22").style.display = "none";
            } else {
                // document.getElementById("myModal").style.display = "none";
            }
        }, 2000);

    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
}

}



async function onRefreshPage() {

    

    let isConnected = sessionStorage.getItem('WalletConnected');
    // console.log(isConnected)
    if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

    let userAgentString =
        navigator.userAgent;

    // Detect Chrome
    let chromeAgent =
        userAgentString.indexOf("Chrome") > -1;


    // Detect Opera
    let operaAgent =
        userAgentString.indexOf("OP") > -1;

    // Discard Chrome since it also matches Opera     
    if ((chromeAgent) && (operaAgent))
        chromeAgent = false;

    // console.log(operaAgent)
    // console.log(chromeAgent)
    // console.log(window.ethereum)

    if (operaAgent == true && window.ethereum) {
        metamaskWallet()
    } else if (operaAgent == true && !window.ethereum) {
        walletConnect()
    }
    else {
    // console.log("Opening a dialog", web3Modal);
    try {
        provider = await web3Modal.connect();

        var web3 = new Web3(provider);
        await web3.currentProvider.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }]
        });
        var accounts = await web3.eth.getAccounts();
        account = accounts[0];
        contract = new web3.eth.Contract(ABI, ADDRESS);

        supply = await contract.methods.totalSupply().call();

        var checkPrice = await contract.methods.price().call()

        price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
        // console.log(price)

        var checkWLPrice = await contract.methods.wl_price().call()

        wl_price = (checkWLPrice).toLocaleString('fullwide', { useGrouping: false });
        // console.log(wl_price)

        // salestarted = await contract.methods.saleActive().call()
        // console.log(salestarted)
        document.getElementById("supply").textContent = supply;

        // console.log("Provider is ", provider, "till here")
        document.getElementById('connectName').textContent = 'Connected';
        document.getElementById('connectName1').textContent = 'Connected';


        setInterval(async function () {
            if (!account) return;
            let isConnected = sessionStorage.getItem('WalletConnected');
            if (!isConnected) return console.log('Not Connected'), web3Modal.clearCachedProvider();

            // salestarted = await contract.methods.saleActive().call();
            supply = await contract.methods.totalSupply().call();
            document.getElementById("supply").textContent = supply;
            checkPrice = await contract.methods.price().call()
            checkWLPrice = await contract.methods.wl_price().call()

            let mintednfts = await contract.methods.Max_Minted(account).call()
            mintednfts = parseInt(mintednfts)
            if (mintednfts == 1) {
                document.getElementById("33").style.display = "none";
            } else if (mintednfts == 2) {
                document.getElementById("33").style.display = "none";
                document.getElementById("22").style.display = "none";
            } else {
                // document.getElementById("myModal").style.display = "none";
            }
        }, 2000);

    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }
    }
}

async function onMint() {
    if (!account) return toastr.error(`Please Connect Wallet First`, 'ERROR');
    let wltime = await contract.methods.WLStartTime().call()
    let Allowtime = await contract.methods.AllowStartTime().call()

    let mintednfts = await contract.methods.Max_Minted(account).call()
    mintednfts = parseInt(mintednfts)
    let leafal = buf2hex(keccak256(account))
    let proofal = tree.getProof(leafal).map(x => buf2hex(x.data))
    let isValidAllowed = await contract.methods.isValidAllowed(proofal,leafal).call()

    let leafwl = wlbuf2hex(keccak256(account))
    let proofwl = wltree.getProof(leafwl).map(x => wlbuf2hex(x.data))
    let isValidWL = await contract.methods.isValidWL(proofwl, leafwl).call()


    // console.log(proofal)
    // console.log(proofwl)
    // console.log(mintednfts)
    // console.log(isValidAllowed)
    // console.log(isValidWL)

    let currentTime = Date.now() / 1000

    
    if(mintednfts==1){
        document.getElementById("33").style.display = "none";
    } else if (mintednfts == 2) {
        document.getElementById("33").style.display = "none";
        document.getElementById("22").style.display = "none";
    } 

    if (currentTime > Allowtime && isValidAllowed ==true && mintednfts < 3) {
        document.getElementById("myModal").style.display = "block";
        toastr.info('Select How Many You Wants to Mint and Click on Mint Button', "INFO")
    } else if (currentTime > wltime && isValidWL == true && mintednfts < 3 ) {
        document.getElementById("myModal").style.display = "block";
        toastr.info('Select How Many You Wants to Mint and Click on Mint Button', "INFO")
    } else if (currentTime > Allowtime && isValidAllowed == false) {
        toastr.error("Not a part of Allowlist", "ERROR")
    } else if (currentTime > wltime && currentTime < Allowtime && isValidWL == false) {
        toastr.error("Not a part of OG/Whitelist", "ERROR")
    } else if (currentTime > Allowtime && isValidAllowed == true && mintednfts == 3){
        toastr.error("You have reached maximum mint limit", "ERROR")
    } else if (currentTime > wltime && isValidWL == true && mintednfts == 3) {
        toastr.error("You have reached maximum mint limit", "ERROR")
    } else if (currentTime < wltime){
        toastr.info("Sale Not Started Yet", "INFO")
    }


    
    
    
    document.getElementById('mint').onclick = async function () {
        document.getElementById('mint').innerHTML = 'Minting'
        toastr.info('Processing..', 'MINT')
        

        mintCount = document.getElementById("mint-val").value;
        if (currentTime >Allowtime){
            
            let mintednfts = await contract.methods.Max_Minted(account).call()

            // if (mintednfts == 3) return toastr.error("You have reached maximum mint limit", "ERROR");
            let totalmintss = parseInt(mintCount)+parseInt(mintednfts)
            // console.log(totalmintss)
            // if (totalmintss > 3) return toastr.error(`You can only mint ${3 - mintednfts} more nfts`, "ERROR");
            
            // console.log(Date.now()/1000)
            // console.log(parseInt(Allowtime))
            vall = price * mintCount
            // console.log('test1')
            const leaf = buf2hex(keccak256(account))
            const proof = tree.getProof(leaf).map(x => buf2hex(x.data))

            // console.log(leaf)
            // console.log(proof)
            var val = (vall).toLocaleString('fullwide', { useGrouping: false });
            await contract.methods.mint(mintCount, proof).send({ from: account, value: val })
                .on('transactionHash', function (hash) {
                    console.log(hash);
                    tnxHash = hash;
                })
        } else if (currentTime > wltime){

            let mintednfts = await contract.methods.Max_Minted(account).call()
            
            if (mintednfts == 3) return toastr.error("You have reached maximum mint limit", "ERROR");
            // if (mintCount + mintednfts > 3) return toastr.error(`You can only mint ${3-mintednfts} more`, "ERROR");
            // console.log(Date.now() / 1000)
            // console.log(parseInt(wltime))
            vall = wl_price * mintCount
            // console.log('test2')
            const leaf = wlbuf2hex(keccak256(account))
            const proof = wltree.getProof(leaf).map(x => wlbuf2hex(x.data))

            // console.log(leaf)
            // console.log(proof)
            var val = (vall).toLocaleString('fullwide', { useGrouping: false });
            await contract.methods.mint(mintCount, proof).send({ from: account, value: val })
                .on('transactionHash', function (hash) {
                    console.log(hash);
                    tnxHash = hash;
                })
        } 
        // console.log(vall)
        
        toastr.success(`You have successfully minted ${mintCount} Advent NFT, <a href="https://etherscan.io/tx/${tnxHash}" target="_blank" style="color:yellow;">view on etherscan</a>`, 'SUCCESS', { timeOut: 30 * 1000, enableHtml: true, tapToDismiss: false })
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
    document.querySelector("#connect1").addEventListener("click", onConnect);
    document.querySelector("#mint-button1").addEventListener("click", onMint);
});