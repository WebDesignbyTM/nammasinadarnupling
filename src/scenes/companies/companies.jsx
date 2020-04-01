import React, {Component} from 'react';
import Header from '../../components/header/header.jsx';
import Paper from '@material-ui/core/Paper';


class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  

  render() {

    return(
        <Paper className={"home-wrapper"}>
          <Header title={'Companies'}/>
          <div>Companies</div>
        </Paper>
    )
  }
}

export default Companies;
