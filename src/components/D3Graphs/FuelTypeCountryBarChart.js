import React, { Component } from 'react';
import * as d3 from 'd3'
import './FuelTypeCountryBarChart.css'
//const margin = { top: 30, right: 30, bottom: 30, left: 30 };
const margin = { top: 100, right: 100, bottom: 100, left: 100 }

export default class FuelTypeCountryBarChart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      width: 500,
      height: 300
    }
  }
 
  componentWillMount() {
    this.setState({width:this.props.width,height:this.props.height})
    
  }

  componentDidMount() {
    this.updateChart()
  }

  componentDidUpdate() {
    this.updateChart()
  }
  updateChart() {
    var sumFuels = {}
    const c=this.props.country
    console.log(c)
    this.props.data.filter((e)=>{return c===e.country_long}).forEach(function (d) {
        if (d.fuel1 !== "") {
          if (sumFuels[d.fuel1] === undefined) {
            sumFuels[d.fuel1] = 1
          } else {
            sumFuels[d.fuel1] = sumFuels[d.fuel1] + 1
          }
        }

        if (d.fuel2 !== "") {
          if (sumFuels[d.fuel2] === undefined) {
            sumFuels[d.fuel2] = 1
          } else {
            sumFuels[d.fuel2] = sumFuels[d.fuel2] + 1
          }
        }

        if (d.fuel3 !== "") {
          if (sumFuels[d.fuel3] === undefined) {
            sumFuels[d.fuel3] = 1
          } else {
            sumFuels[d.fuel3] = sumFuels[d.fuel3] + 1
          }
        }

        if (d.fuel4 !== "") {
          if (sumFuels[d.fuel4] === undefined) {
            sumFuels[d.fuel4] = 1
          } else {
            sumFuels[d.fuel4] = sumFuels[d.fuel4] + 1
          }
        }

      
    });

    var items=[]
    var v=Object.keys(sumFuels)
    v.forEach((e)=>{

      var item={}
      item.fuel=e
      item.value=sumFuels[e]
      items.push(item)

    })
    items.sort(function(a, b) {
      return d3.descending(a.value, b.value)
    })
    
    const self = this
    var svg = d3.select(this.svgEl)
    svg.selectAll("*").remove();
    svg.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");

    var x = d3.scaleBand()
      .domain(items.map(function (d) { return d.fuel }))
      .range([0, this.state.width])
      .padding(0.1);
      
    var y = d3.scaleLinear()
      .domain([0, d3.max(items, function (d) { return d.value; })])
      .range([this.state.height, 0]);
      
    var bars=svg.selectAll(".bar")
      .data(items)
      .enter()
      .append("rect")
      .attr("class", "bar");

      bars.attr("x", function (d) { return x(d.fuel); })
      .attr("y", function (d) { return y(d.value); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return self.state.height - y(d.value); })
      .attr("fill", "#aac6dc")

    svg.append("g")
      .attr("transform", "translate(0," + this.state.height + ")")
      .call(d3.axisBottom(x)) 
      .selectAll("text")
      .attr("y", 9)
      .attr("x", 9)
      .attr("dy", ".35em")
      .attr("transform", "rotate(35)").transition().duration(500)
      .style("text-anchor", "start");

    svg.append("g")
      .call(d3.axisLeft(y))            
      .append("text")
      .attr("fill", "#000")
      .attr("y", -40)
      .attr("x", -self.state.height/2)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("Number of Power Plants");

      svg.selectAll(".text")  		
      .data(items)
      .enter()
      .append("text")
      .attr("class","label")
      .attr("x", (function(d) {return x(d.fuel) + (x.bandwidth()/2 ) ; }  ))
      .attr("y", function(d) { return y(d.value) -5; })
      .text(function(d) { return d.value; });   

      

  }
  render() {
    return <div>
      <svg
        width={this.state.width + margin.left + margin.right}
        height={this.state.height + margin.top + margin.bottom}
        ref={ex => this.svgEl = ex} >
      </svg>
    </div>
  }
}