const kickstarterDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json",
movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json",
gameDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json",
w = 600,
h = 400,
p = 2;

const svg = d3.select("#canvas")
  .attr("width", w)
  .attr("height", h)

// colorscale


d3.json(gameDataURL)
.then((data, err)=>{
  if(err)  return console.log(err);

  console.log(data)

  // give the data to this cluster layout
  const root = d3.hierarchy(data.children[2]).sum(d=>d.value)

  // create treemap
  d3.treemap()
    .size([w, h])
    .padding(p)
    (root)

  // group data
  
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
      .style("stroke", "black")
      .style("fill", "slateblue")
      .attr("class", "tile")
})

/*
d3.json(movieDataURL)
.then((data, err)=>{
  if(err)  return console.log(err);
  console.log(data)
})

d3.json(kickstarterDataURL)
.then((data, err)=>{
  if(err)  return console.log(err);
  console.log(data)
})
*/