//
//  EndOfCycleView.swift
//  OneGoal
//
//  Celebration screen shown when user completes a cycle
//

import SwiftUI

struct EndOfCycleView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @Environment(\.dismiss) var dismiss
    @State private var showGoalPicker = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Theme.backgroundColor
                    .ignoresSafeArea()
                
                VStack(spacing: 32) {
                    Spacer()
                    
                    // Celebration emoji
                    Text("🎉")
                        .font(.system(size: 80))
                    
                    VStack(spacing: 12) {
                        Text("You completed your OneGoal!")
                            .font(.system(size: 28, weight: .semibold))
                            .foregroundColor(.primary)
                            .multilineTextAlignment(.center)
                        
                        Text("\(viewModel.totalDays) days of consistency.")
                            .font(.system(size: 17, weight: .regular))
                            .foregroundColor(.secondary)
                    }
                    .padding(.horizontal)
                    
                    Spacer()
                    
                    Button(action: {
                        showGoalPicker = true
                    }) {
                        Text("Choose New Goal")
                            .font(.system(size: 17, weight: .semibold))
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding()
                            .background(Theme.accentColor)
                            .cornerRadius(12)
                    }
                    .padding(.horizontal, 32)
                    .padding(.bottom, 60)
                }
            }
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showGoalPicker) {
                GoalPickerView()
                    .onDisappear {
                        // Dismiss this view when goal picker is dismissed (goal selected)
                        dismiss()
                    }
            }
        }
    }
}

