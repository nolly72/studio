document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initSmoothScroll();
    initQuizAssistant();
});

/**
 * Анимация появления контента при скролле
 */
function initScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .gallery-item, .hero-content, .about-content').forEach(el => {
        el.classList.add('fade-in-element');
        observer.observe(el);
    });
}

/**
 * Логика Квиз-Ассистента
 */
function initQuizAssistant() {
    const assistantBtn = document.getElementById('assistantBtn');
    const assistantWidget = document.getElementById('assistantWidget');
    const closeWidget = document.getElementById('closeWidget');
    const form = document.getElementById('assistantForm');
    
    const steps = document.querySelectorAll('.quiz-step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentStep = 1;
    const totalSteps = steps.length;

    if (!assistantBtn || !assistantWidget) return;

    // Открыть/Закрыть виджет
    assistantBtn.addEventListener('click', () => assistantWidget.classList.add('active'));
    closeWidget.addEventListener('click', () => assistantWidget.classList.remove('active'));

    // Функция обновления шагов на экране
    function updateQuizView() {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        // Кнопка "Назад" видна со 2-го шага
        prevBtn.style.display = currentStep > 1 ? 'block' : 'none';

        // Переключение между "Далее" и финальной кнопкой "Отправить"
        if (currentStep === totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }
    }

    // Проверка: выбран ли ответ на текущем шаге
    function validateStep() {
        const activeStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
        
        // Для шагов с радио-кнопками
        const radioChecked = activeStepEl.querySelector('input[type="radio"]:checked');
        if (radioChecked) return true;

        // Для финального шага с текстовыми полями
        const textInputs = activeStepEl.querySelectorAll('input[required]');
        if (textInputs.length > 0) {
            return Array.from(textInputs).every(input => input.value.trim() !== '');
        }

        return false;
    }

    // Клик по кнопке "Далее"
    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            currentStep++;
            updateQuizView();
        } else {
            alert('Пожалуйста, сделайте выбор или заполните поля перед переходом ✨');
        }
    });

    // Клик по кнопке "Назад"
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateQuizView();
        }
    });

    // Мягкий клик по радио-опциям автоматически переключает на следующий шаг (для удобства)
    document.querySelectorAll('.quiz-opt input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (currentStep < totalSteps) {
                setTimeout(() => {
                    currentStep++;
                    updateQuizView();
                }, 300); // небольшая задержка для красивого эффекта анимации
            }
        });
    });

    // Отправка формы без перезагрузки страницы (AJAX)
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Меняем текст кнопки на статус загрузки
        submitBtn.innerText = 'Связываюсь с космосом... ✨';
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                submitBtn.innerText = 'Успешно отправлено! 💖';
                alert('Превосходно! Ваши ответы получены. Персональный премиум-пакет услуг сформирован. Мы свяжемся с вами в течение 5 минут!');
                
                // Сброс квиза
                form.reset();
                currentStep = 1;
                updateQuizView();
                assistantWidget.classList.remove('active');
            } else {
                throw new Error('Ошибка сети');
            }
        })
        .catch(error => {
            alert('Что-то пошло не так. Пожалуйста, попробуйте еще раз или позвоните нам напрямую!');
            submitBtn.innerText = 'Получить привилегии ✨';
            submitBtn.disabled = false;
        });
    });
}

/**
 * Плавный скролл
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
