import React from 'react';
import ReactDOM from 'react-dom';
import GameOfLife from './components/game-of-life'
import 'normalize.css/normalize.css'; // reset all browser conventions
import './styles/styles.scss';

ReactDOM.render(<GameOfLife />, document.getElementById('app'));