function dataRetrieveFunction(
    onderzoekslijnfilter,
    onderwijsfilter,
    afgerondfilter,
    onderzoekerfilter
) {
    const currentDate = new Date();

    let filteredData; // Declare filteredData as a let variable

    let returndata = d3
        .csv("/../data/mergeddata.csv")
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
            if (onderzoekerfilter) {
                filteredData = filteredData.filter((d) =>
                    d.onderzoekerlectoraat.match(onderzoekerfilter)
                );
            }
            return filteredData;
        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });

    return returndata;
}

function wrapText(text, maxCharactersPerLine, customText) {
    var words = customText.split(/\s+/);
    var lines = [];
    var currentLine = [];

    words.forEach(function(word) {
        if (currentLine.join(" ").length + word.length <= maxCharactersPerLine) {
            currentLine.push(word);
        } else {
            lines.push(currentLine.join(" "));
            currentLine = [word];
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.join(" "));
    }

    lines.forEach(function(line, index) {
        var xValue = 20; // Default x value
        var dyValue = "1.2em"; // Default dy value

        if (index === 0) {
            // Adjust x and dy for the first line to prevent overlapping
            xValue = 130; // You can adjust this value as needed
            dyValue = "0"; // No vertical offset for the first line
        }

        text.append("tspan")
            .attr("x", xValue)
            .attr("font-size", 18)
            .attr("dy", dyValue)
            .text(line);
    });
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
        .attr("transform", `translate(${x}, ${y})`)
        .attr("class", "clicktodetail")
        .attr("id", "i" + projectData.id);

    svg
        .append("rect")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("fill", "white")
        .attr("stroke", "black")
        .attr("stroke-width", 10)
        .attr("rx", 10)
        .attr("ry", 10);


    svg
        .append("image")
        .attr("width", 150)
        .attr("href", "../img/placeholder.jpg")
        .attr("x", 200)
        .attr("y", 100);

    const text = svg.append("text").attr("y", 10);
    const textMaxLength = 30;
    const projectTitle =
        projectData.projecttitel.length > textMaxLength ?
        projectData.projecttitel.substring(0, textMaxLength) + "..." :
        projectData.projecttitel;

    text
        .append("tspan")
        .attr("x", 20)
        .attr("dy", "1.2em")
        .attr("font-size", 24)
        .text(projectTitle)
        .attr("class", "ellipsis-text");

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

    return y;
}

function contentGrid(
    onderzoekslijnfilter,
    onderwijsfilter,
    afgerondfilter,
    onderzoekerfilter, overlay4
) {
    dataRetrieveFunction(
            onderzoekslijnfilter,
            onderwijsfilter,
            afgerondfilter,
            onderzoekerfilter
        )
        .then(function(data) {
            // Loop through the retrieved data and create project details for each project
            const svg = d3.select("#overlay-svg3");
            svg.selectAll("g").remove();
            let maxy = 0;
            data.forEach(function(projectData, index) {
                returny = createProjectDetails(projectData, index);
            });
            const height = returny + 300;
            svg
                .attr("height", height)
                .attr("viewBox", "0 0 1900 " + height.toString());

            const detailButtons = Array.from(document.getElementsByClassName("clicktodetail"));
            detailButtons.forEach((detailbutton) => {
                detailbutton.addEventListener("click", () => {
                    const usedid = Number(detailbutton.getAttribute("id").slice(1));
                    overlay4.style.display = "block";

                    d3.csv("/../data/mergeddata.csv")
                        .then(function(data) {
                            const filteredData = data.filter((d) => Number(d.id) === usedid);
                            let projectData = 0;
                            if (filteredData.length > 0) {
                                projectData = filteredData[0];
                            }
                            d3.select("#overlay-svg4").selectAll("g").remove();

                            const svg = d3
                                .select("#overlay-svg4")
                                .append("g")
                                .attr("class", "clicktodetail")
                                .attr("transform", `translate(${150}, ${20})`);

                            svg
                                .append("rect")
                                .attr("width", 1500)
                                .attr("height", 900)
                                .attr("fill", "white")
                                .attr("stroke", "black")
                                .attr("stroke-width", 10)
                                .attr("rx", 10)
                                .attr("ry", 10);

                            svg
                                .append("image")
                                .attr("width", 450)
                                .attr("href", "../img/placeholder.jpg")
                                .attr("x", 1000)
                                .attr("y", 50);

                            const text = svg.append("text").attr("y", 10);
                            const textMaxLength = 80;
                            const projectTitle =
                                projectData.projecttitel.length > textMaxLength ?
                                projectData.projecttitel.substring(0, textMaxLength) + "..." :
                                projectData.projecttitel;

                            text
                                .append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 30)
                                .text(projectTitle)
                                .attr("class", "ellipsis-text");

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Projectgroep: ");

                            text.append("tspan")
                                .text(projectData.naam);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Onderzoeker Lectoraat: ");

                            text
                                .append("tspan")
                                .text(projectData.onderzoekerlectoraat);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Opdrachtgever: ")

                            text
                                .append("tspan")
                                .text(projectData.opdrachtgever + " - " + projectData.contactgegevens);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Onderzoekslijn: ")

                            text
                                .append("tspan")
                                .text(projectData.onderzoekslijn);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Type Onderwijs: ")

                            text
                                .append("tspan")
                                .text(projectData.onderwijs);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Locatie: ")

                            text
                                .append("tspan")
                                .text(projectData.locatie);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Event: ")

                            text
                                .append("tspan")
                                .text(projectData.event);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Datum: ")

                            text
                                .append("tspan")
                                .text(projectData.datum);


                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Achtergrond: ");

                            wrapText(text, 120, projectData.achtergrond);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Doelstelling: ");

                            wrapText(text, 120, projectData.doelstelling);

                            text.append("tspan")
                                .attr("x", 20)
                                .attr("dy", "1.2em")
                                .attr("font-size", 18)
                                .attr("font-weight", "bold")
                                .text("Resultaten: ");

                            wrapText(text, 120, projectData.resultaten);

                        })
                        .catch(function(error) {
                            console.error("Error loading data:", error);
                        });
                });
            });
        })
        .catch(function(error) {
            console.error("Error loading data:", error);
        });
}

