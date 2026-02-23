/**
 * Script para generar la imagen OG (Open Graph) a partir del SVG
 * 
 * Uso: node scripts/generate-og-image.js
 */

import sharp from 'sharp';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '..', 'public', 'og-image.svg');
const outputPath = join(__dirname, '..', 'public', 'og-image.png');

async function generateOgImage() {
  try {
    console.log('🎨 Generando imagen OG...');
    
    // Leer el SVG
    const svgBuffer = readFileSync(inputPath);
    
    // Convertir a PNG con sharp
    await sharp(svgBuffer)
      .resize(1200, 630, { fit: 'fill' })
      .png({ quality: 90 })
      .toFile(outputPath);
    
    console.log('✅ Imagen OG generada exitosamente!');
    console.log(`📁 Ubicación: ${outputPath}`);
    console.log('📐 Dimensiones: 1200x630px');
    
  } catch (error) {
    console.error('❌ Error generando la imagen:', error.message);
    process.exit(1);
  }
}

generateOgImage();
