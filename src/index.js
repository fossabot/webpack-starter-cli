import $ from 'jquery';
import './style.scss';

const bootstrap = function () {
  $('body')
    .append('<h1>success!</h1>')
    .append('<p>everything is ready to go</p>');
};

bootstrap();
