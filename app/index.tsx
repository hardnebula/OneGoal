import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useOneGoal } from '@/store/OneGoalStore';
import { Colors } from '@/constants/theme';

export default function Index() {
  const { hasCompletedOnboarding, habitName, isLoading } = useOneGoal();
  
  // Show loading while checking storage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.dark.background }}>
        <ActivityIndicator size="large" color={Colors.dark.tint} />
      </View>
    );
  }
  
  if (!hasCompletedOnboarding || !habitName) {
    return <Redirect href="/onboarding" />;
  }
  
  return <Redirect href="/(tabs)" />;
}

