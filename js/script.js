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
    const overlay = document.getElementById("overlay");
    const closeButton = document.getElementById("close-button");


    const centerX = 120;
    const centerY = 240;
    const outerRadius = 30;
    const innerRadius = 60;
    const numTeeth = 20;
    const toothHeight = 20;

    const toothAngle = (2 * Math.PI) / numTeeth;

    const cogGroup = svg.append("g")
        .attr("transform", `translate(${centerX}, ${centerY})`)

    cogGroup.append("image")
        .attr("xlink:href", "../img/Cog2.svg")
        .attr("width", "150")
        .attr("x", -140)
        .attr("y", -140);


    cogGroup.append("image")
        .attr("xlink:href", "../img/Cog1.svg")
        .attr("width", "300")
        .attr("x", -105)
        .attr("y", -105);

    cogGroup.append("ellipse")
        .attr("rx", 23.5)
        .attr("ry", 18)
        .attr("cx", 45)
        .attr("cy", 0)
        .attr("fill", "azure")
        .attr("stroke", "none")



    cogGroup.append("rect")
        .attr("x", 21)
        .attr("y", -10)
        .attr("height", 10)
        .attr("width", 48)
        .attr("fill", "azure")
        .attr("stroke", "none");

    cogGroup.append("ellipse")
        .attr("rx", 23.5)
        .attr("ry", 18)
        .attr("cx", 45)
        .attr("cy", -10)
        .attr("fill", "lightblue")
        .attr("stroke", "black")
        .on("click", function(event, d) {
            console.log("click");
            overlay.style.display = "flex";;
        });


    closeButton.addEventListener("click", function() {
        // Close the overlay when the close button is clicked
        overlay.style.display = "none"; // Hide the overlay
    });


    const iconPositions = [
        { x: 25, y: -70 },
        { x: 90, y: 10 },
        { x: -40, y: 10 }
    ];

    const icons = [
        "../img/aiskewed.svg",
        "../img/healthcareskewed.svg",
        "../img/industryskewed.svg"
    ];

    for (let i = 0; i < 3; i++) {
        const icon = icons[i];
        const position = iconPositions[i];

        cogGroup.append("image")
            .attr("x", position.x)
            .attr("y", position.y)
            .attr("xlink:href", icon)
            .attr("width", 40)
            .attr("height", 40);

        cogGroup.append("rect")
            .attr("x", position.x)
            .attr("y", position.y - 40)
            .attr("height", 50)
            .attr("width", 10)
            .attr("fill", "blue");

        cogGroup.append("rect")
            .attr("x", position.x + 15)
            .attr("y", position.y - 90)
            .attr("height", 100)
            .attr("width", 10)
            .attr("fill", "orange");

        cogGroup.append("rect")
            .attr("x", position.x + 30)
            .attr("y", position.y - 140)
            .attr("height", 150)
            .attr("width", 10)
            .attr("fill", "green");




    }

    cogGroup.append("image")
        .attr("xlink:href", "../img/finished3d.svg")
        .attr("width", "150")
        .attr("y", "-75")
        .attr("x", "300");


    for (let i = 0; i < 3; i++) {
        const icon = icons[i];
        const position = iconPositions[i];

        cogGroup.append("image")
            .attr("x", position.x * 0.6 + 345)
            .attr("y", position.y * 0.6 - 20)
            .attr("xlink:href", icon)
            .attr("width", 40)
            .attr("height", 40);

        cogGroup.append("rect")
            .attr("x", position.x * 0.6 + 345)
            .attr("y", position.y * 0.6 - 30)
            .attr("height", 10)
            .attr("width", 10)
            .attr("fill", "blue");

        cogGroup.append("rect")
            .attr("x", position.x * 0.6 + 345 + 15)
            .attr("y", position.y * 0.6 - 40)
            .attr("height", 20)
            .attr("width", 10)
            .attr("fill", "orange");

        cogGroup.append("rect")
            .attr("x", position.x * 0.6 + 345 + 30)
            .attr("y", position.y * 0.6 - 50)
            .attr("height", 30)
            .attr("width", 10)
            .attr("fill", "green");




    }

});