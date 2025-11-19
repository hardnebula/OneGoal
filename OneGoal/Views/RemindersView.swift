//
//  RemindersView.swift
//  OneGoal
//
//  Settings for daily reminder notifications
//

import SwiftUI
import UserNotifications

struct RemindersView: View {
    @AppStorage("dailyReminderEnabled") private var dailyReminderEnabled = false
    @AppStorage("reminderHour") private var reminderHour = 9
    @AppStorage("reminderMinute") private var reminderMinute = 0
    
    @State private var selectedTime = Date()
    @State private var showPermissionAlert = false
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    Toggle("Daily Reminder", isOn: $dailyReminderEnabled)
                        .onChange(of: dailyReminderEnabled) { enabled in
                            if enabled {
                                requestNotificationPermission()
                            } else {
                                cancelNotifications()
                            }
                        }
                    
                    if dailyReminderEnabled {
                        DatePicker(
                            "Time",
                            selection: $selectedTime,
                            displayedComponents: .hourAndMinute
                        )
                        .onChange(of: selectedTime) { newTime in
                            let components = Calendar.current.dateComponents([.hour, .minute], from: newTime)
                            reminderHour = components.hour ?? 9
                            reminderMinute = components.minute ?? 0
                            scheduleNotification()
                        }
                    }
                } footer: {
                    Text("Get a gentle reminder each day to complete your OneGoal.")
                }
            }
            .navigationTitle("Reminders")
            .onAppear {
                updateSelectedTime()
            }
            .alert("Notification Permission Required", isPresented: $showPermissionAlert) {
                Button("Settings") {
                    if let url = URL(string: UIApplication.openSettingsURLString) {
                        UIApplication.shared.open(url)
                    }
                }
                Button("Cancel", role: .cancel) {
                    dailyReminderEnabled = false
                }
            } message: {
                Text("Please enable notifications in Settings to receive daily reminders.")
            }
        }
    }
    
    private func updateSelectedTime() {
        var components = DateComponents()
        components.hour = reminderHour
        components.minute = reminderMinute
        if let date = Calendar.current.date(from: components) {
            selectedTime = date
        }
    }
    
    private func requestNotificationPermission() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { granted, error in
            DispatchQueue.main.async {
                if granted {
                    scheduleNotification()
                } else {
                    showPermissionAlert = true
                }
            }
        }
    }
    
    private func scheduleNotification() {
        guard dailyReminderEnabled else { return }
        
        let center = UNUserNotificationCenter.current()
        center.removeAllPendingNotificationRequests()
        
        let content = UNMutableNotificationContent()
        content.title = "OneGoal Reminder"
        content.body = "Don't forget your OneGoal today."
        content.sound = .default
        
        var dateComponents = DateComponents()
        dateComponents.hour = reminderHour
        dateComponents.minute = reminderMinute
        
        let trigger = UNCalendarNotificationTrigger(dateMatching: dateComponents, repeats: true)
        let request = UNNotificationRequest(identifier: "dailyReminder", content: content, trigger: trigger)
        
        center.add(request) { error in
            if let error = error {
                print("Error scheduling notification: \(error.localizedDescription)")
            }
        }
    }
    
    private func cancelNotifications() {
        UNUserNotificationCenter.current().removeAllPendingNotificationRequests()
    }
}

