#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configs = {
  server: 'vercel.json',
  static: 'vercel-static.json',
  simple: 'vercel-simple.json'
};

const target = process.argv[2];

if (!target || !configs[target]) {
  console.log('Использование: node switch-config.js [server|static|simple]');
  console.log('');
  console.log('Доступные конфигурации:');
  console.log('  server - Полная версия с серверными API и явными маршрутами');
  console.log('  static - Статическая версия без сервера');
  console.log('  simple - Простая версия с автоматическим определением Vercel');
  process.exit(1);
}

try {
  // Копируем выбранную конфигурацию
  const sourceFile = configs[target];
  const targetFile = 'vercel.json';
  
  if (!fs.existsSync(sourceFile)) {
    console.error(`❌ Файл ${sourceFile} не найден`);
    process.exit(1);
  }
  
  fs.copyFileSync(sourceFile, targetFile);
  console.log(`✅ Переключено на ${target} конфигурацию`);
  console.log(`📁 ${sourceFile} → ${targetFile}`);
  
  if (target === 'static') {
    console.log('');
    console.log('💡 Для статического деплоя:');
    console.log('   - Vercel автоматически определит статические файлы');
    console.log('   - vercel --prod');
  } else if (target === 'simple') {
    console.log('');
    console.log('💡 Для простого деплоя:');
    console.log('   - Vercel автоматически определит Node.js проект');
    console.log('   - vercel --prod');
  } else {
    console.log('');
    console.log('💡 Для серверного деплоя:');
    console.log('   - Явные маршруты для статических файлов');
    console.log('   - vercel --prod');
  }
  
} catch (error) {
  console.error('❌ Ошибка при переключении конфигурации:', error.message);
  process.exit(1);
}
