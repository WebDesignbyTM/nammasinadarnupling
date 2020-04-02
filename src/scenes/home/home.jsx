import React, {Component} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './home.css'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';


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
  topContent: {
    display:'flex',
    flex:2
  },
  bottomContent: {
    display:'flex',
    flex:1
  },

}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Header title='Home'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <div className={classes.topContent}>
          albatros
        </div>

        <div className={classes.bottomContent}>
          321
        </div>
      </main>

    </div>
  )
}
