# OneGoal iOS Project Setup Guide

## Creating the Xcode Project

1. Open Xcode and select "Create a new Xcode project"
2. Choose "iOS" → "App"
3. Fill in the project details:
   - Product Name: `OneGoal`
   - Team: (Select your team)
   - Organization Identifier: `com.yourcompany` (or your domain)
   - Interface: `SwiftUI`
   - Language: `Swift`
   - Storage: `None` (we're using UserDefaults/AppStorage)
   - Minimum Deployment: `iOS 17.0`
4. Save the project in the `OneGoal` directory

## Adding Files to Xcode

After creating the project, add the following file structure:

```
OneGoal/
├── OneGoalApp.swift (replace the default App file)
├── Models/
│   └── OneGoalViewModel.swift
├── Views/
│   ├── ContentView.swift
│   ├── HomeView.swift
│   ├── OnboardingView.swift
│   ├── MainTabView.swift
│   ├── RemindersView.swift
│   ├── StatsView.swift
│   ├── SettingsView.swift
│   ├── EndOfCycleView.swift
│   └── GoalPickerView.swift
└── Utilities/
    ├── Theme.swift
    └── HapticFeedback.swift
```

### Steps to Add Files:

1. Right-click on the project in the navigator
2. Select "New Group" and create folders: `Models`, `Views`, `Utilities`
3. Drag the corresponding `.swift` files into their respective groups
4. Make sure "Copy items if needed" is checked and "Add to targets: OneGoal" is selected

## Info.plist Configuration

The `Info.plist` file should already be created by Xcode. You can add notification permissions description:

```xml
<key>NSUserNotificationsUsageDescription</key>
<string>OneGoal needs permission to send you daily reminders about your habit.</string>
```

## Build and Run

1. Select a simulator (iPhone 15 Pro recommended) or connect a physical device
2. Press `Cmd + R` to build and run
3. The app should launch and show the onboarding flow

## Testing Checklist

- [ ] Onboarding flow completes successfully
- [ ] Goal can be set and saved
- [ ] Home screen shows progress ring
- [ ] "Done Today" button marks completion
- [ ] Button is disabled after completion
- [ ] Progress updates correctly
- [ ] Cycle completion shows end-of-cycle screen
- [ ] New goal can be selected after cycle completion
- [ ] Reminders can be enabled (requires notification permission)
- [ ] Settings screen is accessible
- [ ] Stats screen shows current progress

## Notes

- The app uses `UserDefaults`/`AppStorage` for persistence (ready for CoreData migration later)
- All state is managed through `OneGoalViewModel` as an `ObservableObject`
- The app follows MVVM architecture pattern
- No third-party dependencies required

