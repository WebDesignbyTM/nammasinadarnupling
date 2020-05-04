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

const useStyles = makeStyles((theme) => ({
  fields:{
    width:200
  },

}));

export default function StationField(props) {
  const classes=useStyles();
  const theme = useTheme();
  const [stops, setStops] = React.useState([]);
  React.useEffect(()=>{
    getStops({}).then(res=>{
      if(res.status==200){
        setStops(res.data.map((el,idx)=>el.name));
      }
    })
  }, [])
  return (
    <Autocomplete
      multiple={props.multiple}
      id="from"
      options={stops}
      getOptionLabel={(option)=>option}
      defaultValue={props.defaultValue}
      onChange={(evt,val)=> {
        props.onChange(val);
      }}
      renderInput={(params) => (
        <TextField {...params} label={props.label} variant="outlined" color="secondary"
        className={classes.fields} margin="normal"/>
      )}
      renderOption={(option, { inputValue }) => {
        const matches = match(option, inputValue);
        const parts = parse(option, matches);

        return (
          <div>
            {parts.map((part, index) => (
              <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                {part.text}
              </span>
            ))}
          </div>
        );
      }}
    />
  )
}
