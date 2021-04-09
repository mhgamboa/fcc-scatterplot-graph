const h = 600;
const w = 900;
const padding = 40;
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

/* Fect Data */
fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((response) => response.json())
  .then((data) => {
    /* Creating xAxis */
    const xScale = d3
      .scaleLinear()
      .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year)])
      .range([padding, w - padding]);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

    svg
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${h - padding})`)
      .attr("id", "x-axis");

    /* Create yAxis */
    const yScale = d3
      .scaleTime()
      .domain([
        d3.max(data, (d) => new Date(d.Seconds + 5) * 1000),
        d3.min(data, (d) => new Date(d.Seconds) * 1000),
      ])
      .range([h - padding, padding]);

    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${padding}, 0)`)
      .attr("id", "y-axis");
    /* Create Dots*/
    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      //Plot Dots
      .attr("cx", (d) => xScale(d.Year))
      .attr("cy", (d) => yScale(d.Seconds * 1000))
      .attr("r", 5)
      //Add Proper Labels to Dots
      .attr("class", "dot")
      .attr("data-xvalue", (d) => d.Year)
      .attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
      //Color dots
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .attr("fill", (d) => (d.Doping ? "red" : "green"));
    // Add ToolTips to dots
  });
