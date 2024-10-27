import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { SolanaSignInInputWithRequiredFields } from "@solana/wallet-standard-util";
import { SOLANA_MAINNET_CHAIN } from "@solana/wallet-standard";
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSiwsInput(
  publicKey: string,
  statement: string
): SolanaSignInInputWithRequiredFields {
  const now = new Date();

  return {
    domain: window.location.host,
    address: publicKey,
    statement,
    uri: window.location.origin,
    chainId: SOLANA_MAINNET_CHAIN,
    nonce: uuidv4(),
    issuedAt: now.toISOString(),
  };
}