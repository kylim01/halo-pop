// Builds www/ for the app and the website: wraps src/game.html in a full HTML document
// and copies the privacy policy.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
const body = readFileSync('src/game.html', 'utf8');
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
writeFileSync('www/index.html', html);
copyFileSync('src/privacy.html', 'www/privacy.html');
console.log('Built www/index.html and www/privacy.html');
