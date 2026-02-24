import { StacksTestnet, StacksMainnet } from '@stacks/network';
import {
  AnchorMode,
  bufferCVFromString,
  callReadOnlyFunction,
  contractPrincipalCV,
  standardPrincipalCV,
  uintCV
} from '@stacks/transactions';

// Use Testnet by default; switch to Mainnet when ready
const useMainnet = false;
export const network = useMainnet ? new StacksMainnet() : new StacksTestnet();

export const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || 'ST000000000000000000002AMW42H'; // placeholder
export const CONTRACT_NAME =
  process.env.NEXT_PUBLIC_CONTRACT_NAME || 'proof-of-action';

// Read-only: get-count
export async function roGetCount(userAddress: string) {
  return callReadOnlyFunction({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-count',
    functionArgs: [standardPrincipalCV(userAddress)],
    senderAddress: userAddress
  });
}

// Read-only: get-action
export async function roGetAction(userAddress: string, id: number) {
  return callReadOnlyFunction({
    network,
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'get-action',
    functionArgs: [standardPrincipalCV(userAddress), uintCV(id)],
    senderAddress: userAddress
  });
}

// Transaction options for openContractCall (Stacks Connect)
export function txRecordActionOptions(userAddress: string, hashString: string) {
  return {
    contractAddress: CONTRACT_ADDRESS,
    contractName: CONTRACT_NAME,
    functionName: 'record-action',
    functionArgs: [bufferCVFromString(hashString)],
    network,
    anchorMode: AnchorMode.Any
  };
}
