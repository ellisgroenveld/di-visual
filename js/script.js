var tabulate = function(data, columns) {
    var table = d3.select('body').append('table')
    var thead = table.append('thead')
    var tbody = table.append('tbody')

    thead.append('tr')
        .selectAll('th')
        .data(columns)
        .enter()
        .append('th')
        .text(function(d) {
            return d;
        })

    var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr')

    var cells = rows.selectAll('td')
        .data(function(row) {
            return columns.map(function(column) {
                return {
                    column: column,
                    value: row[column]
                };
            });
        })
        .enter()
        .append('td')
        .text(function(d) {
            return d.value;
        })

    return table;
}

// Load CSV data and call the tabulate function
d3.csv('../data/mergeddata.csv', function(data) {
    var columns = ['onderzoekslijn', 'Content.projecttitel'];
    // tabulate(data, columns);

});
// script.js
document.addEventListener("DOMContentLoaded", function() {
    const svg = d3.select("#cog-svg");

    const centerX = 200;
    const centerY = 200;
    const outerRadius = 90;
    const innerRadius = 60;
    const numTeeth = 20;
    const toothHeight = 20;

    const toothAngle = (2 * Math.PI) / numTeeth;

    const cogGroup = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`);

    for (let i = 0; i < numTeeth; i++) {
        const angle = i * toothAngle;
        const x1 = outerRadius * Math.cos(angle);
        const y1 = outerRadius * Math.sin(angle);
        const x2 = (outerRadius + toothHeight) * Math.cos(angle);
        const y2 = (outerRadius + toothHeight) * Math.sin(angle);

        cogGroup.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke", "black");
    }

    // Add inner circle
    cogGroup.append("circle")
        .attr("cx", )
        .attr("cy", 0)
        .attr("r", innerRadius)
        .attr("fill", "white");

    // Define the positions for icons
    const iconPositions = [
        { x: 0, y: -outerRadius - 30 }, // Top
        { x: outerRadius + 30, y: 0 }, // Right
        { x: 0, y: outerRadius + 30 }, // Bottom
        { x: -outerRadius - 30, y: 0 } // Left
    ];

    // Create icons
    const icons = [
        "../img/ai.svg",
        "../img/healthcare.svg",
        "../img/industry.svg",
        "../img/other.svg"
    ];

    // Add icons to the corners of the cog
    for (let i = 0; i < 4; i++) {
        const icon = icons[i];
        const position = iconPositions[i];

        cogGroup.append("image")
            .attr("x", position.x)
            .attr("y", position.y)
            .attr("xlink:href", icon)
            .attr("width", 40)
            .attr("height", 40);
    }

});