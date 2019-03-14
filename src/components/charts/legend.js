import React, { Component } from 'react';
import * as d3 from 'd3'
import birthrates from "./birthrates.json"


const countriesOfInterest = ["United Kingdom", "Australia", "Brazil", "India", "United States", "France", "Argentina", "Germany", "Japan"];
const margin = { top: 30, right: 30, bottom: 30, left: 30 };


export default class Chart extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        data: null
      }
    }

componentWillMount(){
    
    var data = birthrates.filter(function(d){return countriesOfInterest.indexOf(d["Country Name"]) > -1;});
    this.setState({data:data})
}

    componentDidMount() {
        this.updateChart()
      }
      
      componentDidUpdate() {
       // this.updateChart()
      }
    updateChart() {
        //let maxRadius = 40
        //let xScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.width])
        //let yScale = d3.scaleLinear().domain([0, 1]).range([0, this.props.height])
        //let rScale = d3.scaleLinear().domain([0, 1]).range([0, maxRadius])
        const self=this
        var svg = d3.select(this.svgEl)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ")");
        var x = d3.scaleBand()
        .domain(this.state.data.map(function(d) { return d["Country Name"] }))
        .range([0, this.props.width])
        .padding(0.1);
        //console.log(x.bandwidth());
        var y = d3.scaleLinear()
      .domain([0, d3.max(this.state.data, function(d) { return d["2015"]; })])
      .range([this.props.height, 0]);

      //console.log(y(8));
      svg.selectAll(".bar")
      .data(this.state.data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d["Country Name"]); })
      .attr("y", function(d) { return y(d["2015"]); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return self.props.height - y(d["2015"]); })
      .attr("fill", "steelblue");



      svg.append("g")
      .attr("transform", "translate(0," + this.props.height + ")")
      .call(d3.axisBottom(x))
    
    //Add the y axis
    svg.append("g")
      .call(d3.axisLeft(y));


       /* u.enter()
          .append('circle')
          .merge(u)
          .attr('cx', d => xScale(d.name))
          .attr('cy', d => yScale(d.number_of_pets))
          //.attr('r', d => rScale(d.r))
          .style('fill', d => '#843732')
      
        u.exit().remove()*/
      }
    render() {
      return <div>
               <svg
                 width={this.props.width}
                 height={this.props.height}
                 ref={el => this.svgEl = el} >
               </svg>
             </div>
    }
  }