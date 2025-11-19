import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useOneGoal } from '@/store/OneGoalStore';

export default function Index() {
  const { hasCompletedOnboarding, habitName, isLoading } = useOneGoal();
  
  // Show loading while checking storage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7F7F7' }}>
        <ActivityIndicator size="large" color="#4A7AFF" />
      </View>
    );
  }
  
  if (!hasCompletedOnboarding || !habitName) {
    return <Redirect href="/onboarding" />;
  }
  
  return <Redirect href="/(tabs)" />;
}

