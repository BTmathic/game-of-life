import React from 'react';

export default class GameWindow extends React.Component {
    state = {
        generation: 0,
        boardHeight: 40,
        boardWidth: 70,
        gameBoard: [],
        gameSpeed: 200, // milliseconds for each generation step
        runGame: true
    };

    // either remove 'tile dead' if it is present in the string, or add if otherwise
    // lifeStatus --- a string of classNames for a tile div
    toggleLife = (tileID) => {
        let gameBoard = this.state.gameBoard;
        if (gameBoard[tileID[0]][tileID[1]] === 'alive') {
            gameBoard[tileID[0]][tileID[1]] = 'dead';
        } else {
            gameBoard[tileID[0]][tileID[1]] = 'alive';
        }
        this.setState(() => ({ gameBoard }));
    }

    // count how many of the 8 neighbours a given tile has (including around the edges of
    // the board) are alive and return this number
    countLiveNeighbours = (tile, index) => {
        let topRow = index[0] === 0 ? this.state.boardHeight-1 : index[0]-1;
        let bottomRow = index[0] === this.state.boardHeight-1 ? 0 : index[0]+1;
        // middleRow = index[0]
        // middleCol = index[1]
        let leftCol = index[1] === 0 ? this.state.boardWidth-1 : index[1] - 1;
        let rightCol = index[1] === this.state.boardWidth-1 ? 0 : index[1] + 1;
        const neighbouringIndices =  [
            [topRow, leftCol], [topRow, index[1]], [topRow, rightCol], [index[0], leftCol],
            [index[0], rightCol], [bottomRow, leftCol], [bottomRow, index[1]], [bottomRow, rightCol]
        ];
        let numberOfLivingNeighbours = 0;
        for (let i=0; i < neighbouringIndices.length; i++) {
            if (this.state.gameBoard[neighbouringIndices[i][0]][neighbouringIndices[i][1]] === 'alive') {
                numberOfLivingNeighbours += 1;
            }
        }

        return numberOfLivingNeighbours;
    }

    // This is the main step in the game, where we check each tile's number of living
    // neighbours and adjust the population as required
    handleGameStep = () => {
        let gameBoard = [];
        for (let i=0; i < this.state.boardHeight; i++) {
            let newRow = [];
            for (let j=0; j < this.state.boardWidth; j++) {
                const count = this.countLiveNeighbours(this.state.gameBoard[i][j], [i,j]);
                let newTile = undefined;
                // check the rules to see if the tile will be alive or dead next turn
                if (this.state.gameBoard[i][j] === 'alive') {
                    if (count === 2 || count === 3) {
                        newTile = 'alive';
                    } else if (count < 2 || count > 3) {
                        newTile = 'dead'
                    }
                } else {
                    if (count === 3) {
                        newTile = 'alive';
                    } else {
                        newTile = 'dead';
                    }
                }
                newRow.push(newTile);
            }
            gameBoard.push(newRow);
        }
        this.setState(() => ({ gameBoard }))
    }

    pauseGame = () => {
        this.setState(() => ({ runGame: false }));
    }

    // Both clear the board and reset the generation count to 0
    resetBoard = () => {
        let gameBoard = [];
        for (let i=0; i < this.state.boardHeight; i++) {
            let newRow = [];
            for (let j=0; j < this.state.boardWidth; j++) {
                newRow.push('dead');
            }
            gameBoard.push(newRow);
        }
        this.setState(() => ({ gameBoard, generation: 0 }));
    }

    runGame = () => {
        this.setState(() => ({ runGame: true }));
    }

    setSlowSpeed = () => { this.setState(() => ({ gameSpeed: 500 })); }
    setMedSpeed = () => { this.setState(() => ({ gameSpeed: 200 })); }
    setFastSpeed = () => { this.setState(() => ({ gameSpeed: 50 })); }

    // Take a tile and its index and determine its corresponding JSX element
    // based on where it is on the grid (the outer edges do not have borders)
    setTileLife = (tile, index) => {
        let tileClass = 'tile';
        if (index[0] !== this.state.boardHeight-1) {
            if (index[1] !== this.state.boardWidth-1) {
                tileClass = tileClass.concat(' tile-bottom tile-right');
            } else {
                tileClass = tileClass.concat(' tile-bottom');
            }
        } else { // on bottom row
            if (index[1] !== this.state.boardWidth-1) {
                tileClass = tileClass.concat(' tile-right');
            }
        }
        if (tile === 'alive') { // tile is alive
            tileClass = tileClass.concat(' tile-alive');
        } else {
            tileClass = tileClass.concat(' tile-dead');
        }
        return (
            <div
                key={index}
                className={tileClass}
                id={index}
                onClick={() => {this.toggleLife(index)}}
            ></div>
        );
    }

    setLifespan = () => {
        setTimeout(() => {
            if (this.state.runGame) {
                // Update game
                this.handleGameStep();
                this.setState((prevState) => {
                    return (
                        {
                            generation: prevState.generation+1
                        }
                    );
                });
            }
            this.setLifespan();
        }, this.state.gameSpeed);
    }

    setGameBoard = () => {
        let board = [];
        for (let i=0; i < this.state.boardHeight; i++) {
            for (let j=0; j < this.state.boardWidth; j++) {
                board.push(this.setTileLife(this.state.gameBoard[i][j], [i,j]));
            }
        }

        return (
            <div className='game'>
                {board}
            </div>
        );
    }

    // When the component first mounts the game of life starts randomly with
    // around 30% of tiles alive
    initializeGame = () => {
        let gameBoard = [];
        for (let i=0; i < this.state.boardHeight; i++) {
            let gameBoardRow = [];
            for (let j=0; j < this.state.boardWidth; j++) {
                if (Math.random() < 0.3) {
                    gameBoardRow.push('alive');
                } else {
                    gameBoardRow.push('dead');
                }
            }
            gameBoard.push(gameBoardRow);
        }
        this.setState(() => ({ gameBoard }));
    }

    // Call the initialization of the board on page load as well as set
    // the game active
    componentWillMount() {
        this.initializeGame();
        this.setLifespan();
    }

    render() {
        return (
            <div>
                <div className='game-window'>
                    <div className='run-pause-bar'>
                        <div className='top-buttons'>
                            <button onClick={() => {this.runGame()}}>Run</button>
                            <button onClick={() => {this.pauseGame()}}>Pause</button>
                            <button onClick={() => {
                                this.pauseGame()
                                this.resetBoard()
                            }}>Clear</button>
                        </div>
                        <span className='generations'>
                            Generations: {this.state.generation}
                        </span>
                    </div>
                    <div className='game-play'>
                        {this.setGameBoard()}
                    </div>
                    <div className='bottom-bars'>
                        <div className='option-bar'>
                            <div className='option-bar-contents'>
                                <div className='option-bar-title'>
                                Speed
                                </div>
                                <div className='option-bar-buttons'>
                                    <button onClick={() => {this.setSlowSpeed()}}>Slow</button>
                                    <button onClick={() => {this.setMedSpeed()}}>Med</button>
                                    <button onClick={() => {this.setFastSpeed()}}>Fast</button>
                                </div>
                            </div>
                        </div>
                        <div className='preset-bar'>
                            <div className='preset-contents'>
                                <div className='top-presets'>
                                    <button>Pulsar</button>
                                    <button>Pentadecathlon</button>
                                    <button>Glider</button>
                                </div>
                                <div className='bottom-presets'>
                                    <button>Spaceship</button>
                                    <button>Glider gun</button>
                                    <button>Inifnite pattern</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}