// Функция для сбора данных navigator
function collectNavigatorData() {
    const navigatorData = {
        // Основные свойства
        userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        
        // Геолокация
        geolocation: navigator.geolocation ? 'Доступна' : 'Недоступна',
        
        // Медиа устройства
        mediaDevices: navigator.mediaDevices ? 'Доступны' : 'Недоступны',
        
        // Уведомления
        permissions: navigator.permissions ? 'Доступны' : 'Недоступны',
        
        // Сервис воркеры
        serviceWorker: navigator.serviceWorker ? 'Доступны' : 'Недоступны',
        
        // WebGL
        getGamepads: navigator.getGamepads ? 'Доступны' : 'Недоступны',
        
        // Bluetooth
        bluetooth: navigator.bluetooth ? 'Доступен' : 'Недоступен',
        
        // USB
        usb: navigator.usb ? 'Доступен' : 'Недоступен',
        
        // Credentials
        credentials: navigator.credentials ? 'Доступны' : 'Недоступны',
        
        // Clipboard
        clipboard: navigator.clipboard ? 'Доступен' : 'Недоступен',
        
        // Wake Lock
        wakeLock: navigator.wakeLock ? 'Доступен' : 'Недоступен',
        
        // Память
        deviceMemory: navigator.deviceMemory || 'Недоступно',
        hardwareConcurrency: navigator.hardwareConcurrency || 'Недоступно',
        
        // Соединение
        connection: navigator.connection ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt
        } : 'Недоступно',
        
        // Время загрузки страницы
        timestamp: new Date().toISOString(),
        pageLoadTime: performance.now()
    };

    // Попытка получить дополнительную информацию о браузере
    try {
        // Определение браузера
        const userAgent = navigator.userAgent;
        let browser = 'Неизвестный';
        
        if (userAgent.includes('Chrome')) browser = 'Chrome';
        else if (userAgent.includes('Firefox')) browser = 'Firefox';
        else if (userAgent.includes('Safari')) browser = 'Safari';
        else if (userAgent.includes('Edge')) browser = 'Edge';
        else if (userAgent.includes('Opera')) browser = 'Opera';
        
        navigatorData.detectedBrowser = browser;
        
        // Разрешение экрана
        navigatorData.screen = {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        };
        
        // Размер окна
        navigatorData.window = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight
        };
        
        // Временная зона
        navigatorData.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        // Локаль
        navigatorData.locale = Intl.DateTimeFormat().resolvedOptions().locale;
        
    } catch (error) {
        console.error('Ошибка при сборе дополнительных данных:', error);
    }

    return navigatorData;
}

// Функция для вывода данных в консоль
function logNavigatorData() {
    const data = collectNavigatorData();
    
    console.log('=== ДАННЫЕ NAVIGATOR ===');
    console.log('Время сбора:', data.timestamp);
    console.log('Время загрузки страницы:', data.pageLoadTime.toFixed(2) + 'ms');
    console.log('');
    
    console.log('📱 ОСНОВНАЯ ИНФОРМАЦИЯ:');
    console.log('User Agent:', data.userAgent);
    console.log('Название приложения:', data.appName);
    console.log('Версия приложения:', data.appVersion);
    console.log('Платформа:', data.platform);
    console.log('Язык:', data.language);
    console.log('Языки:', data.languages);
    console.log('Cookies включены:', data.cookieEnabled);
    console.log('Онлайн:', data.onLine);
    console.log('Определенный браузер:', data.detectedBrowser);
    console.log('');
    
    console.log('🖥️ ЭКРАН И ОКНО:');
    console.log('Разрешение экрана:', data.screen.width + 'x' + data.screen.height);
    console.log('Доступное разрешение:', data.screen.availWidth + 'x' + data.screen.availHeight);
    console.log('Глубина цвета:', data.screen.colorDepth);
    console.log('Размер окна:', data.window.innerWidth + 'x' + data.window.innerHeight);
    console.log('');
    
    console.log('⚙️ СИСТЕМА:');
    console.log('Память устройства:', data.deviceMemory + 'GB');
    console.log('Количество ядер:', data.hardwareConcurrency);
    console.log('Временная зона:', data.timezone);
    console.log('Локаль:', data.locale);
    console.log('');
    
    console.log('🔧 ВОЗМОЖНОСТИ БРАУЗЕРА:');
    console.log('Геолокация:', data.geolocation);
    console.log('Медиа устройства:', data.mediaDevices);
    console.log('Разрешения:', data.permissions);
    console.log('Сервис воркеры:', data.serviceWorker);
    console.log('Геймпады:', data.getGamepads);
    console.log('Bluetooth:', data.bluetooth);
    console.log('USB:', data.usb);
    console.log('Учетные данные:', data.credentials);
    console.log('Буфер обмена:', data.clipboard);
    console.log('Wake Lock:', data.wakeLock);
    console.log('');
    
    if (data.connection !== 'Недоступно') {
        console.log('🌐 СОЕДИНЕНИЕ:');
        console.log('Тип соединения:', data.connection.effectiveType);
        console.log('Скорость загрузки:', data.connection.downlink + 'Mbps');
        console.log('RTT:', data.connection.rtt + 'ms');
        console.log('');
    }
    
    console.log('=== КОНЕЦ ДАННЫХ ===');
    
    // Отправка данных на сервер (опционально)
    sendDataToServer(data);
}

// Функция для отправки данных на сервер
function sendDataToServer(data) {
    fetch('/api/navigator-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('✅ Данные успешно отправлены на сервер');
    })
    .catch(error => {
        console.error('❌ Ошибка отправки данных:', error);
    });
}

// Автоматический сбор данных при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Страница загружена, собираем данные navigator...');
    
    // Небольшая задержка для полной загрузки страницы
    setTimeout(() => {
        logNavigatorData();
    }, 1000);
    
    // Добавляем кнопку для повторного сбора данных
    const button = document.createElement('button');
    button.textContent = '🔄 Собрать данные navigator';
    button.className = 'btn';
    button.style.margin = '20px auto';
    button.style.display = 'block';
    button.onclick = logNavigatorData;
    
    // Добавляем кнопку в начало main
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(button, main.firstChild);
    }
});

// Сбор данных при изменении размера окна
window.addEventListener('resize', function() {
    console.log('📏 Размер окна изменен, обновляем данные...');
    setTimeout(logNavigatorData, 500);
});

// Сбор данных при изменении состояния сети
window.addEventListener('online', function() {
    console.log('🌐 Соединение восстановлено');
    logNavigatorData();
});

window.addEventListener('offline', function() {
    console.log('❌ Соединение потеряно');
    logNavigatorData();
}); 