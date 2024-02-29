import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'
import { BigNumber, Contract, getDefaultProvider, utils} from "ethers";
import {  merkleRewardsContractAbi, config } from "./constants";
import axios from 'axios';
import 'dotenv/config'


const provider = getDefaultProvider(process.env.RPC_URL);



export async function getRootAndSum(merkleRewardsContract: string, network: string) {
  const merkleTree = await bulidAndGetMerkleTree(network)
  
  const contract = new Contract(merkleRewardsContract, merkleRewardsContractAbi, provider);
  const currentMerkleRoot = await contract.merkleRoot()
  const newMerkleRoot = merkleTree.getHexRoot()

  if (newMerkleRoot === currentMerkleRoot) {
    console.log('Merkle root not changed');
    throw new Error('Merkle root not changed')
  }

  const claimEvents = await getClaimEvents(network)

  if (!claimEvents) {
    throw new Error("Claiming get events failed");
  }

  console.log({claimEvents: claimEvents.length});
  

  
  const rewardAmountSum = claimEvents?.reduce((acc, curr) => BigNumber.from(acc).add(BigNumber.from(curr.claimableAmount)) , BigNumber.from(0))
  const currentTotalRewards = await contract.currentTotalRewards()
  const currentTotalRewardsParsed = BigNumber.from(currentTotalRewards)
  const additonalRewards = rewardAmountSum.sub(currentTotalRewardsParsed)   
  const totalRewards = currentTotalRewardsParsed.add(additonalRewards)

  console.log({
    currentTotalRewards: currentTotalRewardsParsed.toString(),
    merkleRoot: newMerkleRoot.toString(),
    additonalRewards: additonalRewards.toString(),
    totalRewards: totalRewards.toString(),
  });
  
  return {
    merkleRoot: newMerkleRoot,
    totalRewards
  }
}


export async function bulidAndGetMerkleTree(network: string) {  
  const addresses = await getClaimEvents(network)

  console.log({ events: addresses?.length});
  

  if (!addresses) {
    throw new Error("claim addresses not found");
    
  }
  const merkleTreeLeaves = addresses?.map(event => {
    return hashLeaf(event.address, BigNumber.from(event.claimableAmount))
  })
  const tree = new MerkleTree(merkleTreeLeaves, keccak256, { sort: true })
  return tree
}

export async function getMerkleProof(address: string, amount: BigNumber, network: string) { 
    
  
  const merkleTree = await bulidAndGetMerkleTree(network)

  

  const leaf = hashLeaf(address, amount)
  
  const proof = merkleTree.getHexProof(leaf);

  
  console.log('isValidProof', merkleTree.verify(proof, leaf, merkleTree.getHexRoot()));
  
  const isValidProof = merkleTree.verify(proof, leaf, merkleTree.getHexRoot())
  
  if (!isValidProof) {
    throw new Error("Invalid Proof, pls check amount and address");
  }
  
  return proof
}

function hashLeaf (address: string, amount: BigNumber) {
  const salt = keccak256('SOCKET_REWARDS')
  return utils.solidityKeccak256(['bytes32', 'address', 'uint256'], [salt, address, amount])
}

const getClaimEvents = async (network: string): Promise<{
  address: string;
  claimableAmount: string;
}[] | undefined> => {

  const claimEventsEndPoint = config[network].rootJson
  try {
    const resp = await axios.get(claimEventsEndPoint)
    return resp.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}