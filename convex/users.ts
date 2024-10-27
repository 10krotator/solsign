import { mutation, query, httpAction } from "./_generated/server";
import { v } from "convex/values";

import { PublicKey } from '@solana/web3.js';
import bs58 from 'bs58';
import nacl from 'tweetnacl';
// import { sign, verify } from 'jsonwebtoken';
import * as jose from 'jose';

interface TokenPayload {
    id: string;
    wallet: string;
}

export const createUser = mutation({
    args: { publicKey: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_pubkey", (q) => q.eq("pubkey", args.publicKey))
            .first();
        if (user) {
            return user._id;
        } else {
            const userId = await ctx.db.insert("users", {
                pubkey: args.publicKey,
            });
            return userId;
        }
    },
});

export const getUserByPublicKey = query({
    args: { pubkey: v.string() },
    handler: async (ctx, args) => {
        if (!args.pubkey) {
            return null;
        }
        const user = await ctx.db
            .query("users")
            .withIndex("by_pubkey", (q) => q.eq("pubkey", args.pubkey))
            .first();
        return user;
    },
});


export const login = mutation({
    args: {
        publicKey: v.string(),
        signature: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { publicKey, signature, message }) => {
        console.log('Received login request:', { publicKey, signature, message });

        if (!publicKey || !signature || !message) {
            console.error('Missing required fields');
            return { success: false, error: 'Missing required fields' };
        }

        try {
            const isValidSignature = await verifySignature(publicKey, signature, message);
            if (!isValidSignature) {
            console.error('Invalid signature');
            return { success: false, error: 'Invalid signature' };
            }

            const user = await ctx.db
            .query('users')
            .withIndex("by_pubkey", (q) => q.eq("pubkey", publicKey))
            .first();

        let isNewUser = false;

            if (!user) {
            console.log('Creating new user');
            await ctx.db.insert('users', {
                pubkey: publicKey,
                // storageBytesAvailable: 100 * 1024 * 1024, // 100 MB
                // storageUsed: 0,
                verified: true,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            isNewUser = true;
            } else if (!user.verified) {
            console.log('Updating unverified user');
            await ctx.db.patch(user._id, {
                verified: true,
                // storageBytesAvailable: 100 * 1024 * 1024, // 100 MB
                updatedAt: Date.now(),
            });
        }

        // const pendingShares = await ctx.db
        //   .query('fileShares')
        //   .filter(q => q.eq(q.field('sharedWithPK'), publicKey))
        //   .collect();

        const token = await generateToken(publicKey);

        console.log('Login successful');
            return {
            success: true,
            data: {
                token,
                user: {
                publicKey: user ? user.pubkey : publicKey,
                //   storageBytesAv ailable: user ? user.storageBytesAvailable : 100 * 1024 * 1024,
                //   storageUsed: user ? user.storageUsed : 0,
                verified: true,
                createdAt: user ? user.createdAt : Date.now(),
                updatedAt: user ? user.updatedAt : Date.now(),
                },
                isNewUser,
                // pendingShares: await Promise.all(pendingShares.map(async (share) => {
                //   const fileEntry = await ctx.db.get(share.fileEntryId);
                //   return {
                //     id: share._id,
                //     fileId: share.fileEntryId,
                //     fileName: fileEntry ? fileEntry.name : 'Unknown',
                //     sharedBy: share.ownerPK,
                //     permission: share.permission,
                //   };
                // })),
            },
            };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Internal server error' };
        }
        },
    });

export async function verifySignature(
        publicKey: string,
        signature: string,
        message: string
    ): Promise<boolean> {
        try {
            console.log('Verifying signature:', { publicKey, signature, message });
            const publicKeyObj = new PublicKey(publicKey);
            const signatureUint8 = bs58.decode(signature);
            const messageUint8 = bs58.decode(message);
            const result = nacl.sign.detached.verify(messageUint8, signatureUint8, publicKeyObj.toBytes());
            console.log('Signature verification result:', result);
            return result;
        } catch (error) {
            console.error('Error verifying signature:', error);
            return false;
        }
    }

    export async function generateToken(publicKey: string): Promise<string> {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new jose.SignJWT({ publicKey })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('24h')
          .sign(secret);
        return token;
      }


    export const verifyAuth = httpAction(async (ctx, request) => {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return new Response(
            JSON.stringify({ success: false, error: 'No token provided' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
        try {
          const token = authHeader.split(' ')[1];
          const secret = new TextEncoder().encode(process.env.JWT_SECRET);
          const { payload } = await jose.jwtVerify(token, secret);
          return new Response(
            JSON.stringify({
              success: true,
              data: {
                verified: true,
                payload
              }
            }),
            {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        } catch (error) {
          console.error('Token verification error:', error);
          return new Response(
            JSON.stringify({ success: false, error: 'Token verification failed' }),
            {
              status: 401,
              headers: { 'Content-Type': 'application/json' },
            }
          );
        }
      });


export async function verifyToken(token: string): Promise<TokenPayload | null> {
        if (!token) return null;

            try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const decoded = await jose.jwtVerify(token, secret) as unknown as TokenPayload;
            return decoded;
            } catch (error) {
            console.error('Error verifying token:', error);
            return null;
        }
    }