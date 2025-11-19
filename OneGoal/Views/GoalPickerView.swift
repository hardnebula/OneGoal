//
//  GoalPickerView.swift
//  OneGoal
//
//  Screen for selecting or creating a new goal
//

import SwiftUI

struct GoalPickerView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @Environment(\.dismiss) var dismiss
    @State private var customGoalText = ""
    @State private var showCustomInput = false
    
    let suggestedGoals = [
        ("Drink Water", "💧"),
        ("Read 10 minutes", "📚"),
        ("Meditate", "🧘"),
        ("Walk 15 min", "🚶"),
        ("Sleep earlier", "🌙")
    ]
    
    var body: some View {
        NavigationView {
            ZStack {
                Theme.backgroundColor
                    .ignoresSafeArea()
                
                ScrollView {
                    VStack(spacing: 16) {
                        // Suggested goals
                        ForEach(suggestedGoals, id: \.0) { goal in
                            GoalButton(
                                title: goal.0,
                                emoji: goal.1
                            ) {
                                selectGoal(name: goal.0)
                            }
                        }
                        
                        // Custom goal button
                        GoalButton(
                            title: "Custom",
                            emoji: "✏️"
                        ) {
                            showCustomInput = true
                        }
                    }
                    .padding()
                }
            }
            .navigationTitle("Choose Your Goal")
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showCustomInput) {
                CustomGoalInputView(customGoalText: $customGoalText)
            }
        }
    }
    
    private func selectGoal(name: String) {
        viewModel.startNewGoal(name: name)
        dismiss()
    }
}

struct GoalButton: View {
    let title: String
    let emoji: String
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            HStack {
                Text(emoji)
                    .font(.system(size: 24))
                
                Text(title)
                    .font(.system(size: 17, weight: .regular))
                    .foregroundColor(.primary)
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(12)
        }
        .buttonStyle(PlainButtonStyle())
    }
}

struct CustomGoalInputView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @Environment(\.dismiss) var dismiss
    @Binding var customGoalText: String
    
    var body: some View {
        NavigationView {
            VStack(spacing: 24) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("What's your OneGoal?")
                        .font(.system(size: 24, weight: .semibold))
                        .foregroundColor(.primary)
                    
                    TextField("Enter your custom goal", text: $customGoalText)
                        .font(.system(size: 17, weight: .regular))
                        .padding()
                        .background(Color(.systemGray6))
                        .cornerRadius(12)
                }
                .padding()
                
                Spacer()
                
                Button(action: {
                    guard !customGoalText.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                    viewModel.startNewGoal(name: customGoalText.trimmingCharacters(in: .whitespaces))
                    dismiss()
                }) {
                    Text("Start Goal")
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(customGoalText.trimmingCharacters(in: .whitespaces).isEmpty ? Color.gray : Theme.accentColor)
                        .cornerRadius(12)
                }
                .disabled(customGoalText.trimmingCharacters(in: .whitespaces).isEmpty)
                .padding()
            }
            .background(Theme.backgroundColor)
            .navigationTitle("Custom Goal")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .navigationBarTrailing) {
                    Button("Cancel") {
                        dismiss()
                    }
                }
            }
        }
    }
}

