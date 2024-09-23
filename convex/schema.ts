import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        content: v.optional(v.string()),
        createdAt: v.optional(v.number()),
        updatedAt: v.optional(v.number()),
        pubkeys: v.optional(v.array(v.string())),
    }),
    profiles: defineTable({
        pubkey: v.string(),
        name: v.string(),
        avatar: v.string(),
    }),
});
