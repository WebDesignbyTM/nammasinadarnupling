import React, { useState, useEffect } from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './home.css'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { userData, getUserCompanies } from '../../api/requests.js';
import Box from '@material-ui/core/Box';
import { Alert, AlertTitle } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';
import CompanyProfile from '../../components/companyprofile/companyprofile.jsx';
import CompanyCtrlPanel from '../../components/companyctrlpanel/companyctrlpanel.jsx';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UserProfile from '../../components/userprofile/userprofile.jsx';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
    minHeight: '100vh'
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    display: 'flex',
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
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
  formControl: {
    minWidth: 150,
    float: 'left',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  comboBoxCompanies: {
    margin: theme.spacing(2)
  },

}));

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {

    userData().then(res => {
      setUser(res);
    }).catch(err => {
      handleOpen();
      console.log(err.message);
    });

    getUserCompanies().then(res => {
      setCompanies(res);
    }).catch(err => {
      console.log(err.message);
    })

  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway')
      return;

    setOpen(false);
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const selectCompany = (newValue) => {
    setSelectedCompany(newValue)
  }

  return (
    <div className={classes.root}>
      <Header title='Home'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />
        <Paper className={classes.paper}>
          <Grid container direction="column">

            {function() {
              if (user.usertype === 'company')
                return (
                  <div>
                    <Autocomplete
                      className={classes.comboBoxCompanies}
                      id="combo-box-companies"
                      options={companies}
                      getOptionLabel={(option) => option.company_name}
                      style={{ width: 300 }}
                      onChange={(event, newValue) => selectCompany(newValue)}
                      renderInput={(params) =>
                        <TextField
                          {...params}
                          label="Firmă"
                          variant="outlined"/>}
                    />

                    {function() {
                      if (selectedCompany)
                        return (
                          <div>
                            <CompanyProfile selectedCompany={selectedCompany}/>
                          </div>)
                      }()
                    }
                    <CompanyCtrlPanel company={selectedCompany}/>
                  </div>);
              else if (user.usertype === 'personal')
                return (
                  <UserProfile/>
                );
            }()}

          </Grid>
        </Paper>
      </main>

      <Snackbar 
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" variant="filled" onClose={handleClose}>
          <b>Această pagină este destinată doar utilizatorilor înregistrați</b>
        </Alert>
      </Snackbar>

    </div>
  )
}
