# 🚀 Инструкции по деплою в Vercel

## Быстрый деплой

### Способ 1: Через Vercel CLI (рекомендуется)

1. **Установите Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Войдите в аккаунт Vercel:**
   ```bash
   vercel login
   ```

3. **Деплой проекта:**
   ```bash
   vercel
   ```

4. **Для продакшн деплоя:**
   ```bash
   vercel --prod
   ```

### Способ 2: Через GitHub

1. **Создайте репозиторий на GitHub**
2. **Загрузите код:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

3. **Подключите к Vercel:**
   - Перейдите на [vercel.com](https://vercel.com)
   - Войдите в аккаунт
   - Нажмите "New Project"
   - Выберите ваш GitHub репозиторий
   - Vercel автоматически определит настройки
   - Нажмите "Deploy"

## Конфигурация

### vercel.json
Файл `vercel.json` уже настроен для вашего Express приложения:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ],
  "functions": {
    "server.js": {
      "maxDuration": 30
    }
  }
}
```

### package.json
Убедитесь, что в `package.json` есть:
- Зависимость `express`
- Скрипт `start` с командой `node server.js`

## Переменные окружения

Если нужно добавить переменные окружения:

1. **В Vercel Dashboard:**
   - Перейдите в настройки проекта
   - Выберите "Environment Variables"
   - Добавьте нужные переменные

2. **Через CLI:**
   ```bash
   vercel env add VARIABLE_NAME
   ```

## Домен

После деплоя Vercel предоставит:
- Автоматический домен: `your-project.vercel.app`
- Возможность подключить кастомный домен

## Мониторинг

- **Логи:** Доступны в Vercel Dashboard
- **Аналитика:** Встроенная аналитика Vercel
- **Функции:** Мониторинг serverless функций

## Обновления

### Автоматические (при подключении GitHub)
- Каждый push в main ветку автоматически деплоит изменения

### Ручные
```bash
vercel --prod
```

## Устранение проблем

### Ошибка "Module not found"
- Убедитесь, что все зависимости в `package.json`
- Проверьте, что `node_modules` в `.gitignore`

### Ошибка "Function timeout"
- Увеличьте `maxDuration` в `vercel.json`

### Статические файлы не загружаются
- Проверьте настройки в `server.js`
- Убедитесь, что файлы в корне проекта
- Откройте тестовую страницу: `https://your-domain.vercel.app/test`

### Тестирование после деплоя
1. Откройте главную страницу: `https://your-domain.vercel.app/`
2. Откройте тестовую страницу: `https://your-domain.vercel.app/test`
3. Проверьте консоль браузера (F12) на наличие ошибок
4. Убедитесь, что CSS и JavaScript файлы загружаются

## Полезные команды

```bash
# Просмотр логов
vercel logs

# Просмотр информации о проекте
vercel ls

# Удаление проекта
vercel remove

# Просмотр переменных окружения
vercel env ls
```

---

**Готово!** Ваш проект теперь готов к деплою в Vercel! 🎉 