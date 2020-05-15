import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {getStops} from '../../api/requests.js';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import RemoveIcon from '@material-ui/icons/Remove';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import StationField from '../stationfield/stationfield.jsx';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  searchRoot: {
    padding: theme.spacing(1),
  },
  fields:{
  },
  button: {
    margin: theme.spacing(1)
  },
  hide:{
    display:'none',
  }
}));

export default function SearchRoute(props) {
  const classes=useStyles();
  const theme = useTheme();
  const [stops, setStops] = React.useState([]);
  const [start, setStart] = React.useState();
  const [destination, setDestination] = React.useState();
  const handleSubmit = (evt) => {
    evt.preventDefault();
  }

  React.useEffect(()=>{
    getStops({}).then(res=>{
      if(res.status==200){
        setStops(res.data);
      }
    })
  }, [])

  return (
    <div className={clsx(
      classes.searchRoot, {
      [classes.hide]:props.hide
    })}>
        <form className={classes.searchForm} onSubmit={handleSubmit}>
          <Grid container
          direction='row'
          alignItems='center'
          justify='center'>

            <StationField label="Punct plecare" defaultValue={props.defaultValue?props.defaultValue.start:undefined}
            className={classes.fields}
            onChange={(val)=> {
              setStart(val?val:'');
            }}/>

            <RemoveIcon/>

            <StationField label="Destinatie" defaultValue={props.defaultValue?props.defaultValue.destination:undefined}
            className={classes.fields}
              onChange={(val)=>{
                setDestination(val?val:'');
            }}/>

            <Button type="submit" variant="contained" color="primary"
            className={clsx(
              classes.button, {
              [classes.hide]:!props.searchButton
            })}>
              <Link to={{pathname: '/transport/', state:{start:start, destination:destination}}}
                style={{ textDecoration: 'none', color: 'black' }}>
                Caută
              </Link>
            </Button>

          </Grid>
        </form>
    </div>
  )

}
