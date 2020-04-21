import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header.jsx';
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
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },


}));

export default function CompanyProfile(props) {
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    console.log(props);
  });

  return (
    <div>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />
        <p>macar atata</p>
      </main>

    </div>
  )
}
