

## Plan: Generate PriceSpot mobile app icon set

I'll generate a cohesive 4-icon set using the AI image generation gateway (Gemini 2.5 Flash Image / "Nano banana"), matching the app's existing dark + violet/pink gradient aesthetic and using the map pin as the core symbol.

### Assets to produce

All saved to `public/assets/` (so they're bundled with the project and downloadable via GitHub export):

1. **`icon.png`** — Main app icon, 1024×1024
   - Dark gradient background (deep navy → violet → hot pink, matching `--gradient-primary`)
   - Centered minimal map pin symbol with soft inner glow
   - Subtle depth / shadow under the pin
   - Rounded composition (full-bleed; OS handles corner masking)

2. **`ios-icon.png`** — iOS variant, 1024×1024
   - Same visual as main icon
   - Tuned for Apple: balanced negative space, slightly larger pin, cleaner edges, no transparency (Apple masks corners automatically)

3. **`adaptive-icon.png`** — Android adaptive foreground, 1024×1024
   - Transparent background
   - Map pin symbol only, centered
   - Padded so the symbol sits within the inner ~66% safe zone (Android crops/masks the outer area)
   - Same gradient fill on the pin itself so it stays on-brand

4. **`notification-icon.png`** — Android notification, 1024×1024
   - Pure white, flat silhouette of the map pin
   - Transparent background
   - No gradients, no shadows, no glow — Android tints this automatically

### How it will be built

- Use `google/gemini-2.5-flash-image` via the Lovable AI Gateway with carefully tuned prompts per icon (one call per asset) so each variant respects its specific constraints (transparent bg, flat white, etc.).
- Write a small Node script that calls the gateway, decodes the returned base64, and saves each PNG directly to `public/assets/<filename>.png`.
- Verify each output by reading the saved PNG back to confirm dimensions, transparency where required, and visual fidelity. Iterate on any icon that doesn't meet spec (e.g., regenerate notification icon if it comes back with gradients).

### Visual direction (shared across all 4)

- Symbol: classic rounded "teardrop" map pin with a circular cutout — minimal, geometric, no extra ornamentation
- Palette: `#1a1033` deep indigo → `#7c3aed` violet → `#ec4899` pink (aligned with existing `--primary` and `--accent` tokens)
- Feel: premium, futuristic, Apple-grade finish — no text, no extra icons, no clutter

### Deliverables

After generation + QA, you'll have four production-ready PNGs in `public/assets/` that you can drop straight into an Expo / React Native project's `assets/` folder. I'll also point out the file paths so you can download them from the code editor or via GitHub.

