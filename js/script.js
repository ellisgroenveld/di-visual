const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const circle4 = document.getElementById('circle4');
const circle5 = document.getElementById('circle5');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');
const overlay3 = document.getElementById('overlay3');
const overlay4 = document.getElementById('overlay4');
const square1 = document.getElementById('square1');
const square2 = document.getElementById('square2');
const triangle1 = document.getElementById('triangle1');
const triangle2 = document.getElementById('triangle2');
const close1 = document.getElementById('close1');


circle1.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circle2.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circle3.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circle4.addEventListener('click', () => {
    overlay3.style.display = 'block';
});
circle5.addEventListener('click', () => {
    overlay3.style.display = 'block';
});

square1.addEventListener('click', () => {
    overlay2.style.display = 'block';
    overlay1.style.display = 'none';

});
square2.addEventListener('click', () => {
    overlay1.style.display = 'none';
});

triangle1.addEventListener('click', () => {
    overlay3.style.display = 'block';
    overlay2.style.display = 'none';

});
triangle2.addEventListener('click', () => {
    overlay2.style.display = 'none';
    overlay1.style.display = 'block';
});

close1.addEventListener('click', () => {
    overlay3.style.display = 'none';
    overlay2.style.display = 'block';
});


const circlesContainer = document.getElementById('circles-container');
const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; // Your data array here

function createCircles(array) {
    const numCircles = array.length;

    // Clear existing circles
    circlesContainer.innerHTML = '';

    for (let i = 0; i < numCircles; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');

        if (i > 10) {
            circle.style.marginRight = '10px'; // Add space between two stacks
        }

        circlesContainer.appendChild(circle);
    }
}

createCircles(dataArray);