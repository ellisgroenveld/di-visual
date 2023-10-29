// Create an array to store shape data
const shapeData = [
    { id: 1, type: 'circle', color: 'blue' },
    { id: 2, type: 'circle', color: 'green' },
    { id: 3, type: 'circle', color: 'red' },
    { id: 4, type: 'circle', color: 'orange' },
    { id: 5, type: 'circle', color: 'purple' },
];

// Create the main SVG container
const svg = d3.select('#main-svg');

// Create shapes on the main screen
svg
    .selectAll('.shape')
    .data(shapeData)
    .enter()
    .append('g')
    .attr('class', 'shape')
    .attr('transform', (d, i) => `translate(${75 + i * 75}, 150)`)
    .on('click', (event, d) => {
        if (d.id <= 3) {
            openOverlay1();
        } else {
            openOverlay3();
        }
    })
    .each(function (d) {
        const shape = d3.select(this);

        if (d.type === 'circle') {
            shape
                .append('circle')
                .attr('r', 20)
                .style('fill', d.color);
        }
    });

// Create overlay elements in the SVG
const overlay1 = svg.append('g').attr('id', 'overlay1').style('display', 'none');
const overlay2 = svg.append('g').attr('id', 'overlay2').style('display', 'none');
const overlay3 = svg.append('g').attr('id', 'overlay3').style('display', 'none');
const overlay4 = svg.append('g').attr('id', 'overlay4').style('display', 'none');

function openOverlay1() {
    overlay1.style('display', 'block');
    overlay1.selectAll('.square').on('click', function (event, d) {
        const squareId = d3.select(this).attr('id');
        if (squareId === 'square4' || squareId === 'square5' || squareId === 'square6') {
            overlay1.style('display', 'none');
        } else {
            openOverlay2();
        }
    });
}

function openOverlay2() {
    overlay2.style('display', 'block');
    overlay2.selectAll('.triangle').on('click', function (event, d) {
        const triangleId = d3.select(this).attr('id');
        if (triangleId === 'triangle4') {
            overlay2.style('display', 'none');
        } else {
            openOverlay4();
        }
    });
}

function openOverlay3() {
    overlay3.style('display', 'block');
    overlay3.select('#closeButton').on('click', () => {
        overlay3.style('display', 'none');
    });
}

function openOverlay4() {
    overlay4.style('display', 'block');
}
