import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const STORAGE_KEYS = {
  habitName: 'habitName',
  currentDay: 'currentDay',
  totalDays: 'totalDays',
  lastCompletionDate: 'lastCompletionDate',
  hasCompletedOnboarding: 'hasCompletedOnboarding',
};

export function OneGoalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<OneGoalState>({
    habitName: '',
    currentDay: 1,
    totalDays: 30,
    hasCompletedToday: false,
    lastCompletionDate: null,
    hasCompletedOnboarding: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    loadFromStorage().then(() => setIsLoading(false));
  }, []);

  // Check today's completion status
  useEffect(() => {
    checkTodayCompletion();
  }, [state.lastCompletionDate]);

  const loadFromStorage = async () => {
    try {
      const [habitName, currentDay, totalDays, lastCompletionDate, hasCompletedOnboarding] =
        await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.habitName),
          AsyncStorage.getItem(STORAGE_KEYS.currentDay),
          AsyncStorage.getItem(STORAGE_KEYS.totalDays),
          AsyncStorage.getItem(STORAGE_KEYS.lastCompletionDate),
          AsyncStorage.getItem(STORAGE_KEYS.hasCompletedOnboarding),
        ]);

      setState({
        habitName: habitName || '',
        currentDay: currentDay ? parseInt(currentDay, 10) : 1,
        totalDays: totalDays ? parseInt(totalDays, 10) : 30,
        hasCompletedToday: false,
        lastCompletionDate: lastCompletionDate || null,
        hasCompletedOnboarding: hasCompletedOnboarding === 'true',
      });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  };

  const saveToStorage = async (updates: Partial<OneGoalState>) => {
    try {
      const newState = { ...state, ...updates };
      await Promise.all([
        AsyncStorage.setItem(STORAGE_KEYS.habitName, newState.habitName),
        AsyncStorage.setItem(STORAGE_KEYS.currentDay, newState.currentDay.toString()),
        AsyncStorage.setItem(STORAGE_KEYS.totalDays, newState.totalDays.toString()),
        newState.lastCompletionDate
          ? AsyncStorage.setItem(STORAGE_KEYS.lastCompletionDate, newState.lastCompletionDate)
          : AsyncStorage.removeItem(STORAGE_KEYS.lastCompletionDate),
        AsyncStorage.setItem(
          STORAGE_KEYS.hasCompletedOnboarding,
          newState.hasCompletedOnboarding.toString()
        ),
      ]);
      setState(newState);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const checkTodayCompletion = () => {
    if (!state.lastCompletionDate) {
      setState((prev) => ({ ...prev, hasCompletedToday: false }));
      return;
    }

    const lastDate = new Date(state.lastCompletionDate);
    const today = new Date();
    const isToday =
      lastDate.getDate() === today.getDate() &&
      lastDate.getMonth() === today.getMonth() &&
      lastDate.getFullYear() === today.getFullYear();

    setState((prev) => ({ ...prev, hasCompletedToday: isToday }));
  };

  const markTodayComplete = async () => {
    if (state.hasCompletedToday) return;

    const today = new Date();
    const todayStr = today.toISOString();
    const calendar = {
      isDateInYesterday: (date: Date) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return (
          date.getDate() === yesterday.getDate() &&
          date.getMonth() === yesterday.getMonth() &&
          date.getFullYear() === yesterday.getFullYear()
        );
      },
    };

    let newCurrentDay = state.currentDay;

    if (state.lastCompletionDate) {
      const lastDate = new Date(state.lastCompletionDate);
      if (calendar.isDateInYesterday(lastDate)) {
        newCurrentDay = state.currentDay + 1;
      } else if (!state.hasCompletedToday) {
        newCurrentDay = state.currentDay + 1;
      }
    } else {
      newCurrentDay = 2; // First completion - move to day 2
    }

    await saveToStorage({
      currentDay: newCurrentDay,
      lastCompletionDate: todayStr,
      hasCompletedToday: true,
    });
  };

  const startNewGoal = async (name: string, days: number = 30) => {
    await saveToStorage({
      habitName: name,
      currentDay: 1,
      totalDays: days,
      lastCompletionDate: null,
      hasCompletedToday: false,
    });
  };

  const completeOnboarding = async () => {
    await saveToStorage({
      hasCompletedOnboarding: true,
    });
  };

  const resetCycle = async () => {
    await saveToStorage({
      currentDay: 1,
      lastCompletionDate: null,
      hasCompletedToday: false,
    });
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

