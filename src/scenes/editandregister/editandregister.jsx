import React, {useState, useEffect} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useForm from '../../utils/useForm.js';
import {userLogged, userData, userRegister, userEditData} from '../../api/requests.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
    alignItems:'center',
    justifyContent:'center',
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    width:500,
    flexDirection:'column',
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  userForm: {
    display:'flex',
    flexBasis:200,
    alignItems:'center '
  },
  dataField:{
    padding:10
  },
  registerButton: {
    margin:10,
    flexGrow:1,
  },
  displayObjectNone:{
    display:'none!important'
  },
  companyRadio:{
    display:'flex',
    flexDirection:'row',
    margin:10
  }


}));

export default function EditAndRegister(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [userInitData, setUserInitData] = React.useState();
  const printData = () => {
    console.log(input.start, input.destination, input.company);
  };
  const {input, handleInputChange, handleSubmit} = useForm(printData);
  const [logged, setLogged] = React.useState();
  useEffect(()=> {
    userLogged().then(res=>{
      setLogged(res.logged);
      })
    });

  const [title, setTitle] = React.useState();
  useEffect(()=> {
    if(logged){
      setTitle('Edit profile');
    } else {
      setTitle('Register');
    }
  })

  const [errorOpen, setErrorOpen] = React.useState(false);



  const handleEditRegister = (event) => {
    event.preventDefault();
    const payload={
      username:input.username,
      fullname:input.fullname,
      email:input.email,
      password:input.password
    };
    if(!logged){
      payload.userType=input.userType;
    }
    const req=logged?userEditData:userRegister;
    req(payload).then(res=>{
      if(res.status==200) {
        window.location.reload();
      } else {
        setErrorOpen(true);
      }
    })
  }


  return (
    <div className={classes.root}>
      <Header title={title}/>
      <div className={classes.content}>
        <div className={classes.toolbarReplace} />

        <Paper>
            <form onSubmit={handleEditRegister}>
              <Grid container
                direction="column"
                classname={classes.userForm}>
                <RadioGroup className={clsx({[classes.companyRadio]:true, [classes.displayObjectNone]:logged})}
                aria-label="Personal or Company" name="userType"
                value={input.userType} onChange={handleInputChange}>
                  <FormControlLabel value="personal" control={<Radio color="primary"/>} label="Personal" />
                  <FormControlLabel value="company" control={<Radio color="primary"/>} label="Company" />
                </RadioGroup>
                <TextField className={classes.dataField} variant="outlined"
                label="Username" name="username" onChange={handleInputChange}
                value={userData?userData.username:input.username} defaultValue={userData?userData.username:undefined}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Fullname" name="fullname" onChange={handleInputChange}
                value={input.fullname} defaultValue={userData?userData.fullname:undefined}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Email" name="email" onChange={handleInputChange}
                value={input.email} defaultValue={userData?userData.email:undefined}/>
                <TextField className={classes.dataField} variant="outlined"
                label="Password" name="password" onChange={handleInputChange}
                value={input.password} defaultValue={userData?userData.password:undefined}/>
                <Button className={classes.registerButton} type="submit" variant="contained" color="primary">
                  {logged?'Save changes':'Register'}
                </Button>
              </Grid>
            </form>

            <Typography color='error' align='center' className={clsx({
              [classes.displayObjectNone]:(!errorOpen)
            })}>
              Incorrect user data
            </Typography>
        </Paper>

      </div>

    </div>
  )
}
