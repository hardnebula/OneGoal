//
//  HapticFeedback.swift
//  OneGoal
//
//  Haptic feedback utility that respects user preferences
//

import UIKit

struct HapticFeedback {
    private static var hapticFeedbackEnabled: Bool {
        UserDefaults.standard.bool(forKey: "hapticFeedbackEnabled")
    }
    
    static func impact(style: UIImpactFeedbackGenerator.FeedbackStyle = .medium) {
        // Default to true if not set
        let enabled = UserDefaults.standard.object(forKey: "hapticFeedbackEnabled") as? Bool ?? true
        guard enabled else { return }
        
        let generator = UIImpactFeedbackGenerator(style: style)
        generator.impactOccurred()
    }
    
    static func notification(type: UINotificationFeedbackGenerator.FeedbackType) {
        let enabled = UserDefaults.standard.object(forKey: "hapticFeedbackEnabled") as? Bool ?? true
        guard enabled else { return }
        
        let generator = UINotificationFeedbackGenerator()
        generator.notificationOccurred(type)
    }
    
    static func selection() {
        let enabled = UserDefaults.standard.object(forKey: "hapticFeedbackEnabled") as? Bool ?? true
        guard enabled else { return }
        
        let generator = UISelectionFeedbackGenerator()
        generator.selectionChanged()
    }
}

