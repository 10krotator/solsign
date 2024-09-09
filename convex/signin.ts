"use node";
import { action } from "./_generated/server";
import jwt from "jsonwebtoken";
import { api } from "./_generated/api";
import { v } from "convex/values";

const JWT_SECRET = process.env.JWT_SECRET || "sang123";   // Use environment variable, fallback to default for development

export const createJWT = action({
    args: { walletAddress: v.string() },
    handler: async (ctx, args): Promise<string> => {
        const { walletAddress } = args;

        const user = await ctx.runQuery(api.users.getByWalletAddress, { walletAddress });

        const payload = {
            userId: user?._id,
            walletAddress,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        if (!user) {
            await ctx.runMutation(api.users.create, { walletAddress, jwt: token });
        }

        return token;
    },
});