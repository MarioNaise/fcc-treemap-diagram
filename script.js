const kickstarterDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"
movieDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
gameDataURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

d3.json(gameDataURL)
.then((data, err)=>{
  if(err)  return console.log(err);
  console.log(data)
})

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