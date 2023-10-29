const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');
const square1 = document.getElementById('square1');
const square2 = document.getElementById('square2');

circle1.addEventListener('click', () => {
    overlay1.style.display = 'block';
});

circle2.addEventListener('click', () => {
    overlay2.style.display = 'block';
});

square1.addEventListener('click', () => {
    overlay1.style.display = 'none';
});

square2.addEventListener('click', () => {
    overlay2.style.display = 'none';
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