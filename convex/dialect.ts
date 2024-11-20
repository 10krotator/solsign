"use node";

import { DialectCloudEnvironment, Dialect, ThreadMemberScope } from '@dialectlabs/sdk';
import { NodeDialectSolanaWalletAdapter, SolanaSdkFactory } from '@dialectlabs/blockchain-sdk-solana';

export async function sendDialectMessage(recipientPubKey: string, message: string) {

  const wallet = new NodeDialectSolanaWalletAdapter(
    JSON.parse(process.env.DIALECT_SDK_CREDENTIALS!),
  );

  // Create SDK instance
  const environment = 'production' as DialectCloudEnvironment;
  const dialectSdk = Dialect.sdk(
    {
      environment,
    },
    SolanaSdkFactory.create({
      wallet,
    }),
  );

  // Create or find thread
  const thread = await dialectSdk.threads.create({
    encrypted: false,
    me: {
      scopes: [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE],
    },
    otherMembers: [
      {
        address: recipientPubKey,
        scopes: [ThreadMemberScope.ADMIN, ThreadMemberScope.WRITE],
      },
    ],
  });

  // Send message
  await thread.send({ text: message });
}