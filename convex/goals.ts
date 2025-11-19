import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query para obtener el goal actual del usuario
export const getCurrentGoal = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const goals = await ctx.db
      .query("goals")
      .withIndex("by_user_created", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    if (!goals) {
      return null;
    }

    // Verificar si se completó hoy
    const today = new Date();
    const lastCompletionDate = goals.lastCompletionDate
      ? new Date(goals.lastCompletionDate)
      : null;

    const hasCompletedToday =
      lastCompletionDate &&
      lastCompletionDate.getDate() === today.getDate() &&
      lastCompletionDate.getMonth() === today.getMonth() &&
      lastCompletionDate.getFullYear() === today.getFullYear();

    return {
      ...goals,
      hasCompletedToday: hasCompletedToday || false,
    };
  },
});

// Mutation para crear un nuevo goal
export const createGoal = mutation({
  args: {
    userId: v.string(),
    habitName: v.string(),
    totalDays: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const goalId = await ctx.db.insert("goals", {
      userId: args.userId,
      habitName: args.habitName,
      currentDay: 1,
      totalDays: args.totalDays,
      lastCompletionDate: null,
      hasCompletedOnboarding: false,
      createdAt: now,
      updatedAt: now,
    });

    return goalId;
  },
});

// Mutation para marcar el día como completado
export const markTodayComplete = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db
      .query("goals")
      .withIndex("by_user_created", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    if (!goal) {
      throw new Error("No goal found for user");
    }

    // Verificar si ya se completó hoy
    const today = new Date();
    const lastCompletionDate = goal.lastCompletionDate
      ? new Date(goal.lastCompletionDate)
      : null;

    const hasCompletedToday =
      lastCompletionDate &&
      lastCompletionDate.getDate() === today.getDate() &&
      lastCompletionDate.getMonth() === today.getMonth() &&
      lastCompletionDate.getFullYear() === today.getFullYear();

    if (hasCompletedToday) {
      return goal._id; // Ya completado hoy
    }

    // Calcular el nuevo día
    let newCurrentDay = goal.currentDay;

    if (lastCompletionDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const isYesterday =
        lastCompletionDate.getDate() === yesterday.getDate() &&
        lastCompletionDate.getMonth() === yesterday.getMonth() &&
        lastCompletionDate.getFullYear() === yesterday.getFullYear();

      if (isYesterday) {
        newCurrentDay = goal.currentDay + 1;
      } else {
        newCurrentDay = goal.currentDay + 1;
      }
    } else {
      newCurrentDay = 2; // Primera completación - mover a día 2
    }

    await ctx.db.patch(goal._id, {
      currentDay: newCurrentDay,
      lastCompletionDate: today.toISOString(),
      updatedAt: Date.now(),
    });

    return goal._id;
  },
});

// Mutation para completar el onboarding
export const completeOnboarding = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db
      .query("goals")
      .withIndex("by_user_created", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    if (!goal) {
      throw new Error("No goal found for user");
    }

    await ctx.db.patch(goal._id, {
      hasCompletedOnboarding: true,
      updatedAt: Date.now(),
    });

    return goal._id;
  },
});

// Mutation para iniciar un nuevo goal
export const startNewGoal = mutation({
  args: {
    userId: v.string(),
    habitName: v.string(),
    totalDays: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const goalId = await ctx.db.insert("goals", {
      userId: args.userId,
      habitName: args.habitName,
      currentDay: 1,
      totalDays: args.totalDays,
      lastCompletionDate: null,
      hasCompletedOnboarding: true,
      createdAt: now,
      updatedAt: now,
    });

    return goalId;
  },
});

// Mutation para resetear el ciclo
export const resetCycle = mutation({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const goal = await ctx.db
      .query("goals")
      .withIndex("by_user_created", (q) => q.eq("userId", args.userId))
      .order("desc")
      .first();

    if (!goal) {
      throw new Error("No goal found for user");
    }

    await ctx.db.patch(goal._id, {
      currentDay: 1,
      lastCompletionDate: null,
      updatedAt: Date.now(),
    });

    return goal._id;
  },
});

