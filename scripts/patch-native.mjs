// Run after `npx cap add android` / `npx cap add ios` (and after `cap sync`).
// Adds the AdMob app ID, tracking text and version number to the native projects.
// Defaults are Google's TEST app IDs; set ADMOB_APP_ID_ANDROID / ADMOB_APP_ID_IOS for release.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const androidId = process.env.ADMOB_APP_ID_ANDROID || 'ca-app-pub-3940256099942544~3347511713';
const iosId = process.env.ADMOB_APP_ID_IOS || 'ca-app-pub-6254242910134674~4199901703';
const versionCode = process.env.VERSION_CODE || '1';

const manifest = 'android/app/src/main/AndroidManifest.xml';
if (existsSync(manifest)) {
  let m = readFileSync(manifest, 'utf8');
  m = m.replace(/\s*<meta-data android:name="com.google.android.gms.ads.APPLICATION_ID"[^>]*\/>/, '');
  m = m.replace('</application>',
    `    <meta-data android:name="com.google.android.gms.ads.APPLICATION_ID" android:value="${androidId}"/>\n    </application>`);
  writeFileSync(manifest, m);
  const gradle = 'android/app/build.gradle';
  let g = readFileSync(gradle, 'utf8');
  g = g.replace(/versionCode \d+/, `versionCode ${versionCode}`).replace(/versionName "[^"]*"/, `versionName "${pkg.version}"`);
  writeFileSync(gradle, g);
  console.log(`Android: AdMob ${androidId}, versionCode ${versionCode}, versionName ${pkg.version}`);
}

// Minimum iOS version 15.0 (App Store requirement from April 2027).
const podfile = 'ios/App/Podfile';
if (existsSync(podfile)) {
  writeFileSync(podfile, readFileSync(podfile, 'utf8').replace(/platform :ios, '[\d.]+'/, "platform :ios, '15.0'"));
}
const pbx = 'ios/App/App.xcodeproj/project.pbxproj';
if (existsSync(pbx)) {
  writeFileSync(pbx, readFileSync(pbx, 'utf8').replace(/IPHONEOS_DEPLOYMENT_TARGET = [\d.]+;/g, 'IPHONEOS_DEPLOYMENT_TARGET = 15.0;'));
}

const plist = 'ios/App/App/Info.plist';
if (existsSync(plist)) {
  let p = readFileSync(plist, 'utf8');
  if (!p.includes('GADApplicationIdentifier')) {
    const extra = `	<key>ITSAppUsesNonExemptEncryption</key>
	<false/>
	<key>GADApplicationIdentifier</key>
	<string>${iosId}</string>
	<key>NSUserTrackingUsageDescription</key>
	<string>This lets Halo Pop show ads that are more relevant to you. The game works the same either way.</string>
	<key>SKAdNetworkItems</key>
	<array>
		<dict><key>SKAdNetworkIdentifier</key><string>cstr6suwn9.skadnetwork</string></dict>
	</array>
`;
    const i = p.lastIndexOf('</dict>');
    p = p.slice(0, i) + extra + p.slice(i);
    writeFileSync(plist, p);
  }
  console.log(`iOS: AdMob ${iosId}`);
}
