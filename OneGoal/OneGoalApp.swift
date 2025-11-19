//
//  OneGoalApp.swift
//  OneGoal
//
//  Main entry point for the OneGoal iOS app
//

import SwiftUI

@main
struct OneGoalApp: App {
    @StateObject private var viewModel = OneGoalViewModel()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(viewModel)
        }
    }
}

