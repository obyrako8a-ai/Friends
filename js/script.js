// ============================================
// БЕГУЩАЯ СТРОКА - УПРАВЛЕНИЕ
// ============================================

const marqueeContent = document.getElementById('marqueeContent');

// Функция для управления скоростью
function setMarqueeSpeed(speedSeconds) {
    marqueeContent.style.animationDuration = `${speedSeconds}s`;
}

// Функция для изменения направления
function reverseMarquee() {
    if (marqueeContent.style.animationDirection === 'reverse') {
        marqueeContent.style.animationDirection = 'normal';
    } else {
        marqueeContent.style.animationDirection = 'reverse';
    }
}
// ============================================
// Слежка глаз за курсором
// ============================================
// Находим оба зрачка
const eyeLeft = document.querySelector('.eye-left');
const eyeRight = document.querySelector('.eye-right');

document.addEventListener('mousemove', (e) => {
    // Двигаем КАЖДЫЙ глаз независимо от своей позиции
    moveEye(eyeLeft, e.clientX, e.clientY, 'left');
    moveEye(eyeRight, e.clientX, e.clientY, 'right');
});

function moveEye(eye, cursorX, cursorY, side) {
    // Получаем ПОЗИЦИЮ КОНКРЕТНОГО глаза
    const eyeRect = eye.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    
    // Считаем смещение ОТ ЦЕНТРА ЭТОГО ГЛАЗА
    const deltaX = cursorX - eyeCenterX;
    const deltaY = cursorY - eyeCenterY;
    
    // Ограничиваем движение (в пределах белка)
    const maxMoveX = 60;
    const maxMoveY = 60;
    
    // Нормализуем
    const moveX = Math.max(-maxMoveX, Math.min(maxMoveX, deltaX / 15));
    const moveY = Math.max(-maxMoveY, Math.min(maxMoveY, deltaY / 15));
    
    // Сохраняем базовую позицию (left или right)
    const baseTransform = side === 'left' ? 'translateX(-50%)' : 'translateX(50%)';
    
    // Применяем трансформацию
    eye.style.transform = `${baseTransform} translate(${moveX}px, ${moveY}px)`;
}