//Change this file name to web3.js then uncomment the code below

 import Web3 from "web3";
 const HDWalletProvider = require("truffle-hdwallet-provider");

 const infura = "HTTP://127.0.0.1:7545";

 const pk = "dial civil mammal point slush cup legend memory job tackle firm rifle";

 const provider = new HDWalletProvider(pk, infura);
 const web3 = new Web3(provider);

 export { infura, pk };
 export default web3;