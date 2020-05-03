import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getUserReservations } from '../../api/requests.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    flex:1,
  },
  content: {
    display: 'flex',
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    padding: theme.spacing(3),
  },
}));

export default function UserProfile(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getUserReservations().then(res => {
      setReservations(res);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const deleteReservation = (reservation) => {
    console.log(reservation);
  }

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <MaterialTable
          style={{ minWidth: 800 }}
          columns={[
            { title: 'Dată rezervare',    field: 'date' },
            { title: 'Id călătorie',   field: 'trip_id' }
          ]}
          title='Rezervări'
          data={ reservations }
          options={{
            search: false
          }}
          actions={[
            {
              icon: 'delete',
              tooltip: 'Anulează rezervarea',
              onClick: (event, rowData) => deleteReservation(rowData)
            }
          ]}
          localization= {{
            header: {
              actions: 'Anulează'
            }
          }}
          options={{
            actionsColumnIndex: -1
          }}
        />
      </main>
    </div>
  );
}