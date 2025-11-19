import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useOneGoal } from '@/store/OneGoalStore';
import { Colors } from '@/constants/theme';
import { Logo } from '@/components/Logo';

export default function OnboardingScreen() {
  const router = useRouter();
  const { startNewGoal, completeOnboarding } = useOneGoal();
  const [currentPage, setCurrentPage] = useState(0);
  const [goalText, setGoalText] = useState('');

  const handleStartGoal = () => {
    if (goalText.trim()) {
      startNewGoal(goalText.trim());
      completeOnboarding();
      // Navigation will be handled by RootLayout
      router.replace('/(tabs)');
    }
  };

  if (currentPage === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Logo size={120} showText textSize="large" />
          <Text style={styles.subtitle}>One habit. One goal.</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentPage(1)}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (currentPage === 1) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.valuePoints}>
            <View style={styles.valuePoint}>
              <Text style={styles.valueIcon}>🎯</Text>
              <Text style={styles.valueText}>Focus on one habit at a time.</Text>
            </View>
            <View style={styles.valuePoint}>
              <Text style={styles.valueIcon}>🔥</Text>
              <Text style={styles.valueText}>Build your streak.</Text>
            </View>
            <View style={styles.valuePoint}>
              <Text style={styles.valueIcon}>📈</Text>
              <Text style={styles.valueText}>Improve with simple consistency.</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={() => setCurrentPage(2)}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.inputTitle}>What's your OneGoal?</Text>
        <TextInput
          style={styles.input}
          placeholder="Drink more water"
          placeholderTextColor="#999"
          value={goalText}
          onChangeText={setGoalText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, !goalText.trim() && styles.buttonDisabled]}
        onPress={handleStartGoal}
        disabled={!goalText.trim()}>
        <Text style={styles.buttonText}>Start My Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: 32,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4A7AFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
  },
  valuePoints: {
    gap: 24,
  },
  valuePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  valueIcon: {
    fontSize: 24,
    width: 40,
  },
  valueText: {
    fontSize: 17,
    color: '#000',
    flex: 1,
  },
  inputTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#E5E5E5',
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    color: '#000',
  },
  button: {
    backgroundColor: '#4A7AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

