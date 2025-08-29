const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для статических файлов
app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

// Маршруты для статических файлов в корне
app.get('/styles.css', (req, res) => {
  console.log('Запрос styles.css');
  res.setHeader('Content-Type', 'text/css');
  res.sendFile(path.join(__dirname, 'styles.css'));
});

app.get('/script.js', (req, res) => {
  console.log('Запрос script.js');
  res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'script.js'));
});

// Маршруты для страниц
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/gallery', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'gallery.html'));
});

// API endpoint для получения данных navigator
app.post('/api/navigator-data', express.json(), (req, res) => {
    console.log('Получены данные navigator:', req.body);
    res.json({ success: true, message: 'Данные получены' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные страницы:');
    console.log('- Главная: http://localhost:3000/');
    console.log('- О нас: http://localhost:3000/about');
    console.log('- Услуги: http://localhost:3000/services');
    console.log('- Контакты: http://localhost:3000/contact');
    console.log('- Галерея: http://localhost:3000/gallery');
}); 