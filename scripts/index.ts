import { Contract, getDefaultProvider, Wallet, utils, BigNumber} from "ethers";
import { config, merkleRewardsContractAbi } from "./constants";
import { getRootAndSum, getMerkleProof } from "./utils";
import 'dotenv/config'

const provider = getDefaultProvider(process.env.RPC_URL);
const privateKey = process.env.DEPLOYER_PRIVATE_KEY;

if (!privateKey) {
  throw new Error('Private key not found')
}
const wallet = new Wallet(privateKey, provider);


export async function setMerkleRoot(network: string) {
  const merkleRewardsContract = config[network].merkleRewardsContract

  const { merkleRoot, totalRewards } = await getRootAndSum(merkleRewardsContract, network)
  console.log({ merkleRoot, totalRewards });


  if (!merkleRewardsContract) {
    throw new Error("invalid network");
  }
  
  const contract = new Contract(merkleRewardsContract, merkleRewardsContractAbi, wallet);

  const gasPrice = utils.parseUnits('1', 'gwei'); 


  try {
    const tx = await contract.setMerkleRoot(merkleRoot, totalRewards, {
      gasLimit: 1000000,
      gasPrice
    });
    console.log("Transaction hash:", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Error calling claim function:", error);
  }

}

export async function claimAmount(address: string, amount: string, network: string) {
  
  const merkleRewardsContract = config[network].merkleRewardsContract

  if (!merkleRewardsContract) {
    throw new Error("invalid network");
  }
  
  const proof = await getMerkleProof(address, BigNumber.from(amount), network)
  
  const contract = new Contract(merkleRewardsContract, merkleRewardsContractAbi, wallet);

  const gasPrice = utils.parseUnits('1', 'gwei'); 

  console.log({proof});
  

  try {
    const tx = await contract.claim(address, amount, proof, {
      gasLimit: 1500000,
      gasPrice
    });

    console.log("Transaction hash:", tx.hash);
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Transaction successful!");
  } catch (error) {
    console.error("Error calling claim function:", error);
  }

}