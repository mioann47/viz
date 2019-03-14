/*
Parts of code from https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458 and https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0
*/


import React, { Component } from 'react';
import * as d3 from 'd3'

//const margin = { top: 20, right: 20, bottom: 30, left: 40 }
import './ScatterPlot.css'
import mycsv from './CLEANED.csv'
const FUEL = ["Hydro", "Gas", "Other", "Oil", "Wind", "Coal", "Nuclear", "Solar", "Waste", "Biomass", "Petcoke", "Geothermal", "Cogeneration", "Wave and Tidal"]
export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      width: 1500,
      height: 1800,
    }
  }

  componentWillMount() {
    
    

   
   /* console.log(sumFuels)
    console.log(all)*/
    //this.setState({ data: all})




  }

  componentDidMount() {
    this.updateChart()
  }

  componentDidUpdate() {
   // this.updateChart()
  }
 updateChart() {
    var margin = { top: 50, right: 300, bottom: 50, left: 50 },
    outerWidth = 1050,
    outerHeight = 500,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scaleLinear()
    .range([0, width]).nice();

var y = d3.scaleLinear()
    .range([height, 0]).nice();

var xCat = "estimated_generation_gwh",
    yCat = "capacity_mw",
    colorCat = "fuel1";

d3.csv(mycsv).then( function(data) {
    
  data.forEach(function(d) {
      
   
  });
  var xMax = d3.max(data, function(d) { return d[xCat]; }) * 1.05,
      xMin = d3.min(data, function(d) { return d[xCat]; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d[yCat]; }) * 1.05,
      yMin = d3.min(data, function(d) { return d[yCat]; }),
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.axisBottom()
  .scale(x).tickSize(-height,0,0)

        var yAxis = d3.axisLeft()
  .scale(y).tickSize(-width,0,0)

  var color = d3.scaleOrdinal().range(['#00bfff','#fff100',
  '#008080',
  '#9999FF',
  '#FFA500',
  '#d4d4d4',
  '#003300',
  '#ff79c1',
  '#0004ff',
  '#00c30d',
  '#a96613',
  '#660066',
  '#000000',
  '#ff0000']);

  
  var zoom = d3.zoom()
  .scaleExtent([0, 1000])
  .extent([[0, 0], [width, height]])
  .on("zoom", zoomed);

  
  var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    
    .style("pointer-events", "all")
    .call(zoom);
    
      svg.append("rect")
      .attr("class","myrect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      

 
     
      var tooltip = d3.select("#scatter").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

      // tooltip mouseover event handler
      var tipMouseover = function(d) {
        var matrix = this.getScreenCTM()
        .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
        
        var html  = "<b>"+d.gppd_idnr + "</b><br/>Country: <b>" +d.country_long+
        "</b><br/>Fuel: <b><span style='color:" + color(d.fuel1) + ";'>" + d.fuel1 + "</span></b>"+
        "<b><span style='color:" + color(d.fuel2) + ";'>" +" "+ d.fuel2 + "</span></b>"+
        "<b><span style='color:" + color(d.fuel3) + ";'>" +" "+ d.fuel3 + "</span></b>"+
        "<b><span style='color:" + color(d.fuel4) + ";'>" +" "+ d.fuel4 + "</span></b>"+
        "<br/>" +
        "Capacity: <b>" + d.capacity_mw + " (mW)</b> <br/>Estimated: <b/>" + d.estimated_generation_gwh + " (mW)</b> ";
        tooltip.html(html)
        .style("left", (window.pageXOffset + matrix.e + 15) + "px")
        .style("top", (window.pageYOffset + matrix.f - 30) + "px")
          .transition()
            .duration(200) // ms
            .style("opacity", .9) // started as 0!

    };
    // tooltip mouseout event handler
    var tipMouseout = function(d) {
        tooltip.transition()
            .duration(300) // ms
            .style("opacity", 0); // don't care about position!
    };

 
      var gX=svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .call(xAxis);
  
    var gY=svg.append('g')
      .attr('transform', 'translate(0,0)')
      .attr('class', 'y axis')
      .call(yAxis);

      svg.append("text")
      .classed("label", true)
      .attr("x", width/2)
      .attr("y", margin.bottom +380)
      .style("text-anchor", "middle")
      .text("Estimated Generation (mW)");



      svg.append("text")
      .classed("label", true)
      .attr("y", -30)
      .attr("id","mylabel1")
      .attr("x", -height/2)
      .attr("transform", "rotate(-90)")
      .text("Capacity of Power Plant (mW)");

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);

  objects.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .classed("dot", true)
      .attr("r", 5)
      
      .style("opacity", 2)
      .style("stroke", "#cccccc")
      .attr("transform", transform)
      .style("fill", function(d) { return color(d[colorCat]); })
      .on("mouseover", tipMouseover)
      .on("mouseout", tipMouseout);

  var legend = svg.selectAll(".mylegend")
      .data(FUEL)
    .enter().append("g")
      .classed("mylegend", true)
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
      
      var clicked = ""
      var dots=d3.selectAll(".dot")
  legend.append("circle")
      .attr("r", 3.5)
      .attr("cx", width + 20)
      .style("stroke", "#cccccc")
      .style("opacity",0.5)
      .attr("fill", color)
      .on("click",function(d){
        dots.style("opacity",2)
        
        if (clicked !== d){
          dots
            .filter(function(e){
            return e.fuel1 !== d&&e.fuel2 !== d&&e.fuel3 !== d&&e.fuel4 !== d;
          })
            .style("opacity",0.1)
          clicked = d
        }
         else{
           clicked = ""
         }
       });

  legend.append("text")
      .attr("x", width + 26)
      .attr("dy", ".35em")
      .text(function(d) { return d; });

  

 

  function zoomed() {
    
  // create new scale ojects based on event
      var new_xScale = d3.event.transform.rescaleX(x);
      var new_yScale = d3.event.transform.rescaleY(y);
  // update axes
      gX.call(xAxis.scale(new_xScale));
      gY.call(yAxis.scale(new_yScale));
      d3.selectAll(".dot").attr("transform", function(d) { 
          return "translate(" + new_xScale(d[xCat]) + "," + new_yScale(d[yCat]) +")"; 
        });

      }
  function transform(d) {
    return "translate(" + x(d[xCat]) + "," + y(d[yCat]) + ")";
  }
});



  }
  render() {
    return <div id="scatter"></div>
  }
}