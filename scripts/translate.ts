import { translate } from '@vitalets/google-translate-api';
import * as fs from 'fs';
import * as path from 'path';

const SUPPORTED_LOCALES = ['en']; // Add more locales as needed
const SOURCE_LOCALE = 'fr';

async function translateText(text: string, targetLang: string): Promise<string> {
  try {
    const result = await translate(text, { to: targetLang });
    return result.text;
  } catch (error) {
    console.error(`Error translating "${text}":`, error);
    return text;
  }
}

async function translateObject(obj: any, targetLang: string): Promise<any> {
  if (typeof obj === 'string') {
    console.log(`Translating: ${obj.substring(0, 50)}...`);
    await new Promise(resolve => setTimeout(resolve, 100)); // Rate limiting
    return await translateText(obj, targetLang);
  }

  if (Array.isArray(obj)) {
    const translated = [];
    for (const item of obj) {
      translated.push(await translateObject(item, targetLang));
    }
    return translated;
  }

  if (typeof obj === 'object' && obj !== null) {
    const translated: any = {};
    for (const [key, value] of Object.entries(obj)) {
      translated[key] = await translateObject(value, targetLang);
    }
    return translated;
  }

  return obj;
}

async function main() {
  const messagesDir = path.join(process.cwd(), 'messages');
  const sourceFile = path.join(messagesDir, `${SOURCE_LOCALE}.json`);

  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file not found: ${sourceFile}`);
    process.exit(1);
  }

  const sourceMessages = JSON.parse(fs.readFileSync(sourceFile, 'utf-8'));

  for (const locale of SUPPORTED_LOCALES) {
    console.log(`\nTranslating to ${locale}...`);
    const targetFile = path.join(messagesDir, `${locale}.json`);

    const translatedMessages = await translateObject(sourceMessages, locale);

    fs.writeFileSync(targetFile, JSON.stringify(translatedMessages, null, 2), 'utf-8');
    console.log(`✓ Translation complete: ${targetFile}`);
  }

  console.log('\nAll translations completed!');
}

main().catch(console.error);
