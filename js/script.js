const circle = document.getElementById('circle');
const overlay = document.getElementById('overlay');
const overlayContent = document.getElementById('overlay-content');
const overlaySVG = document.getElementById('overlay-svg');

circle.addEventListener('click', () => {
    overlay.style.display = 'block';
});

overlaySVG.addEventListener('click', () => {
    overlay.style.display = 'none';
});