import React from 'react';
import ReactDOM from 'react-dom';
import GameWindow from './game-window';

export default class GameOfLife extends React.Component {
    state = {

    };

    componentDidMount() {
        // load random game of life
        
    }

    render() {
        return (
            <div>
                <div className='title'>
                    <h1>Game of life</h1>
                </div>
                <GameWindow />
            </div>
        )
    }


}