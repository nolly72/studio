/* ==========================================================================
   1. ИНТЕРАКТИВНЫЙ ПРЕМИУМ-АССИСТЕНТ «РОЗА»
   ========================================================================== */

// Функция для открытия и закрытия окна чата
function toggleAssistant() {
    const chatWindow = document.getElementById('assistant-window');
    
    if (!chatWindow) return;

    if (chatWindow.style.display === 'flex') {
        chatWindow.style.display = 'none';
    } else {
        chatWindow.style.display = 'flex';
        // Если чат открывается впервые, можно прокрутить вниз
        scrollToBottom();
    }
}

// Быстрый вызов ассистента при нажатии главных кнопок "Записаться"
function openAssistantWithAction(actionType) {
    const chatWindow = document.getElementById('assistant-window');
    if (chatWindow) {
        chatWindow.style.display = 'flex';
        executeAssistantLogic(actionType);
    }
}

// Логика ответов ассистента в зависимости от выбора гостя
function executeAssistantLogic(actionType) {
    const chatBody = document.getElementById('assistant-body');
    if (!chatBody) return;

    let responseHTML = '';

    if (actionType === 'book') {
        responseHTML = `
            <div class="chat-msg-bot">
                ✨ <strong>Прекрасный выбор!</strong> Для фиксации персонального VIP-времени в Москва-Сити, пожалуйста, оставьте ваш контактный номер телефона. Наш премиум-консьерж свяжется с вами в течение 5 минут через WhatsApp или по звонку.
            </div>
        `;
    } else if (actionType === 'prices') {
        responseHTML = `
            <div class="chat-msg-bot">
                💎 <strong>Наш закрытый люкс-прайс:</strong><br><br>
                • Стилистика & Уход — от 12 000 ₽<br>
                • High Visage (Макияж) — от 8 000 ₽<br>
                • Royal Nail SPA — от 6 500 ₽<br>
                • Инъекции & Эстетика — от 15 000 ₽<br>
                • Авторский SPA-массаж — от 10 000 ₽<br><br>
                <em>В стоимость каждого визита включен премиальный бар и консьерж-сервис.</em>
            </div>
        `;
    } else if (actionType === 'location') {
        responseHTML = `
            <div class="chat-msg-bot">
                📍 <strong>Локация Silk & Rose:</strong><br>
                Москва-Сити, Башня «Федерация Восток», 54 этаж, Crystal Suite 5401.<br><br>
                Для гостей на автомобилях мы оформляем бесплатный подземный VIP-паркинг. Сообщите нам номер машины при подтверждении визита.
            </div>
        `;
    }

    // Добавляем ответ в окно чата
    chatBody.innerHTML = responseHTML;
    scrollToBottom();
}

// Вспомогательная функция для плавной прокрутки чата вниз
function scrollToBottom() {
    const chatBody = document.getElementById('assistant-body');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

/* ==========================================================================
   2. АНИМАЦИЯ ШАПКИ САЙТА ПРИ СКРОЛЛЕ (HEADER EFFECT)
   ========================================================================== */
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (!header) return;

    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/* ==========================================================================
   3. ЭФФЕКТ ПЛАВНОГО ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ (PREMIUM FADE-IN)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.luxury-service-card, .gallery-item, .info-lux-item');
    
    // Изначально задаем элементам прозрачность и сдвиг через JS
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.85;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;

            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Запускаем проверку при загрузке и при каждом скролле
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
});
