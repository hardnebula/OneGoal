//
//  StatsView.swift
//  OneGoal
//
//  Statistics and progress tracking
//

import SwiftUI

struct StatsView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @AppStorage("bestStreak") private var bestStreak = 0
    @AppStorage("totalCompletions") private var totalCompletions = 0
    
    var completionRate: Double {
        guard viewModel.totalDays > 0 else { return 0 }
        return Double(viewModel.currentDay - 1) / Double(viewModel.totalDays) * 100
    }
    
    var body: some View {
        NavigationView {
            ScrollView {
                VStack(spacing: 24) {
                    // Current cycle progress
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Current Cycle")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundColor(.primary)
                        
                        ProgressView(value: Double(viewModel.currentDay - 1), total: Double(viewModel.totalDays))
                            .tint(Theme.accentColor)
                            .scaleEffect(x: 1, y: 2, anchor: .center)
                        
                        Text("\(viewModel.currentDay - 1) / \(viewModel.totalDays) days")
                            .font(.system(size: 15, weight: .regular))
                            .foregroundColor(.secondary)
                    }
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                    
                    // Stats grid
                    HStack(spacing: 16) {
                        StatCardView(
                            title: "Best Streak",
                            value: "\(bestStreak)",
                            icon: "flame.fill"
                        )
                        
                        StatCardView(
                            title: "Completion Rate",
                            value: "\(Int(completionRate))%",
                            icon: "chart.pie.fill"
                        )
                    }
                    
                    // Previous goals (placeholder)
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Previous Goals")
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundColor(.primary)
                        
                        Text("No previous goals yet.")
                            .font(.system(size: 15, weight: .regular))
                            .foregroundColor(.secondary)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding()
                    .background(Color(.systemBackground))
                    .cornerRadius(12)
                }
                .padding()
            }
            .background(Theme.backgroundColor)
            .navigationTitle("Stats")
        }
    }
}

struct StatCardView: View {
    let title: String
    let value: String
    let icon: String
    
    var body: some View {
        VStack(spacing: 8) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(Theme.accentColor)
            
            Text(value)
                .font(.system(size: 32, weight: .bold))
                .foregroundColor(.primary)
            
            Text(title)
                .font(.system(size: 13, weight: .regular))
                .foregroundColor(.secondary)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(12)
    }
}

