/**
 * AuroraFAB.tsx — React Native (Expo) standalone component
 *
 * Premium floating action button with:
 *  - Blue → Purple → Pink gradient core
 *  - Soft aurora / Siri-like energy field
 *  - Drifting glowing particles
 *  - Calm breathing pulse
 *
 * Dependencies (install in your React Native project):
 *   expo install expo-linear-gradient expo-blur react-native-svg
 *   npm i react-native-reanimated
 *
 * Make sure Reanimated's Babel plugin is configured:
 *   // babel.config.js
 *   plugins: ['react-native-reanimated/plugin']
 *
 * Usage:
 *   import AuroraFAB from './AuroraFAB';
 *   <AuroraFAB onPress={() => console.log('tap')} />
 */

import React, { useEffect, useMemo } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
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

const FAB_SIZE = 72;
const AURORA_SIZE = 180;

type Props = {
  onPress?: () => void;
  style?: ViewStyle;
};

/* -------------------------------------------------------------------------- */
/*                                Plus Icon                                   */
/* -------------------------------------------------------------------------- */

const PlusIcon = () => (
  <Svg width={30} height={30} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 5v14M5 12h14"
      stroke="#ffffff"
      strokeWidth={2.6}
      strokeLinecap="round"
    />
  </Svg>
);

/* -------------------------------------------------------------------------- */
/*                               Aurora Ring                                  */
/* -------------------------------------------------------------------------- */

const AuroraRing = ({
  delay = 0,
  duration = 6000,
  colors,
  scaleFrom = 0.85,
  scaleTo = 1.15,
}: {
  delay?: number;
  duration?: number;
  colors: [string, string, string];
  scaleFrom?: number;
  scaleTo?: number;
}) => {
  const t = useSharedValue(0);
  const rot = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
    rot.value = withRepeat(
      withTiming(1, { duration: duration * 2, easing: Easing.linear }),
      -1,
      false,
    );
  }, [delay, duration, t, rot]);

  const style = useAnimatedStyle(() => ({
    opacity: interpolate(t.value, [0, 1], [0.25, 0.55]),
    transform: [
      { scale: interpolate(t.value, [0, 1], [scaleFrom, scaleTo]) },
      { rotate: `${interpolate(rot.value, [0, 1], [0, 360])}deg` },
    ],
  }));

  return (
    <Animated.View style={[styles.auroraRing, style]} pointerEvents="none">
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

/* -------------------------------------------------------------------------- */
/*                              Drifting Particle                             */
/* -------------------------------------------------------------------------- */

type ParticleConfig = {
  size: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
  opacity: number;
  color: string;
};

const Particle = ({ cfg }: { cfg: ParticleConfig }) => {
  const t = useSharedValue(0);

  useEffect(() => {
    t.value = withDelay(
      cfg.delay,
      withRepeat(
        withTiming(1, {
          duration: cfg.duration,
          easing: Easing.inOut(Easing.quad),
        }),
        -1,
        true,
      ),
    );
  }, [cfg, t]);

  const style = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(t.value, [0, 1], [cfg.startX, cfg.endX]) },
      { translateY: interpolate(t.value, [0, 1], [cfg.startY, cfg.endY]) },
    ],
    opacity: interpolate(t.value, [0, 0.5, 1], [0, cfg.opacity, 0]),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.particle,
        {
          width: cfg.size,
          height: cfg.size,
          borderRadius: cfg.size / 2,
          backgroundColor: cfg.color,
          shadowColor: cfg.color,
        },
        style,
      ]}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*                                  AuroraFAB                                 */
/* -------------------------------------------------------------------------- */

