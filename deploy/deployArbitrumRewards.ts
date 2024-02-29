import { ethers, run } from 'hardhat'
import { rewardTokenArb  } from "./constants";
async function main() {
  const MerkleRewards = await ethers.getContractFactory("MerkleRewards");
  
  const merkleRewards = await MerkleRewards.deploy(rewardTokenArb);

  await merkleRewards.deployed();

  
  console.log("MerkleRewards deployed to:", merkleRewards.address);

  await run("verify:verify", {
    address: merkleRewards.address,
    constructorArguments: [
      rewardTokenArb
    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});