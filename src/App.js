import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Home from './scenes/home/home.jsx';
import Companies from './scenes/companies/companies.jsx';
import Transport from './scenes/transport/transport.jsx';
import Reservations from './scenes/reservations/reservations.jsx';
import Trips from './scenes/trips/trips.jsx';
import EditAndRegister from './scenes/editandregister/editandregister.jsx';
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#65ccb8",
      light: "#57ba98",
      dark: "#3b945e",
    },
    secondary: {
      main: "#f2f2f2",
      dark: "#182628",
    },
  },
  drawer: {
    width: 240,
    rightMargin:24,
  }
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header>
          <Router>
          <div>

            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
              <Route path="/companies" component={Companies}/>
              <Route path="/transport" component={Transport}/>
              <Route path="/register" component={EditAndRegister}/>
              <Route path="/reservation" component={Reservations}/>
              <Route path="/trip" component={Trips}/>
              <Route path={["/home", "/"]} component={Home}/>
            </Switch>
          </div>
        </Router>
        </header>
      </div>
      </ThemeProvider>
  );
}

export default App;
