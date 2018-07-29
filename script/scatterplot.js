function displayScatterChart(id, options, dataSource){

//Search within an array
function searchName(nameKey, myArray){
  for (var i=0; i < myArray.length; i++) {
      if (myArray[i].Name === nameKey) {
          return myArray[i];
      }
  }
}

  margin = {top: 10, right: 20, bottom: 10, left: 20},
  width = options.width - margin.left - margin.right,
  height = options.height - margin.top - margin.bottom;
  // Define the div for the tooltip

  var visdiv = d3.select(id).append("div")
    .attr("class", "Visualization");

  var svg = visdiv.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.left + margin.right)
      .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");

  var tooltip = visdiv.append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.csv(dataSource).then(function(data) {
    //Format the data
    data.forEach(function(d){
      d.Goals = +d.Goals;
      d.Apps = +d.Apps;
      d.Assists = +d.Assists;
      d.Year = +d.Year;
      d.Rank = +d.Rank;
      d.Rating = +d.Rating;
      d['Mot M']= +d['Mot M'];
    });

 //D3Scales
  var yscale = d3.scaleLinear()
      .domain([0,d3.max(data,function(d){return d.Assists+3; })])
      .range([height,0]),
  radius = d3.scaleLinear()
      .domain([0,d3.max(data,function(d){return d.Apps; })])
      .range([0, 10]),
  xscale = d3.scaleLinear()
      .domain([0,d3.max(data,function(d){return d.Goals+3;})])
      .range([0, width])
  xaxis = d3.axisBottom()
      .scale(xscale),
  yaxis = d3.axisLeft()
      .scale(yscale);

  //Annotate Messi and Ronaldo's statistics
  var messiIndex = searchName("Lionel Messi", data);
  var ronaldoIndex = searchName("Cristiano Ronaldo", data);
  //Annotations - Tied to the svg itself
  //Annotation
  svg.append("text")
    .attr("x", xscale(messiIndex.Goals)-margin.right)
    .attr("y", yscale(messiIndex.Assists)-margin.top-80)
    .attr("class", "axis-label")
    .text("Messi, Apps: " +messiIndex.Apps);
  svg.append("rect")
    .attr("x", xscale(messiIndex.Goals)-margin.right)
    .attr("y", yscale(messiIndex.Assists)-margin.top-100)
    .attr("width", 100)
    .attr("height", 100)
    .attr('fill-opacity', 0.5);
  //Ronaldo Annotation
  svg.append("text")
    .attr("x", xscale(ronaldoIndex.Goals)-margin.right)
    .attr("y", yscale(ronaldoIndex.Assists)-margin.top-80)
    .attr("class", "axis-label")
    .text("Ronaldo, Apps: " +ronaldoIndex.Apps);
  svg.append("rect")
    .attr("x", xscale(ronaldoIndex.Goals)-margin.right)
    .attr("y", yscale(ronaldoIndex.Assists)-margin.top-100)
    .attr("width", 100)
    .attr("height", 100)
    .attr('fill-opacity', 0.5);

  //Draw the Scatterplot
  var circle = svg.selectAll(".circle")
    .data(data)
    .enter().append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  ;

  circle.append("circle")
    .attr("class", "circle")
      .attr("cx", function(d) { return xscale(d.Goals);})
      .attr("cy", function(d) { return yscale(d.Assists);})
      .attr("r", function(d) { return radius(d.Apps);})
      //Tooltip on mouseover
      .on("mouseover", function(d) {
          tooltip.transition()
              .duration(200)
              .style("opacity", .9)
              .style("left", xscale(d.Goals)-20 +"px")
              .style("top", yscale(d.Assists)+20 +"px");
          tooltip.html(d.Name + "<br />Goals: "+ d.Goals + "<br />Assits: " + d.Assists  + "<br />Apps: " + d.Apps );
          })
      .on("mouseout", function(d) {
          tooltip.transition()
              .duration(500)
              .style("opacity", 0);});

  //XAxis
  var xAxistranslate = height+margin.top;
  svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + xAxistranslate + ")")
      .call(xaxis);
  //X Axis Label
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("text")
    .attr("x", width-margin.left-margin.right)
    .attr("y", height-margin.bottom)
    .attr("class", "axis-lable")
    .text("Goals");
  //YAxis
  svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(yaxis);
  //Y Axis Label
  svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .append("text")
  .attr("x", 5)
  .attr("y", margin.top)
    .attr("class", "axis-lable")
    .text("Assits");

  });}
