/**
 * PulsingFAB.tsx — React Native (Expo) standalone component
 *
 * Mirrors the web FAB used on the MapScreen:
 *  - Blue → Purple → Pink gradient circle
 *  - White "+" icon
 *  - 3 staggered pulsating rings expanding outward
 *  - Subtle press scale animation
 *
 * Dependencies:
 *   npx expo install expo-linear-gradient react-native-svg react-native-reanimated
 *
 * Reanimated Babel plugin (must be LAST):
 *   // babel.config.js
 *   plugins: ['react-native-reanimated/plugin']
 *
 * Usage:
 *   import PulsingFAB from './PulsingFAB';
 *   <PulsingFAB onPress={() => console.log('add price')} />
 */

import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, ViewStyle, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';

const FAB_SIZE = 64;
const RING_MAX_SIZE = 112;

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
};

/* -------------------------- Plus Icon -------------------------- */

const PlusIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke="#ffffff"
      strokeWidth={2.5}
      strokeLinecap="round"
    />
  </Svg>
);

/* -------------------------- Pulse Ring -------------------------- */

const PulseRing = ({ delay }: { delay: number }) => {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration: 2000, easing: Easing.out(Easing.quad) }),
        -1,
        false,
      ),
    );
  }, [delay, t]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(t.value, [0, 0.1, 1], [0, 0.55, 0]),
    transform: [
      { scale: interpolate(t.value, [0, 1], [FAB_SIZE / RING_MAX_SIZE, 1]) },
    ],
  }));

  return (
    <Animated.View pointerEvents="none" style={[styles.ring, animatedStyle]}>
      <LinearGradient
        colors={['#3B82F6', '#8B5CF6', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

/* -------------------------- PulsingFAB -------------------------- */

const PulsingFAB: React.FC<Props> = ({ onPress, style }) => {
  const press = useSharedValue(0);

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(press.value, [0, 1], [1, 0.9]) }],
  }));

  return (
    <View style={[styles.wrapper, style]} pointerEvents="box-none">
      {/* Pulsating rings */}
      <PulseRing delay={0} />
      <PulseRing delay={600} />
      <PulseRing delay={1200} />

      {/* The button */}
      <Animated.View style={buttonStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={() => (press.value = withTiming(1, { duration: 120 }))}
          onPressOut={() => (press.value = withTiming(0, { duration: 180 }))}
          style={styles.fab}
          android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: true }}
        >
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <PlusIcon />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default PulsingFAB;

/* -------------------------- Styles -------------------------- */

const styles = StyleSheet.create({
  wrapper: {
    width: RING_MAX_SIZE,
    height: RING_MAX_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: RING_MAX_SIZE,
    height: RING_MAX_SIZE,
    borderRadius: RING_MAX_SIZE / 2,
    overflow: 'hidden',
  },
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#7C3AED',
        shadowOpacity: 0.5,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 12 },
    }),
  },
});
