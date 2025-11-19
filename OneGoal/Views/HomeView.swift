//
//  HomeView.swift
//  OneGoal
//
//  Main screen with progress ring and completion button
//

import SwiftUI

struct HomeView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @State private var showEndOfCycle = false
    
    var body: some View {
        NavigationView {
            ZStack {
                Theme.backgroundColor
                    .ignoresSafeArea()
                
                VStack(spacing: 40) {
                    Spacer()
                    
                    // Cycle info
                    VStack(spacing: 8) {
                        Text("Day \(min(viewModel.currentDay, viewModel.totalDays)) of \(viewModel.totalDays)")
                            .font(.system(size: 17, weight: .regular))
                            .foregroundColor(.secondary)
                        
                        Text(viewModel.habitName)
                            .font(.system(size: 24, weight: .semibold))
                            .foregroundColor(.primary)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)
                    }
                    
                    // Progress ring
                    ProgressRingView(progress: viewModel.progress, currentDay: viewModel.currentDay, totalDays: viewModel.totalDays)
                        .frame(width: 200, height: 200)
                    
                    // Completion button
                    VStack(spacing: 16) {
                        Button(action: {
                            HapticFeedback.impact(style: .medium)
                            viewModel.markTodayComplete()
                            
                            // Check if cycle is complete
                            if viewModel.isCycleComplete {
                                HapticFeedback.notification(type: .success)
                                showEndOfCycle = true
                            }
                        }) {
                            ZStack {
                                Circle()
                                    .fill(viewModel.hasCompletedToday ? Theme.accentColor.opacity(0.2) : Theme.accentColor)
                                    .frame(width: 80, height: 80)
                                
                                Image(systemName: "checkmark")
                                    .font(.system(size: 32, weight: .semibold))
                                    .foregroundColor(viewModel.hasCompletedToday ? Theme.accentColor : .white)
                            }
                        }
                        .disabled(viewModel.hasCompletedToday || viewModel.isCycleComplete)
                        .buttonStyle(PlainButtonStyle())
                        
                        Text(
                            viewModel.isCycleComplete ? "Cycle complete! 🎉" :
                            viewModel.hasCompletedToday ? "Nice work. Come back tomorrow." :
                            "Don't break the chain."
                        )
                        .font(.system(size: 15, weight: .regular))
                        .foregroundColor(.secondary)
                    }
                    
                    Spacer()
                }
                .padding()
            }
            .navigationTitle("OneGoal")
            .navigationBarTitleDisplayMode(.inline)
            .sheet(isPresented: $showEndOfCycle) {
                EndOfCycleView()
            }
        }
    }
}

// MARK: - Progress Ring View
struct ProgressRingView: View {
    let progress: Double
    let currentDay: Int
    let totalDays: Int
    
    @State private var animatedProgress: Double = 0
    
    var body: some View {
        ZStack {
            // Background ring
            Circle()
                .stroke(Theme.accentColor.opacity(0.2), lineWidth: 12)
            
            // Progress ring
            Circle()
                .trim(from: 0, to: animatedProgress)
                .stroke(
                    Theme.accentColor,
                    style: StrokeStyle(lineWidth: 12, lineCap: .round)
                )
                .rotationEffect(.degrees(-90))
                .animation(.easeInOut(duration: 0.8), value: animatedProgress)
            
            // Center text (showing completed days)
            VStack(spacing: 4) {
                Text("\(max(0, currentDay - 1))")
                    .font(.system(size: 48, weight: .semibold))
                    .foregroundColor(.primary)
                
                Text("/ \(totalDays)")
                    .font(.system(size: 20, weight: .regular))
                    .foregroundColor(.secondary)
            }
        }
        .onAppear {
            animatedProgress = progress
        }
        .onChange(of: progress) { newValue in
            animatedProgress = newValue
        }
    }
}

