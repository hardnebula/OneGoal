import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useOneGoal } from '@/store/OneGoalStore';

const suggestedGoals = [
  { name: 'Drink Water', emoji: '💧' },
  { name: 'Read 10 minutes', emoji: '📚' },
  { name: 'Meditate', emoji: '🧘' },
  { name: 'Walk 15 min', emoji: '🚶' },
  { name: 'Sleep earlier', emoji: '🌙' },
];

export default function GoalPickerScreen() {
  const router = useRouter();
  const { startNewGoal } = useOneGoal();
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customGoalText, setCustomGoalText] = useState('');

  const handleSelectGoal = (name: string) => {
    startNewGoal(name);
    router.back();
  };

  const handleCustomGoal = () => {
    if (customGoalText.trim()) {
      startNewGoal(customGoalText.trim());
      router.back();
    }
  };

  if (showCustomInput) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowCustomInput(false)}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Custom Goal</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.customContent}>
          <Text style={styles.inputTitle}>What's your OneGoal?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your custom goal"
            placeholderTextColor="#999"
            value={customGoalText}
            onChangeText={setCustomGoalText}
            autoFocus
          />
          <TouchableOpacity
            style={[styles.button, !customGoalText.trim() && styles.buttonDisabled]}
            onPress={handleCustomGoal}
            disabled={!customGoalText.trim()}>
            <Text style={styles.buttonText}>Start Goal</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Choose Your Goal</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {suggestedGoals.map((goal) => (
          <TouchableOpacity
            key={goal.name}
            style={styles.goalButton}
            onPress={() => handleSelectGoal(goal.name)}>
            <Text style={styles.goalEmoji}>{goal.emoji}</Text>
            <Text style={styles.goalName}>{goal.name}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={styles.goalButton}
          onPress={() => setShowCustomInput(true)}>
          <Text style={styles.goalEmoji}>✏️</Text>
          <Text style={styles.goalName}>Custom</Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  cancelButton: {
    fontSize: 17,
    color: '#4A7AFF',
  },
  placeholder: {
    width: 60,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  goalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  goalEmoji: {
    fontSize: 24,
  },
  goalName: {
    flex: 1,
    fontSize: 17,
    color: '#000',
  },
  chevron: {
    fontSize: 20,
    color: '#666',
  },
  customContent: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    gap: 24,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  input: {
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

