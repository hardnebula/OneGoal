import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle, Path } from 'react-native-svg';

interface LogoProps {
  size?: number;
  style?: ViewStyle;
  showText?: boolean;
  textSize?: 'small' | 'medium' | 'large';
}

export function Logo({ size = 80, style, showText = false, textSize = 'medium' }: LogoProps) {
  const iconSize = size;
  const checkmarkSize = iconSize * 0.5;
  const circleRadius = iconSize * 0.35;
  const center = iconSize / 2;

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={['#6BC5FF', '#4AFF9E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.icon, { width: iconSize, height: iconSize, borderRadius: iconSize * 0.25 }]}>
        <Svg width={iconSize} height={iconSize} style={styles.svg}>
          {/* White circle */}
          <Circle
            cx={center}
            cy={center}
            r={circleRadius}
            stroke="#FFFFFF"
            strokeWidth={iconSize * 0.08}
            fill="none"
          />
          {/* White checkmark */}
          <Path
            d={`M ${center - checkmarkSize * 0.15} ${center} L ${center} ${center + checkmarkSize * 0.2} L ${center + checkmarkSize * 0.3} ${center - checkmarkSize * 0.1}`}
            stroke="#FFFFFF"
            strokeWidth={iconSize * 0.08}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </LinearGradient>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={[
            styles.text,
            textSize === 'small' && styles.textSmall,
            textSize === 'large' && styles.textLarge
          ]}>
            <Text style={styles.textBold}>O</Text>ne<Text style={styles.textBold}>G</Text>oal
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  svg: {
    position: 'absolute',
  },
  textContainer: {
    marginTop: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  textSmall: {
    fontSize: 16,
  },
  textLarge: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1,
  },
  textBold: {
    fontWeight: 'bold',
  },
});

