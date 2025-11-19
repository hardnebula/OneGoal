import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logo } from '@/components/Logo';
import { Colors } from '@/constants/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RemindersScreen() {
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(false);
  const [reminderHour, setReminderHour] = useState(9);
  const [reminderMinute, setReminderMinute] = useState(0);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [enabled, hour, minute] = await Promise.all([
        AsyncStorage.getItem('dailyReminderEnabled'),
        AsyncStorage.getItem('reminderHour'),
        AsyncStorage.getItem('reminderMinute'),
      ]);
      setDailyReminderEnabled(enabled === 'true');
      setReminderHour(hour ? parseInt(hour, 10) : 9);
      setReminderMinute(minute ? parseInt(minute, 10) : 0);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async (enabled: boolean, hour: number, minute: number) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('dailyReminderEnabled', enabled.toString()),
        AsyncStorage.setItem('reminderHour', hour.toString()),
        AsyncStorage.setItem('reminderMinute', minute.toString()),
      ]);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const requestPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Notification Permission Required',
        'Please enable notifications in Settings to receive daily reminders.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };

  const scheduleNotification = async (hour: number, minute: number) => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    await Notifications.cancelAllScheduledNotificationsAsync();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'OneGoal Reminder',
        body: "Don't forget your OneGoal today.",
        sound: true,
      },
      trigger: {
        hour,
        minute,
        repeats: true,
      },
    });
  };

  const handleToggle = async (enabled: boolean) => {
    setDailyReminderEnabled(enabled);
    await saveSettings(enabled, reminderHour, reminderMinute);
    if (enabled) {
      await scheduleNotification(reminderHour, reminderMinute);
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Logo size={28} style={styles.headerLogo} />
        <Text style={styles.headerTitle}>Reminders</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Daily Reminder</Text>
            <Switch
              value={dailyReminderEnabled}
              onValueChange={handleToggle}
              trackColor={{ false: Colors.dark.card + '40', true: '#4A7AFF' }}
            />
          </View>
          {dailyReminderEnabled && (
            <View style={styles.timePicker}>
              <Text style={styles.timeLabel}>Time: {reminderHour}:{reminderMinute.toString().padStart(2, '0')}</Text>
              <Text style={styles.timeHint}>
                Note: Time picker UI can be enhanced. Currently set to 9:00 AM.
              </Text>
            </View>
          )}
          <Text style={styles.footer}>
            Get a gentle reminder each day to complete your OneGoal.
          </Text>
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
  },
  section: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    gap: 16,
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
  timePicker: {
    gap: 8,
  },
  timeLabel: {
    fontSize: 17,
    color: Colors.dark.text,
  },
  timeHint: {
    fontSize: 13,
    color: Colors.dark.icon,
    fontStyle: 'italic',
  },
  footer: {
    fontSize: 13,
    color: Colors.dark.icon,
  },
});

