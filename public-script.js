var account = null;
var contract = null;

// var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("mint-button");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

const ABI = [{ "inputs": [{ "internalType": "uint256", "name": "_startPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_wlPrice", "type": "uint256" }, { "internalType": "uint256", "name": "_maxPerMint", "type": "uint256" }, { "internalType": "uint256", "name": "_maxwlperwallet", "type": "uint256" }, { "internalType": "string", "name": "_uri", "type": "string" }, { "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }, { "internalType": "uint256", "name": "max_supply", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "ApprovalCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "ApprovalQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "ApprovalToCurrentOwner", "type": "error" }, { "inputs": [], "name": "ApproveToCaller", "type": "error" }, { "inputs": [], "name": "BalanceQueryForZeroAddress", "type": "error" }, { "inputs": [], "name": "MintToZeroAddress", "type": "error" }, { "inputs": [], "name": "MintZeroQuantity", "type": "error" }, { "inputs": [], "name": "OwnerQueryForNonexistentToken", "type": "error" }, { "inputs": [], "name": "TransferCallerNotOwnerNorApproved", "type": "error" }, { "inputs": [], "name": "TransferFromIncorrectOwner", "type": "error" }, { "inputs": [], "name": "TransferToNonERC721ReceiverImplementer", "type": "error" }, { "inputs": [], "name": "TransferToZeroAddress", "type": "error" }, { "inputs": [], "name": "URIQueryForNonexistentToken", "type": "error" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" }], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "DEVELOPER_ADDRESS", "outputs": [{ "internalType": "address payable", "name": "developer", "type": "address" }], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "DEV_TEAM", "outputs": [{ "internalType": "string", "name": "web_url", "type": "string" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "Giveaway", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_receiver", "type": "address" }, { "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "MintByOwner", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "SaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "WL_Max_Per_Mint", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WithdrawAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address[]", "name": "addresses", "type": "address[]" }, { "internalType": "uint256", "name": "reservedAmount", "type": "uint256" }], "name": "addPresaleAddresses", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "baseURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "getApproved", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getWlPrice", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" }], "name": "isApprovedForAll", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "ownerOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleIsActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "presaleList", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "presaleStarted", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "provenanceHash", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" }], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "saleActive", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }], "name": "setBaseURI", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxPerMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "Value", "type": "uint256" }], "name": "setMaxWLMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newprice", "type": "uint256" }], "name": "setPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "string", "name": "_provenanceHash", "type": "string" }], "name": "setProvenanceHash", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_newWlPrice", "type": "uint256" }], "name": "setWLPrice", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address payable", "name": "_withdrawWallet", "type": "address" }], "name": "setwithdrawWallet", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startingIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" }], "name": "supportsInterface", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "tokenURI", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "quantity", "type": "uint256" }], "name": "whitelistMint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]

const ADDRESS = "0xa779ec5e25E759c7A048929D923360E0F8066889";

const ChainID = '4'

