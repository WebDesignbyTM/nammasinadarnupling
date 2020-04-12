import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import UserInfo from '../../components/userinfo/userinfo.jsx';
import UserLogin from '../../components/userlogin/userlogin.jsx';

import {userLogged} from '../../api/requests.js';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
  },
  card:{
    minWidth: 200
  }


}));

export default function User(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [logged, setLogged]=React.useState();

  React.useEffect(()=>{
    userLogged().then(res=>{
      setLogged(res.logged)
    })
  })


  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        {logged && <UserInfo extended={false}/>}
        {!logged && <UserLogin/>}
      </Card>
    </div>
  )
}
