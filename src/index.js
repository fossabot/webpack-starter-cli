//this file can also be used as your root angular.module
//npm install packages and import them wherever you need
import $ from 'jquery';
import './style.scss';

const bootstrap = function () {
  $('body')
    .append('<h1>success!</h1>')
    .append('<p>everything is ready to go</p>');
};

bootstrap();
