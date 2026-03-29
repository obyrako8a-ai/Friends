// Бегущая строка

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

// Слежка глаз за курсором

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


// Аксессуары

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM загружен');
    
    const accessoryBtn = document.getElementById('accessoryBtn');
    const accessoriesContainer = document.getElementById('accessories-container');
    
    console.log('Кнопка:', accessoryBtn);
    console.log('Контейнер:', accessoriesContainer);
    
    if (!accessoryBtn) {
        console.error('Кнопка #accessoryBtn не найдена');
        return;
    }
    
    if (!accessoriesContainer) {
        console.error('Контейнер #accessories-container не найден');
        return;
    }
    
    const accessoryList = [
        { class: 'accessory-hat', src: 'images/blue_hat.svg', alt: 'Hat' },
        { class: 'accessory-glasses', src: 'images/blue_glasses.svg', alt: 'Glasses' },
        { class: 'accessory-headphones', src: 'images/blue_headphones.svg', alt: 'Headphones' },
        { class: 'accessory-tie', src: 'images/blue_tie.svg', alt: 'Tie' }
    ];
    
    let currentIndex = 0;
    let currentElement = null;
    
    function showNextAccessory() {
        console.log('Клик на кнопку');
        
        if (currentElement) {
            currentElement.remove();
            currentElement = null;
            console.log('Предыдущий аксессуар удалён');
        }
        
        const accessory = accessoryList[currentIndex];
        const img = document.createElement('img');
        img.src = accessory.src;
        img.alt = accessory.alt;
        img.className = `accessory ${accessory.class} active`;
        
        accessoriesContainer.appendChild(img);
        currentElement = img;
        currentIndex = (currentIndex + 1) % accessoryList.length;
        
        console.log('Показан:', accessory.class);
        console.log('Следующий индекс:', currentIndex);
    }
    
    accessoryBtn.addEventListener('click', showNextAccessory);
    console.log('Обработчик клика подключён');
    
    accessoryBtn.addEventListener('mousedown', () => {
        console.log('mousedown сработал');
    });
});


// Купюра убегает

const moneyImg = document.querySelector('.money-img');

if (moneyImg) {
    // Минимальное расстояние между курсором и купюрой
    const minDistance = 300;
    
    // Максимальное смещение от центра
    const maxOffset = 400;
    
    // Отслеживаем движение мыши
    document.addEventListener('mousemove', (e) => {
        // Получаем координаты мыши
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const deltaX = centerX - mouseX;
        const deltaY = centerY - mouseY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        if (distance < minDistance) {

            const normalizedX = deltaX / distance;
            const normalizedY = deltaY / distance;
            
            const escapeRatio = (minDistance - distance) / minDistance;
            const moveX = normalizedX * maxOffset * escapeRatio;
            const moveY = normalizedY * maxOffset * escapeRatio;
            
            moneyImg.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        } else {

            moneyImg.style.transform = `translate(-50%, -50%)`;
        }
    });
}

// Добавление в друзья, кнопки PLUS

const plusImages = document.querySelectorAll('.plus');

plusImages.forEach(plus => {
    plus.addEventListener('click', () => {
        // Меняем src с plus.svg на check_mark.svg
        if (plus.src.includes('plus.svg')) {
            plus.src = 'images/check_mark.svg';
            plus.alt = 'Check Mark';
        } else {

            plus.src = 'images/plus.svg';
            plus.alt = 'Plus';
        }
    });
    
    plus.style.cursor = 'pointer';
    plus.style.pointerEvents = 'auto';
});

// PLUS для версии 475px
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

// Клик на одного друга
const greenSquare = document.querySelector('.rectangle-green-square');
const overlays = document.querySelectorAll('.rectangle-overlay');

if (greenSquare) {
    greenSquare.addEventListener('click', () => {

        overlays.forEach(overlay => {
            overlay.classList.toggle('hidden');
        });
    });
}