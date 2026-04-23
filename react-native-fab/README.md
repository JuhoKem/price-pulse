# AuroraFAB — React Native

Premium floating action button with aurora energy field, drifting particles and a calm breathing pulse. Designed to drop into an Expo / React Native project.

## Install dependencies

```bash
# Expo
npx expo install expo-linear-gradient expo-blur react-native-svg react-native-reanimated

# Bare RN
npm i expo-linear-gradient expo-blur react-native-svg react-native-reanimated
cd ios && pod install
```

Add Reanimated's Babel plugin (must be **last** in the plugins array):

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
import AuroraFAB from './AuroraFAB';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      {/* ...your map... */}

      {/* Position over the bottom nav, like the web version */}
      <View style={{ position: 'absolute', bottom: 40, alignSelf: 'center' }}>
        <AuroraFAB onPress={() => console.log('Add price')} />
      </View>
    </View>
  );
}
```

## Customizing

- **Size**: change `FAB_SIZE` (button) and `AURORA_SIZE` (energy field) at the top of `AuroraFAB.tsx`.
- **Colors**: edit the gradient `colors` arrays in `AuroraRing`, `outerGlow`, and the core FAB `LinearGradient`.
- **Calmness**: increase ring `duration` values and `breath` duration to slow everything down.
- **Particles**: tweak count (`length: 14`), size range, and opacity in the `particles` `useMemo`.

## Notes

- Pure JS animations via Reanimated — no native modules beyond what Expo ships.
- `BlurView` is imported for future tweaks; current effect uses layered gradients + opacity for the soft aurora look (more performant on Android).
- Works on iOS, Android and Expo Go.
