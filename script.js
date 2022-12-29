const kickstarterDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
gameDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
w = 800,
h = 600,
p = 2,
legendW = 300,
legendH = 500,
legendP = 5;

const svg = d3.select("#canvas")
  .attr("width", w)
  .attr("height", h)


const tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip");

const legend = d3
  .select("body")
  .append("svg")
  .attr("id", "legend")
  .attr("height", legendH)
  .attr("widht", legendW);


d3.json(gameDataURL)
.then((data, err)=>{
  if(err)  return console.log(err);

  const categories = data.children.map(d => d.name)

  // give the data to this cluster layout
  const root = d3.hierarchy(data).sum(d=>d.value)

  // create treemap
  d3.treemap()
    .size([w, h])
    .padding(p)
    (root)

  // colorscale
  const colorScale = d3.scaleOrdinal()
    .domain(categories)
    .range(d3.schemePaired)
  
  // render cells
  svg
    .selectAll("rect")
    .data(root.leaves())
    .enter()
    .append("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("stroke", d => colorScale(d.data.category))
      .style("fill", d => colorScale(d.data.category))
      .attr("class", "tile")
      .attr("data-name", d => d.data.name)
      .attr("data-category", d => d.data.category)
      .attr("data-value", d => d.data.value)
      .on("mouseover", (e) => {
                  tooltip
                    .style("display", "block")
                    .style("left", `${e.pageX + 10}px`)
                    .style("top", `${e.pageY + 10}px`)
                    .html(
                    `
                      <p>Name: ${e.target.attributes["data-name"].value}</p>
                      <p>Category: ${e.target.attributes["data-category"].value}</p>
                      <p>Value: ${e.target.attributes["data-value"].value}</p>
                    `
                    )
                    .attr("data-value", e.target.attributes["data-value"].value)
                })
                .on("mouseout", () => {
                  tooltip.style("display", "none")
                })
  
   svg.selectAll('text')
      .data(root.leaves())
      .enter()
      .append('text')
      .selectAll('tspan')
      .data(d => {
          return d.data.name.split(/(?=[A-Z][^A-Z])/g)
              .map(v => {
                  return {
                      text: v,
                      x0: d.x0,
                      y0: d.y0
                  }
              });
      })
      .enter()
      .append('tspan')
      .attr("x", (d) => d.x0 + 5)
      .attr("y", (d, i) => d.y0 + 13 + i * 10)
      .text((d) => d.text)
      .attr("font-size", "0.6em")
      .attr("fill", "black");

  legend.selectAll("rect")
    .data(categories)
    .enter()
    .append("rect")
      .attr("class", "legend-item")
      .attr("height", legendH / categories.length - legendP)
      .attr("width", legendH / categories.length - legendP)
      .attr("fill", d => colorScale(d))
      .attr("y", (d, i) => (legendH / categories.length) * i)

  legend.selectAll("text")
      .data(categories)
      .enter()
      .append("text")
        .text(d => d)
        .attr("x", (d, i) => (legendH / categories.length) + legendP)
        .attr("y", (d, i) => (legendH / categories.length) * i + (legendH / categories.length) - legendP * 2)
        .attr("font-size", "1em")
        .attr("fill", "black");
})