function cogChart(
    onderzoekslijnfilter,
    onderwijsfilter,
    afgerondfilter,
    onderzoekerfilter,
    circleGroup,
    xValue,
    yValue
) {
    dataRetrieveFunction(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter
    ).then((filteredData) => {
        const data = filteredData.length; // Get the number of entries in filteredData
        circleGroup.selectAll("*").remove();
        const circleRadius = 20;
        const circleSpacing = 10;

        const groupSize = 5; // Set the size of each group
        const colors = ["blue", "lightblue"];
        const circles = circleGroup
            .selectAll("circle")
            .data(d3.range(data))
            .enter()
            .append("circle")
            .attr("cx", (d, i) => Number(xValue) + (i % 2 === 0 ? 0 : 20)) // Add the offset for every other circle
            .attr("cy", (d, i) => yValue + i * (circleRadius * 2 + circleSpacing))
            .attr("r", circleRadius)
            .style("fill", (d, i) => colors[Math.floor(i / groupSize) % colors.length]);
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
const close2 = document.getElementById("close2");
const homeButtons = Array.from(document.getElementsByClassName("home"));
const rogermain = document.getElementById("rogercirclemain");
const rogerol1 = document.getElementById("rogercircleol1");
const rogerol2 = document.getElementById("rogercircleol2");
const marcelmain = document.getElementById("marcelcirclemain");
const marcelol1 = document.getElementById("marcelcircleol1");
const marcelol2 = document.getElementById("marcelcircleol2");
const geenonderzoekermain = document.getElementById("geenonderzoekercirclemain");
const geenonderzoekerol1 = document.getElementById("geenonderzoekercircleol1");
const geenonderzoekerol2 = document.getElementById("geenonderzoekercircleol2");

let onderzoekslijnfilter = 0;
let onderwijsfilter = 0;
let afgerondfilter = 0;
let onderzoekerfilter = 0;

const circleRadius = 20;
const circleSpacing = 10;
const cxValue1 = d3.select("#circlenav1").attr("cx");
const cyValue1 = Number(d3.select("#circlenav1").attr("cy")) + 100;
const cxValue2 = d3.select("#circlenav2").attr("cx");
const cyValue2 = Number(d3.select("#circlenav2").attr("cy")) + 100;
const cxValue3 = d3.select("#circlenav3").attr("cx");
const cyValue3 = Number(d3.select("#circlenav3").attr("cy")) + 100;
const sxValue1 = d3.select("#squarenav1").attr("x");
const syValue1 = Number(d3.select("#squarenav1").attr("y")) + 100;
const sxValue2 = d3.select("#squarenav2").attr("x");
const syValue2 = Number(d3.select("#squarenav2").attr("y")) + 100;
const sxValue3 = d3.select("#squarenav3").attr("x");
const syValue3 = Number(d3.select("#squarenav3").attr("y")) + 100;
const sxValue4 = d3.select("#squarenav4").attr("x");
const syValue4 = Number(d3.select("#squarenav4").attr("y")) + 100;
const txValue1 = d3.select("#trianglelist1").attr("x");
const tyValue1 = Number(d3.select("#trianglelist1").attr("y")) + 100;
const txValue2 = d3.select("#trianglelist2").attr("x");
const tyValue2 = Number(d3.select("#trianglelist2").attr("y")) + 100;

const mainsvg = d3.select("#main-svg");
const overlay1svg = d3.select("#overlay-svg1");
const overlay2svg = d3.select("#overlay-svg2");
const circleGroup1 = mainsvg.append("g");
const circleGroup2 = mainsvg.append("g");
const circleGroup3 = mainsvg.append("g");
const squareGroup1 = overlay1svg.append("g");
const squareGroup2 = overlay1svg.append("g");
const squareGroup3 = overlay1svg.append("g");
const squareGroup4 = overlay1svg.append("g");
const triangleGroup1 = overlay2svg.append("g");
const triangleGroup2 = overlay2svg.append("g");

cogChart("AI in de zorg", 0, 0, 0, circleGroup1, cxValue1, cyValue1);
cogChart("AI in de industrie", 0, 0, 0, circleGroup2, cxValue2, cyValue2);
cogChart("Verantwoorde AI", 0, 0, 0, circleGroup3, cxValue3, cyValue3);

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




geenonderzoekermain.addEventListener("click", () => {
    onderzoekerfilter = 0;
    cogChart(
        "AI in de zorg",
        0,
        0,
        onderzoekerfilter,
        circleGroup1,
        cxValue1,
        cyValue1
    );
    cogChart(
        "AI in de industrie",
        0,
        0,
        onderzoekerfilter,
        circleGroup2,
        cxValue2,
        cyValue2
    );
    cogChart(
        "Verantwoorde AI",
        0,
        0,
        onderzoekerfilter,
        circleGroup3,
        cxValue3,
        cyValue3
    );
});

marcelmain.addEventListener("click", () => {
    onderzoekerfilter = "Schmitz";
    cogChart(
        "AI in de zorg",
        0,
        0,
        onderzoekerfilter,
        circleGroup1,
        cxValue1,
        cyValue1
    );
    cogChart(
        "AI in de industrie",
        0,
        0,
        onderzoekerfilter,
        circleGroup2,
        cxValue2,
        cyValue2
    );
    cogChart(
        "Verantwoorde AI",
        0,
        0,
        onderzoekerfilter,
        circleGroup3,
        cxValue3,
        cyValue3
    );
});

rogermain.addEventListener("click", () => {
    onderzoekerfilter = "Bemelmans";
    cogChart(
        "AI in de zorg",
        0,
        0,
        onderzoekerfilter,
        circleGroup1,
        cxValue1,
        cyValue1
    );
    cogChart(
        "AI in de industrie",
        0,
        0,
        onderzoekerfilter,
        circleGroup2,
        cxValue2,
        cyValue2
    );
    cogChart(
        "Verantwoorde AI",
        0,
        0,
        onderzoekerfilter,
        circleGroup3,
        cxValue3,
        cyValue3
    );
});

geenonderzoekerol1.addEventListener("click", () => {
    onderzoekerfilter = 0;
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
});

rogerol1.addEventListener("click", () => {
    onderzoekerfilter = "Bemelmans";
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
});

marcelol1.addEventListener("click", () => {
    onderzoekerfilter = "Schmitz";
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
});

geenonderzoekerol2.addEventListener("click", () => {
    onderzoekerfilter = 0;
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
});

rogerol2.addEventListener("click", () => {
    onderzoekerfilter = "Bemelmans";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
});

marcelol2.addEventListener("click", () => {
    onderzoekerfilter = "Schmitz";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
});

circlenav1.addEventListener("click", () => {
    onderzoekslijnfilter = "AI in de zorg";
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
    overlay1.style.display = "block";
});
circlenav2.addEventListener("click", () => {
    onderzoekslijnfilter = "AI in de industrie";
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
    overlay1.style.display = "block";
});

circlenav3.addEventListener("click", () => {
    onderzoekslijnfilter = "Verantwoorde AI";
    cogChart(
        onderzoekslijnfilter,
        "minor",
        0,
        onderzoekerfilter,
        squareGroup1,
        sxValue1,
        syValue1
    );
    cogChart(
        onderzoekslijnfilter,
        "stage",
        0,
        onderzoekerfilter,
        squareGroup2,
        sxValue2,
        syValue2
    );
    cogChart(
        onderzoekslijnfilter,
        "afstuderen",
        0,
        onderzoekerfilter,
        squareGroup3,
        sxValue3,
        syValue3
    );
    cogChart(
        onderzoekslijnfilter,
        "NULL",
        0,
        onderzoekerfilter,
        squareGroup4,
        sxValue4,
        syValue4
    );
    overlay1.style.display = "block";
});
circlelist1.addEventListener("click", () => {
    let afgerondfilter = "no";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
    overlay3.style.display = "block";
});
circlelist2.addEventListener("click", () => {
    let afgerondfilter = "yes";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
    overlay3.style.display = "block";
});

squarenav1.addEventListener("click", () => {
    onderwijsfilter = "minor";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav2.addEventListener("click", () => {
    onderwijsfilter = "stage";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav3.addEventListener("click", () => {
    onderwijsfilter = "afstuderen";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});
squarenav4.addEventListener("click", () => {
    onderwijsfilter = "NULL";
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "no",
        onderzoekerfilter,
        triangleGroup1,
        txValue1,
        tyValue1
    );
    cogChart(
        onderzoekslijnfilter,
        onderwijsfilter,
        "yes",
        onderzoekerfilter,
        triangleGroup2,
        txValue2,
        tyValue2
    );
    overlay2.style.display = "block";
    overlay1.style.display = "none";
});

squarelist1.addEventListener("click", () => {
    afgerondfilter = "no";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
    overlay3.style.display = "block";
});
squarelist2.addEventListener("click", () => {
    afgerondfilter = "yes";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
    overlay3.style.display = "block";
});
squareback.addEventListener("click", () => {
    onderzoekslijnfilter = "";
    overlay1.style.display = "none";
});

trianglelist1.addEventListener("click", () => {
    afgerondfilter = "no";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
    overlay3.style.display = "block";
});
trianglelist2.addEventListener("click", () => {
    afgerondfilter = "yes";
    contentGrid(
        onderzoekslijnfilter,
        onderwijsfilter,
        afgerondfilter,
        onderzoekerfilter, overlay4
    );
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


close2.addEventListener("click", () => {
    afgerondfilter = "";
    overlay4.style.display = "none";
});