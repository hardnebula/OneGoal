//
//  Theme.swift
//  OneGoal
//
//  App-wide theming and styling utilities
//

import SwiftUI

struct Theme {
    // MARK: - Colors
    static let accentColor = Color(red: 74/255, green: 122/255, blue: 255/255) // #4A7AFF
    static let backgroundColor = Color(red: 247/255, green: 247/255, blue: 247/255) // #F7F7F7
    
    // MARK: - Fonts
    // Using system fonts with SF Pro defaults
    static func titleFont(size: CGFloat = 28, weight: Font.Weight = .semibold) -> Font {
        .system(size: size, weight: weight, design: .default)
    }
    
    static func bodyFont(size: CGFloat = 17, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight, design: .default)
    }
    
    static func subtextFont(size: CGFloat = 13, weight: Font.Weight = .regular) -> Font {
        .system(size: size, weight: weight, design: .default)
    }
}

