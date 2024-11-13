import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    creator: v.string(),
    content: v.optional(v.string()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
    pubkeys: v.optional(v.array(v.string())),
    storageId: v.optional(v.id("_storage")),
    irysFileId: v.optional(v.string()),
  }),
  signatures: defineTable({
    documentId: v.id("documents"),
    pubkey: v.optional(v.string()),
    signature: v.optional(v.string()),
  })
  .index("by_pubkey", ["pubkey"])
  .index("by_documentId", ["documentId"]),
  users: defineTable({
    pubkey: v.optional(v.string()),
    name: v.optional(v.string()),
    avatar: v.optional(v.string()),
    verified: v.optional(v.boolean()),
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }).index("by_pubkey", ["pubkey"]),
});
