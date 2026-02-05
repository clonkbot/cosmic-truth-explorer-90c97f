import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  // Claims submitted for cosmic verification
  claims: defineTable({
    text: v.string(),
    userId: v.id("users"),
    verdict: v.optional(v.string()), // "verified", "debunked", "cosmic_mystery"
    explanation: v.optional(v.string()),
    wittyResponse: v.optional(v.string()),
    cosmicFact: v.optional(v.string()),
    createdAt: v.number(),
    processedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"]),

  // Cosmic facts database for real-time exploration
  cosmicFacts: defineTable({
    title: v.string(),
    fact: v.string(),
    category: v.string(), // "black_holes", "stars", "galaxies", "physics", "mysteries"
    source: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_category", ["category"]),

  // User exploration history
  explorations: defineTable({
    userId: v.id("users"),
    topic: v.string(),
    timestamp: v.number(),
  }).index("by_user", ["userId"]),
});
