import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Grid, Card } from '@material-ui/core';
import CardItem from './cards/CardItem';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';
import Typography from '@material-ui/core/Typography';
const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['A500'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    marginTop: 20,
    padding: 20,
    paddingBottom: 200
  },
  grid: {
    width: '60%'
  },
  baseline: {
    alignSelf: 'baseline',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginLeft: 0
    }
  },
})

class Report extends Component {

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center" spacing={24}>

            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >
              <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
                <Grid item >


                  <h1 align="center">
                    <u>Visualization Report</u>
                  </h1><br /><br />
                  <p style={{ textAlign: 'justify' }}>The visualization on this website provides information about power plants that generate energy. The first visualization is a map where users can see the location of each power plants and view their details. The power plants have different colors based on their main fuel type, even though they can have more than one fuel type. There is a legend at the left of the map that displays the color of each fuel type. Users can filter our which fuel types or country markers want to see on map. This gives the ability to focus on a specific group of power plants. Also, there is an option to focus and show the boundaries of a country, so it can be clearer which power plants are part of this country. Map visualization is appropriate for the data because it shows the exact location of each power plant and how they are distributed around the world. I believe it was important to use the latitude and longitude, since there were available.</p>
                  <p style={{ textAlign: 'justify' }}>The second visualization is a scatter graph where power plants are shown based on their capacity and their estimated generation. By using this visualization, users can compare each power plant for these values. Once again, the power plants on the graph are colored based on their main fuel type. Users can select a specific fuel type from the legend of the graph to focus on one type category. Meanwhile, when you mouse over power plants you can see their details. This visualization presents the relation between the capacity and the estimated generation of each power plant.</p>
                  <p style={{ textAlign: 'justify' }}>There is also a third visualization, a bar graph. This bar graph is focused on countries and it shows how many power plants of each type, each country has. The usage of different colors in this stacked bar graph helps users to identify each fuel type for a country. This bar graph relates to the map filters as well, so if the users want to remove a country or a fuel type, they can use the appropriate filters and the graph will be updated.</p>
                  <p style={{ textAlign: 'justify' }}>These visualizations can help researchers and analysts that are interested in this field, in order to gather information about each country&rsquo;s power plants. Investors and governments may also be interested in finding which fuel types generate more energy or what fuel type is more needed, so they can invest to create more. The general public can also find some interesting information if they want to see how much energy their country generates.</p>
                  <p style={{ textAlign: 'justify' }}>The user interface is simple so every user can use the website effectively and with ease. There are explanation messages in the visualization to familiarize the user with the available options.&nbsp; The colors for the power plants are the consistent and there are the same in all visualizations.</p>

                  <br />
                  <br />

                  <h1 align="center">
                    <u>Tools and Code used</u>
                  </h1>
                  <p>
                    Website and project template:
    <a href="https://github.com/alexanmtz/material-sense">
                      https://github.com/alexanmtz/material-sense
    </a>
                  </p>
                  <p>
                    Code for bar graph:
    <a href="https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458">
                      https://bl.ocks.org/Andrew-Reid/0aedd5f3fb8b099e3e10690bd38bd458
    </a>
                  </p>
                  <p>
                    Map legend:
    <a
                      href="https://chewett.co.uk/blog/1030/overlaying-geo-data-leaflet-version-1-3-d3-js-version-4/"
                    >
                      https://chewett.co.uk/blog/1030/overlaying-geo-data-leaflet-version-1-3-d3-js-version-4/
    </a>
                  </p>
                  <p>
                    Visualization page background from:
    <a href="https://www.svgbackgrounds.com/">
                      https://www.svgbackgrounds.com/
    </a>
                  </p>
                  <p>
                    Tooltips code from:
    <a
                      href="http://qaru.site/questions/165103/d3js-position-tooltips-using-element-position-not-mouse-position"
                    >
                      http://qaru.site/questions/165103/d3js-position-tooltips-using-element-position-not-mouse-position
    </a>
                  </p>
                  <p>
                    D3+Leaflet code from:
    <a href="http://www.geonet.ch/basic-leaflet-map-with-d3-overlay/">
                      http://www.geonet.ch/basic-leaflet-map-with-d3-overlay/
    </a>
                  </p>
                  <p>
                    D3+Leaflet code from:
    <a href="http://bl.ocks.org/shimizu/c0fed43b3e35e4613116e699fb6c8bb4">
                      http://bl.ocks.org/shimizu/c0fed43b3e35e4613116e699fb6c8bb4
    </a>
                  </p>
                  <p>
                    Code for bar graph:
    <a href="https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0">
                      https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0
    </a>
                  </p>
                  <p>
                    Code for scatter graph:
    <a href="https://blockbuilder.org/Jverma/076377dd0125b1a508621441752735fc">
                      https://blockbuilder.org/Jverma/076377dd0125b1a508621441752735fc
    </a>
                  </p>
                  <p>
                    Code for scatter graph:
    <a href="https://bl.ocks.org/floofydugong/9c94ab01d8c3ed8ea3821d4a7e119b07">
                      https://bl.ocks.org/floofydugong/9c94ab01d8c3ed8ea3821d4a7e119b07
    </a>
                  </p>
                  <p>
                    Resources for D3 adding/updating/deleting data:
</p>
                  <p>
                    <a href="https://animateddata.co.uk/lab/d3enterexit/">
                      https://animateddata.co.uk/lab/d3enterexit/
    </a>
                  </p>
                  <p>
                    <a href="https://bl.ocks.org/mbostock/3808218">
                      https://bl.ocks.org/mbostock/3808218
    </a>
                  </p>
                  <p>
                    COMP6214 Lectures
</p>

<p>
    <strong>Libraries used (Not included in project template):</strong>
</p>
<p>
    D3 – Used to manipulate DOM and create graphs
</p>
<p>
    d3-tip – Used to show tooltips
</p>
<p>
    leaflet – Used to show map on website
</p>
<p>
    react-leaflet – Used some function of leaflet map for react
</p>
<p>
    react-leaflet-control – Used to add elements in leaflet map
</p>
<p>
    react-loading-overlay – Used for the loading icon when Visualization page
    is loading
</p>
<p>
    react-scroll-up-button – Used to show button for scrolling to top on
    Visualization page
</p>
<p>
    <strong>Framework and tools for development:</strong>
</p>
<p>
    React
</p>
<p>
    VS Code
</p>
<p>
    Git
</p>
<p>
    Node.js
</p>
<p>
    Firebase
</p>
<br /><br /><br /><br />
<a href="https://github.com/mioann47/viz">CODE ON GITHUB</a><br />
                  mi1e18@soton.ac.uk
            </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Report);