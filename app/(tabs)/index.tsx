import { Logo } from '@/components/Logo';
import { useOneGoal } from '@/store/OneGoalStore';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { useAnimatedProps, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
  const router = useRouter();
  const {
    habitName,
    currentDay,
    totalDays,
    hasCompletedToday,
    isCycleComplete,
    progress,
    markTodayComplete,
    hasCompletedOnboarding,
  } = useOneGoal();
  const [showEndOfCycle, setShowEndOfCycle] = useState(false);
  const progressValue = useSharedValue(progress);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  // Don't navigate here - let RootLayout handle initial routing

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 800 });
  }, [progress]);

  const handleComplete = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await markTodayComplete();
    if (isCycleComplete) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowEndOfCycle(true);
    }
  };

  const animatedProps = useAnimatedProps(() => {
    const offset = circumference * (1 - progressValue.value);
    return {
      strokeDashoffset: offset,
    };
  });

  if (showEndOfCycle) {
    return (
      <View style={styles.container}>
        <View style={styles.celebrationContent}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.celebrationTitle}>You completed your OneGoal!</Text>
          <Text style={styles.celebrationSubtitle}>{totalDays} days of consistency.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push('/goal-picker');
              setShowEndOfCycle(false);
            }}>
            <Text style={styles.buttonText}>Choose New Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Logo size={32} style={styles.headerLogo} />
          <Text style={styles.headerTitle}>OneGoal</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.cycleInfo}>
            <Text style={styles.dayText}>
              Day {Math.min(currentDay, totalDays)} of {totalDays}
            </Text>
            <Text style={styles.habitName}>{habitName}</Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressRing}>
              <Svg width={200} height={200} style={styles.svg}>
                {/* Background ring */}
                <Circle
                  cx={100}
                  cy={100}
                  r={radius}
                  stroke="#4A7AFF33"
                  strokeWidth={12}
                  fill="none"
                />
                {/* Progress ring */}
                <AnimatedSvgCircle
                  cx={100}
                  cy={100}
                  r={radius}
                  stroke="#4A7AFF"
                  strokeWidth={12}
                  fill="none"
                  strokeDasharray={circumference}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                  animatedProps={animatedProps}
                />
              </Svg>
              <View style={styles.progressRingCenter}>
                <Text style={styles.progressNumber}>{Math.max(0, currentDay - 1)}</Text>
                <Text style={styles.progressTotal}>/ {totalDays}</Text>
              </View>
            </View>
          </View>

          <View style={styles.completionSection}>
            <TouchableOpacity
              style={[
                styles.completionButton,
                (hasCompletedToday || isCycleComplete) && styles.completionButtonDisabled,
              ]}
              onPress={handleComplete}
              disabled={hasCompletedToday || isCycleComplete}>
              <Text style={styles.completionButtonIcon}>✓</Text>
            </TouchableOpacity>
            <Text style={styles.completionText}>
              {isCycleComplete
                ? 'Cycle complete! 🎉'
                : hasCompletedToday
                  ? 'Nice work. Come back tomorrow.'
                  : "Don't break the chain."}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerLogo: {
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 40,
  },
  cycleInfo: {
    alignItems: 'center',
    gap: 8,
  },
  dayText: {
    fontSize: 17,
    color: '#666',
  },
  habitName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRing: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  svg: {
    position: 'absolute',
  },
  progressRingCenter: {
    alignItems: 'center',
    gap: 4,
  },
  progressNumber: {
    fontSize: 48,
    fontWeight: '600',
    color: '#000',
  },
  progressTotal: {
    fontSize: 20,
    color: '#666',
  },
  completionSection: {
    alignItems: 'center',
    gap: 16,
  },
  completionButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4A7AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionButtonDisabled: {
    backgroundColor: '#4A7AFF33',
  },
  completionButtonIcon: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFF',
  },
  completionText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
  },
  celebrationContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
    padding: 32,
  },
  celebrationEmoji: {
    fontSize: 80,
  },
  celebrationTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  celebrationSubtitle: {
    fontSize: 17,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4A7AFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
