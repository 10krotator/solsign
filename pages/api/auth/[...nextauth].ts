import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PublicKey } from "@solana/web3.js";
import * as nacl from "tweetnacl";

export default NextAuth({
    providers: [
        CredentialsProvider({
        name: "solana sign",
        credentials: {
            publicKey: { label: "Public Key", type: "text" },
            signature: { label: "Signature", type: "text" },
            message: { label: "Message", type: "text" },
        },
        async authorize(credentials) {
            if (
            !credentials?.publicKey ||
            !credentials?.signature ||
            !credentials?.message
            ) {
            return null;
            }

            const publicKey = new PublicKey(credentials.publicKey);
            const signature = Buffer.from(credentials.signature, "hex");
            const message = new TextEncoder().encode(credentials.message);

            const isValid = nacl.sign.detached.verify(
            message,
            signature,
            publicKey.toBytes(),
            );

            if (isValid) {
            return {
                id: publicKey.toBase58(),
                name: publicKey.toBase58(),
            };
            }

            return null;
        },
        }),
    ],
  // ... other NextAuth configuration options
});
