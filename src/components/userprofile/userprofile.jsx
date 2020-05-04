import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { getUserReservations, deleteReservation } from '../../api/requests.js';

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
    });
  }, []);


  const cancelReservation = (reservation) => {
    let payload = { id: reservation.id };
    deleteReservation(payload).then(res => {

      console.log(res);
      getUserReservations().then(res => {
        setReservations(res);
      }).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });
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
              onClick: (event, rowData) => cancelReservation(rowData)
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
};