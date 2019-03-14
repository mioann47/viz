import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import CardItem from './cards/CardItem';
import Topbar from './Topbar';
import SectionHeader from './typo/SectionHeader';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

import Paper from '@material-ui/core/Paper';
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
    width: 1000
  },
  paper: {
    padding: theme.spacing.unit * 3,
    textAlign: 'left',
    color: theme.palette.text.secondary
  },
  avatar: {
    margin: 10,
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.text.primary,
  },
  avatarContainer: {
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: theme.spacing.unit * 4
    }
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
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
  inline: {
    display: 'inline-block',
    marginLeft: theme.spacing.unit * 4,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0
    }
  },
  inlineRight: {
    width: '30%',
    textAlign: 'right',
    marginLeft: 50,
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
      textAlign: 'center'
    }
  },
  backButton: {
    marginRight: theme.spacing.unit * 2
  }
})
class Cleaning extends Component {

  render() {
    const { classes } = this.props;
    const currentPath = this.props.location.pathname

    return (
      <React.Fragment>
        <CssBaseline />
        <Topbar currentPath={currentPath} />
        <div className={classes.root}>
          <Grid container justify="center">
            <Grid item>

              
                <h1 align="center">
                  <u>Cleaning</u>
                </h1>
                <p>
                  The list below presents the errors found in the dataset and their
                  solutions.
</p>
                <p>
                  The main tool for cleaning was OpenRefine.
</p>
                <p>
                  Excel was used to shift some cells.
</p>
                <p>
                  <strong>List of Errors:</strong>
                </p>
                <p>
                  · Multiple Representations
</p>
                <p>
                  · Correct spelling
</p>
                <p>
                  · Missing Values
</p>
                <p>
                  · Summation Records
</p>
                <p>
                  · Incorrect shifted cells
</p>
                <p>
                  · Out of range errors
</p>
                <p>
                  · Semantic error
</p>
                <p align="center">
                  <strong><u>Multiple Representations</u></strong>
                </p>
                <p>
                  <br />
                  <em>Changed all from below (from -&gt; to)</em>
                </p>
                <p>
                  <strong>Column country</strong>
                </p>
                <p>
                  'sA' and 'SA' -&gt; 'ZAF' (Correct abbreviation for South Africa)
</p>
                <p>
                  'AU' -&gt; 'AUT' (Correct abbreviation for Austria)
</p>
                <p>
                  'AZ' -&gt; 'AZE' (Correct abbreviation for Azerbaijan)
</p>
                <p>
                  'Chile ' and 'CH ' -&gt; 'CHL' (Correct abbreviation for South Africa)
</p>
                <p>
                  ' kor ' and ' S-KOR ' -&gt; 'KOR' (Correct abbreviation for South Korea)
</p>
                <p>
                  ' N-KOR ' -&gt; ' PRK ' (Correct abbreviation for North Korea)
</p>
                <p>
                  ' UK ' -&gt; ' GBR ' (Correct abbreviation for United Kingdom)
</p>
                <p>
                  ' USSR ' -&gt; ' RUS ' (Correct abbreviation for Russia)
</p>
                <p>
                  ' NZD ' -&gt; ' NZL' (Correct abbreviation for New Zealand)
</p>
                <p>
                  ' NVNM ' -&gt; ' VNM ' (Correct abbreviation for Vietnam)
</p>
                <p>
                  ' SVNM' -&gt; ' VNM ' (Correct abbreviation for Vietnam)
</p>
                <p>
                  ' Spain ' -&gt; ' ESP ' (Correct abbreviation for Spain)
</p>
                <p>
                  <strong>Column country_long</strong>
                </p>
                <p>
                  ' USSR' -&gt; ' Russia' (USSR does not exist)
</p>
                <p>
                  ' North Vietnam' -&gt; ' Vietnam' (North Vietnam does not exist)
</p>
                <p>
                  ' South Vietnam' -&gt; ' Vietnam' (South Vietnam does not exist)
</p>
                <p>
                  ' YEM ' -&gt; ' Yemen '
</p>
                <p>
                  ' RWA' -&gt; ' Rwanda'
</p>
                <p>
                  ' London ' and ‘UK’ and ‘United Kindom’ and ‘United Kingdon’-&gt; ' United
                  Kingdom '
</p>
                <p>
                  <strong>Column owner</strong>
                </p>
                <p>
                  E On (AND) EON (AND) E.On UK -&gt; E.On
</p>
                <p>
                  ENDESA -&gt; Endesa
</p>
                <p>
                  Octopus Investments/Blue Energy. -&gt; Octopus Investments/Blue Energy
</p>
                <p>
                  Windprospect-&gt;Wind Prospect
</p>
                <p>
                  RWE npower -&gt;RWE Npower
</p>
                <p>
                  Next Energy Solar Fund -&gt; NextEnergy Solar Fund
</p>
                <p>
                  NextEnergy Solar Fund (NESF) -&gt;NextEnergy Solar Fund
</p>
                <p>
                  ENEL GreenPower -&gt; Enel Green Power
</p>
                <p>
                  NIPPON STEEL &amp; SUMITOMO METAL -&gt; Nippon Steel &amp; Sumitomo Metal
</p>
                <p>
                  Auchencarroch Energy Ltd / CLP --&gt; Auchencarroch Energy Ltd/CLP
</p>
                <p>
                  Hindustan Zinc Ltd. -&gt; Hindustan Zinc Ltd
</p>
                <p>
                  Hindustan Zinc ltd -&gt; Hindustan Zinc Ltd
</p>
                <p>
                  Opde Photovoltaics -&gt; OPDE Photovoltaics
</p>
                <p>
                  GENERADORA ELECTRICA RHOM LTDA. -&gt; GENERADORA ELECTRICA RHOM LTDA
</p>
                <p>
                  TVS Energy limited -&gt; TVS Energy Limited
</p>
                <p>
                  Yerevan TPP -&gt; Yerevan TPP
</p>
                <p>
                  AEE Renewables UK -&gt;AEE Renewables
</p>
                <p>
                  AES GENER S.A. -&gt; AES GENER
</p>
                <p>
                  AGL -&gt; AGL Energy
</p>
                <p>
                  AGL Energy Pty Ltd -&gt; AGL Energy
</p>
                <p>
                  Blackrock Real Assets -&gt;BlackRock
</p>
                <p>
                  British Solar Renewables (formerly know as Solar Power Generation) -&gt;
                  British Solar Renewables
</p>
                <p>
                  Chelveston Renewable Energy Limited -&gt; Chelveston Renewable Energy
</p>
                <p>
                  Chelveston Renewable Energy Ltd -&gt;Chelveston Renewable Energy
</p>
                <p>
                  Chubu-&gt; Chubu Electric Power
</p>
                <p>
                  CHUBU ELECTRIC POWER CO INC-&gt; Chubu Electric Power
</p>
                <p>
                  Chugoku electric Power-&gt; Chugoku Electric Power
</p>
                <p>
                  Chugoku -&gt; Chugoku Electric Power
</p>
                <p>
                  Da Nhim - Ham Thuan - Da Mi Hydropower JSC.-&gt;Da Nhim - Ham Thuan - Da Mi
                  Hydropower Company
</p>
                <p>
                  Delta-&gt; Delta Electricity
</p>
                <p>
                  Drax Power Ltd-&gt; Drax Power
</p>
                <p>
                  ENORCHILE S.A.-&gt; ENORCHILE
</p>
                <p>
                  EQUIPOS DE GENERACION S.A.-&gt; EQUIPOS GENERACION S.A.
</p>
                <p>
                  Godawari Green Energy Limited (GGEL)-&gt;Godawari Green Energy Limited
</p>
                <p>
                  Infigen Energy Pty Ltd-&gt; Infigen Energy
</p>
                <p>
                  Innogy (formerly RWE npower) -&gt;Innogy
</p>
                <p>
                  INNOGY plc -&gt; Innogy
</p>
                <p>
                  Kansai Electric Power Co Inc -&gt;Kansai
</p>
                <p>
                  Korea Hydro and Nuclear Power Company-&gt;Korea Hydro and Nuclear Power
</p>
                <p>
                  Korea Midland Power (KOMIPO) -&gt; Korea Midland Power
</p>
                <p>
                  Korea Midland Power Company -&gt; Korea Midland Power
</p>
                <p>
                  Korea Western Power Company -&gt; Korea Western Power
</p>
                <p>
                  Mulilo Renewable Energy Solar PV Prieska -&gt;Mulilo
</p>
                <p>
                  Munich Re (previously Wind Prospect)-&gt;Munich Re
</p>
                <p>
                  National Thermal Power Corporation (NTPC) Limited-&gt;National Thermal
                  Power Corporation (NTPC)
</p>
                <p>
                  Pennant Walters (MAESX) Limited-&gt;Pennant Walters
</p>
                <p>
                  REG Windpower (previously Cornwall Light and Power)-&gt;REG Windpower
</p>
                <p>
                  Renewable Energy Generation (REG) -&gt; Renewable Energy Generation
</p>
                <p>
                  Renewable Energy Systems Ltd (RES) -&gt;Renewable Energy Systems (RES)
</p>
                <p>
                  RWE Npower Plc-&gt;RWE Npower
</p>
                <p>
                  Sonelgaz-&gt;Sonelgaz Production de l'Electricite
</p>
                <p>
                  Solstice Renewables Ltd-&gt;Solstice Renewables
</p>
                <p>
                  SPARC Solar Powered Agri-Rural Communities Corp. -&gt;SPARC Solar Powered
                  Agri-Rural Communities Corporation
</p>
                <p>
                  Stanwell Corporation-&gt;Stanwell Corporation Ltd
</p>
                <p>
                  Tadas Wind Energy Private Limited-&gt;Tadas Wind Energy
</p>
                <p>
                  Tirreno-&gt;Tirreno Power
</p>
                <p>
                  TOKYO ELECTRIC POWER CO -&gt;Tokyo Electric Power Co Inc (TEPCO)
</p>
                <p>
                  Trustpower-&gt;TrustPower Ltd
</p>
                <p>
                  Vattenfall (previously Nuon Renewables)-&gt;Vattenfall
</p>
                <p>
                  Wind Prospect Developments-&gt;Wind Prospect
</p>
                <p align="center">
                  <strong><u>Correct spelling</u></strong>
                </p>
                <p>
                  <strong>Column country_long</strong>
                </p>
                <p>
                  Belgiun-&gt;Belgium
</p>
                <p>
                  Bangladess-&gt;Bangladesh
</p>
                <p>
                  chil AND Netflix and Chile -&gt;Chile
</p>
                <p>
                  New Zealan -&gt; New Zealand
</p>
                <p>
                  Vietnan-&gt; Vietnam
</p>
                <p>
                  Urguay-&gt;Uruguay
</p>
                <p>
                  Uzbekistam-&gt;Uzbekistan
</p>
                <p>
                  <strong>Column fuel1</strong>
                </p>
                <p>
                  Solarr-&gt; Solar
</p>
                <p>
                  <strong>Column owner</strong>
                </p>
                <p>
                  Kyusyo -&gt; Kyushu
</p>
                <p>
                  Sonelgaz Production de lâ€™Electricite -&gt; Sonelgaz Production de
                  l'Electricite
</p>
                <p>
                  Korea Midland Power (KOMPIO) -&gt;Korea Midland Power (KOMIPO)
</p>
                <p>
                  Nippon Steel &amp;Sumitomo Metal-&gt; Nippon Steel &amp; Sumitomo Metal
</p>
                <p>
                  Office National de l’Electricité (ONE) -&gt; Office National de
                  l\'Electricite (ONE)
</p>
                <p>
                  Nejla Energia OU -&gt; Nelja Energia OU
</p>
                <p>
                  Invalid owner (#NAME?) at record with gppd_idnr (CHL0000125) -&gt; SET TO
                  BLANK
</p>
                <p>
                  Bessy Bell Windfarm Omagh xx1 1xx-&gt; Bessy Bell Windfarm Omagh
</p>
                <p>
                  Chelveston Renewable Energy Ltd David Henson-&gt;Chelveston Renewable
                  Energy Ltd David Henson
</p>
                <p>
                  Octopus Investment-&gt;Octopus Investments
</p>
                <p>
                  Solar century / Magnetar Solar -&gt;Solar Century/ Magnetar Solar
</p>
                <p>
                  <strong>Column commissioning_year</strong>
                </p>
                <p>
                  Fixed some years that had dot and number:
</p>
                <p>
                  1962.2 -&gt; 1962
</p>
                <p>
                  1975.5 -&gt; 1975
</p>
                <p>
                  1988.1 -&gt; 1988
</p>
                <p>
                  1993.5 -&gt; 1993
</p>
                <p>
                  1995.6 -&gt; 1995
</p>
                <p>
                  1997.4 -&gt; 1997
</p>
                <p>
                  1998.3 -&gt; 1998
</p>
                <p>
                  1999.1 -&gt; 1999
</p>
                <p>
                  1999.5 -&gt; 1999
</p>
                <p>
                  2002.5 -&gt; 2002
</p>
                <p align="center">
                  <strong><u>Missing Values</u></strong>
                </p>
                <p>
                  <strong>Column country_long</strong>
                </p>
                <p>
                  <em>(From 1 row)</em>
                </p>
                <p>
                  Papua New Guinea
</p>
                <p>
                  Nicaragua
</p>
                <p>
                  Morocco
</p>
                <p>
                  Kazakhstan
</p>
                <p>
                  Italy
</p><br />
                <p>
                  <em><b>No value at fuels</b></em>
                </p>
                <p>
                  At records with following gppd_idnr:
</p>
                <p>
                  WRI1061473
</p>
                <p>
                  WRI1061469
</p>
                <p>
                  WRI1061468
</p>
                <p>
                  WRI1019057
</p>
                <p>
                  WRI1019108
</p>
                <p>
                  =======&gt; records deleted because they cannot be used for our
                  visualization (need the fuel type of each station)
</p>
                <p>
                  <em>No values at gppd_idnr </em>
                  on 3 records
</p>
                <p>
                  ---------&gt; records deleted because they cannot be used for our
                  visualization (need the unique id of each station)
</p>
                <p align="center">
                  <strong><u>Summation Records</u></strong>
                </p>
                <p>
                  <em>Removed the below rows with country</em>
                  :
</p>
                <p>
                  ALL INDIA
</p>
                <p>
                  ALL IRAQ
</p>
                <p align="center">
                  <strong>
                    <u>
                      ----------------------------------------------------------------------------------------------------
        </u>
                  </strong></p>
                <p align="center">

                  <strong><u>OTHER ISSUES</u></strong>
                </p>
                <p align="center">
                  <strong>
                    <u>
                      ----------------------------------------------------------------------------------------------------
        </u>
                  </strong>
                  <br />
                  <br />
                </p>
                <p>
                  54 Blank records were removed
</p><br />
                <p>
                  <em>Removed email from record:</em>
                </p>
                <p>
                  Steadfast Marsh Solar Ltd - Innogy (previously BELECTRIC Solar) (Wai-Kit
                  Cheung &lt;waikit.cheung@belectric.co.uk&gt;)-&gt;Steadfast Marsh Solar Ltd
                  - Innogy (previously BELECTRIC Solar)
</p>

                <p align="center">
                  <strong><u>Incorrect shifted cells</u></strong>
                </p>
                <p>
                  153 Rows had an empty first column (country), so it was necessary to shift
                  all cells to left to match the columns. (Using Excel)
</p>
                <p>
                  233 Rows had an empty second column (country_long), so it was necessary to
                  shift all cells to left to match the columns. (Using Excel)
</p>
                <p align="center">
                  <strong><u>Out of range errors:</u></strong>
                </p>
                <p>
                  <strong><u></u></strong>
                </p>
                <p>
                  Invalid owner (#NAME?) at record with gppd_idnr (CHL0000125) -&gt; SET TO
                  BLANK
</p>
                <p>
                  Invalid commissioning_year Value(421421) at record with name (Kosovo B Coal
                  Power Plant Kosovo) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid commissioning_year Value(15123) at record with name (Osh CHP Power
                  Plant Kyrgyzstan) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid(too early date) commissioning_year Value(1477) at record with name
                  (Nam Samoy) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid commissioning_year Value(201) at 14 records (Guinea, Guinea-Bissau,
                  Guyana) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid commissioning_year Value(200) at 19 records (Georgia, Germany)
                  -&gt; SET TO BLANK
</p>
                <p>
                  Invalid year_of_capacity_data Value(#NAME?) at 1 record with gppd_idnr
                  (ARG0000269) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid year_of_capacity_data Value(NaN) at 2 records with gppd_idnr
                  (AUS0000438 AND AUS0000282) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid generation_gwh_2015 Value(NaN) at 1 record with gppd_idnr
                  (ARG0000200) -&gt; SET TO BLANK
</p>
                <p>
                  Invalid estimated_generation_gwh Value(Nil) at 12 records -&gt; SET TO
                  BLANK
</p>
                <p>
                  Invalid estimated_generation_gwh Value(NaN) at 9 records -&gt; SET TO BLANK
</p>
                <p>
                  481 records deleted because estimated_generation_gwh was not a number and
                  it will be needed in the visualization!
</p>
                <p>
                  Invalid capacity_mw (#NAME?) at 2 records with gppd_idnr (ARG0000203 AND
                  AUS0000251) -&gt; RECORDS DELETED
</p>
                <p>
                  Invalid latitude (#NAME?) at 16 records -&gt; RECORDS DELETED
</p>
                <p>
                  Invalid latitude (null) at 5 records -&gt; RECORDS DELETED
</p>
                <p>
                  Invalid longitude (#NAME?) at 9 records -&gt; RECORDS DELETED
</p>
                <p>
                  Invalid longitude (null) at 3 records -&gt; RECORDS DELETED
</p>
                <p>
                  Out of range for estimated_generation_gwh for record with gppd_idnr:
                  WRI1000140 with value 45745747457457400 -&gt; RECORD DELETED
</p>
                <p>
                  Out of range for estimated_generation_gwh for record with gppd_idnr:
                  WRI1002853 with value 9679957979999 -&gt; RECORD DELETED
</p>
                <p align="center">
                  <strong><u>Semantic error:</u></strong>
                </p>
                <p>
                  13 records had an estimated_generation_gwh that had characters mixed with
                  numbers.
</p>
                <p>
                  the below transform was used to remove the characters
</p>
                <p align="center">
                  <em>replaceChars(value,"()gwh ","")</em>
                </p>
                <p align="center">
                  <em></em>
                </p>
                <p>
                  After the transformation 12 records had NIL value and they got deleted
</p>
              
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(Cleaning);