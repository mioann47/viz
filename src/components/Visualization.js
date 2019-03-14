import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Topbar from './Topbar';
import { Card } from '@material-ui/core';
import myData from '../csvjson.json';
import L from 'leaflet'
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import CardHeader from '@material-ui/core/CardHeader';


import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import CountryBounds from './countries.geo.json'
import ScrollUpButton from "react-scroll-up-button";

import CountriesFuelTypeHorizontalStackedBar from './D3Graphs/CountriesFuelTypeHorizontalStackedBar'
import FuelTypeCountryBarChart from './D3Graphs/FuelTypeCountryBarChart'
import ScatterPlot from './D3Graphs/ScatterPlot'
import * as d3 from "d3"
import './legend.css'
import ArrowRightAlt from '@material-ui/icons/ArrowRightAlt';
import LoadingOverlay from 'react-loading-overlay';

const backgroundShape = require('../images/Large-Triangles.svg');
const color = d3.scaleOrdinal().range(['#00bfff','#fff100',
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
const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 ',
    paddingBottom: 200
  },
  grid: {
    width: "95%",
    margin: `0 ${theme.spacing.unit * 2}px`,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  loadingState: {
    opacity: 0.05
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152,
    height: 36
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  loanAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main
  },
  interestAvatar: {
    display: 'inline-block',
    verticalAlign: 'center',
    width: 16,
    height: 16,
    marginRight: 10,
    marginBottom: -2,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  mainBadge: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 300,
    maxWidth: 300
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  filter1: {

    'padding': '24px',
    'boxShadow': '0 2px 5px 0 rgba(0, 0, 0, .13)',
    'borderRadius': '4px',
    'fontFamily': '"Helvetica", sans-serif',
    'display': 'flex',
    'flexDirection': 'column'
  }
  ,
  fliter1Inside: {

    'display': 'flex',
    'flexDirection': 'column',
    'flex': '1 0 auto',
    ' alignItems': 'flex-end',
    ' justifyContent': 'center'
  }, fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  },
  // Show dropdow at bottom of select
  getContentAnchorEl: null,
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left"
  }
};

