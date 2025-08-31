// Utility function to display JSON nicely
function formatJSON(obj) {
    return JSON.stringify(obj, null, 2);
}

// Function to refresh all data
function refreshAllData() {
    getNavigatorInfo();
    getWindowInfo();
    getScreenInfo();
    getPerformanceInfo();
    getHistoryInfo();
    getPluginsInfo();
    getScriptsInfo();
    getNetworkInfo();
    getPermissionsInfo();
    getWebGLInfo();
    getBatteryInfo();
    getCPUInfo();
}

// 1. Navigator Information (Enhanced version from original script.js)
function getNavigatorInfo() {
    try {
        const info = {
            // Основные свойства
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            vendor: navigator.vendor,
            product: navigator.product,
            
            // Дополнительные свойства
            javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false,
            pdfViewerEnabled: navigator.pdfViewerEnabled,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            maxTouchPoints: navigator.maxTouchPoints,
            
            // API доступность
            geolocation: navigator.geolocation ? 'Доступна' : 'Недоступна',
            mediaDevices: navigator.mediaDevices ? 'Доступны' : 'Недоступны',
            permissions: navigator.permissions ? 'Доступны' : 'Недоступны',
            serviceWorker: navigator.serviceWorker ? 'Доступны' : 'Недоступны',
            getGamepads: navigator.getGamepads ? 'Доступны' : 'Недоступны',
            bluetooth: navigator.bluetooth ? 'Доступен' : 'Недоступен',
            usb: navigator.usb ? 'Доступен' : 'Недоступен',
            credentials: navigator.credentials ? 'Доступны' : 'Недоступны',
            clipboard: navigator.clipboard ? 'Доступен' : 'Недоступен',
            wakeLock: navigator.wakeLock ? 'Доступен' : 'Недоступен',
            
            // Определение браузера
            detectedBrowser: (() => {
                const userAgent = navigator.userAgent;
                if (userAgent.includes('Chrome')) return 'Chrome';
                else if (userAgent.includes('Firefox')) return 'Firefox';
                else if (userAgent.includes('Safari')) return 'Safari';
                else if (userAgent.includes('Edge')) return 'Edge';
                else if (userAgent.includes('Opera')) return 'Opera';
                return 'Неизвестный';
            })(),
            
            // Временная зона и локаль
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            locale: Intl.DateTimeFormat().resolvedOptions().locale,
            
            // Время сбора
            timestamp: new Date().toISOString(),
            pageLoadTime: performance.now()
        };
        document.getElementById('navigator-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('navigator-info').textContent = 'Error: ' + e.message;
    }
}

// 2. Window Information
function getWindowInfo() {
    try {
        const info = {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight,
            screenX: window.screenX,
            screenY: window.screenY,
            pageXOffset: window.pageXOffset,
            pageYOffset: window.pageYOffset,
            devicePixelRatio: window.devicePixelRatio,
            location: window.location.href,
            origin: window.location.origin
        };
        document.getElementById('window-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('window-info').textContent = 'Error: ' + e.message;
    }
}

// 3. Screen Information
function getScreenInfo() {
    try {
        const info = {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            orientation: screen.orientation ? screen.orientation.type : 'Not available'
        };
        document.getElementById('screen-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('screen-info').textContent = 'Error: ' + e.message;
    }
}

// 4. Performance Information
function getPerformanceInfo() {
    try {
        const timing = performance.timing;
        const info = {
            navigation: performance.navigation ? {
                type: performance.navigation.type,
                redirectCount: performance.navigation.redirectCount
            } : 'Not available',
            timing: timing ? {
                loadEventEnd: timing.loadEventEnd,
                domComplete: timing.domComplete,
                domInteractive: timing.domInteractive,
                domLoading: timing.domLoading,
                navigationStart: timing.navigationStart
            } : 'Not available',
            memory: performance.memory ? {
                usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
                jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
            } : 'Memory API not available'
        };
        document.getElementById('performance-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('performance-info').textContent = 'Error: ' + e.message;
    }
}

// 5. History Information
function getHistoryInfo() {
    try {
        const info = {
            length: history.length,
            state: history.state
        };
        document.getElementById('history-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('history-info').textContent = 'Error: ' + e.message;
    }
}

// 6. Plugins & Extensions
function getPluginsInfo() {
    try {
        const plugins = [];
        if (navigator.plugins && navigator.plugins.length > 0) {
            for (let i = 0; i < navigator.plugins.length; i++) {
                plugins.push({
                    name: navigator.plugins[i].name,
                    filename: navigator.plugins[i].filename,
                    description: navigator.plugins[i].description
                });
            }
        }

        const info = {
            plugins: plugins.length > 0 ? plugins : 'No plugins detected',
            mimeTypes: navigator.mimeTypes ? navigator.mimeTypes.length : 'No mimeTypes available'
        };
        document.getElementById('plugins-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('plugins-info').textContent = 'Error: ' + e.message;
    }
}

// 7. Scripts & Iframes
function getScriptsInfo() {
    try {
        const scripts = Array.from(document.scripts).map(script => ({
            src: script.src || 'inline',
            async: script.async,
            defer: script.defer,
            type: script.type
        }));

        const iframes = Array.from(document.getElementsByTagName('iframe')).map(iframe => ({
            src: iframe.src || 'no src',
            width: iframe.width,
            height: iframe.height,
            id: iframe.id || 'no id'
        }));

        const info = {
            scripts: scripts,
            iframes: iframes
        };
        document.getElementById('scripts-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('scripts-info').textContent = 'Error: ' + e.message;
    }
}

// 8. Mouse & Keyboard Tracking
function setupInputTracking() {
    const inputElement = document.getElementById('input-info');

    document.addEventListener('mousemove', (e) => {
        const info = {
            type: 'mouse',
            x: e.clientX,
            y: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY,
            buttons: e.buttons,
            timestamp: new Date().toISOString()
        };
        inputElement.textContent = formatJSON(info);
    });

    document.addEventListener('keydown', (e) => {
        const info = {
            type: 'keyboard',
            key: e.key,
            code: e.code,
            ctrlKey: e.ctrlKey,
            altKey: e.altKey,
            shiftKey: e.shiftKey,
            metaKey: e.metaKey,
            timestamp: new Date().toISOString()
        };
        inputElement.textContent = formatJSON(info);
    });
}

// 9. Network Information
function getNetworkInfo() {
    try {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let networkInfo = {
            online: navigator.onLine,
            connection: 'Not available'
        };

        if (connection) {
            networkInfo.connection = {
                downlink: connection.downlink,
                effectiveType: connection.effectiveType,
                rtt: connection.rtt,
                saveData: connection.saveData
            };
        }

        document.getElementById('network-info').textContent = formatJSON(networkInfo);
    } catch (e) {
        document.getElementById('network-info').textContent = 'Error: ' + e.message;
    }
}

// 10. Permissions
async function getPermissionsInfo() {
    try {
        const permissions = {};

        // Check common permissions
        const permissionNames = [
            'camera',
            'microphone',
            'geolocation',
            'notifications',
            'clipboard-read'
        ];

        for (const name of permissionNames) {
            try {
                const permission = await navigator.permissions.query({ name });
                permissions[name] = permission.state;
            } catch (e) {
                permissions[name] = 'Not supported';
            }
        }

        document.getElementById('permissions-info').textContent = formatJSON(permissions);
    } catch (e) {
        document.getElementById('permissions-info').textContent = 'Error: ' + e.message;
    }
}

// 11. WebGL Information
function getWebGLInfo() {
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!gl) {
            document.getElementById('webgl-info').textContent = 'WebGL not supported';
            return;
        }

        const info = {
            vendor: gl.getParameter(gl.VENDOR),
            renderer: gl.getParameter(gl.RENDERER),
            version: gl.getParameter(gl.VERSION),
            shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
            maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE)
        };

        document.getElementById('webgl-info').textContent = formatJSON(info);
    } catch (e) {
        document.getElementById('webgl-info').textContent = 'Error: ' + e.message;
    }
}

// 12. Battery Information
async function getBatteryInfo() {
    try {
        let batteryInfo = { status: 'Not supported' };

        if ('getBattery' in navigator) {
            try {
                const battery = await navigator.getBattery();
                batteryInfo = {
                    charging: battery.charging,
                    level: (battery.level * 100).toFixed(2) + '%',
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {
                batteryInfo = { status: 'Error: ' + e.message };
            }
        } else if ('battery' in navigator) {
            batteryInfo = { status: 'Legacy battery API not implemented' };
        }

        document.getElementById('battery-info').textContent = formatJSON(batteryInfo);
    } catch (e) {
        document.getElementById('battery-info').textContent = 'Error: ' + e.message;
    }
}

// 13. CPU Information
async function getCPUInfo() {
    try {
        let cpuInfo = {
            logicalProcessors: navigator.hardwareConcurrency || 'Not available',
            architecture: 'Unknown'
        };

        // Try to detect architecture from user agent
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('arm') || userAgent.includes('aarch64')) {
            cpuInfo.architecture = 'ARM';
        } else if (userAgent.includes('x86_64') || userAgent.includes('amd64')) {
            cpuInfo.architecture = 'x86_64';
        } else if (userAgent.includes('x86') || userAgent.includes('i386') || userAgent.includes('i686')) {
            cpuInfo.architecture = 'x86';
        }

        // Performance timing for rough CPU speed estimation
        const startTime = performance.now();
        let iterations = 0;
        const testEnd = startTime + 10; // 10ms test

        while (performance.now() < testEnd) {
            Math.sqrt(Math.random());
            iterations++;
        }

        const endTime = performance.now();
        const duration = endTime - startTime;
        const operationsPerMs = Math.round(iterations / duration);

        cpuInfo.performanceTest = {
            operationsPerMs: operationsPerMs,
            testDuration: duration.toFixed(2) + 'ms',
            totalOperations: iterations
        };

        // Memory information (related to CPU architecture)
        if (performance.memory) {
            cpuInfo.memoryRelated = {
                jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB',
                maxMemoryHint: performance.memory.jsHeapSizeLimit > 4294967296 ? '64-bit' : '32-bit or limited'
            };
        }

        // Check for WebAssembly support (indicates modern CPU features)
        cpuInfo.webAssemblySupport = typeof WebAssembly !== 'undefined';

        // Check for SharedArrayBuffer support (indicates CPU security features)
        cpuInfo.sharedArrayBufferSupport = typeof SharedArrayBuffer !== 'undefined';

        // Platform information
        cpuInfo.platform = {
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            javaEnabled: navigator.javaEnabled ? navigator.javaEnabled() : false
        };

        document.getElementById('cpu-info').textContent = formatJSON(cpuInfo);
    } catch (e) {
        document.getElementById('cpu-info').textContent = 'Error: ' + e.message;
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Run all information gathering functions
    getNavigatorInfo();
    getWindowInfo();
    getScreenInfo();
    getPerformanceInfo();
    getHistoryInfo();
    getPluginsInfo();
    getScriptsInfo();
    setupInputTracking();
    getNetworkInfo();
    getPermissionsInfo();
    getWebGLInfo();
    getBatteryInfo();
    getCPUInfo();

    // Update window info on resize
    window.addEventListener('resize', getWindowInfo);
    
    // Update network info on connection change
    window.addEventListener('online', getNetworkInfo);
    window.addEventListener('offline', getNetworkInfo);
}); 