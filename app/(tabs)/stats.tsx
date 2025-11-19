import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useOneGoal } from '@/store/OneGoalStore';
import { Logo } from '@/components/Logo';
import { Colors } from '@/constants/theme';

export default function StatsScreen() {
  const { currentDay, totalDays, progress } = useOneGoal();

  const completionRate = totalDays > 0 ? Math.round(((currentDay - 1) / totalDays) * 100) : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Logo size={28} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Stats</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Cycle</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentDay - 1} / {totalDays} days
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Best Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📊</Text>
            <Text style={styles.statValue}>{completionRate}%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Previous Goals</Text>
          <Text style={styles.emptyText}>No previous goals yet.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.dark.background,
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
    color: Colors.dark.text,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  section: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  progressBar: {
    height: 8,
    backgroundColor: Colors.dark.card + '40',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A7AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 15,
    color: Colors.dark.icon,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.dark.icon,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.dark.icon,
  },
});

