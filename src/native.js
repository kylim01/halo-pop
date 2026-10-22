// Bundled into www/native.js at build time so the AdMob plugin is always registered in the app.
import { Capacitor } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';
window.HaloAdMob = AdMob;
window.HaloCapacitor = Capacitor;