document.write(`<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <span class="close">&times;</span>
    <div class="popup">
                <div class = "popup-content" >
                
                    <p class="popup-top-text"><b>Choose How Many to Mint</b></p>
                    <p class="slider"><input type="range" min="1" max="5" value="1" id="slider"></p>
                    <p class="slider-count">Count: <span id="slider-val"></span> </p>
                    <p class="mintt"><button id="mint" class="mint">Mint Now</button></p>
                    <p class="popup-last-text" href="https://twitter.com/thecultdao" target="_block">Powered by CMD</p>
                    <img src="https://assets-global.website-files.com/5b283a9ce1d84c649b724269/5b321dd937b49c6b5cc6ace5_pending.gif" class="waiting">
                    <p class="confirmation"><b>Confirm the transaction in your wallet</b></p>
                    <p class="confirm">Wait until transaction window appears. If you don't see the Confirm button, scroll down</p>
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





// connect part

    var provider = new WalletConnectProvider.default({
        rpc: {
            1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
            137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
            4: "https://rinkeby.mycustomnode.com", // ...

        },
        // bridge: 'https://bridge.walletconnect.org',
    });

    var connectWC = async () => {

        if (!window.ethereum) {

            await provider.enable();

            //  Create Web3 instance
            const web3 = new Web3(provider);
            window.w3 = web3

            var accounts = await web3.eth.getAccounts(); // get all connected accounts
            account = accounts[0];
            
        }
        
        if (window.ethereum) {
            ethereum.request({ method: "eth_requestAccounts" });
            window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${ChainID}` }],
            });

            await window.ethereum.send('eth_requestAccounts');
            window.web3 = new Web3(window.ethereum)
            window.web3.eth.defaultChain = "mainnet"
            var accounts = await web3.eth.getAccounts();
            var account = accounts[0];

            // if (account != null) {
            //     document.getElementById("connect").innerText = "Connected";
            // }
        } 
    };
    var mintPopup = async () => {
        if (!window.ethereum) {
            const web3 = new Web3(provider);
            window.w3 = web3
            var accounts = await web3.eth.getAccounts(); // get all connected accounts
            account = accounts[0];
            
            if (w3) {
                let contract = new w3.eth.Contract(ABI, ADDRESS);
                var checkPrice = await contract.methods.getPrice().call()

                var price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
                console.log(price)

                const slider = document.getElementById('slider');
                var output = document.getElementById("slider-val");
                output.innerHTML = slider.value;

                slider.oninput = function () {
                    output.innerHTML = this.value;
                }
                // document.querySelector('.popup').style.display = "flex";


                var salestarted = await contract.methods.saleActive().call()
                console.log(salestarted)
                // if()

                if (salestarted !== false) {
                    document.getElementById("myModal").style.display = "block";
                    
                }
                else {
                    document.querySelector('#mint-button').style.cursor = "no-drop";
                    document.getElementById("mint-button").disabled = true;
                    alert("Mint Not Started Yet")
                }

                document.getElementById('mint').onclick = () => {
                    let mintCount = document.getElementById("slider").value;
                    let vall = price * mintCount
                    var val = (vall).toLocaleString('fullwide', { useGrouping: false });
                    contract.methods.mint(mintCount).send({ from: account, value: val });
                    // contract.methods.whitelistMint(mintCount).send({ from: account, value: val });

                    document.querySelector('.popup-top-text').style.display = "none";
                    document.querySelector('.slider').style.display = "none";
                    document.querySelector('.slider-count').style.display = "none";
                    document.querySelector('.mintt').style.display = "none";
                    document.querySelector('.popup-last-text').style.display = "none";
                    document.querySelector('.confirmation').style.display = "flex";
                    document.querySelector('.confirm').style.display = "flex";
                    document.querySelector('.waiting').style.display = "flex";

                }
            } else {}
        } else {
        //                 await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum)
        window.web3.eth.defaultChain = "mainnet"
        var accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) return alert('Metamask Not Connected')
        var account = accounts[0];

        // if (account != null) {
        //     document.getElementById("connect").innerText = "Connected";

        // }

        var bal = await web3.eth.getBalance(account)
        var bals = await web3.utils.fromWei(bal, 'ether');
        var balance = parseFloat(bals).toFixed(2);

        // document.getElementById("wallet-address").textContent = account;
        // document.getElementById("balance").textContent = balance;

        let contract = new web3.eth.Contract(ABI, ADDRESS);


        var name = await contract.methods.name().call()
        var totalSupply = await contract.methods.totalSupply().call()
        var symbol = await contract.methods.symbol().call()

        var checkPrice = await contract.methods.getPrice().call()

        var price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
        console.log(price)

        const slider = document.getElementById('slider');
        var output = document.getElementById("slider-val");
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
        }

        // document.getElementById('mint-button').addEventListener('click', function () {



        // })
            var salestarted = await contract.methods.saleActive().call()
            console.log(salestarted)

            if (salestarted !== false) {
                document.getElementById("myModal").style.display = "block";
            }
            else {
                document.querySelector('#mint-button').style.cursor = "no-drop";
                document.getElementById("mint-button").disabled = true;
                alert("Mint Not Started Yet")
            }

        document.getElementById('mint').onclick = () => {
            let mintCount = document.getElementById("slider").value;
            let vall = price * mintCount
            var val = (vall).toLocaleString('fullwide', { useGrouping: false });
            contract.methods.mint(mintCount).send({ from: account, value: val });
            // contract.methods.whitelistMint(mintCount).send({ from: account, value: val });

            document.querySelector('.popup-top-text').style.display = "none";
            document.querySelector('.slider').style.display = "none";
            document.querySelector('.slider-count').style.display = "none";
            document.querySelector('.mintt').style.display = "none";
            document.querySelector('.popup-last-text').style.display = "none";
            document.querySelector('.confirmation').style.display = "flex";
            document.querySelector('.confirm').style.display = "flex";
            document.querySelector('.waiting').style.display = "flex";
        }
    }
};