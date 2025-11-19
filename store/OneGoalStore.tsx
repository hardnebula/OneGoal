import { getUserId } from '@/lib/userId';
import { useMutation, useQuery } from 'convex/react';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../convex/_generated/api';

interface OneGoalState {
  habitName: string;
  currentDay: number;
  totalDays: number;
  hasCompletedToday: boolean;
  lastCompletionDate: string | null;
  hasCompletedOnboarding: boolean;
}

interface OneGoalContextType extends OneGoalState {
  markTodayComplete: () => void;
  startNewGoal: (name: string, days?: number) => void;
  completeOnboarding: () => void;
  resetCycle: () => void;
  progress: number;
  isCycleComplete: boolean;
  isLoading: boolean;
}

const OneGoalContext = createContext<OneGoalContextType | undefined>(undefined);

export function OneGoalProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoadingUserId, setIsLoadingUserId] = useState(true);

  // Obtener o generar el userId
  useEffect(() => {
    getUserId().then((id) => {
      setUserId(id);
      setIsLoadingUserId(false);
    });
  }, []);

  // Query para obtener el goal actual
  const goalData = useQuery(
    api.goals.getCurrentGoal,
    userId ? { userId } : 'skip'
  );

  // Mutations
  const markTodayCompleteMutation = useMutation(api.goals.markTodayComplete);
  const startNewGoalMutation = useMutation(api.goals.startNewGoal);
  const completeOnboardingMutation = useMutation(api.goals.completeOnboarding);
  const resetCycleMutation = useMutation(api.goals.resetCycle);
  const createGoalMutation = useMutation(api.goals.createGoal);

  // Estado derivado del goal
  const state: OneGoalState = goalData
    ? {
        habitName: goalData.habitName,
        currentDay: goalData.currentDay,
        totalDays: goalData.totalDays,
        hasCompletedToday: goalData.hasCompletedToday,
        lastCompletionDate: goalData.lastCompletionDate,
        hasCompletedOnboarding: goalData.hasCompletedOnboarding,
      }
    : {
        habitName: '',
        currentDay: 1,
        totalDays: 30,
        hasCompletedToday: false,
        lastCompletionDate: null,
        hasCompletedOnboarding: false,
      };

  const isLoading = isLoadingUserId || goalData === undefined;

  const markTodayComplete = async () => {
    if (!userId || state.hasCompletedToday) return;

    try {
      await markTodayCompleteMutation({ userId });
    } catch (error) {
      console.error('Error marking today as complete:', error);
    }
  };

  const startNewGoal = async (name: string, days: number = 30) => {
    if (!userId) return;

    try {
      await startNewGoalMutation({
        userId,
        habitName: name,
        totalDays: days,
      });
    } catch (error) {
      console.error('Error starting new goal:', error);
    }
  };

  const completeOnboarding = async () => {
    if (!userId) return;

    try {
      // Si no hay goal, crear uno primero
      if (!goalData) {
        await createGoalMutation({
          userId,
          habitName: '',
          totalDays: 30,
        });
      }
      await completeOnboardingMutation({ userId });
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const resetCycle = async () => {
    if (!userId) return;

    try {
      await resetCycleMutation({ userId });
    } catch (error) {
      console.error('Error resetting cycle:', error);
    }
  };

  const progress = state.totalDays > 0 ? (state.currentDay - 1) / state.totalDays : 0;
  const isCycleComplete = state.currentDay > state.totalDays;

  return (
    <OneGoalContext.Provider
      value={{
        ...state,
        markTodayComplete,
        startNewGoal,
        completeOnboarding,
        resetCycle,
        progress,
        isCycleComplete,
        isLoading,
      }}>
      {children}
    </OneGoalContext.Provider>
  );
}

export function useOneGoal() {
  const context = useContext(OneGoalContext);
  if (context === undefined) {
    throw new Error('useOneGoal must be used within a OneGoalProvider');
  }
  return context;
}

