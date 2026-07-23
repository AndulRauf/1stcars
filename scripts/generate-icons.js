import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Construct high quality SVG matching the 1stCars tire emblem logo
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <clipPath id="wheelClip">
      <circle cx="200" cy="256" r="165" />
    </clipPath>
  </defs>

  <!-- Speed lines on right side -->
  <g fill="#135D38">
    <!-- Top long speed line -->
    <path d="M 280 108 L 476 108 A 14 14 0 0 1 476 136 L 332 136 L 298 160 L 280 160 Z" />
    <!-- Top short speed line -->
    <path d="M 330 162 L 434 162 A 13 13 0 0 1 434 188 L 344 188 Z" />
    
    <!-- Bottom long speed line -->
    <path d="M 280 404 L 476 404 A 14 14 0 0 0 476 376 L 332 376 L 298 352 L 280 352 Z" />
    <!-- Bottom short speed line -->
    <path d="M 330 350 L 404 350 A 13 13 0 0 0 404 324 L 344 324 Z" />
  </g>

  <!-- Outer green tire border -->
  <circle cx="200" cy="256" r="165" fill="#135D38" />

  <!-- Olive / Gold tread band -->
  <circle cx="200" cy="256" r="156" fill="#A2B46D" />

  <!-- Tread grooves pattern -->
  <g stroke="#135D38" stroke-width="5" fill="none" stroke-linecap="round">
    <!-- Repeating tread arc marks along the ring -->
    <path d="M 200 100 Q 220 106 230 118" />
    <path d="M 238 108 Q 256 118 262 134" />
    <path d="M 272 124 Q 288 138 290 156" />
    <path d="M 300 148 Q 312 166 310 186" />
    <path d="M 320 178 Q 328 198 322 218" />
    <path d="M 328 210 Q 332 230 322 250" />
    <path d="M 326 244 Q 326 264 314 282" />
    <path d="M 316 274 Q 312 294 296 310" />
    <path d="M 298 302 Q 290 320 270 334" />
    <path d="M 274 326 Q 262 342 240 352" />
    <path d="M 244 346 Q 228 358 204 362" />
    <path d="M 210 358 Q 190 366 168 362" />
    <path d="M 174 362 Q 152 364 134 352" />
    <path d="M 140 354 Q 120 348 106 332" />
    <path d="M 112 338 Q 94 324 84 306" />
    <path d="M 90 312 Q 76 294 72 274" />
    <path d="M 76 280 Q 66 260 70 238" />
    <path d="M 70 246 Q 68 224 78 206" />
    <path d="M 74 212 Q 78 192 92 176" />
    <path d="M 86 182 Q 96 164 114 150" />
    <path d="M 108 156 Q 122 140 142 130" />
    <path d="M 134 134 Q 152 120 174 114" />
    <path d="M 166 116 Q 186 108 208 108" />
  </g>

  <!-- Inner green hub boundary -->
  <circle cx="200" cy="256" r="118" fill="#135D38" />

  <!-- White ring -->
  <circle cx="200" cy="256" r="110" fill="none" stroke="#FFFFFF" stroke-width="12" />

  <!-- Inner green hub -->
  <circle cx="200" cy="256" r="104" fill="#135D38" />

  <!-- White Number "1" -->
  <g fill="#FFFFFF">
    <!-- Clean bold 1 -->
    <path d="M 186 190 
             C 178 198 166 206 154 212 
             L 154 228 
             C 166 222 178 214 186 206 
             L 186 322 
             L 214 322 
             L 214 190 
             Z" />
  </g>
</svg>`;

async function generateIcons() {
  const publicDir = path.join(process.cwd(), 'public');

  // Save SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);
  console.log('Saved favicon.svg');

  // Generate PNG files
  const svgBuffer = Buffer.from(svgContent);

  // 192x192 PWA Icon
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(publicDir, 'pwa-192.png'));

  // 512x512 PWA Icon
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(publicDir, 'pwa-512.png'));

  // Apple Touch Icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  // Standard Favicon 32x32 PNG
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, 'favicon-32x32.png'));

  // Standard Favicon 16x16 PNG
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(publicDir, 'favicon-16x16.png'));

  console.log('Successfully generated all icon PNGs!');
}

generateIcons().catch(console.error);
