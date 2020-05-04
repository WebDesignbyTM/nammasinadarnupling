import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header.jsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



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
  const company=(props.selectedCompany)?props.selectedCompany:{};

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div>
      <main className={classes.content}>
        <Typography>
          Aceasta este pagina de profil a companiei {company.company_name}
        </Typography>
      </main>

    </div>
  )
}
