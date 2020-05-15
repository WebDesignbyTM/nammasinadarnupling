import React, { useState, useEffect} from 'react';
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
import MaterialTable from 'material-table';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root:{
    display:'flex',
    backgroundColor:theme.palette.primary.main,
    flex:1,
    justifyContent:'center',
    height: '100vh'
  },
  toolbarReplace: {
    ...theme.mixins.toolbar
  },
  content: {
    flexDirection:'column',
    padding: theme.spacing(3),
    flexBasis:500
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

  const searchCompanies = (key) => {
    getCompanies({name:key}).then(res=>{
      setFound(res);
    }, rej => {
      console.log(rej);
    })
  }

  useEffect(()=>{
    searchCompanies("");
  },[]);


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
      <div className={classes.content}>
        <div className={classes.toolbarReplace} />

        <Paper>
          <MaterialTable
            columns={[
              { title: 'Name',    field: 'company_name' },
              { title: 'Phone',   field: 'company_phone' },
              { title: "E-mail",  field: 'company_email'},
              { title: "Address", field: 'company_address'},
              { title: "CUI",     field: 'company_cui'}
            ]}
            detailPanel={rowData=>{
              console.log(rowData)
              return(<CompanyProfile selectedCompany={rowData}/>)
            }}
            data={found}
            title="Companies"
          />
        </Paper>

      </div>

    </div>
  )
}
