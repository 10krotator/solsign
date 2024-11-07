import { WebIrys } from "@irys/sdk";
import { WalletContextState } from '@solana/wallet-adapter-react';

export type WebIrysUploader = WebIrys;

export async function getSignerWebIrys(
  wallet: WalletContextState
): Promise<WebIrysUploader | null> {
  if (!wallet.connected || !wallet.publicKey) {
    console.log('Wallet is not connected or public key is not available');
    return null;
  }

  try {
    // Initialize WebIrys
    const webIrys = new WebIrys({
      url: "https://devnet.irys.xyz",  // For devnet
      token: "solana",
      wallet: {
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL_DEVNET as string,
        name: "solana",
        provider: wallet,
      },
      // config: {
      //   // Optional priority fee for Solana transactions
      //   priorityFee: {
      //     computeUnitPrice: 1000,
      //     computeUnitLimit: 5000
      //   }
      // }
    });

    // Connect to the node
    await webIrys.ready();

    return webIrys;
  } catch (error: unknown) {
    console.error('Error connecting to Irys:', error);
    return null;
  }
}

export async function webIrysUploadData(
  wallet: WalletContextState,
  data: Uint8Array,
  tags: { name: string; value: string }[]
): Promise<{ id: string } | null> {
  const webIrys = await getSignerWebIrys(wallet);
  if (!webIrys) {
    console.error('Failed to initialize WebIrys');
    return null;
  }

  try {
    const receipt = await webIrys.upload(Buffer.from(data), {
      tags: [
        ...tags,
        {
          name: 'application-name',
          value: 'solana-sign',
        },
      ],
    });
    return receipt;
  } catch (error) {
    console.error('Error uploading to Irys:', error);
    return null;
  }
}

export function getIrysGatewayUrl(fileId: string): string {
  return `https://gateway.irys.xyz/${fileId}`;
}
