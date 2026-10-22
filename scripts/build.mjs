// Builds www/ for the app and the website: wraps src/game.html in a full HTML document
// and copies the privacy policy.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
let body = readFileSync('src/game.html', 'utf8');
if (process.env.ADS_LIVE === '1') {
  body = body.replace('const ADS_LIVE = false;', 'const ADS_LIVE = true;');
  console.log('LIVE ads enabled');
} else {
  console.log('Test ads (set ADS_LIVE=1 for real ads)');
}
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no">
<meta name="theme-color" content="#cfeaff">
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}</style>
</head>
<body>
${body}
</body>
</html>
`;
mkdirSync('www', { recursive: true });
// Bundle the native plugin bridge when dependencies are installed (CI / your machine).
let finalHtml = html;
try {
  const esbuild = await import('esbuild');
  await esbuild.build({ entryPoints: ['src/native.js'], bundle: true, format: 'iife', minify: true, outfile: 'www/native.js' });
  finalHtml = html.replace('<body>', '<body>\n<script src="native.js"></script>');
  console.log('Bundled www/native.js (AdMob plugin)');
} catch (e) {
  console.log('Skipped native.js bundle (run npm install first):', e.code || e.message);
}
writeFileSync('www/index.html', finalHtml);
copyFileSync('src/privacy.html', 'www/privacy.html');
console.log('Built www/index.html and www/privacy.html');
