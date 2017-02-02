import React from 'react';
import './style.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  componentWillMount() {
    this.setState({herro: 1});
  }

  componentWillUnmount() { }

  setState(state = { }) {
    this.state = state;
  }

  render() {
    return (<div id="title">
      Hello world!
    </div>)
  }
}
