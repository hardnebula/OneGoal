import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  goals: defineTable({
    userId: v.string(),
    habitName: v.string(),
    currentDay: v.number(),
    totalDays: v.number(),
    lastCompletionDate: v.union(v.string(), v.null()),
    hasCompletedOnboarding: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_created", ["userId", "createdAt"]),
});

