import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDocument = mutation({
    args: {
        title: v.string(),
        creator: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("documents", {
            title: args.title,
            creator: args.creator,
        });
    },
});

export const listDocuments = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("documents").collect();
    },
});