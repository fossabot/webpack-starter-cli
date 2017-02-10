import React from 'react';
import './style.scss';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { }

  componentWillMount() {
    this.setState({welcomeText: 'Hello world!'});
  }

  componentWillUnmount() { }

  setState(state = { }) {
    this.state = state;
  }

  render() {
    return (<div id="title">
      { this.state.welcomeText }
    </div>)
  }
}
