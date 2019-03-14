import React,  { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InstructionDialog from './dialogs/InstructionDialog';
import SwipeDialog from './dialogs/SwipeDialog';

import { Link } from 'react-router-dom';
import Topbar from './Topbar';

const backgroundShape = require('../images/shape.svg');

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.grey['100'],
    overflow: 'hidden',
    background: `url(${backgroundShape}) no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: '0 400px',
    paddingBottom: 200
  },
  grid: {
    width: 1200,
    marginTop: 200,
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 20px)'
    }
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  myCard: {
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rangeLabel: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 2
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32
  },
  outlinedButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit
  },
  actionButtom: {
    textTransform: 'uppercase',
    margin: theme.spacing.unit,
    width: 152
  },
  blockCenter: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center'
  },
  block: {
    padding: theme.spacing.unit * 2,
  },
  box: {
    marginBottom: 40,
    height: 65
  },
  inlining: {
    display: 'inline-block',
    marginRight: 10
  },
  buttonBar: {
    display: 'flex'
  },
  alignRight: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noBorder: {
    borderBottomStyle: 'hidden'
  },
  loadingState: {
    opacity: 0.05
  },
  loadingMessage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  },
});
const powerlogo = require('../images/icons8-power-plant-64.png')
class Main extends Component {

  state = {
    learnMoredialog: false,
    getStartedDialog: false
  };

  componentDidMount() {}

  openDialog = (event) => {
    this.setState({learnMoredialog: true});
  }

  dialogClose = (event) => {
    this.setState({learnMoredialog: false});
  }

  openGetStartedDialog = (event) => {
    this.setState({getStartedDialog: true});
  }

  closeGetStartedDialog = (event) => {
    this.setState({getStartedDialog: false});
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid spacing={24} alignItems="center" justify="center" container className={classes.grid}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                     Visualization
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      In the Visualization page there is a Map and some graphs to visualize the dataset
                    </Typography>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Link to='/visualization' className={classes.link}>
                    <Button color='primary' variant="contained" className={classes.actionButtom}>
                      Go
                    </Button></Link>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Cleaning
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                     In the Cleaning page there is a list with errors found in the dataset and their solutions
                    </Typography>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Link to='/cleaning' className={classes.link}>
                    <Button color='primary' variant="contained" className={classes.actionButtom}>
                      Go
                    </Button></Link>
                  </div>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={classes.paper}>
                  <div className={classes.box}>
                    <Typography style={{textTransform: 'uppercase'}} color='secondary' gutterBottom>
                      Report
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      In the Report page there information describing the visualisation 
                    </Typography>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Link to='/report' className={classes.link}>
                    <Button color='primary' variant="contained" className={classes.actionButtom}>
                      Go
                    </Button></Link>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <SwipeDialog
            open={this.state.learnMoredialog}
            onClose={this.dialogClose} />
          <InstructionDialog
            open={this.state.getStartedDialog}
            onClose={this.closeGetStartedDialog}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(Main));
