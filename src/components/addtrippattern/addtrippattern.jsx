import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OccasionalPattern from './occasionalpattern.jsx';

const useStyles=makeStyles((theme)=>({

}));

export default function AddTripPattern(props) {

  const [type, setType] = React.useState(0);

  const typeName = ['Ocazional', 'Zilnic', 'Saptamanal'];

  const patternComp = [<OccasionalPattern tripid={props.tripid}/>]

  return (
    <div>
      <Card>
        <Grid container
        direction='column'>
          <Select
            labelId="Tip cursa"
            value={type}
            onChange={(evt) => {
              setType(evt.target.value);
            }}
          >
            <MenuItem value={0}>Ocazional</MenuItem>
            <MenuItem value={1}>Zilnic</MenuItem>
            <MenuItem value={2}>Saptamanal</MenuItem>
          </Select>

          {patternComp[type]}

        </Grid>
      </Card>
    </div>
  )
}
