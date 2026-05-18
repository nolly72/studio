// Ждем полную загрузку DOM
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initAssistant();
    initSmoothScroll();
});

/**
 * Эффект плавного появления элементов при прокрутке (Scroll Reveal)
 */
function initScrollAnimation() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Добавляем класс для запуска CSS-анимации
                entry.target.classList.add('visible');
                // Отписываемся, чтобы анимация срабатывала один раз
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Элементы для анимации (карточки услуг, отзывы, галерея)
    const animElements = document.querySelectorAll('.service-card, .gallery-item, .hero-content, .about-content');
    
    animElements.forEach(el => {
        el.classList.add('fade-in-element'); // Базовый класс скрытия в CSS
        observer.observe(el);
    });
}

/**
 * Логика работы виджета онлайн-ассистента
 */
function initAssistant() {
    const assistantBtn = document.getElementById('assistantBtn');
    const assistantWidget = document.getElementById('assistantWidget');
    const closeWidget = document.getElementById('closeWidget');
    const assistantForm = document.getElementById('assistantForm');

    if (!assistantBtn || !assistantWidget) return;

    // Открытие виджета
    assistantBtn.addEventListener('click', () => {
        assistantWidget.classList.add('active');
        // Легкая вибрация на смартфонах при клике
        if (navigator.vibrate) navigator.vibrate(15);
    });

    // Закрытие виджета
    closeWidget.addEventListener('click', () => {
        assistantWidget.classList.remove('active');
    });

    // Закрытие по клику вне виджета
    document.addEventListener('click', (e) => {
        if (!assistantWidget.contains(e.target) && !assistantBtn.contains(e.target)) {
            assistantWidget.classList.remove('active');
        }
    });

    // Отправка формы записи
    assistantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('clientName').value;
        const phone = document.getElementById('clientPhone').value;
        const service = document.getElementById('clientService').value;

        // Эмуляция отправки (в будущем здесь будет ваш API)
        const submitBtn = assistantForm.querySelector('.submit-btn');
        submitBtn.innerText = 'Запись оформлена ✨';
        submitBtn.style.background = '#e6739f';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert(`Спасибо, ${name}! Вы успешно записались на услугу: "${service}". Наш менеджер свяжется с вами по телефону ${phone} в течение 5 минут для подтверждения.`);
            assistantWidget.classList.remove('active');
            assistantForm.reset();
            submitBtn.innerText = 'Подтвердить запись';
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 1200);
    });
}

/**
 * Плавный скролл до якорей (для мобильного меню и навигации)
 */
function initSmoothScroll() {
    document.querySelectorAll('a[focus-scroll^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
