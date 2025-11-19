//
//  OnboardingView.swift
//  OneGoal
//
//  Onboarding flow with welcome, value prop, and goal input screens
//

import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @State private var currentPage = 0
    @State private var goalText = ""
    
    var body: some View {
        TabView(selection: $currentPage) {
            // Page 1: Welcome
            WelcomePageView(currentPage: $currentPage)
                .tag(0)
            
            // Page 2: Value Proposition
            ValuePropositionView(currentPage: $currentPage)
                .tag(1)
            
            // Page 3: Goal Input
            GoalInputView(goalText: $goalText, currentPage: $currentPage)
                .tag(2)
        }
        .tabViewStyle(.page)
        .indexViewStyle(.page(backgroundDisplayMode: .always))
    }
}

// MARK: - Welcome Page
struct WelcomePageView: View {
    @Binding var currentPage: Int
    
    var body: some View {
        VStack(spacing: 32) {
            Spacer()
            
            VStack(spacing: 16) {
                Text("OneGoal")
                    .font(.system(size: 48, weight: .bold))
                    .foregroundColor(Theme.accentColor)
                
                Text("One habit. One goal.")
                    .font(.system(size: 20, weight: .regular))
                    .foregroundColor(.secondary)
            }
            
            Spacer()
            
            Button(action: {
                withAnimation {
                    currentPage = 1
                }
            }) {
                Text("Get Started")
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
        .background(Theme.backgroundColor)
    }
}

// MARK: - Value Proposition Page
struct ValuePropositionView: View {
    @Binding var currentPage: Int
    
    var body: some View {
        VStack(spacing: 40) {
            Spacer()
            
            VStack(alignment: .leading, spacing: 24) {
                ValuePointView(
                    text: "Focus on one habit at a time.",
                    icon: "target"
                )
                
                ValuePointView(
                    text: "Build your streak.",
                    icon: "flame.fill"
                )
                
                ValuePointView(
                    text: "Improve with simple consistency.",
                    icon: "chart.line.uptrend.xyaxis"
                )
            }
            .padding(.horizontal, 32)
            
            Spacer()
            
            Button(action: {
                withAnimation {
                    currentPage = 2
                }
            }) {
                Text("Continue")
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
        .background(Theme.backgroundColor)
    }
}

struct ValuePointView: View {
    let text: String
    let icon: String
    
    var body: some View {
        HStack(spacing: 16) {
            Image(systemName: icon)
                .font(.system(size: 24))
                .foregroundColor(Theme.accentColor)
                .frame(width: 40)
            
            Text(text)
                .font(.system(size: 17, weight: .regular))
                .foregroundColor(.primary)
        }
    }
}

// MARK: - Goal Input Page
struct GoalInputView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    @Binding var goalText: String
    @Binding var currentPage: Int
    
    var body: some View {
        VStack(spacing: 40) {
            Spacer()
            
            VStack(spacing: 16) {
                Text("What's your OneGoal?")
                    .font(.system(size: 28, weight: .semibold))
                    .foregroundColor(.primary)
                    .multilineTextAlignment(.center)
                
                TextField("Drink more water", text: $goalText)
                    .font(.system(size: 17, weight: .regular))
                    .padding()
                    .background(Color(.systemGray6))
                    .cornerRadius(12)
                    .padding(.horizontal, 32)
            }
            
            Spacer()
            
            Button(action: {
                guard !goalText.trimmingCharacters(in: .whitespaces).isEmpty else { return }
                
                viewModel.startNewGoal(name: goalText.trimmingCharacters(in: .whitespaces))
                viewModel.completeOnboarding()
            }) {
                Text("Start My Goal")
                    .font(.system(size: 17, weight: .semibold))
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(goalText.trimmingCharacters(in: .whitespaces).isEmpty ? Color.gray : Theme.accentColor)
                    .cornerRadius(12)
            }
            .disabled(goalText.trimmingCharacters(in: .whitespaces).isEmpty)
            .padding(.horizontal, 32)
            .padding(.bottom, 60)
        }
        .background(Theme.backgroundColor)
    }
}

