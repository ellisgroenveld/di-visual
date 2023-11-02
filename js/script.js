function dataRetrieveFunction(
    onderzoekslijnfilter,
    onderwijsfilter,
    afgerondfilter
) {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().split("T")[0];

    let filteredData; // Declare filteredData as a let variable

    d3.csv("/../data/mergeddata.csv")
        .then(function(data) {
            filteredData = data.filter((d) => {
                if (d.afgerondfilter === "yes") {
                    return d.date < formattedCurrentDate;
                } else if (d.afgerondfilter === "no") {
                    return d.date > formattedCurrentDate;
                } else {
                    return true;
                }
            });

            if (onderzoekslijnfilter) {
                filteredData = filteredData.filter((d) =>
                    d.onderzoekslijn.includes(onderzoekslijnfilter)
                );
            }
            if (onderwijsfilter) {
                filteredData = filteredData.filter((d) =>
                    d.onderwijsshort.includes(onderwijsfilter)
                );
            }
            console.log(filteredData);
            return filteredData;
        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });
}

function createProjectDetails(projectData) {
    const svgWidth = 900;
    const svgHeight = 300;
    const svgX = 50;
    const svgY = 50;

    const svg = d3
        .select("#overlay-svg3")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("x", svgX)
        .attr("y", svgY);

    svg
        .append("rect")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 10)
        .attr("rx", 10)
        .attr("ry", 10);

    const text = svg.append("text").attr("y", 80);

    text
        .append("tspan")
        .attr("x", 100)
        .attr("dy", "1.2em")
        .attr("font-size", 72)
        .text(projectData.projecttitel);

    text
        .append("tspan")
        .attr("x", 100)
        .attr("dy", "1.2em")
        .attr("font-size", 36)
        .text(projectData.naam);

    text
        .append("tspan")
        .attr("x", 100)
        .attr("dy", "1.2em")
        .attr("font-size", 36)
        .text(projectData.onderzoekerlectoraat);

    text
        .append("tspan")
        .attr("x", 100)
        .attr("dy", "1.2em")
        .attr("font-size", 36)
        .text(projectData.opdrachtgever);
}

const circlenav1 = document.getElementById("circlenav1");
const circlenav2 = document.getElementById("circlenav2");
const circlenav3 = document.getElementById("circlenav3");
const circlelist1 = document.getElementById("circlelist1");
const circlelist2 = document.getElementById("circlelist2");
const overlay1 = document.getElementById("overlay1");
const overlay2 = document.getElementById("overlay2");
const overlay3 = document.getElementById("overlay3");
const overlay4 = document.getElementById("overlay4");
const squarenav1 = document.getElementById("squarenav1");
const squarenav2 = document.getElementById("squarenav2");
const squarenav3 = document.getElementById("squarenav3");
const squarenav4 = document.getElementById("squarenav4");
const squareback = document.getElementById("squareback");
const squarelist1 = document.getElementById("squarelist1");
const squarelist2 = document.getElementById("squarelist2");
const trianglelist1 = document.getElementById("trianglelist1");
const trianglelist2 = document.getElementById("trianglelist2");
const triangleback = document.getElementById("triangleback");
const close1 = document.getElementById("close1");

let onderzoekslijnfilter = 0;
let onderwijsfilter = 0;
let afgerondfilter = 0;

circlenav1.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "block";
});
circlenav2.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "block";
});
circlenav3.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "block";
});
circlelist1.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "block";
    dataRetrieveFunction(0, 0, "no")
        .then(function(data) {
            // Loop through the retrieved data and create project details for each project
            data.forEach(function(projectData) {
                createProjectDetails(projectData);
            });
        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });
});
circlelist2.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "block";
    dataRetrieveFunction(0, 0, "yes")
        .then(function(data) {
            // Loop through the retrieved data and create project details for each project
            data.forEach(function(projectData) {
                createProjectDetails(projectData);
            });
        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });
});

squarenav1.addEventListener("click", () => {
    onderwijsfilter = "";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav2.addEventListener("click", () => {
    onderwijsfilter = "";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav3.addEventListener("click", () => {
    onderwijsfilter = "";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav4.addEventListener("click", () => {
    onderwijsfilter = "";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});

squarelist1.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "block";
});
squarelist2.addEventListener("click", () =>
    afgerondfilter = ""; {
        overlay3.style.display = "block";
    });
squareback.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "none";
});

trianglelist1.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "block";
});
trianglelist2.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "block";
});
triangleback.addEventListener("click", () => {
    overlay2.style.display = "none";
    overlay1.style.display = "block";
});

close1.addEventListener("click", () => {
    afgerondfilter = "";
    overlay3.style.display = "none";
});

const circleRadius = 20;
const circleSpacing = 10;
const cxValue1 = d3.select("#circlenav1").attr("cx");
const cyValue1 = Number(d3.select("#circlenav1").attr("cy")) + 100;
const svg = d3.select("#main-svg");
const circleGroup1 = svg.append("g");

// Use a different parameter name in the callback function
let n = dataRetrieveFunction("AI in de zorg", 0, 0);
console.log(n);
// const n = dataraw.length; // Set n to the length of dataraw
const data = d3.range(n.length);
const circles = circleGroup1
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", cxValue1)
    .attr("cy", (d, i) => cyValue1 + i * (circleRadius * 2 + circleSpacing))
    .attr("r", circleRadius)
    .style("fill", "blue");