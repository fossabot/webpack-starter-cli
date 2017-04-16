import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home/index.jsx';
import pkg from '../package.json';

ReactDOM.render(
  <Home></Home>,
  document.getElementById('app')
);

// Small example of async/await function
var foo = async function() {
  console.info(await bar());
};

async function bar() {
  return pkg.name + ' @ v' + pkg.version;
}

foo();
