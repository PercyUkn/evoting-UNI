//Change this file name to web3.js then uncomment the code below
import Web3 from "web3";
 const HDWalletProvider = require("truffle-hdwallet-provider");

 //const infura = "HTTP://127.0.0.1:7545"; //El de ganache
const infura = "https://goerli.infura.io/v3/1a8cbefb1c0441c0a1a7de24e0dd17af"; // El de Gorli

// const pk = "dice blood oyster coyote resource trust close local clip elephant cute camera"; //El de ganache
const pk = "budget quality shed bachelor age ghost plastic extend nice muscle actress beach"; // El de gorli

 const provider = new HDWalletProvider(pk, infura);
 const web3 = new Web3(provider);

 export { infura, pk };
 export default web3;