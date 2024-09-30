import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDocument = mutation({
    args: {
        title: v.string(),
        creator: v.string(),
        pubkeys: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            title: args.title,
            creator: args.creator,
            pubkeys: args.pubkeys,
        });
    },
});

export const listDocuments = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("documents").collect();
    },
});