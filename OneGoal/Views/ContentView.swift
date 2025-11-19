//
//  ContentView.swift
//  OneGoal
//
//  Root view that handles navigation between onboarding and main app
//

import SwiftUI

struct ContentView: View {
    @EnvironmentObject var viewModel: OneGoalViewModel
    
    var body: some View {
        Group {
            if viewModel.hasCompletedOnboarding && !viewModel.habitName.isEmpty {
                MainTabView()
            } else {
                OnboardingView()
            }
        }
    }
}