const FUEL = ["Hydro", "Gas", "Other", "Oil", "Wind", "Coal", "Nuclear", "Solar", "Waste", "Biomass", "Petcoke", "Geothermal", "Cogeneration", "Wave and Tidal"]
class Visualization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: null,
      data: [],
      mapWidth: "100%",
      lat: 51.505,
      lng: -0.09,
      zoom: 7,
      displayData: null,
      countries: [],
      renderedCountries: [],
      fuels: [],
      open: false,
      selectedCountry: "",
      selectedCountryLayer: null,
      selectedName: "",
      wd: 1800,
      modalinfo: null,
      value: 0,
      isActive:false,
    };
    this.updateMap = this.updateMap.bind(this)
    this.updateMarkerColors = this.updateMarkerColors.bind(this)
    this.updateMarkers = this.updateMarkers.bind(this)
    this.myRefMap = React.createRef()
    this.myRefScatter = React.createRef()
    this.myRefBar = React.createRef()
    this.scrollToScatter=this.scrollToScatter.bind(this)
    this.scrollToBar=this.scrollToBar.bind(this)
    this.scrollToMap=this.scrollToMap.bind(this)
  }

  handleClickOpen = (v) => {
    this.setState({ open: true, modalinfo: v });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.updateMarkerColors()
  };



  componentDidMount() {

    if (this.state.map == null) {
      
      this.initMap()
      this.setState({isActive:false})
    }

  }

  initMap() {
    const position = [this.state.lat, this.state.lng];
  
    var map = L.map('map', {
      preferCanvas: true,
      renderer: L.canvas({ padding: 0.5 })
    }).setView(position, this.state.zoom);
    var mapLink = L.tileLayer('https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=9a25d418d50d4824bbeb1ca4efd119d6')
    .addTo(map);

    var svgLayer = L.svg({ clickable: true })

    svgLayer.addTo(map)

    
   




    map.on("moveend", this.updateMap);
    myData.forEach(function (d) {

      d.latLong = new L.LatLng(d.latitude, d.longitude);

    })
    this.initMarkers(map, myData)
    this.setState({ map: map, displayData: myData })
  }


  initMarkers(map, data) {
    const self = this
    var svg = d3.select("#map").select("svg")
      .attr("pointer-events", "auto")

    var feature = svg.selectAll("g")
      .data(data)
      .enter().append("circle")
      .style("color", "#153870)")
      .attr("class", "update")
      .style("stroke", "black")
      .style("opacity", 0.5)
      .style("fill", function(d) { return color(d.fuel1); })
      .attr("r", 10)
      .attr("id", function (d) { return d.gppd_idnr })
      .attr("country", function (d) { return d.country })
      .attr("lat", function (d) { return d.latitude })
      .attr("long", function (d) { return d.longitude })

    feature.attr("transform",
      function (d) {
        var layerPoint = map.latLngToLayerPoint(d.latLong);
        return "translate(" + layerPoint.x + "," + layerPoint.y + ")";
      }).on("click", function (e) {
        //  console.log(e)
        // console.log(this)
        self.handleClickOpen(e)
        d3.select(this).style("fill", "white");
      })

    this.setState({ feature: feature })

  }

  updateMarkerColors() {
    this.state.feature.style("fill",  function(d) { return color(d.fuel1); })
  }

  updateMarkers(data) {
    const self = this
    var svg = d3.select("#map").select("svg")
      .attr("pointer-events", "auto")

    this.initMarkers(self.state.map, data)

    this.updateMap()
  }

  updateMap() {
    var map = this.state.map

    this.state.feature.attr("transform",
      function (d) {
        var layerPoint = map.latLngToLayerPoint(d.latLong);
        return "translate(" + layerPoint.x + "," + layerPoint.y + ")";
      }
    )
  }


  componentWillMount() {
    this.setState({isActive:true})
    var countries = myData.map(c => {
      var m = {
        abv: c.country,
        full: c.country_long
      };
      return m;
    });

    countries = countries.filter(
      (c, i, self) =>
        i === self.findIndex(c2 => c2.abv === c.abv && c2.full === c.full)
    );
    this.setState({
      displayData: myData,
      countries: countries,
      renderedCountries: countries,
      fuels: FUEL
    });
  }

  filterData(countries, fueltypes) {
    if (countries == null) {
      countries = this.state.renderedCountries;
    }
    if (fueltypes == null) {
      fueltypes = this.state.fuels;
    }

    var x = myData.filter((e) => {
      //console.log(event.target.value.indexOf(e.country))
      var exists = countries.some(c => {
        return c.abv === e.country;
      });
      if (exists) return e;
    });

    x = x.filter(e => {
      //console.log(event.target.value.indexOf(e.country))
      var exists = fueltypes.some(c => {
        return c === e.fuel1 || c === e.fuel2 || c === e.fuel3 || c === e.fuel4;
      });
      if (exists) return e;
    });
    this.setState({ displayData: x });


    this.updateMarkers(x)
  }

  handleChangeCountry = event => {
    this.setState({ renderedCountries: event.target.value });
    this.setState({ wd: 400 + event.target.value.length * 10 })
    this.filterData(event.target.value, null);

    //this.setState({displayData:myData.filter()})
    //let intersection = this.state.displayData.filter(t => x.includes(t));
    //this.setState({displayData:intersection})
  };

  handleChangeFuel = event => {
    this.setState({ fuels: event.target.value });

    this.filterData(null, event.target.value);
    //this.setState({displayData:myData.filter()})
    //this.setState({displayData:x})
  };

  handleSelectAllCountries(val) {
    if (val) {
      var x = myData.filter(e => {
        //console.log(event.target.value.indexOf(e.country))
        var exists = this.state.fuels.some(c => {
          return (
            c === e.fuel1 || c === e.fuel2 || c === e.fuel3 || c === e.fuel4
          );
        });
        if (exists) return e;
      });
      this.setState({
        displayData: x,
        renderedCountries: this.state.countries,
        wd: 400 + this.state.countries.length * 10
      });
      this.updateMarkers(x)
    } else {
      this.setState({ displayData: [], renderedCountries: [], wd: 400 });
      this.updateMarkers([])
    }
  }

  handleSelectAllFuels(val) {
    if (val) {
      var x = myData.filter((e) => {
        //console.log(event.target.value.indexOf(e.country))
        var exists = this.state.renderedCountries.some(c => {
          return c.abv === e.country;
        });
        if (exists) return e;
      });
      this.setState({ displayData: x, fuels: FUEL });
      this.updateMarkers(x)
    } else {
      this.setState({ displayData: [], fuels: [] });
      this.updateMarkers([])
    }
  }

  renderMap() {
    const mapStyle = {
      height: "80vh",
    };
    return (
      <div ref="map" id="map" style={mapStyle}>
      </div>

    );
  }




  renderModelItemList() {
    return (
      <List >

        {(this.state.modalinfo.gppd_idnr && this.state.modalinfo.name !== "") && <><ListItem>
          <ListItemText
            primary={"ID"}
            secondary={this.state.modalinfo.gppd_idnr} />
        </ListItem>
        </>
        }


        {this.state.modalinfo.capacity_mw && <><ListItem>
          <ListItemText
            primary={"Capacity"}
            secondary={this.state.modalinfo.capacity_mw + " (mW)"} />
        </ListItem></>
        }

        {(this.state.modalinfo.latitude && this.state.modalinfo.longitude) && <><ListItem>
          <ListItemText
            primary={"Location (Latitude,Longitude)"}
            secondary={"( " + this.state.modalinfo.latitude + " , " + this.state.modalinfo.longitude + " )"} />
        </ListItem></>
        }

        {this.state.modalinfo.fuel1 !== "" && <><ListItem>
          <ListItemText
            primary={"Fuel(s)"}
            secondary={this.state.modalinfo.fuel1
              + " " + this.state.modalinfo.fuel2
              + " " + this.state.modalinfo.fuel3
              + " " + this.state.modalinfo.fuel4} />
        </ListItem>
        </>
        }


        {this.state.modalinfo.commissioning_year !== "" && <><ListItem>
          <ListItemText
            primary={"Comissioning Year"}
            secondary={this.state.modalinfo.commissioning_year} />
        </ListItem>
        </>
        }

        {this.state.modalinfo.owner !== "" && <><ListItem>
          <ListItemText
            primary={"Owner"}
            secondary={this.state.modalinfo.owner} />
        </ListItem>
        </>
        }



        {this.state.modalinfo.year_of_capacity_data != "" && <><ListItem>
          <ListItemText
            primary={"Year of Capacity Data"}
            secondary={this.state.modalinfo.year_of_capacity_data} />
        </ListItem>
        </>
        }





        {this.state.modalinfo.generation_gwh_2013 != "" && <><ListItem>
          <ListItemText
            primary={"Generation in 2013"}
            secondary={this.state.modalinfo.generation_gwh_2013 + " (mW)"} />
        </ListItem>
        </>
        }


        {this.state.modalinfo.generation_gwh_2014 != "" && <><ListItem>
          <ListItemText
            primary={"Generation in 2014"}
            secondary={this.state.modalinfo.generation_gwh_2014 + " (mW)"} />
        </ListItem>
        </>
        }

        {this.state.modalinfo.generation_gwh_2015 != "" && <><ListItem>
          <ListItemText
            primary={"Generation in 2015"}
            secondary={this.state.modalinfo.generation_gwh_2015 + " (mW)"} />
        </ListItem>
        </>
        }

        {this.state.modalinfo.generation_gwh_2016 != "" && <><ListItem>
          <ListItemText
            primary={"Generation in 2016"}
            secondary={this.state.modalinfo.generation_gwh_2016 + " (mW)"} />
        </ListItem>
        </>
        }

        {this.state.modalinfo.estimated_generation_gwh != "" && <><ListItem>
          <ListItemText
            primary={"Estimated Generation"}
            secondary={this.state.modalinfo.estimated_generation_gwh + " (mW)"} />
        </ListItem>
        </>
        }

      </List>
    )
  }

  renderModelDialog() {
    const { classes } = this.props;
    return (
      this.state.modalinfo && (<><Dialog

        open={this.state.open}
        onClose={this.handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
      >
        <AppBar className={classes.appBar} color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleClose}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {this.state.modalinfo.name !== "" ? this.state.modalinfo.name : this.state.modalinfo.gppd_idnr}
            </Typography>
          </Toolbar>
        </AppBar>

        {this.renderModelItemList()}
      </Dialog></>)
    );
  }

  renderCountriesFilterCard() {
    const { classes } = this.props;
    return (

      <div style={styles.filter1}>
        <div style={styles.fliter1Inside}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox1">
              Markers of Countries
              </InputLabel>
            <Select
              multiple
              value={this.state.renderedCountries}
              onChange={this.handleChangeCountry}
              input={<Input id="select-multiple-checkbox1" />}
              renderValue={selected =>
                selected
                  .map(x => {
                    return x.full;
                  })
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {this.state.countries.map((c, i) => (
                <MenuItem key={i} value={c}>
                  <Checkbox
                    checked={this.state.renderedCountries.indexOf(c) > -1}
                  />
                  <ListItemText primary={c.full} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px"
          }}
        >

          <Button
            onClick={() => this.handleSelectAllCountries(false)}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Deselect all
            </Button>
          <Button
            onClick={() => this.handleSelectAllCountries(true)}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Select all
            </Button>
        </div>
      </div>

    );
  }

  renderFuelTypesFilterCard() {
    const { classes } = this.props;
    return (
      <div style={styles.filter1}>
        <div style={styles.fliter1Inside}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-checkbox2">
              Fuel Types
              </InputLabel>
            <Select
              multiple
              value={this.state.fuels}
              onChange={this.handleChangeFuel}
              input={<Input id="select-multiple-checkbox2" />}
              renderValue={selected =>
                selected
                  .map(x => {
                    return x;
                  })
                  .join(", ")
              }
              MenuProps={MenuProps}
            >
              {FUEL.map((c, i) => (
                <MenuItem key={i} value={c}>
                  <Checkbox checked={this.state.fuels.indexOf(c) > -1} />
                  <ListItemText primary={c} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px"
          }}
        >
          <Button
            onClick={() => this.handleSelectAllFuels(false)}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Deselect all
            </Button>
          <Button
            onClick={() => this.handleSelectAllFuels(true)}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Select all
            </Button>

        </div>
      </div>
    );
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };


  handleSelectCountry = event => {

    if (this.state.selectedCountryLayer) {
      this.state.map.removeLayer(this.state.selectedCountryLayer);
    }
    var country = L.geoJson(CountryBounds.features.filter(e => {
      return e.id === event.target.value.abv;
    }));


    //use leaflet layers for better performance
    this.state.map.addLayer(country)
    this.state.map.fitBounds(country.getBounds())

    this.setState({ selectedCountry: event.target.value, selectedCountryLayer: country });

    this.setState({ selectedName: event.target.value.full })
    //this.filterData(event.target.value, null);

    //this.setState({displayData:myData.filter()})
    //let intersection = this.state.displayData.filter(t => x.includes(t));
    //this.setState({displayData:intersection})
  };




  handleDeselectCountry = () => {
    if (this.state.selectedCountryLayer) {
      this.state.map.removeLayer(this.state.selectedCountryLayer);
    }
    this.setState({ selectedCountry: "", selectedCountryLayer: null });
  }

  renderZoomToCountryCard() {
    const { classes } = this.props;
    return (

      <div style={styles.filter1}>
        <div style={styles.fliter1Inside}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-single-checkbox1">
              Select Country
              </InputLabel>
            <Select

              value={this.state.selectedCountry}
              onChange={this.handleSelectCountry}
              input={<Input id="select-single-checkbox1" />}
              renderValue={(selected => { return selected.full })
              }
              MenuProps={MenuProps}
            >
              {this.state.countries.map((c, i) => (
                <MenuItem key={i} value={c}>

                  <ListItemText primary={c.full} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "16px"
          }}
        >

          <Button
            disabled={this.state.selectedCountry === "" ? true : false}
            onClick={(this.handleDeselectCountry)}
            variant="outlined"
            size="small"
            color="primary"
            className={classes.margin}
          >
            Deselect
            </Button>
        </div>
      </div>

    );
  }
scrollToMap(){
    window.scrollTo(0, this.myRefMap.current.offsetTop)
  }
  scrollToScatter(){
    window.scrollTo(0, this.myRefScatter.current.offsetTop)
  }
  scrollToBar(){
    window.scrollTo(0, this.myRefBar.current.offsetTop)
  }


  renderTopBar() {
    const { classes } = this.props;
    return (
      <Grid
      spacing={24}
      alignItems="center"
      justify="center"
      container
      className={classes.grid}> 

        <Grid
      item
      xs={4}
      md={4}
    >
    <Card className={classes.paper}>
    <div style={{textAlign:'center'}}>
          <Typography variant="h6" gutterBottom style={{display: 'inline-block'}}>
            Map
      </Typography>
      </div>
          <Typography variant="body1" >
            Map displays all power plans at their location.
           <br/> (1) -> You can select a country to show it's boundaries on map.
           <br/> (2) -> You can select which country markers should appear on map.
           <br/> (3) -> You can select which fuel type markers should appear on map.
           <br/> (4) -> You can click on a mark to view it's details.
      </Typography></Card>
      </Grid>
      <Grid
      item
      xs={4}
      md={4}
    ><Card className={classes.paper}>
        <div style={{textAlign:'center'}}>
        <Typography variant="h6" gutterBottom style={{display: 'inline-block'}}>
            Scatter Graph
      </Typography>
      <IconButton className={classes.button} aria-label="Delete" onClick={this.scrollToScatter}>
        <ArrowRightAlt />
      </IconButton>
      </div>

          <Typography variant="body1">
            Scatter dots color are rendered using the main fuel (fuel1) of each power plant and you can use the legend to select which fuel type dots to show.
            <br/> (1) -> You can click at fuel type from legend to show only dots with the supported fuel type.
      </Typography></Card>
      </Grid>
      
      <Grid
      item
      xs={4}
      md={4}
    ><Card className={classes.paper}>


      <div style={{textAlign:'center'}}>
      <Typography variant="h6" gutterBottom style={{display: 'inline-block'}}>
          Overall Fuel Type Support Graph
      </Typography>
      <IconButton className={classes.button} aria-label="Delete" onClick={this.scrollToBar}>
        <ArrowRightAlt />
      </IconButton>
      </div>
          <Typography variant="body1">
            The bar graph is updated when you change the markers and fuel types from filters
           <br/> (1) -> You can select which country markers should appear on bar graph.
           <br/> (2) -> You can select which fuel type markers should appear on bar graph.
      </Typography></Card>
      </Grid>
      
      </Grid>
      )
  }


  renderOverallChart() {


    return (

      (this.state.renderedCountries.length !== 0 && this.state.fuels.length !== 0) ? <Card  style={{ width: 1450, height: 100 + this.state.wd, textAlign: 'center' }}>
      <div ref={this.myRefBar}/>
        <CardHeader title={"Overall Graph for Number of Power Plant Fuel Types Supported by Each Country"}></CardHeader>
        <CountriesFuelTypeHorizontalStackedBar width={1400} height={this.state.wd} data={myData} countries={this.state.renderedCountries} fuels={this.state.fuels} />
      </Card> : <Card style={{ width: 1600, height: 100, textAlign: 'center' }}>

          <CardHeader title={"Add a country marker and atleast one fuel type to display overall chart"}></CardHeader>
        </Card>

    )
  }



  renderCountryFuelGraph() {


    return (<Card>
      <FuelTypeCountryBarChart width={800} height={300} data={myData} country={this.state.selectedName} />
    </Card>

    )
  }


  renderScatter() {
    return (
      <Card style={{ textAlign: 'center' }}>
      <div ref={this.myRefScatter} />
        <CardHeader title={"Scatter Graph"} subheader={"Capacity and Estimated Generation for every power plant by main fuel type"}></CardHeader>
        <ScatterPlot />
      </Card>
    )
  }


  renderLegend(){
   //Idea from http://www.geonet.ch/basic-leaflet-map-with-d3-overlay/
    return(
        <div className="myinfo maplegend">
              <strong>Fuels type</strong>
              <br/>
              {
                FUEL.map((e)=>( 
                
                
                
                <>
                <i style={{background:color(e)}}></i>
                {e}<br/>

                
                </>
                
                )
                  
                
                
                )
            
            
            }
        </div>
    )
  }

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname;

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <LoadingOverlay
  active={this.state.isActive}
  spinner
  text='Loading your content...'
  >
   

        {this.renderModelDialog()}

        <div className={classes.root}>
          <Grid container justify="center" spacing={24}>

            <Grid
              spacing={24}
              alignItems="center"
              justify="center"
              container
              className={classes.grid}
            >

              <Grid item xs={12}>
                {this.renderTopBar()}
              </Grid>


              <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={2} md={1}>
                  <Card variant="outlined">
               {    this.renderLegend()}
                  </Card>
                </Grid>
                <Grid item xs={7} md={7}>
                  <Card variant="outlined">
                    {this.renderMap()}
                  </Card>
                </Grid>
                <Grid
                  item
                  xs={8}
                  md={4}
                  alignItems="center"
                  justify="center"
                  container
                >
                  <Card className={classes.paper} style={styles.filter1}>
                    {
                      ///COUNTRIES
                      this.renderZoomToCountryCard()

                    }
                    <br />
                    {
                      ///COUNTRIES
                      this.renderCountriesFilterCard()

                    }
                    <br />
                    {
                      ///COUNTRIES
                      this.renderFuelTypesFilterCard()

                    }
                    <br />
                    {
                      ///COUNTRIES
                      //this.renderCountriesFilterCard()

                    }
                  </Card>
                </Grid>
              </Grid>


      


            </Grid>




            <Grid
              item
              xs={12}
              md={12}
              alignItems="center"
              justify="center"
              container
            >
              {this.renderScatter()}
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              alignItems="center"
              justify="center"
              container
            >
              {
                this.renderOverallChart()
              }
            </Grid>
          </Grid>

        </div>
        </LoadingOverlay>
        <ScrollUpButton />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Visualization));
