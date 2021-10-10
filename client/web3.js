//Change this file name to web3.js then uncomment the code below

 import Web3 from "web3";
 const HDWalletProvider = require("truffle-hdwallet-provider");

 const infura = "HTTP://127.0.0.1:7545";

 const pk = "dice blood oyster coyote resource trust close local clip elephant cute camera";

 const provider = new HDWalletProvider(pk, infura);
 const web3 = new Web3(provider);

 export { infura, pk };
 export default web3;