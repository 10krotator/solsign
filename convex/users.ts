import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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
