# Halo Pop

A one-tap puzzle game. Coloured orbs ride a spinning halo. Tap to launch the centre orb into the slot under the arrow. Line up 3 or more of one colour to pop them; pop 4+ and the halo reverses direction. The game ends when the halo is full.

Play it: https://kylim01.github.io/halo-pop/ · Privacy policy: https://kylim01.github.io/halo-pop/privacy.html

## What's in here
| Path | What it is |
|---|---|
| `src/game.html` | The whole game (edit this) |
| `src/privacy.html` | Privacy policy page |
| `assets/` | App icon and splash source images |
| `scripts/build.mjs` | Builds `www/` for the app and website |
| `scripts/patch-native.mjs` | Adds AdMob IDs, tracking text and version number to the native projects |
| `.github/workflows/pages.yml` | Publishes the web version to GitHub Pages on every push |
| `.github/workflows/android.yml` | Builds a test APK and a Play Store bundle (.aab) on every push |
| `docs/store-listing.md` | Store text, keywords, screenshot plan, privacy answers |
| `app-ads.txt` | Template for your AdMob app-ads.txt |

## Ads
`src/game.html` uses `@capacitor-community/admob`:
- Rewarded video on "Watch ad · clear half the halo" (one continue per game)
- Interstitial at most once every 3 games, only between games
- Consent form for EEA/UK users and the iOS tracking prompt

It ships with Google's **test** ad IDs. Before release, put your real ad unit IDs in `AD_IDS` in `src/game.html`, and your AdMob app IDs in the repo secrets `ADMOB_APP_ID_ANDROID` (and `ADMOB_APP_ID_IOS` for iOS builds).

## Android build (no Android Studio needed)
Every push to `main` runs **Build Android app** in the Actions tab. Download:
- `halo-pop-test-apk` → install on an Android phone to test
- `halo-pop-play-store-bundle` → upload to Google Play Console

The bundle is signed when these repo secrets exist: `ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`.

## iOS build in the cloud (no Mac needed)
Run **Actions → Build iOS app and upload to TestFlight → Run workflow**. It builds on GitHub's Mac servers, signs with your App Store Connect API key and uploads to TestFlight.

Repo secrets needed: `APPLE_TEAM_ID`, `APPSTORE_KEY_ID`, `APPSTORE_ISSUER_ID`, `APPSTORE_KEY_P8` (the full text of the .p8 file, including the BEGIN/END lines). Optional: `ADMOB_APP_ID_IOS`.

## iOS build on a Mac (alternative)
```bash
npm install
npm run build
npx cap add ios
npx capacitor-assets generate --ios
npx cap sync ios
node scripts/patch-native.mjs
npx cap open ios
```
In Xcode: select your Team under Signing & Capabilities, then Product → Archive → Distribute App → App Store Connect.
