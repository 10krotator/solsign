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
        async authorize(credentials: Partial<Record<"publicKey" | "signature" | "message", unknown>>) {
            if (!credentials?.signature || !credentials?.publicKey || !credentials?.message) {
                throw new Error("Missing credentials");
            }

            try {
                const publicKey = new PublicKey(credentials.publicKey as string);
                const signature = Buffer.from(credentials.signature as string, "hex");
                const message = new TextEncoder().encode(credentials.message as string);

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
            } catch (error) {
                console.error("Auth error:", error);
                return null;
            }
        },
        }),
    ],
  // ... other NextAuth configuration options
});
