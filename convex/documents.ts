import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { ConvexError } from "convex/values";
export const createDocument = mutation({
    args: {
        title: v.string(),
        creator: v.string(),
        pubkeys: v.array(v.string()),
        irysFileId: v.optional(v.string()),
        storageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        if(args.storageId) {
            const exists = await ctx.storage.getUrl(args.storageId);
            if(!exists) {
                throw new ConvexError("File not found");
            }
        }

        const document = await ctx.db.insert("documents", {
            title: args.title,
            creator: args.creator,
            pubkeys: args.pubkeys,
            irysFileId: args.irysFileId,
            storageId: args.storageId,
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
        pubkey: v.optional(v.string()),
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
            throw new ConvexError("failed to write signature");
        }
    },
});

export const getSignatureByDocumentId = query({
    args: {
        documentId: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const signature = await ctx.db.query("signatures").withIndex("by_documentId", (q) => q.eq("documentId", args.documentId)).collect();
        return signature;
    },
});

// convex storage generate and retrieve url

export const generateUploadUrl = mutation({
    args: {
        contentType: v.string(),
    },
    handler: async (ctx, args) => {
        if(args.contentType == "application/pdf" || args.contentType == "image/png" || args.contentType == "image/jpeg") {
            const url = await ctx.storage.generateUploadUrl();
            console.log(url);
            return url;
        } else {
            throw new ConvexError("Invalid content type");
        }
    },
});

export const getFileUrl = query({
    args: {
        storageId: v.id("_storage")
    },
    handler: async (ctx, args) => {
        const url = await ctx.storage.getUrl(args.storageId);
        if (!url) {
            throw new ConvexError("File not found");
        }
        return url;
    },
});