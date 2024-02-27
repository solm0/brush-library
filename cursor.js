// h1요소 단어별 호버 효과
const textContainer = document.getElementById('hover-text');
const words = textContainer.innerText.split(' ');

textContainer.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');

const spans = document.querySelectorAll('#hover-text span');

spans.forEach(span => {
    span.addEventListener('mouseenter', () => {
        span.style.color = 'blue'; // 호버 시 적용될 스타일
        span.style.transition = 'color 0.5s linear';
    });

    span.addEventListener('mouseleave', () => {
        span.style.color = ''; // 호버 해제 시 스타일 초기화
    });
});


// 마우스커서
const cursor = document.getElementById('cursor');
const cursorText = document.getElementById('cursorText');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX - Math.sqrt(5000)}px`;
    cursor.style.top = `${e.clientY - Math.sqrt(5000)}px`;
    cursorText.style.left = `${e.clientX - Math.sqrt(5000)}px`;
    cursorText.style.top = `${e.clientY - Math.sqrt(5000)}px`;
});
document.addEventListener('mousedown', () => {
    cursorText.style.display = 'none';
});
document.addEventListener('mouseup', () => {
    cursorText.style.display = 'block';
});