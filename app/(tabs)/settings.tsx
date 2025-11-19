import { Logo } from '@/components/Logo';
import { useOneGoal } from '@/store/OneGoalStore'; // Importar el hook
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '@/constants/theme';

export default function SettingsScreen() {
  const { isPro, setProStatus } = useOneGoal(); // Usar el estado global
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
  
  const handleProToggle = (enabled: boolean) => {
    setProStatus(enabled);
    if (enabled) {
        Alert.alert("Pro Unlocked! 🎉", "You can now select custom cycle durations.");
    }
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
          <TouchableOpacity style={styles.proRow} disabled={isPro}>
            <View style={styles.proContent}>
              <Text style={styles.proTitle}>OneGoal Pro</Text>
              <Text style={styles.proSubtitle}>
                {isPro ? "Plan active. Thanks for your support!" : "Unlock longer cycles and more insights."}
              </Text>
            </View>
             {!isPro && <Text style={styles.chevron}>›</Text>}
             {isPro && <Text style={{fontSize: 16}}>✅</Text>}
          </TouchableOpacity>
        </View>
        
        {/* DEV SECTION - REMOVE IN PRODUCTION */}
        <View style={styles.section}>
            <Text style={styles.sectionHeader}>Developer Options</Text>
            <View style={styles.settingRow}>
                <Text style={styles.settingLabel}>Simulate Pro Status</Text>
                <Switch
                value={isPro}
                onValueChange={handleProToggle}
                trackColor={{ false: Colors.dark.card + '40', true: '#4A7AFF' }}
                />
            </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Preferences</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Haptic Feedback</Text>
            <Switch
              value={hapticFeedbackEnabled}
              onValueChange={handleHapticToggle}
              trackColor={{ false: Colors.dark.card + '40', true: '#4A7AFF' }}
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
    // ... (mismos estilos de antes)
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
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.dark.icon,
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
    color: Colors.dark.text,
  },
  proSubtitle: {
    fontSize: 13,
    color: Colors.dark.icon,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 17,
    color: Colors.dark.text,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  linkText: {
    fontSize: 17,
    color: Colors.dark.text,
  },
  chevron: {
    fontSize: 20,
    color: Colors.dark.icon,
  },
});