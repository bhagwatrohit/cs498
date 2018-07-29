
function switchYearSelector(selectedYear)
{
  d3.selectAll(".year-selector").classed("active", false);
  d3.select("#" + selectedYear).classed("active", true);
}

function switchYear(selectedYear)
{
  d3.selectAll(".grid")
    .style("display", "none")
    .style("opacity", 0.0);

  d3.select("#" +"grid-"+ selectedYear)
    .style("display", "block")
    .transition().delay(300).duration(500)
      .style("opacity", 1);

  d3.selectAll(".scatter")
        .style("display", "none")
        .style("opacity", 0.0);

  d3.select("#" +"scatter-"+ selectedYear)
        .style("display", "block")
        .transition().delay(300).duration(500)
          .style("opacity", 1);
}

d3.selectAll("a.year-selector").on("click", function(d) {
  var selectedYear = d3.select(this).attr("id");
  switchYearSelector(selectedYear);
  switchYear(selectedYear);
  return false;
});
