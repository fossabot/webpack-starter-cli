import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/index.jsx';

ReactDOM.render(
  <Home></Home>,
  document.getElementById('app')
);

// Small example of async/await function
var foo = async function () {
  console.info(await bar());
}

async function bar() {
  return "webpack starter kit @ v0.0.1";
}

foo();