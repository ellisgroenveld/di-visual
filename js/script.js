function dataRetrieveFunction(
    onderzoekslijnfilter,
    onderwijsfilter,
    afgerondfilter
) {
    const currentDate = new Date();

    let filteredData; // Declare filteredData as a let variable

    let returndata = d3.csv("/../data/mergeddata.csv")
        .then(function(data) {
            filteredData = data.filter((d) => {
                if (afgerondfilter === "yes") {
                    // Parse the date string from your dataset
                    const dataDate = new Date(d.datum);
                    return dataDate < currentDate;
                } else if (afgerondfilter === "no") {
                    // Parse the date string from your dataset
                    const dataDate = new Date(d.datum);
                    return dataDate > currentDate;
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

    console.log(returndata);
    return returndata;
}

function createProjectDetails(projectData, index) {
    const svgWidth = 400;
    const svgHeight = 250;
    const svgXSpacing = 25;
    const svgYSpacing = 25;
    const columns = 4; // Number of columns in the grid

    const x = (index % columns) * (svgWidth + svgXSpacing);
    const y = Math.floor(index / columns) * (svgHeight + svgYSpacing);

    const svg = d3
        .select("#overlay-svg3")
        .append("g")
        .attr("transform", `translate(${x}, ${y})`);

    svg
        .append("rect")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 10)
        .attr("rx", 10)
        .attr("ry", 10);

    const text = svg.append("text").attr("y", 10);

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 24)
        .text(projectData.projecttitel);

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 18)
        .text(projectData.naam);

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 18)
        .text(projectData.onderzoekerlectoraat);

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 18)
        .text(projectData.opdrachtgever);

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 18)
        .text(projectData.onderzoekslijn);
}

function contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter) {
    dataRetrieveFunction(onderzoekslijnfilter, onderwijsfilter, afgerondfilter)
        .then(function(data) {
            // Loop through the retrieved data and create project details for each project
            console.log(data);
            heightcalc = data.length;
            height = 75 * heightcalc + 1000;
            const svg = d3
                .select("#overlay-svg3")
                .attr("height", height)
                .attr("viewBox", "0 0 1900 " + height.toString());
            svg.selectAll("g").remove();
            data.forEach(function(projectData, index) {
                createProjectDetails(projectData, index);
            });


        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });
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
const homeButtons = Array.from(document.getElementsByClassName("home"));

let onderzoekslijnfilter = 0;
let onderwijsfilter = 0;
let afgerondfilter = 0;

homeButtons.forEach((homebutton) => {
    homebutton.addEventListener("click", () => {
        onderzoekslijnfilter = 0;
        onderwijsfilter = 0;
        afgerondfilter = 0;
        overlay1.style.display = "none";
        overlay2.style.display = "none";
        overlay3.style.display = "none";
        overlay4.style.display = "none";
    });
});

circlenav1.addEventListener("click", () => {
    onderzoekslijnfilter = "AI in de zorg";
    overlay1.style.display = "block";
});
circlenav2.addEventListener("click", () => {
    onderzoekslijnfilter = "AI in de industrie";
    overlay1.style.display = "block";
});
circlenav3.addEventListener("click", () => {
    onderzoekslijnfilter = "Verantwoorde AI";
    overlay1.style.display = "block";
});
circlelist1.addEventListener("click", () => {
    let afgerondfilter = "no";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
    overlay3.style.display = "block";
});
circlelist2.addEventListener("click", () => {
    let afgerondfilter = "yes";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
    overlay3.style.display = "block";
});

squarenav1.addEventListener("click", () => {
    onderwijsfilter = "minor";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav2.addEventListener("click", () => {
    onderwijsfilter = "stage";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav3.addEventListener("click", () => {
    onderwijsfilter = "afstuderen";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav4.addEventListener("click", () => {
    onderwijsfilter = "NULL";
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});

squarelist1.addEventListener("click", () => {
    afgerondfilter = "no";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
    overlay3.style.display = "block";
});
squarelist2.addEventListener("click", () => {
    afgerondfilter = "yes";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
    overlay3.style.display = "block";
});
squareback.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "none";
});

trianglelist1.addEventListener("click", () => {
    afgerondfilter = "no";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
    overlay3.style.display = "block";
});
trianglelist2.addEventListener("click", () => {
    afgerondfilter = "yes";
    contentGrid(onderzoekslijnfilter, onderwijsfilter, afgerondfilter);
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
const cxValue2 = d3.select("#circlenav2").attr("cx");
const cyValue2 = Number(d3.select("#circlenav2").attr("cy")) + 100;
const cxValue3 = d3.select("#circlenav3").attr("cx");
const cyValue3 = Number(d3.select("#circlenav3").attr("cy")) + 100;
const svg = d3.select("#main-svg");
const circleGroup1 = svg.append("g");
const circleGroup2 = svg.append("g");
const circleGroup3 = svg.append("g");

dataRetrieveFunction("AI in de zorg", 0, 0).then((filteredData) => {
    const data = filteredData.length; // Get the number of entries in filteredData
    const circles = circleGroup1
        .selectAll("circle")
        .data(d3.range(data))
        .enter()
        .append("circle")
        .attr("cx", cxValue1)
        .attr("cy", (d, i) => cyValue1 + i * (circleRadius * 2 + circleSpacing))
        .attr("r", circleRadius)
        .style("fill", "blue");
});

dataRetrieveFunction("AI in de industrie", 0, 0).then((filteredData) => {
    const data = filteredData.length; // Get the number of entries in filteredData
    const circles = circleGroup2
        .selectAll("circle")
        .data(d3.range(data))
        .enter()
        .append("circle")
        .attr("cx", cxValue2)
        .attr("cy", (d, i) => cyValue2 + i * (circleRadius * 2 + circleSpacing))
        .attr("r", circleRadius)
        .style("fill", "blue");
});

dataRetrieveFunction("Verantwoorde AI", 0, 0).then((filteredData) => {
    const data = filteredData.length; // Get the number of entries in filteredData
    const circles = circleGroup3
        .selectAll("circle")
        .data(d3.range(data))
        .enter()
        .append("circle")
        .attr("cx", cxValue3)
        .attr("cy", (d, i) => cyValue3 + i * (circleRadius * 2 + circleSpacing))
        .attr("r", circleRadius)
        .style("fill", "blue");
});