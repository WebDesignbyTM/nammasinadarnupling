import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import StationField from '../stationfield/stationfield.jsx';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import {createRoute} from '../../api/requests.js';

const useStyles=makeStyles((theme)=>({

}));

export default function AddRoute(props) {
  const classes=useStyles();
  const [stops, setStops] = React.useState([]);

  const addStation = () => {
    setStops(prev=>{
      return [...prev, 0]
    })
  }
  const modifyStation = (stopid, id) => {
    setStops(prev=> {
      let aux=prev;
      aux[id]=stopid;
      return aux;
    })
  }

  const deleteStation = (id) => {
    setStops(prev=>{
      let aux=prev;
      aux.splice(id);
      console.log(aux);
      return aux;
    })
  }

  const makeRoute = () => {
    createRoute({stops:stops}).then(res=>{
      props.setRoute(res.data.routeid);
    })
  }

  return (
    <div>
      <List>
        {stops.map((stop, idx)=>{

          return (
            <ListItem key={idx} >
              <StationField onChange={(val)=>{
                modifyStation(val.id, idx);
              }}/>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="Confirm"
                onClick={()=>{
                  deleteStation(idx);
                }}>
                  <ClearIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </List>
      <Button onClick={addStation}>
        Adauga statie
      </Button>

      <Button onClick={makeRoute}>
        Adauga Ruta
      </Button>
    </div>
  )
}