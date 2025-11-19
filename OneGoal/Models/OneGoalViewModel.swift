//
//  OneGoalViewModel.swift
//  OneGoal
//
//  Core view model managing habit state and persistence
//  Uses AppStorage for simple persistence (can migrate to CoreData later)
//

import SwiftUI
import Foundation

class OneGoalViewModel: ObservableObject {
    // MARK: - Published Properties
    @Published var habitName: String = ""
    @Published var currentDay: Int = 1
    @Published var totalDays: Int = 30
    @Published var hasCompletedToday: Bool = false
    @Published var lastCompletionDate: Date?
    @Published var hasCompletedOnboarding: Bool = false
    
    // MARK: - Computed Properties
    var progress: Double {
        guard totalDays > 0 else { return 0 }
        return Double(currentDay - 1) / Double(totalDays)
    }
    
    var isCycleComplete: Bool {
        currentDay > totalDays
    }
    
    // MARK: - Persistence Keys
    private let habitNameKey = "habitName"
    private let currentDayKey = "currentDay"
    private let totalDaysKey = "totalDays"
    private let lastCompletionDateKey = "lastCompletionDate"
    private let hasCompletedOnboardingKey = "hasCompletedOnboarding"
    
    // MARK: - Initialization
    init() {
        loadFromUserDefaults()
        checkTodayCompletion()
    }
    
    // MARK: - Persistence
    private func loadFromUserDefaults() {
        habitName = UserDefaults.standard.string(forKey: habitNameKey) ?? ""
        currentDay = UserDefaults.standard.integer(forKey: currentDayKey)
        if currentDay == 0 { currentDay = 1 } // Default to 1 if not set
        totalDays = UserDefaults.standard.integer(forKey: totalDaysKey)
        if totalDays == 0 { totalDays = 30 } // Default to 30 if not set
        
        if let dateData = UserDefaults.standard.data(forKey: lastCompletionDateKey),
           let date = try? JSONDecoder().decode(Date.self, from: dateData) {
            lastCompletionDate = date
        }
        
        hasCompletedOnboarding = UserDefaults.standard.bool(forKey: hasCompletedOnboardingKey)
    }
    
    private func saveToUserDefaults() {
        UserDefaults.standard.set(habitName, forKey: habitNameKey)
        UserDefaults.standard.set(currentDay, forKey: currentDayKey)
        UserDefaults.standard.set(totalDays, forKey: totalDaysKey)
        
        if let date = lastCompletionDate,
           let dateData = try? JSONEncoder().encode(date) {
            UserDefaults.standard.set(dateData, forKey: lastCompletionDateKey)
        }
        
        UserDefaults.standard.set(hasCompletedOnboarding, forKey: hasCompletedOnboardingKey)
    }
    
    // MARK: - Completion Logic
    func checkTodayCompletion() {
        guard let lastDate = lastCompletionDate else {
            hasCompletedToday = false
            return
        }
        
        let calendar = Calendar.current
        hasCompletedToday = calendar.isDateInToday(lastDate)
    }
    
    func markTodayComplete() {
        // Prevent double completion on the same day
        guard !hasCompletedToday else { return }
        
        let today = Date()
        let calendar = Calendar.current
        
        // If last completion was yesterday, increment day (continuing streak)
        if let lastDate = lastCompletionDate {
            if calendar.isDateInYesterday(lastDate) {
                currentDay += 1
            } else if !calendar.isDateInToday(lastDate) {
                // If last completion was before yesterday, we might want to reset
                // For now, we'll just increment from where we are
                // TODO: Consider streak reset logic here
                currentDay += 1
            }
        } else {
            // First completion - we've completed day 1, so move to day 2
            currentDay = 2
        }
        
        lastCompletionDate = today
        hasCompletedToday = true
        
        saveToUserDefaults()
    }
    
    // MARK: - Goal Management
    func startNewGoal(name: String, days: Int = 30) {
        habitName = name
        currentDay = 1
        totalDays = days
        lastCompletionDate = nil
        hasCompletedToday = false
        
        saveToUserDefaults()
    }
    
    func completeOnboarding() {
        hasCompletedOnboarding = true
        saveToUserDefaults()
    }
    
    // MARK: - Reset
    func resetCycle() {
        currentDay = 1
        lastCompletionDate = nil
        hasCompletedToday = false
        saveToUserDefaults()
    }
}

