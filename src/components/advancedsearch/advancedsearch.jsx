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
import SearchRoute from '../searchroute/searchroute.jsx';

const useStyles = makeStyles((theme) => ({
  fields:{
  },
  hide:{
    display:'none',
  }
}));

export default function AdvancedSearch(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [start, setStart] = React.useState(()=>{
    if(props.defaultValue) {
      return props.defaultValue.start;
    } else {
      return '';
    }
  });
  const [destination, setDestination] = React.useState(()=>{
    if(props.defaultValue) {
      return props.defaultValue.destination;
    } else {
      return '';
    }
  });
  const [stops, setStops] = React.useState([]);
  const displaySearchButton=props.onSubmit?'':'none';

  return (
    <div>
      <Grid container
      direction='column'
      alignItems='center'
      justify='center'>
        <Grid container
        alignItems='center'
        justify='center'>
          <StationField label="Punct plecare" defaultValue={props.defaultValue?props.defaultValue.start:undefined}
          onChange={(val)=> {
              setStart(val);
          }}/>
          <StationField label="Destinatie" defaultValue={props.defaultValue?props.defaultValue.destination:undefined}
            onChange={(val)=>{
                setDestination(val);
          }}/>
        </Grid>
        <StationField multiple={true} label="Statii intermediare" onChange={(val)=>{setStops(val.map((el,id)=>el));}}/>
        <Button style={{display:displaySearchButton}} onClick={()=>{
          let aux=[start,...stops,destination];
          props.onSubmit(aux);
          }}>
          Search
        </Button>
      </Grid>

    </div>
  )
}
