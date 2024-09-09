import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ... existing tables (if any)

    posts: defineTable({
        title: v.string(),
        content: v.string(),
        userId: v.string(),
    }),
    users: defineTable({
        walletAddress: v.string(),
        jwt: v.string(),
    })
    .index("by_walletAddress", ["walletAddress"]),
});
