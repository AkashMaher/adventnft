var account = null;
var contract = null;

document.write(`<div class="popup">
                <div class = "popup-content" >
                <img src="https://www.freeiconspng.com/thumbs/x-png/black-x-png-27.png" alt="close" class="close">
                    <p class="popup-top-text"><b>Choose How Many to Mint</b></p>
                    <p class="slider"><input type="range" min="1" max="3" value="1" id="slider"></p>
                    <p class="slider-count">Count: <span id="slider-val"></span> </p>
                    <p class="mintt"><button id="mint" class="mint">Mint Now</button></p>
                    <p class="popup-last-text" href="https://twitter.com/thecultdao" target="_block">Powered by CMD</p>
                    <img src="https://assets-global.website-files.com/5b283a9ce1d84c649b724269/5b321dd937b49c6b5cc6ace5_pending.gif" class="waiting">
                    <p class="confirmation"><b>Confirm the transaction in your wallet</b></p>
                    <p class="confirm">Wait until transaction window appears. If you don't see the Confirm button, scroll down</p>
                </div>
    </div >`)
$(document).ready(function () {
    document.querySelector('.close').addEventListener('click', function () {
        document.querySelector('.popup').style.display = "none";
    });
});





// connect part

var provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://cloudflare-eth.com/", // https://ethereumnodes.com/
        137: "https://polygon-rpc.com/", // https://docs.polygon.technology/docs/develop/network-details/network/
        4: "https://rinkeby.infura.io/"// ...

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

        if (account != null) {
            document.getElementById("connect").innerText = "Connected";
        }
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
            var checkPrice = await contract.methods.getWlPrice().call()

            var price = (checkPrice).toLocaleString('fullwide', { useGrouping: false });
            console.log(price)

            const slider = document.getElementById('slider');
            var output = document.getElementById("slider-val");
            output.innerHTML = slider.value;

            slider.oninput = function () {
                output.innerHTML = this.value;
            }


            var check = await contract.methods.presaleList(account).call()
            console.log(check)

            var salestarted = await contract.methods.presaleIsActive().call()
            console.log(salestarted)
            // if()

            if (check !== "0" && salestarted !== false) {
                document.querySelector('.popup').style.display = "flex";
            }
            else if (salestarted === false) {
                document.querySelector('#mint-button').style.cursor = "no-drop";
                document.getElementById("mint-button").disabled = true;
                alert("Mint Not Started Yet")
            }
            else {
                //                         document.querySelector('#not-wl').style.display = "initial";
                document.querySelector('#mint-button').style.cursor = "no-drop";
                document.getElementById("mint-button").disabled = true;
                alert("Your wallet address is not whitelisted")
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
        } else { }
    } else {
        //                 await window.ethereum.send('eth_requestAccounts');
        window.web3 = new Web3(window.ethereum)
        window.web3.eth.defaultChain = "mainnet"
        var accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) return alert('Metamask Not Connected')
        var account = accounts[0];

        if (account != null) {
            document.getElementById("connect").innerText = "Connected";

        }

        var bal = await web3.eth.getBalance(account)
        var bals = await web3.utils.fromWei(bal, 'ether');
        var balance = parseFloat(bals).toFixed(2);

        // document.getElementById("wallet-address").textContent = account;
        // document.getElementById("balance").textContent = balance;

        let contract = new web3.eth.Contract(ABI, ADDRESS);


        var name = await contract.methods.name().call()
        var totalSupply = await contract.methods.totalSupply().call()
        var symbol = await contract.methods.symbol().call()

        var checkPrice = await contract.methods.getWlPrice().call()

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
        var check = await contract.methods.presaleList(account).call()
        console.log(check)

        var salestarted = await contract.methods.presaleIsActive().call()
        console.log(salestarted)

        if (check !=="0" && salestarted !==false) {
            document.querySelector('.popup').style.display = "flex";
        }
        else if (salestarted === false){
            document.querySelector('#mint-button').style.cursor = "no-drop";
            document.getElementById("mint-button").disabled = true;
            alert("Mint Not Started Yet")
        }
        else {
            //                         document.querySelector('#not-wl').style.display = "initial";
            document.querySelector('#mint-button').style.cursor = "no-drop";
            document.getElementById("mint-button").disabled = true;
            alert("Your wallet address is not whitelisted")
        }


        document.getElementById('mint').onclick = () => {
            let mintCount = document.getElementById("slider").value;
            let vall = price * mintCount
            var val = (vall).toLocaleString('fullwide', { useGrouping: false });
            contract.methods.whitelistMint(mintCount).send({ from: account, value: val });
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