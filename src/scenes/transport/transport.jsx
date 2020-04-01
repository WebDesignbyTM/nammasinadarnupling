import React, {Component} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';


class Transport extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {

    return(
        <Paper className={"home-wrapper"}>
          <Header title={'Transport'}/>
          <div>transport</div>
        </Paper>
    )
  }
}

export default Transport;
