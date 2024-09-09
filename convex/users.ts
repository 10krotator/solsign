import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getByWalletAddress = query({
    args: { walletAddress: v.string() },
    handler: async (ctx, args) => {
        const { walletAddress } = args;
        const user = await ctx.db.query("users").withIndex("by_walletAddress", (q) => q.eq("walletAddress", walletAddress)).unique();
        return user;
    },
});

export const create = mutation({
    args: { 
        walletAddress: v.string(), 
        jwt: v.string() },
    handler: async (ctx, args) => {
        const { walletAddress, jwt } = args;
        return ctx.db.insert("users", { walletAddress, jwt });
    },
});