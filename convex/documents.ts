import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createDocument = mutation({
    args: {
        title: v.string(),
        creator: v.string(),
        pubkeys: v.array(v.string()),
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.insert("documents", {
            title: args.title,
            creator: args.creator,
            pubkeys: args.pubkeys,
        });

        args.pubkeys.forEach(async (pubkey) => {
            await ctx.db.insert("signatures", {
                documentId: document,
                pubkey: pubkey,
            });
        });
        return document;
    },
});

export const getDocumentByPubkey = query({
    args: {
        pubkey: v.string(),
    },
    handler: async (ctx, args) => {
        const signatureList = await ctx.db.query("signatures").withIndex("by_pubkey", (q) => q.eq("pubkey", args.pubkey)).collect();
        return signatureList;
    },
});

export const getDocumentById = query({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const document = await ctx.db.get(args.documentId);
        return document;
    },
});

export const getDocs = query({
    args: {
    },
    handler: async (ctx) => {
        const docs = await ctx.db.query("documents").collect();
        return docs;
    },
});

export const writeSignature = mutation({
    args: {
        documentId: v.id("documents"),
        signature: v.string(),
        pubkey: v.string(),
    },
    handler: async (ctx, args) => {
        const signature = await ctx.db
            .query("signatures")
            .withIndex("by_pubkey", (q) => q.eq("pubkey", args.pubkey))
            .filter((q) => q.eq(q.field("documentId"), args.documentId))
            .first();

        if (signature) {
            await ctx.db.patch(signature._id, {
                signature: args.signature,
            });
        } else {
            throw new Error("failed to write signature");
        }
    },
});