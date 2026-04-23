# PulsingFAB — React Native

Mirror of the web FAB on the MapScreen: gradient circle (blue → purple → pink) with a white `+` and three staggered pulsating rings expanding outward.

## Install

```bash
npx expo install expo-linear-gradient react-native-svg react-native-reanimated
```

Add the Reanimated Babel plugin (must be **last**):

```js
// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

## Usage

```tsx
import PulsingFAB from './PulsingFAB';

<View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
  <PulsingFAB onPress={() => console.log('Add price')} />
</View>
```

## Tweak

- `FAB_SIZE` — button diameter (default 64)
- `RING_MAX_SIZE` — how far rings expand (default 112)
- Ring `duration` (2000ms) and `delay` between each ring (600ms) inside `PulsingFAB.tsx`
- Gradient `colors` — match your brand
