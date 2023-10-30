d3.csv("/../data/mergeddata.csv", function(data) {
    console.log(data)
});

const circlenav1 = document.getElementById('circlenav1');
const circlenav2 = document.getElementById('circlenav2');
const circlenav3 = document.getElementById('circlenav3');
const circlelist1 = document.getElementById('circlelist1');
const circlelist2 = document.getElementById('circlelist2');
const overlay1 = document.getElementById('overlay1');
const overlay2 = document.getElementById('overlay2');
const overlay3 = document.getElementById('overlay3');
const overlay4 = document.getElementById('overlay4');
const squarenav1 = document.getElementById('squarenav1');
const squarenav2 = document.getElementById('squarenav2');
const squarenav3 = document.getElementById('squarenav3');
const squarenav4 = document.getElementById('squarenav4');
const squareback = document.getElementById('squareback');
const squarelist1 = document.getElementById('squarelist1');
const squarelist2 = document.getElementById('squarelist2');
const trianglelist1 = document.getElementById('trianglelist1');
const trianglelist2 = document.getElementById('trianglelist2');
const triangleback = document.getElementById('triangleback');
const close1 = document.getElementById('close1');


circlenav1.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circlenav2.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circlenav3.addEventListener('click', () => {
    overlay1.style.display = 'block';
});
circlelist1.addEventListener('click', () => {
    overlay3.style.display = 'block';
});
circlelist2.addEventListener('click', () => {
    overlay3.style.display = 'block';
});

squarenav1.addEventListener('click', () => {
    overlay2.style.display = 'block';
    overlay1.style.display = 'none';

});
squarenav2.addEventListener('click', () => {
    overlay2.style.display = 'block';
    overlay1.style.display = 'none';

});
squarenav3.addEventListener('click', () => {
    overlay2.style.display = 'block';
    overlay1.style.display = 'none';

});
squarenav4.addEventListener('click', () => {
    overlay2.style.display = 'block';
    overlay1.style.display = 'none';

});

squarelist1.addEventListener('click', () => {
    overlay3.style.display = 'block';
});
squarelist2.addEventListener('click', () => {
    overlay3.style.display = 'block';
});
squareback.addEventListener('click', () => {
    overlay1.style.display = 'none';
});

trianglelist1.addEventListener('click', () => {
    overlay3.style.display = 'block';

});
trianglelist2.addEventListener('click', () => {
    overlay3.style.display = 'block';

});
triangleback.addEventListener('click', () => {
    overlay2.style.display = 'none';
    overlay1.style.display = 'block';
});

close1.addEventListener('click', () => {
    overlay3.style.display = 'none';
});