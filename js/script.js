// ============================================
// Бегущая строка
// ============================================


const marqueeContent = document.getElementById('marqueeContent');

function setMarqueeSpeed(speedSeconds) {
    marqueeContent.style.animationDuration = `${speedSeconds}s`;
}
function reverseMarquee() {
    if (marqueeContent.style.animationDirection === 'reverse') {
        marqueeContent.style.animationDirection = 'normal';
    } else {
        marqueeContent.style.animationDirection = 'reverse';
    }
}
// Бегущая строка у фиолетового бокса
const marqueeContentPurple = document.getElementById('marqueeContentPurple');

// Дублирование контента для бесшовной прокрутки 
if (marqueeContentPurple) {
    const content = marqueeContentPurple.innerHTML;
    marqueeContentPurple.innerHTML = content + content;
}
// ============================================
// Слежка глаз за курсором
// ============================================

const eyeLeft = document.querySelector('.eye-left');
const eyeRight = document.querySelector('.eye-right');

document.addEventListener('mousemove', (e) => {
    // Движение глаз независимо от своей позиции
    moveEye(eyeLeft, e.clientX, e.clientY, 'left');
    moveEye(eyeRight, e.clientX, e.clientY, 'right');
});

function moveEye(eye, cursorX, cursorY, side) {

    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    const deltaX = cursorX - eyeCenterX;
    const deltaY = cursorY - eyeCenterY;
    
    const maxMoveX = 60;
    const maxMoveY = 60;
    
    const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX / 15));
    const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY / 15));
    
    const baseTransform = side === 'left' ? 'translateX(-50%)' : 'translateX(50%)';
    
    eye.style.transform = `${baseTransform} translate(${moveX}px, ${moveY}px)`;
}

// ============================================
// АКСЕССУАРЫ - СМЕНА ПО ПОРЯДКУ ЧЕРЕЗ JS ✅
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    const accessoryBtn = document.getElementById('accessoryBtn');
    const accessoriesContainer = document.getElementById('accessories-container');
    
    // Список аксессуаров (создаются только при клике)
    const accessoryList = [
        { class: 'accessory-hat', src: 'images/blue_hat.svg', alt: 'Hat' },
        { class: 'accessory-glasses', src: 'images/blue_glasses.svg', alt: 'Glasses' },
        { class: 'accessory-headphones', src: 'images/blue_headphones.svg', alt: 'Headphones' },
        { class: 'accessory-tie', src: 'images/blue_tie.svg', alt: 'Tie' }
    ];
    
    let currentIndex = 0;
    let currentElement = null;
    
    // Функция показа следующего аксессуара
    function showNextAccessory() {
        // ✅ Удаляем предыдущий аксессуар (если есть)
        if (currentElement) {
            currentElement.remove();
            currentElement = null;
        }
        
        // ✅ Берём следующий аксессуар по порядку
        const accessory = accessoryList[currentIndex];
        
        // ✅ Создаём новый элемент
        const img = document.createElement('img');
        img.src = accessory.src;
        img.alt = accessory.alt;
        img.className = `accessory ${accessory.class} active`;
        
        // ✅ Добавляем в контейнер
        accessoriesContainer.appendChild(img);
        
        // ✅ Сохраняем ссылку
        currentElement = img;
        
        // ✅ Переходим к следующему (по кругу)
        currentIndex = (currentIndex + 1) % accessoryList.length;
        
        console.log('Показан аксессуар:', currentIndex, 'из', accessoryList.length);
    }
    
    // ✅ Обработчик клика
    if (accessoryBtn) {
        accessoryBtn.addEventListener('click', showNextAccessory);
        console.log('✅ Кнопка найдена, обработчик подключён');
    } else {
        console.warn('❌ Кнопка #accessoryBtn не найдена!');
    }
    
    // ✅ Проверка при загрузке
    console.log('Аксессуаров в списке:', accessoryList.length);
    console.log('Контейнер найден:', accessoriesContainer !== null);
});

// ============================================
// MONEY - ВСЕГДА УБЕГАЕТ ОТ КУРСОРА
// ============================================

const moneyImg = document.querySelector('.money-img');

if (moneyImg) {
    // Минимальное расстояние между курсором и money (в пикселях)
    const minDistance = 300;
    
    // Максимальное смещение от центра (в пикселях)
    const maxOffset = 400;
    
    // Отслеживаем движение мыши
    document.addEventListener('mousemove', (e) => {
        // Получаем координаты мыши
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Получаем координаты центра экрана (где находится money)
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Вычисляем вектор от курсора к центру
        const deltaX = centerX - mouseX;
        const deltaY = centerY - mouseY;
        
        // Вычисляем расстояние от курсора до центра
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Если курсор ближе чем minDistance - money убегает
        if (distance < minDistance) {
            // Нормализуем вектор направления
            const normalizedX = deltaX / distance;
            const normalizedY = deltaY / distance;
            
            // Вычисляем смещение (чем ближе курсор, тем сильнее убегает)
            const escapeRatio = (minDistance - distance) / minDistance;
            const moveX = normalizedX * maxOffset * escapeRatio;
            const moveY = normalizedY * maxOffset * escapeRatio;
            
            // Двигаем money в противоположную сторону от курсора
            moneyImg.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        } else {
            // Если курсор далеко - money возвращается в центр
            moneyImg.style.transform = `translate(-50%, -50%)`;
        }
    });
}

// ============================================
// PLUS → CHECK_MARK ПРИ КЛИКЕ
// ============================================

const plusImages = document.querySelectorAll('.plus');

plusImages.forEach(plus => {
    plus.addEventListener('click', () => {
        // Меняем src с plus.svg на check_mark.svg
        if (plus.src.includes('plus.svg')) {
            plus.src = 'images/check_mark.svg';
            plus.alt = 'Check Mark';
        } else {
            // Можно вернуть back to plus при повторном клике (опционально)
            plus.src = 'images/plus.svg';
            plus.alt = 'Plus';
        }
    });
    
    // Добавляем курсор pointer для кликабельности
    plus.style.cursor = 'pointer';
    plus.style.pointerEvents = 'auto';
});

// PLUS для мобильной версии (475px)
const mobilePlus = document.querySelector('.faces-mobile-plus');

if (mobilePlus) {
    mobilePlus.addEventListener('click', () => {
        if (mobilePlus.src.includes('plus.svg')) {
            mobilePlus.src = 'images/check_mark.svg';
        } else {
            mobilePlus.src = 'images/plus.svg';
        }
    });
}

// ============================================
// КЛИК НА ЗЕЛЁНЫЙ КВАДРАТ - СКРЫТЬ ПЛАШКИ
// ============================================

const greenSquare = document.querySelector('.rectangle-green-square');
const overlays = document.querySelectorAll('.rectangle-overlay');

if (greenSquare) {
    greenSquare.addEventListener('click', () => {
        // Переключаем класс hidden у всех плашек
        overlays.forEach(overlay => {
            overlay.classList.toggle('hidden');
        });
    });
}