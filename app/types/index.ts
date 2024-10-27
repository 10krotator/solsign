import { SolanaSignInInputWithRequiredFields } from "@solana/wallet-standard-util";

export interface SiwsObject {
  siwsInput: SolanaSignInInputWithRequiredFields;
  signature: string;
}

export type StoredSIWSObject = {
  b58SignInMessage: string;
  b58Signature: string;
};