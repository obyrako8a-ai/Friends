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
// Смена кулаков на руки
// ============================================

const fists = document.querySelectorAll('.fist');

fists.forEach(fist => {
    fist.addEventListener('click', function() {
        
        const handSrc = this.getAttribute('data-hand');
        
        this.src = handSrc;
        
        this.classList.add('hand-active');
        
        this.alt = this.alt.replace('Fist', 'Hand');
    });
});

// ============================================
// АКСЕССУАРЫ - РАНДОМНОЕ ПОЯВЛЕНИЕ
// ============================================

const accessoryBtn = document.getElementById('accessoryBtn');
const accessories = document.querySelectorAll('.accessory');

// Массив всех аксессуаров
const accessoryList = [
    'accessory-hat',
    'accessory-glasses',
    'accessory-headphones',
    'accessory-tie'
];

// Текущий видимый аксессуар
let currentAccessory = 'accessory-hat';

// Функция для показа случайного аксессуара
function showRandomAccessory() {
    // Скрываем текущий аксессуар
    const currentEl = document.querySelector('.' + currentAccessory);
    if (currentEl) {
        currentEl.style.display = 'none';
    }
    
    // Выбираем новый случайный аксессуар (не такой как текущий)
    let newAccessory;
    do {
        const randomIndex = Math.floor(Math.random() * accessoryList.length);
        newAccessory = accessoryList[randomIndex];
    } while (newAccessory === currentAccessory);
    
    // Обновляем текущий аксессуар
    currentAccessory = newAccessory;
    
    // Показываем новый аксессуар
    const newEl = document.querySelector('.' + currentAccessory);
    if (newEl) {
        newEl.style.display = 'block';
    }
}

// Обработчик клика на кнопку "аксессуар"
if (accessoryBtn) {
    accessoryBtn.addEventListener('click', showRandomAccessory);
}