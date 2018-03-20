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

    setPulsar = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[17][27] = 'alive'; gameBoard[17][41] = 'alive';
            gameBoard[17][28] = 'alive'; gameBoard[17][40] = 'alive';
            gameBoard[17][29] = 'alive'; gameBoard[17][39] = 'alive';
            gameBoard[18][29] = 'alive'; gameBoard[18][39] = 'alive';
            gameBoard[18][31] = 'alive'; gameBoard[18][37] = 'alive';
            gameBoard[19][31] = 'alive'; gameBoard[19][37] = 'alive';
            gameBoard[19][32] = 'alive'; gameBoard[19][36] = 'alive';
            gameBoard[18][33] = 'alive'; gameBoard[18][35] = 'alive';
            gameBoard[17][33] = 'alive'; gameBoard[17][35] = 'alive';
            gameBoard[17][32] = 'alive'; gameBoard[17][36] = 'alive';
            gameBoard[15][32] = 'alive'; gameBoard[15][36] = 'alive';
            gameBoard[15][31] = 'alive'; gameBoard[15][37] = 'alive';
            gameBoard[14][31] = 'alive'; gameBoard[14][37] = 'alive';
            gameBoard[13][31] = 'alive'; gameBoard[13][37] = 'alive';
            gameBoard[23][27] = 'alive'; gameBoard[23][41] = 'alive';
            gameBoard[23][28] = 'alive'; gameBoard[23][40] = 'alive';
            gameBoard[23][29] = 'alive'; gameBoard[23][39] = 'alive';
            gameBoard[22][29] = 'alive'; gameBoard[22][39] = 'alive';
            gameBoard[22][31] = 'alive'; gameBoard[22][37] = 'alive';
            gameBoard[21][31] = 'alive'; gameBoard[21][37] = 'alive';
            gameBoard[21][32] = 'alive'; gameBoard[21][36] = 'alive';
            gameBoard[22][33] = 'alive'; gameBoard[22][35] = 'alive';
            gameBoard[23][33] = 'alive'; gameBoard[23][35] = 'alive';
            gameBoard[23][32] = 'alive'; gameBoard[23][36] = 'alive';
            gameBoard[25][32] = 'alive'; gameBoard[25][36] = 'alive';
            gameBoard[25][31] = 'alive'; gameBoard[25][37] = 'alive';
            gameBoard[26][31] = 'alive'; gameBoard[26][37] = 'alive';
            gameBoard[27][31] = 'alive'; gameBoard[27][37] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setPentadecathlon = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[14][35] = 'alive';
            gameBoard[15][35] = 'alive';
            gameBoard[16][34] = 'alive';
            gameBoard[16][36] = 'alive';
            gameBoard[17][35] = 'alive';
            gameBoard[18][35] = 'alive';
            gameBoard[19][35] = 'alive';
            gameBoard[20][35] = 'alive';
            gameBoard[21][34] = 'alive';
            gameBoard[21][36] = 'alive';
            gameBoard[22][35] = 'alive';
            gameBoard[23][35] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setGlider = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[1][2] = 'alive';
            gameBoard[2][3] = 'alive';
            gameBoard[3][1] = 'alive';
            gameBoard[3][2] = 'alive';
            gameBoard[3][3] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setSpaceship = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[21][2] = 'alive';
            gameBoard[19][2] = 'alive';
            gameBoard[18][3] = 'alive';
            gameBoard[18][4] = 'alive';
            gameBoard[18][5] = 'alive';
            gameBoard[18][6] = 'alive';
            gameBoard[19][6] = 'alive';
            gameBoard[20][6] = 'alive';
            gameBoard[21][5] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setGliderGun = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[5][1] = 'alive'; gameBoard[3][35] = 'alive'; 
            gameBoard[6][1] = 'alive'; gameBoard[3][36] = 'alive';
            gameBoard[6][2] = 'alive'; gameBoard[4][36] = 'alive';
            gameBoard[5][2] = 'alive'; gameBoard[4][35] = 'alive';
            gameBoard[5][11] = 'alive'; gameBoard[5][21] = 'alive';
            gameBoard[6][11] = 'alive'; gameBoard[4][21] = 'alive';
            gameBoard[7][11] = 'alive'; gameBoard[3][21] = 'alive';
            gameBoard[8][12] = 'alive'; gameBoard[3][22] = 'alive';
            gameBoard[9][13] = 'alive'; gameBoard[4][22] = 'alive';
            gameBoard[9][14] = 'alive'; gameBoard[5][22] = 'alive';
            gameBoard[8][16] = 'alive'; gameBoard[6][23] = 'alive';
            gameBoard[7][17] = 'alive'; gameBoard[2][23] = 'alive';
            gameBoard[6][17] = 'alive'; gameBoard[1][25] = 'alive';
            gameBoard[5][17] = 'alive'; gameBoard[2][25] = 'alive';
            gameBoard[6][15] = 'alive'; gameBoard[6][25] = 'alive';
            gameBoard[6][18] = 'alive'; gameBoard[7][25] = 'alive';
            gameBoard[4][16] = 'alive';
            gameBoard[3][14] = 'alive';
            gameBoard[3][13] = 'alive';
            gameBoard[4][12] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setDieHard = () => {
        this.resetBoard();
        this.pauseGame();
        setTimeout(() => { // ensure the previous states have been set so board is clear
            let gameBoard = this.state.gameBoard;
            gameBoard[18][31] = 'alive';
            gameBoard[18][32] = 'alive';
            gameBoard[19][32] = 'alive';
            gameBoard[19][36] = 'alive';
            gameBoard[19][37] = 'alive';
            gameBoard[19][38] = 'alive';
            gameBoard[17][37] = 'alive';
            this.setState(() => ({ gameBoard }));
        }, 100);
    }

    setLifespan = () => {
        setTimeout(() => { // setTimeout() is needed instead of setInterval() to update speed
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

    // adjust speed in setLifespan()
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
                                    <button onClick={() => {this.setPulsar()}}>Pulsar</button>
                                    <button onClick={() => {this.setPentadecathlon()}}>Pentadecathlon</button>
                                    <button onClick={() => {this.setGlider()}}>Glider</button>
                                </div>
                                <div className='bottom-presets'>
                                    <button onClick={() => {this.setSpaceship()}}>Spaceship</button>
                                    <button onClick={() => {this.setGliderGun()}}>Glider gun</button>
                                    <button onClick={() => {this.setDieHard()}}>Die hard</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}