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

    const centerX = 120;
    const centerY = 120;
    const outerRadius = 40;
    const innerRadius = 60;
    const numTeeth = 20;
    const toothHeight = 20;

    const toothAngle = (2 * Math.PI) / numTeeth;

    const cogGroup = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`)

    cogGroup.append("image")
        .attr("xlink:href", "../img/cogwheel.svg")
        .attr("width", "250")
        .attr("x", -105)
        .attr("y", -105);

    cogGroup.append("circle")
        .attr("r", 23.5)
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .on("click", function(event, d) {
            console.log("click");
        });






    const iconPositions = [
        { x: 0, y: -outerRadius - 30 },
        { x: outerRadius + 30, y: 0 },
        { x: 0, y: outerRadius + 30 },
        { x: -outerRadius - 30, y: 0 }
    ];

    const icons = [
        "../img/ai.svg",
        "../img/healthcare.svg",
        "../img/industry.svg",
        "../img/other.svg"
    ];

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