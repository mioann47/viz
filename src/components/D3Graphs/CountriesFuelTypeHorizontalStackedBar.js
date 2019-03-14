/*
Parts of code from https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458 and https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0
*/


import React, { Component } from 'react';
import * as d3 from 'd3'
//const margin = { top: 20, right: 20, bottom: 30, left: 40 }

const FUEL = ["Hydro", "Gas", "Other", "Oil", "Wind", "Coal", "Nuclear", "Solar", "Waste", "Biomass", "Petcoke", "Geothermal", "Cogeneration", "Wave and Tidal"]
export default class StackedBar extends React.Component {
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
    this.updateChart()
  }
 updateChart() {
    let all=[]
    const self=this
    
    const countriesOfInterest=this.props.countries.map((e)=>{return e.full}) 
    this.props.data.forEach(function (d) {
     if (countriesOfInterest.indexOf(d.country_long) === -1) {
        return;
      }
        if (!all.some((e)=>{ return e.country===d.country })){
          var x={}
          x.country=d.country
          x.country_long=d.country_long
          self.props.fuels.forEach(f=>x[f]=0)
          x.total=0
          all.push(x)
        }

        var index=all.findIndex(function(e){
          return e.country===d.country
        })
        
        if (d.fuel1 !== "") {
          
          all[index][d.fuel1] = all[index][d.fuel1] + 1
          all[index].total++
        }

        if (d.fuel2 !== "") {
          
          all[index][d.fuel2] = all[index][d.fuel2] + 1
          all[index].total++
        }
        if (d.fuel3 !== "") {
          
          all[index][d.fuel3] = all[index][d.fuel3] + 1
          all[index].total++
        }
        if (d.fuel4 !== "") {
          
          all[index][d.fuel4] = all[index][d.fuel4] + 1
          all[index].total++
        }

      
    });
    var svg = d3.select(this.svgEl)
    svg.selectAll("*").remove();
   
      var margin = { top: 20, right: 100, bottom: 100, left: 40 },
      width = +this.props.width - margin.left - margin.right,
      height = +this.props.height - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var y = d3.scaleBand()			// x = d3.scaleBand()	
      .rangeRound([0, height])	// .rangeRound([0, width])
      .paddingInner(0.05)
      .align(0.1);

    var x = d3.scaleLinear()		// y = d3.scaleLinear()
      .rangeRound([0, width]);	// .rangeRound([height, 0]);

    var z = d3.scaleOrdinal().range(['#00bfff','#fff100',
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

      /*const data= await d3.csv(csv, function (data, i, columns) {
        var t;
        for (i = 1, t = 0; i < columns.length; ++i) t += data[columns[i]] = +data[columns[i]];
        data.total = t;
        return data
      });*/
      const data=all;
      var keys=self.props.fuels.slice()
      //console.log(keys)
      
      //var keys = data.columns.slice(1);

      data.sort(function (a, b) { return b.total - a.total; });
      y.domain(data.map(function (d) { return d.country; }));					// x.domain...
      x.domain([0, d3.max(data, function (d) { return d.total; })]).nice();	// y.domain...
      z.domain(keys);

      g.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(data))
        .enter().append("g")
        .attr("fill", function (d) { return z(d.key); })
        .style("opacity", 0.5)
        .selectAll("rect")
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr("y", function (d) { return y(d.data.country); })	    //.attr("x", function(d) { return x(d.data.State); })
        .attr("x", function (d) { return x(d[0]); })			    //.attr("y", function(d) { return y(d[1]); })	
        .attr("width", function (d) { return x(d[1]) - x(d[0]); })	//.attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("height", y.bandwidth())						    //.attr("width", x.bandwidth());	
        .on("mouseover", function() { tooltip.style("display", null); })
        .on("mouseout", function() { tooltip.style("display", "none"); })
        .on("mousemove", function(d) {
          var xPosition = d3.mouse(this)[0] - 5;
          var yPosition = d3.mouse(this)[1] - 5;
          tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
          tooltip.select("text").text(d[1]-d[0]);
        });
      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0,0)") 						//  .attr("transform", "translate(0," + height + ")")
        .call(d3.axisLeft(y));									//   .call(d3.axisBottom(x));

    /*  g.selectAll(".tick").on("mouseover", function(e) { 
        tooltip.style("display", null); })
      .on("mouseout", function() { tooltip.style("display", "none"); })
      .on("mousemove", function(d) {
        var xPosition = d3.mouse(this)[0]+50;
        var yPosition = d3.mouse(this)[1]+10;
        tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
        var show=data.filter(function(k){
          return k.country===d
         }).country_long
         console.log(d)
        tooltip.select("text").text(show);
      });*/
      g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")				// New line
        .call(d3.axisBottom(x).ticks(null, "s"))					//  .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
        .attr("y", 2)												//     .attr("y", 2)
        .attr("x", x(x.ticks().pop()) + 0.5) 						//     .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")										//     .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Number of Power Plants With Supported Fuel Type")
        .attr("transform", "translate(" + (-width)/2 + ",30)");   	// Newline

      var legend = g.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice().reverse())
        .enter().append("g")
        //.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
        .attr("transform", function (d, i) { return "translate(60," + ( i * 20) + ")"; });

      legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z)
        .style("opacity", 0.5)
        .attr("stroke", "black")

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) { return d; });
    
        var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");
          
      tooltip.append("rect")
        .attr("width", 60)
        .attr("height", 20)
        .attr("fill", "white")
        .style("opacity", 0.5);
    
      tooltip.append("text")
        .attr("x", 30)
        .attr("dy", "1.2em")
        .style("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");



  }
  render() {
    return <div>
      <svg
        width={this.props.width //+ margin.left + margin.right
        }
        height={this.props.height //+ margin.top + margin.bottom
        }
        ref={el => this.svgEl = el} >
      </svg>
    </div>
  }
}