const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для статических файлов из корня проекта
app.use(express.static(__dirname, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

// Основной маршрут для главной страницы
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// // API endpoint для получения данных navigator
// app.post('/api/navigator-data', express.json(), (req, res) => {
//     console.log('Получены данные navigator:', req.body);
//     res.json({ success: true, message: 'Данные получены' });
// });

// app.listen(PORT, () => {
//     console.log(`Сервер запущен на http://localhost:${PORT}`);
//     console.log('Главная страница: http://localhost:3000/');
// }); 