const h = 600;
const w = 900;
const padding = 40;
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    const yearsArray = data.map((x) => new Date(x.Year));
    console.log(yearsArray);
    /* Creating xAxis */
    let minYear = d3.min(yearsArray, (d) => d);
    let maxYear = d3.max(yearsArray, (d) => d);
    // console.log(maYear);

    const xScale = d3
      .scaleLinear()
      .domain([minYear, maxYear])
      .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale);

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h - padding})`)
      .attr("id", "x-axis");
    //CreateyAxis
    /* plotDots*/
    //Color dots
    // Add ToolTips to dots
  });
