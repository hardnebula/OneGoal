import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Linking, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from '@/components/Logo';

export default function SettingsScreen() {
  const [hapticFeedbackEnabled, setHapticFeedbackEnabled] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const enabled = await AsyncStorage.getItem('hapticFeedbackEnabled');
      setHapticFeedbackEnabled(enabled !== 'false');
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem('hapticFeedbackEnabled', enabled.toString());
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleHapticToggle = (enabled: boolean) => {
    setHapticFeedbackEnabled(enabled);
    saveSettings(enabled);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Logo size={28} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Premium</Text>
          <TouchableOpacity style={styles.proRow}>
            <View style={styles.proContent}>
              <Text style={styles.proTitle}>OneGoal Pro</Text>
              <Text style={styles.proSubtitle}>Unlock longer cycles and more insights.</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Switch
              value={hapticFeedbackEnabled}
              onValueChange={handleHapticToggle}
              trackColor={{ false: '#E5E5E5', true: '#4A7AFF' }}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>About</Text>
          <TouchableOpacity
            style={styles.linkRow}
            onPress={() => Linking.openURL('mailto:support@onegoal.app')}>
            <Text style={styles.linkText}>Contact</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkText}>Privacy & Terms</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F7F7',
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
    padding: 20,
    gap: 24,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  proRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  proContent: {
    flex: 1,
    gap: 4,
  },
  proTitle: {
    fontSize: 17,
    color: '#000',
  },
  proSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 17,
    color: '#000',
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 17,
    color: '#000',
  },
  chevron: {
    fontSize: 20,
    color: '#666',
  },
});

