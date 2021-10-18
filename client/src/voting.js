import web3 from "./web3/web3";

//const address = "0x614815dd8f3823F64cb76B88a7721705e6c89dD9" // Address del Smart Contract conectado en Remix 11-10-21 05:00 am
//"0x306Fc048C58f5c5837D15607dc3FbF682f738012"; address del admin o de otra cuenta de Ethereum?
// Es el address del smart contract
//const address = "0x614815dd8f3823F64cb76B88a7721705e6c89dD9" // Dirección del contato Vinculada con Remix IDE y Ganache
const address = "0x91E33e7E7a0125c7F713F930Be2112a34b6a44A6" // Dirección del contrato desplegado en el testnet Gorli


const abi = [
  {
    constant: false,
    inputs: [],
    name: "stopElection",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable", // No es transferencia a otro, sino ejecución de un smart contract
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "", type: "uint256" }],
    name: "candidates",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "id", type: "string" }],
    name: "register_candidate",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "startElection",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "get_num_candidates",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "i", type: "uint256" }],
    name: "get_candidate",
    outputs: [
      { name: "_candidate", type: "string" },
      { name: "_votes", type: "uint256" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "electionStarted",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "reset",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "electionAuthority",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "candidateName", type: "string" }],
    name: "vote",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  }
];

export default new web3.eth.Contract(abi, address,{gasPrice:'20000000000',gas:5000000});
