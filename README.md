# Halo Pop

A one-tap puzzle game. Coloured orbs ride a spinning halo. Tap to launch the centre orb into the slot under the arrow. Line up 3 or more of one colour to pop them; pop 4+ and the halo reverses direction. New orbs keep appearing, so the game ends when the halo is full.

## Run it
Open `www/index.html` in a browser, or run `npm run build` after editing `src/game.html`.

Every push to `main` publishes the web version to GitHub Pages (Settings -> Pages -> Source: GitHub Actions).

## Make the phone apps
```bash
npm install
npm run build
npx cap add android      # once
npx cap add ios          # once, on a Mac
npm run android          # opens Android Studio
npm run ios              # opens Xcode
```
Change `appId` in `capacitor.config.json` to your own reverse-domain ID before the first `cap add`.

## Monetisation plan
- Rewarded video (AdMob, `@capacitor-community/admob`) on "Watch ad - clear half the halo". One continue per game.
- Interstitial at most once every 3 games, never mid-game.
- "Remove ads" in-app purchase via RevenueCat.
- Use AdMob test IDs during development.

## Store checklist
- [ ] Icon 1024x1024, 4-6 screenshots, short gameplay video
- [ ] Privacy policy URL (can be a page on GitHub Pages)
- [ ] app-ads.txt on your site
- [ ] Google Play: closed test with 12+ testers for 14 days, then production
- [ ] App Store: TestFlight build, privacy labels, ATT prompt, submit for review