const AuroraFAB: React.FC<Props> = ({ onPress, style }) => {
  // Calm breathing pulse on the core button
  const breath = useSharedValue(0);
  const press = useSharedValue(0);

  useEffect(() => {
    breath.value = withRepeat(
      withTiming(1, { duration: 3200, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [breath]);

  const coreStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(breath.value, [0, 1], [1, 1.04]) *
          interpolate(press.value, [0, 1], [1, 0.92]),
      },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(breath.value, [0, 1], [0.45, 0.75]),
    transform: [{ scale: interpolate(breath.value, [0, 1], [1, 1.08]) }],
  }));

  // Generate particles once
  const particles = useMemo<ParticleConfig[]>(() => {
    const colors = ['#7AB8FF', '#A78BFA', '#F0A6E0', '#C4B5FD'];
    return Array.from({ length: 14 }).map((_, i) => {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 55 + Math.random() * 35;
      const driftAngle = angle + (Math.random() - 0.5) * 0.8;
      const driftRadius = radius + 15 + Math.random() * 25;
      return {
        size: 2 + Math.random() * 4,
        startX: Math.cos(angle) * radius,
        startY: Math.sin(angle) * radius,
        endX: Math.cos(driftAngle) * driftRadius,
        endY: Math.sin(driftAngle) * driftRadius - 10,
        duration: 4000 + Math.random() * 4000,
        delay: Math.random() * 3000,
        opacity: 0.35 + Math.random() * 0.4,
        color: colors[i % colors.length],
      };
    });
  }, []);

  return (
    <View style={[styles.wrapper, style]} pointerEvents="box-none">
      {/* Aurora energy field — multiple layered gradient rings */}
      <View style={styles.auroraContainer} pointerEvents="none">
        <AuroraRing
          colors={['#3B82F6', '#8B5CF6', '#EC4899']}
          duration={7000}
        />
        <AuroraRing
          colors={['#06B6D4', '#A855F7', '#F472B6']}
          duration={9000}
          delay={1200}
          scaleFrom={0.9}
          scaleTo={1.2}
        />
        <AuroraRing
          colors={['#60A5FA', '#C084FC', '#F0ABFC']}
          duration={11000}
          delay={2400}
          scaleFrom={0.8}
          scaleTo={1.1}
        />
      </View>

      {/* Drifting particles */}
      <View style={styles.particleContainer} pointerEvents="none">
        {particles.map((cfg, i) => (
          <Particle key={i} cfg={cfg} />
        ))}
      </View>

      {/* Outer soft glow behind the button */}
      <Animated.View style={[styles.outerGlow, glowStyle]} pointerEvents="none">
        <LinearGradient
          colors={['#3B82F6', '#A855F7', '#EC4899']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>

      {/* The FAB itself */}
      <Animated.View style={coreStyle}>
        <Pressable
          onPress={onPress}
          onPressIn={() => (press.value = withTiming(1, { duration: 120 }))}
          onPressOut={() => (press.value = withTiming(0, { duration: 180 }))}
          style={styles.fab}
          android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: true }}
        >
          <LinearGradient
            colors={['#3B82F6', '#8B5CF6', '#EC4899']}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          {/* Inner highlight for premium glassy depth */}
          <LinearGradient
            colors={['rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.6 }}
            style={StyleSheet.absoluteFill}
          />
          <PlusIcon />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default AuroraFAB;

/* -------------------------------------------------------------------------- */
/*                                   Styles                                   */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrapper: {
    width: AURORA_SIZE,
    height: AURORA_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  auroraContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  auroraRing: {
    position: 'absolute',
    width: AURORA_SIZE,
    height: AURORA_SIZE,
    borderRadius: AURORA_SIZE / 2,
    overflow: 'hidden',
    // Soft blur-like fade via opacity + large border radius
  },
  particleContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  particle: {
    position: 'absolute',
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  outerGlow: {
    position: 'absolute',
    width: FAB_SIZE + 28,
    height: FAB_SIZE + 28,
    borderRadius: (FAB_SIZE + 28) / 2,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#A855F7',
        shadowOpacity: 0.7,
        shadowRadius: 24,
        shadowOffset: { width: 0, height: 0 },
      },
      android: { elevation: 12 },
    }),
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
        shadowOpacity: 0.55,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 14 },
    }),
  },
});
