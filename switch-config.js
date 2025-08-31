#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configs = {
  server: 'vercel.json',
  static: 'vercel-static.json'
};

const target = process.argv[2];

if (!target || !configs[target]) {
  console.log('Использование: node switch-config.js [server|static]');
  console.log('');
  console.log('Доступные конфигурации:');
  console.log('  server - Полная версия с серверными API');
  console.log('  static - Статическая версия без сервера');
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
    console.log('💡 Для статического деплоя используйте:');
    console.log('   - public/index-static.html (вместо index.html)');
    console.log('   - vercel --prod');
  } else {
    console.log('');
    console.log('💡 Для серверного деплоя используйте:');
    console.log('   - public/index.html');
    console.log('   - vercel --prod');
  }
  
} catch (error) {
  console.error('❌ Ошибка при переключении конфигурации:', error.message);
  process.exit(1);
}
