import React, {useState} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {getReqSubtrips, userLogged, makeReservation, getStops} from '../../api/requests.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from 'material-table';

import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import RemoveIcon from '@material-ui/icons/Remove';
import AdvancedSearch from '../../components/advancedsearch/advancedsearch.jsx';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
    justifyContent:'center'
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    flexDirection:'column',
    padding: theme.spacing(3),
    flexBasis:800
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchForm: {
    paddingBottom:20,
    marginBottom:40
  }


}));

export default function Transport(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [trips, setTrips] = useState([]);
  const [start, setStart] = useState(()=>{
    if(props.location.state) {
      return props.location.state.start;
    }
    return '';
  });
  const [destination, setDestination] = useState(()=>{
    if(props.location.state) {
      return props.location.state.destination;
    }
    return '';
  });

  React.useEffect(()=>{
    if(props.location.state) {
      getReqSubtrips([start,destination]).then(res=> {
        setTrips(res);
      })
    }

  },[]);

  const handleSubmit = (stops) => {
    console.log(stops);
    const payload = {stops: stops};
    const req = getReqSubtrips;
    req(payload).then(res=> {
      setTrips(res);
    });
  }

  const reserveTrip = (trip) => {
    userLogged().then(res => {
      if (!res.logged) {
        alert('Rezervările se pot face doar de către utilizatori înregistrați!');
      } else {
        let payload = {trip_id: trip.trip};
        makeReservation(payload).then(res => {
          if (res == 'Reservation successful') {
            alert('Rezervarea a fost făcută cu succes');
          } else {
            alert('Rezervarea a eșuat, contactați un administrator');
          }
        });
      }
    });
  }


  return (
    <div className={classes.root}>
      <Header title='Transport'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <Paper>
          <AdvancedSearch defaultValue={props.location.state} onSubmit={(val)=>{handleSubmit(val)}}/>
        </Paper>

        <Paper>
          <MaterialTable
            columns={[
              { title: 'Id călătorie',    field: 'trip' },
              { title: 'Rută',    field: 'route' },
              { title: 'Companie',   field: 'company' }
            ]}
            data={trips}
            title='Trasee'
            options={{
              search: false
            }}
            actions={[
              {
                icon: 'add',
                tooltip: 'Rezervă călătorie',
                onClick: (event, rowData) => reserveTrip(rowData)
              }
            ]}
            localization= {{
              header: {
                actions: 'Rezervă'
              }
            }}
            options={{
              actionsColumnIndex: -1
            }}
          />
        </Paper>

      </main>

    </div>
  )
}
