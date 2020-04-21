import React, { useState } from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { getCompanies } from '../../api/requests.js';
import useForm from '../../utils/useForm.js';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CompanyProfile from '../../components/companyprofile/companyprofile.jsx';


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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Companies(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState({});
  const [found, setFound] = useState([]);
  const {handleSubmit, handleInputChange, input} = useForm(() => {
    let payload = { name: input.company_name };
    console.log(payload);
    getCompanies(payload).then(res => {
      setFound(res);
    }, rej => {
      console.log(rej);
    });
  });

  const checkProfile = (comp) => {
    setSelectedCompany(found[comp]);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className={classes.root}>
      <Header title='Companies'/>
      <main className={classes.content}>
        <div className={classes.toolbarReplace} />

        <form className={classes.searchForm} onSubmit={handleSubmit}>
          <div>
            <TextField label="Search company" name="company_name" onChange={handleInputChange}/>
          </div>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </form>

          
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Company id</TableCell>
              <TableCell align="right">Company name</TableCell>
              <TableCell align="right">Company cui</TableCell>
              <TableCell align="right">Company profile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {found.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.company_name}</TableCell>
                <TableCell align="right">{row.company_cui}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="secondary" onClick={() => checkProfile(idx)}>
                    Check profile
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                { selectedCompany.company_name }
              </Typography>
            </Toolbar>
          </AppBar>
          <CompanyProfile props={selectedCompany} />
          {/* <List>
            <ListItem button>
              <ListItemText primary="Phone ringtone" secondary="Titania" />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText primary="Default notification ringtone" secondary="Tethys" />
            </ListItem>
          </List> */}
        </Dialog>

      </main>

    </div>
  )
}
