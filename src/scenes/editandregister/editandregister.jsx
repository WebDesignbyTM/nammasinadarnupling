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
  userForm: {
    display:'flex',
    flexBasis:200,
    alignItems:'center '
  },


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



  const handleEditRegister = () => {
    const payload={
      username:input.username,
      fullname:input.fullname,
      email:input.email,
      password:input.password
    };
    const req=logged?userEditData:userRegister;
    req(payload).then(res=>{
      if(res.status==200) {
        window.location.reload();
      }
    })
  }


  return (
    <div className={classes.root}>
      <Header title={title}/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <Paper>
            <form onSubmit={handleEditRegister}>
              <Grid container
                direction="column"
                classname={classes.userForm}>
                <TextField label="Username" name="username" onChange={handleInputChange}
                value={userData?userData.username:input.username} defaultValue={userData?userData.username:undefined}/>
                <TextField label="Fullname" name="fullname" onChange={handleInputChange}
                value={input.fullname} defaultValue={userData?userData.fullname:undefined}/>
                <TextField label="Email" name="email" onChange={handleInputChange}
                value={input.email} defaultValue={userData?userData.email:undefined}/>
                <TextField label="Password" name="password" onChange={handleInputChange}
                value={input.password} defaultValue={userData?userData.password:undefined}/>
                <Button type="submit" variant="contained" color="secondary">
                  {logged?'Save changes':'Register'}
                </Button>
              </Grid>
            </form>
        </Paper>

      </main>

    </div>
  )
}
