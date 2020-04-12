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
import {userLogged, userData, userRegister} from '../../api/requests.js';


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
    flexDirection:'column',
  }


}));

export default function EditAndRegister(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [username, setUsername] = React.useState();
  const [fullname, setFullname] = React.useState();
  const [email, setEmail] = React.useState();
  const printData = () => {
    console.log(input.start, input.destination, input.company);
  };
  const {input, handleInputChange, handleSubmit} = useForm(printData);
  const [title, setTitle] = React.useState();
  useEffect(()=> {
    userLogged().then(res=>{
      if(res.logged){
        setTitle('Edit profile');
      } else {
        setTitle('Register');
      }
    })
  })

  const handleRegister = () => {
    userRegister({
      username:input.username,
      fullname:input.fullname,
      email:input.email,
      password:input.password
    }).then(res=>{
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
          <form className={classes.searchForm} onSubmit={handleRegister}>
            <Grid container
              direction="column">
              <TextField label="Username" name="username" onChange={handleInputChange} value={input.username}/>
              <TextField label="Fullname" name="fullname" onChange={handleInputChange} value={input.fullname}/>
              <TextField label="Email" name="email" onChange={handleInputChange} value={input.email}/>
              <TextField label="Password" name="password" onChange={handleInputChange} value={input.password}/>
              <Button type="submit" variant="contained" color="secondary">
                Register
              </Button>
            </Grid>
          </form>
        </Paper>

      </main>

    </div>
  )
}
