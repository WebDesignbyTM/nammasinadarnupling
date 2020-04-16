import React, {useState} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {getReqSubtrips} from '../../api/requests.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    flex:1,
    flexDirection:'column',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  searchForm: {
    display:'flex',
    flexDirection:'column',
  }


}));

export default function Transport(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [stops, setStops] = useState(['']);
  const [trips, setTrips] = useState([]);
  
  const changeStop = (newVal, idx) => {
    let aux = [...stops];
    aux[idx] = newVal;
    setStops(aux);
  }

  const addStop = () => {
    setStops(stops.concat(''));
  }

  const deleteStop = (idx) => {
    let aux = [...stops];
    aux.splice(idx, 1);
    setStops(aux);
  }

  const handleSubmit = (event) => {
    if (event) 
      event.preventDefault();
    const payload = {stops: stops};
    const req = getReqSubtrips;
    req(payload).then(res=> {
      setTrips(res);
    });
  }


  return (
    <div className={classes.root}>
      <Header title='Transport'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <div>
          <form className={classes.searchForm} onSubmit={handleSubmit}>
            {stops.map((stop, idx) => {
              let lbl = "Stop no. " + (idx + 1);
              return (
                <div>
                  <TextField label={lbl} name={lbl.toLowerCase()} onChange={e => changeStop(e.target.value, idx)} value={stops[idx]}/>
                  <Button variant="contained" color="secondary" onClick={() => deleteStop(idx)}>
                    Delete stop
                  </Button>
                </div>)
            })}
            <Button variant="contained" color="secondary" onClick={addStop}>
              Add stop
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </form>
        </div>

        {trips.map((trip) => {
          return <div><p>{trip.id}</p><p>{trip.route_id}</p><p>{trip.company_id}</p></div>
        })}

        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Trip id</TableCell>
              <TableCell align="right">Route id</TableCell>
              <TableCell align="right">Company id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trips.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.trip}
                </TableCell>
                <TableCell align="right">{row.route}</TableCell>
                <TableCell align="right">{row.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </main>

    </div>
  )
}
