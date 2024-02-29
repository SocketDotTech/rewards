export const merkleRewardsContractAbi = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      }
    ],
    "name": "Claimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "merkleRoot",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "totalRewards",
        "type": "uint256"
      }
    ],
    "name": "MerkleRootSet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalAmount",
        "type": "uint256"
      },
      {
        "internalType": "bytes32[]",
        "name": "proof",
        "type": "bytes32[]"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "totalAmounts",
        "type": "uint256[]"
      },
      {
        "internalType": "bytes32[]",
        "name": "proof",
        "type": "bytes32[]"
      },
      {
        "internalType": "bool[]",
        "name": "proofFlags",
        "type": "bool[]"
      }
    ],
    "name": "claimMultiple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentTotalRewards",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "merkleRoot",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "rewardsToken",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes32",
        "name": "_merkleRoot",
        "type": "bytes32"
      },
      {
        "internalType": "uint256",
        "name": "totalRewards",
        "type": "uint256"
      }
    ],
    "name": "setMerkleRoot",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "withdrawn",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export const config: Record<string, Record<string, string>> = {
  arbitrum: {
    merkleRewardsContract: "0x659A3A109789b19fe6B6cB36389eE77F1807C54f",
    rootJson: ""
  }
}