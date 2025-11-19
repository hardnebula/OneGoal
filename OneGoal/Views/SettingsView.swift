//
//  SettingsView.swift
//  OneGoal
//
//  App settings and preferences
//

import SwiftUI

struct SettingsView: View {
    @AppStorage("hapticFeedbackEnabled") private var hapticFeedbackEnabled = true
    
    var body: some View {
        NavigationView {
            Form {
                Section {
                    // OneGoal Pro placeholder
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text("OneGoal Pro")
                                .font(.system(size: 17, weight: .regular))
                                .foregroundColor(.primary)
                            
                            Text("Unlock longer cycles and more insights.")
                                .font(.system(size: 13, weight: .regular))
                                .foregroundColor(.secondary)
                        }
                        
                        Spacer()
                        
                        Image(systemName: "chevron.right")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.secondary)
                    }
                } header: {
                    Text("Premium")
                }
                
                Section {
                    Toggle("Haptic Feedback", isOn: $hapticFeedbackEnabled)
                } header: {
                    Text("Preferences")
                }
                
                Section {
                    Link(destination: URL(string: "mailto:support@onegoal.app")!) {
                        HStack {
                            Text("Contact")
                                .foregroundColor(.primary)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundColor(.secondary)
                        }
                    }
                    
                    Button(action: {
                        // Placeholder for privacy & terms
                    }) {
                        HStack {
                            Text("Privacy & Terms")
                                .foregroundColor(.primary)
                            Spacer()
                            Image(systemName: "chevron.right")
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundColor(.secondary)
                        }
                    }
                } header: {
                    Text("About")
                }
            }
            .navigationTitle("Settings")
        }
    }
}

