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

const accessoryBtnL = document.getElementById('accessoryBtnL');
const accessoryBtnR = document.getElementById('accessoryBtnR');
const accessoriesContainer = document.getElementById('accessory-container');

// Список аксессуаров
const accessoryList = [
    [
        { class: 'accessory-hat', src: 'images/blue_hat.svg', alt: 'Hat' },
        { class: 'accessory-hat', src: 'images/green_hat.svg', alt: 'Hat' },
        { class: 'accessory-hat', src: 'images/red_hat.svg', alt: 'Hat' },
        { class: 'accessory-hat', src: 'images/yellow_hat.svg', alt: 'Hat' }
    ],
    [
        { class: 'accessory-glasses', src: 'images/blue_glasses.svg', alt: 'Glasses' },
        { class: 'accessory-glasses', src: 'images/green_glasses.svg', alt: 'Glasses' },
        { class: 'accessory-glasses', src: 'images/red_glasses.svg', alt: 'Glasses' },
        { class: 'accessory-glasses', src: 'images/yellow_glasses.svg', alt: 'Glasses' }
    ],
    [
        { class: 'accessory-headphones', src: 'images/blue_headphones.svg', alt: 'Headphones' },
        { class: 'accessory-headphones', src: 'images/green_headphones.svg', alt: 'Headphones' },
        { class: 'accessory-headphones', src: 'images/red_headphones.svg', alt: 'Headphones' },
        { class: 'accessory-headphones', src: 'images/yellow_headphones.svg', alt: 'Headphones' }
    ],
    [
        { class: 'accessory-tie', src: 'images/blue_tie.svg', alt: 'Tie' },
        { class: 'accessory-tie', src: 'images/green_tie.svg', alt: 'Tie' },
        { class: 'accessory-tie', src: 'images/red_tie.svg', alt: 'Tie' },
        { class: 'accessory-tie', src: 'images/yellow_tie.svg', alt: 'Tie' }
    ]
];

// Текущий аксессуар
let currentAccessory = null;

// Функция создания аксессуара
function createAccessory(accessory) {
    const img = document.createElement('img');
    img.src = accessory.src;
    img.alt = accessory.alt;
    img.className = `accessory ${accessory.class}`;
    // Inline style переопределит CSS display: none
    img.style.display = 'block';
    return img;
}

// Функция показа случайного аксессуара
function showRandomAccessory() {
    // Удаляем текущий аксессуар
    if (currentAccessory && currentAccessory.element) {
        currentAccessory.element.remove();
    }
    
    // Выбирает случайный аксессуар
    let newAccessory;
    do {
        const randomIndex = Math.floor(Math.random() * 4);
        newAccessory = accessoryList[randomIndex][0];
    } while (currentAccessory && newAccessory.class === currentAccessory.class);
    
    // Создаёт и добавляет новый аксессуар
    const newElement = createAccessory(newAccessory);
    console.log(newElement);
    console.log(accessoriesContainer);
    accessoriesContainer.appendChild(newElement);
    
    // Сохраняет ссылку на текущий
    currentAccessory = {
        class: newAccessory.class,
        element: newElement
    };
}

// Функция изменения цвета аксессуара
function changeColorAccessory() {
    let accessory_index = 0;
    for(let i=0; i<4; i+=1){
        if(accessoryList[i][0].alt === currentAccessory.element.alt){
            accessory_index = i
            break;
        };
    }

    // Выбирает случайный аксессуар другого цвета
    let newAccessory;
    do {
        const randomIndex = Math.floor(Math.random() * 4);
        newAccessory = accessoryList[accessory_index][randomIndex];
    } while (newAccessory.src === currentAccessory.src);
    
    // удаляет текущий аксессуар
    currentAccessory.element.remove();

    // Создает и добавляет новый аксессуар
    const newElement = createAccessory(newAccessory);
    accessoriesContainer.appendChild(newElement);
    
    // Сохраняяет ссылку на текущий
    currentAccessory = {
        class: newAccessory.class,
        element: newElement
    };
    
}

// Обработчик клика
if (accessoryBtnL) {
    accessoryBtnL.addEventListener('click', () => {
        showRandomAccessory();
    });
} else {
    console.warn('Кнопка #accessoryBtnL не найдена!');
}

if (accessoryBtnR) {
    accessoryBtnR.addEventListener('click', () => {
        changeColorAccessory();
    });
} else {
    console.warn('Кнопка #accessoryBtnR не найдена!');
}


// Купюра убегает

const moneyImg = document.querySelector('.money-img');

if (moneyImg) {
    // Минимальное расстояние между курсором и купюрой
    const minDistance = 300;
    
    // Максимальное смещение от центра
    const maxOffset = 400;
    
    // Слежка движение мыши
    document.addEventListener('mousemove', (e) => {
        // координаты мыши
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