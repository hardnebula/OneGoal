# OneGoal iOS App

A minimal, high-quality iOS habit tracker focused on one habit at a time.

## Features

- **Single Habit Focus**: Track one habit per cycle (7, 14, 21, or 30 days)
- **Simple Daily Check-in**: Tap a button to mark completion for the day
- **Progress Visualization**: Beautiful circular progress ring showing your journey
- **Daily Reminders**: Optional notifications to keep you on track
- **Statistics**: Track your streak and completion rate
- **Clean Design**: Minimal UI with lots of white space and SF Pro fonts

## Project Structure

```
OneGoal/
├── OneGoalApp.swift          # Main app entry point
├── Models/
│   └── OneGoalViewModel.swift # Core view model with persistence
├── Views/
│   ├── ContentView.swift      # Root view (onboarding/main app)
│   ├── HomeView.swift         # Main screen with progress ring
│   ├── OnboardingView.swift   # Onboarding flow
│   ├── MainTabView.swift      # Tab navigation
│   ├── RemindersView.swift    # Notification settings
│   ├── StatsView.swift        # Statistics screen
│   ├── SettingsView.swift     # App settings
│   ├── EndOfCycleView.swift   # Completion celebration
│   └── GoalPickerView.swift   # Goal selection screen
└── Utilities/
    └── Theme.swift            # App theming
```

## Requirements

- iOS 17.0+
- Xcode 15.0+
- Swift 5.9+

## Setup

1. Open the project in Xcode
2. Build and run on a simulator or device
3. Complete the onboarding flow to get started

## Architecture

- **MVVM**: Lightweight Model-View-ViewModel pattern
- **Persistence**: Uses `AppStorage` and `UserDefaults` for simple state management (prepared for CoreData migration later)
- **SwiftUI**: Modern declarative UI framework
- **No Dependencies**: Pure Swift/SwiftUI implementation

## Future Enhancements

- CoreData migration for more robust persistence
- Subscription/paywall integration for OneGoal Pro
- Analytics integration
- iCloud sync
- Widget support
- Apple Watch companion app
