import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(0);// initializeaza cu valoarea 0

  useEffect(() => {
    fetch('/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <div>
          <nav>
            <span>
              <Link to="/">Home</Link>{" | "}
              <Link to="/about">About</Link>{" | "}
              <Link to="/users">Users</Link>
            </span>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">{/* component={<nume>}*/}
              <p>About</p>
            </Route>
            <Route path="/users">
              <p>Users</p>
            </Route>
            <Route path="/">
              <p>Home</p>
              <img src={logo} className="App-logo" alt="logo" />
              <p>The current time is {Date(currentTime)}.</p>
            </Route>
          </Switch>
        </div>
      </Router>
      </header>
    </div>
  );
}

export default App;