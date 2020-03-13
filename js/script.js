const DOMvariables = (() => {
    const boardCont = document.querySelector(".boardCont");
    const settings = document.querySelector(".settings");
    const solo = document.querySelector(".solo");
    const pvp = document.querySelector(".pvp");
    const playerForm = document.querySelector(".playerForm");
    const playBtn = document.querySelector(".play");
    const p1name = document.querySelector(".p1name");
    const p1mark = document.querySelector(".p1mark");
    const p2name = document.querySelector(".p2name");
    const p2mark = document.querySelector(".p2mark");
    const endForm = document.querySelector(".endFormCont");
    const rematchLabel = document.querySelector(".rematchLabel");
    const menu = document.querySelector(".menu");
    const rematchBtn = document.querySelector(".rematch");
    const diffForm = document.querySelector(".difficulty");
    const easy = document.querySelector(".easy");
    const hard = document.querySelector(".hard");
    const soloForm = document.querySelector(".soloFormCont");
    const soloName = document.querySelector(".soloName");
    const soloMark = document.querySelector(".soloMark");
    const soloPlay = document.querySelector(".soloPlay");
    const soloBack = document.querySelector(".soloBack");
    const back = document.querySelector(".back");
    const diffBack = document.querySelector(".diffBack");
    const p1scoreCont = document.querySelector(".p1scoreCont");
    const p2scoreCont = document.querySelector(".p2scoreCont");
    const scoreCont = document.querySelector(".scoreCont");
    const p1score = document.querySelector(".p1score");
    const p2score = document.querySelector(".p2score");
    const score = document.querySelector(".score");

    return {
        boardCont,
        settings,
        solo,
        pvp,
        playerForm,
        playBtn,
        p1name,
        p1mark,
        p2name,
        p2mark,
        endForm,
        rematchLabel,
        menu,
        rematchBtn,
        diffForm,
        easy,
        hard,
        soloForm,
        soloName,
        soloMark,
        soloPlay,
        soloBack,
        back,
        diffBack,
        p1scoreCont,
        p2scoreCont,
        scoreCont,
        p1score,
        p2score,
        score
    };
})();

const gameBoard = (() => {
    
    let board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    const renderBoard = (board) => {
        DOMvariables.boardCont.style.visibility = "visible";
        for (let x = 0; x !== board.length; x++) {
            let newCell = document.createElement("span");
            DOMvariables.boardCont.appendChild(newCell);
            newCell.textContent = "";
            newCell.classList.add(`ttt${x + 1}`, "cell");
        }
    }
    
    const removeBoard = () => {
        while (DOMvariables.boardCont.firstChild) {
            DOMvariables.boardCont.removeChild(DOMvariables.boardCont.firstChild);
        }
    }

    return { board, renderBoard, removeBoard };
})();

const player = (name, mark, score) => {
    return { 
        name, 
        mark,
        score
    };
}

const forms = (() => {
    // These functions toggle forms or resets them
    const showPlayerForm = () => {
        if (DOMvariables.settings.style.visibility == "visible") {
            DOMvariables.settings.style.visibility = "hidden";
            DOMvariables.playerForm.style.visibility = "visible";
        } else {
            DOMvariables.settings.style.visibility = "visible";
            DOMvariables.playerForm.style.visibility = "hidden";
        }
    }
    const showEndForm = () => {
        if (DOMvariables.endForm.style.visibility == "visible") {
            DOMvariables.endForm.style.visibility = "hidden";
        } else if (game.drawCheck == true) {
            DOMvariables.rematchLabel.textContent = "Draw!";
            DOMvariables.endForm.style.visibility = "visible";
            DOMvariables.p1score.style.textDecoration = "none;";
            DOMvariables.p2score.style.textDecoration = "none;";
        } else if (game.turn == "p1") {    
            DOMvariables.rematchLabel.textContent = `${game.player1.name} wins!`;
            DOMvariables.p1score.style.textDecoration = "none;";
            DOMvariables.p2score.style.textDecoration = "none;";
            game.player1.score++;
            DOMvariables.score.textContent = `${game.player1.score}\xa0\xa0:\xa0\xa0${game.player2.score}`;
            DOMvariables.endForm.style.visibility = "visible";
        } else {
            DOMvariables.rematchLabel.textContent = `${game.player2.name} wins!`;
            DOMvariables.p1score.style.textDecoration = "none;";
            DOMvariables.p2score.style.textDecoration = "none;";
            game.player2.score++;
            DOMvariables.score.textContent = `${game.player1.score}\xa0\xa0:\xa0\xa0${game.player2.score}`;
            DOMvariables.endForm.style.visibility = "visible";
        }
    }
    const showDiffForm = () => {
        if (DOMvariables.diffForm.style.visibility == "visible") {
            DOMvariables.diffForm.style.visibility = "hidden";
        } else {
            DOMvariables.diffForm.style.visibility = "visible";
            DOMvariables.settings.style.visibility = "hidden";
        }
    }
    const showSoloForm = () => {
        if (DOMvariables.soloForm.style.visibility == "visible") {
            DOMvariables.soloForm.style.visibility = "hidden";
        } else {
            DOMvariables.soloForm.style.visibility = "visible";
        }
    }

    const resetForm = () => {
        DOMvariables.p1name.value = "";
        DOMvariables.p2name.value = "";
        DOMvariables.p1mark.value = "X";
        DOMvariables.p2mark.value = "O";
        DOMvariables.soloName.value = "";
        DOMvariables.soloMark.value = "X";
    }

    return {
        showPlayerForm,
        showEndForm,
        showDiffForm,
        showSoloForm,
        resetForm
    };
})();

const game = (() => {
    
    let draw = 0;
    let drawCheck = false;
    let mode = null;
    let turn = "p1"
    let player1 = player(null, null, 0);
    let player2 = player(null, null, 0);
    let end = false;
    let rematchCheck = false;

    // Reset all variables and show main menu
    const fullReset = () => {
        DOMvariables.score.textContent = "0\xa0\xa0:\xa0\xa00"
        DOMvariables.p1score.style.textDecoration = "none";
        DOMvariables.p2score.style.textDecoration = "none";
        game.player1.score = 0;
        game.player2.score = 0;
        forms.resetForm();
        gameBoard.removeBoard();
        game.turn = "p1";
        game.mode = null;
        game.drawCheck = false;
        game.draw = 0;
        game.end = false;
        gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        forms.showEndForm();
        forms.showPlayerForm();
        game.showScore();
    }
    
    const rematch = () => {
        // Swap who starts every rematch
        if (game.rematchCheck == false) {
            game.rematchCheck = true;
            game.turn = "p2";
        } else { 
            game.rematchCheck = false;
            game.turn = "p1";
        }
        
        // Reset variables
        game.end = false;
        game.drawCheck = false;
        game.draw = 0;
        gameBoard.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        forms.showEndForm();
        gameBoard.removeBoard();
        
        // Start new game based on what mode it is
        if (game.mode == "pvp") {
            startPvp();
            showScore();
            switchTurnDisplay();
        } else if (game.mode == "easy") {
            soloMode();
            showScore();
            switchTurnDisplay();
            if (game.turn == "p2") {
                setTimeout(function () {easyTurn()}, 1200);
            }
        } else if (game.mode == "hard") {
            soloMode();
            showScore();
            switchTurnDisplay();
            if (game.turn == "p2") {
                setTimeout(function () {hardTurn()}, 1200);
            }
        }
    }

    const soloMode = () => {
        // Make sure people enter a name
        if (DOMvariables.soloName.value == "") {
            alert("Please fill out names");
        } else if (DOMvariables.soloName.value.length > 18) {
            alert("Please keep names under 18 characters");
        } else {
            // Set variables and start game
            player1.name = DOMvariables.soloName.value;
            player1.mark = DOMvariables.soloMark.value;
            player2.name = "Computer";
            if (player1.mark == "X") {
                player2.mark = "O";
            } else {
                player2.mark = "X";
            }
            DOMvariables.soloForm.style.visibility = "hidden";
            gameBoard.renderBoard(gameBoard.board);
            showScore();
            attachCells();
        }
    }
    
    const easyTurn = () => {
        // Fills a random board cell
        if (game.end == false) {
            let freeCells = [];
            for (let x = 0; x < gameBoard.board.length; x++) {
                if (gameBoard.board[x] !== "X" && gameBoard.board[x] !== "O") {
                    freeCells.push(x);
                }
            }
            let PCturn = Math.floor(Math.random() * ((freeCells.length - 1) + 1));
            gameBoard.board[freeCells[PCturn]] = player2.mark;
            document.querySelector(`.ttt${freeCells[PCturn] + 1}`).textContent = player2.mark;
            game.draw++;
            checkWin();
            game.turn = "p1";
            game.switchTurnDisplay();
        }
    }

    const hardTurn = () => {
        // Makes the best move based on the minimax function
        if (game.end == false) {
            let bestMove = minimaxModule.minimax(gameBoard.board, player2.mark).index;
            gameBoard.board[bestMove] = player2.mark;
            document.querySelector(`.ttt${bestMove + 1}`).textContent = player2.mark;
            game.draw++;
            checkWin();
            game.turn = "p1";
            game.switchTurnDisplay();
        }
    }
    
    const startPvp = () => {
        // Sets mode, gets player nicknames, hides forms and starts game
        game.mode = "pvp";
        if (DOMvariables.p1name.value == "" || DOMvariables.p2name.value == "") {
            alert("Please fill out names");
        } else if (DOMvariables.p1name.value.length > 18 || DOMvariables.p2name.value.length > 18) {
            alert("Please keep names under 18 characters");
        } else {
            player1.name = DOMvariables.p1name.value;
            player2.name = DOMvariables.p2name.value;
            player1.mark = DOMvariables.p1mark.value;
            player2.mark = DOMvariables.p2mark.value;
            DOMvariables.settings.style.visibility = "hidden";
            DOMvariables.playerForm.style.visibility = "hidden";
            gameBoard.renderBoard(gameBoard.board);
            switchTurnDisplay();
            showScore();
            attachCells();
        }
    }

    const checkWin = () => {
        // Checks for wins and draws
        if (gameBoard.board[0] == "X" && gameBoard.board[1] == "X" && gameBoard.board[2] == "X" ||
            gameBoard.board[0] == "O" && gameBoard.board[1] == "O" && gameBoard.board[2] == "O" ||
            gameBoard.board[3] == "X" && gameBoard.board[4] == "X" && gameBoard.board[5] == "X" ||
            gameBoard.board[3] == "O" && gameBoard.board[4] == "O" && gameBoard.board[5] == "O" ||
            gameBoard.board[6] == "X" && gameBoard.board[7] == "X" && gameBoard.board[8] == "X" ||
            gameBoard.board[6] == "O" && gameBoard.board[7] == "O" && gameBoard.board[8] == "O" ||
            gameBoard.board[0] == "X" && gameBoard.board[3] == "X" && gameBoard.board[6] == "X" ||
            gameBoard.board[0] == "O" && gameBoard.board[3] == "O" && gameBoard.board[6] == "O" ||
            gameBoard.board[1] == "X" && gameBoard.board[4] == "X" && gameBoard.board[7] == "X" ||
            gameBoard.board[1] == "O" && gameBoard.board[4] == "O" && gameBoard.board[7] == "O" ||
            gameBoard.board[2] == "X" && gameBoard.board[5] == "X" && gameBoard.board[8] == "X" ||
            gameBoard.board[2] == "O" && gameBoard.board[5] == "O" && gameBoard.board[8] == "O" ||
            gameBoard.board[0] == "X" && gameBoard.board[4] == "X" && gameBoard.board[8] == "X" ||
            gameBoard.board[0] == "O" && gameBoard.board[4] == "O" && gameBoard.board[8] == "O" ||
            gameBoard.board[2] == "X" && gameBoard.board[4] == "X" && gameBoard.board[6] == "X" ||
            gameBoard.board[2] == "O" && gameBoard.board[4] == "O" && gameBoard.board[6] == "O") {

            forms.showEndForm();
            game.end = true;

        } else if (game.draw == 9) {
            
            game.drawCheck = true;
            forms.showEndForm();
            game.end = true;
        }
    }

    const switchTurnDisplay = () => {
        // Shows whose turn it is
        if (game.turn == "p1") {
            DOMvariables.p1score.style.textDecoration = "underline";
            DOMvariables.p2score.style.textDecoration = "none";
        } else {
            DOMvariables.p2score.style.textDecoration = "underline";
            DOMvariables.p1score.style.textDecoration = "none";
        }
    }

    const showScore = () => {
        // Toggles score display
        if (DOMvariables.p1scoreCont.style.visibility == "visible" && DOMvariables.p2scoreCont.style.visibility == "visible" &&
            DOMvariables.scoreCont.style.visibility == "visible") {
                DOMvariables.p1scoreCont.style.visibility = "hidden";
                DOMvariables.p2scoreCont.style.visibility = "hidden";
                DOMvariables.scoreCont.style.visibility = "hidden";
        } else {
            DOMvariables.p1scoreCont.style.visibility = "visible";
            DOMvariables.p2scoreCont.style.visibility = "visible";
            DOMvariables.scoreCont.style.visibility = "visible";
            DOMvariables.p1score.textContent = player1.name;
            DOMvariables.p2score.textContent = player2.name;
        }
    }

    const attachCells = () => {
        // Attaches listeners to board cells
        let cells = document.querySelectorAll(".cell");
            cells.forEach((cell) => {
                cell.addEventListener("click", () => {
                    if (game.end == false) {
                        if (gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] !== "X" &&
                        gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] !== "O") {    
                            if (game.mode == "pvp") {    
                                if (game.turn == "p1") {
                                    cell.textContent = game.player1.mark;
                                    gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] = game.player1.mark;
                                    game.draw++;
                                    game.checkWin();
                                    game.turn = "p2";
                                    game.switchTurnDisplay();
                                } else {
                                    cell.textContent = game.player2.mark;
                                    gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] = game.player2.mark;
                                    game.draw++;
                                    game.checkWin();
                                    game.turn = "p1"
                                    game.switchTurnDisplay();
                                }
                            } else if (game.mode == "easy") {
                                if (game.turn == "p1") {
                                    cell.textContent = game.player1.mark;
                                    gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] = game.player1.mark;
                                    game.draw++;
                                    game.checkWin();
                                    game.turn = "p2";
                                    game.switchTurnDisplay();
                                    if (game.end == false) setTimeout(function () {game.easyTurn()}, 1200);
                                }
                            } else if (game.mode == "hard") {
                                if (game.turn == "p1") {
                                    cell.textContent = game.player1.mark;
                                    gameBoard.board[parseInt(cell.classList.item(0)[3]) - 1] = game.player1.mark;
                                    game.draw++;
                                    game.checkWin();
                                    game.turn = "p2";
                                    game.switchTurnDisplay();
                                    if (game.end == false) setTimeout(function () {game.hardTurn()}, 1200);
                                }
                            }
                        }
                    }
                });
            });
    }
    
    const attachListeners = () => {
        // Attaches listeners to buttons
        DOMvariables.solo.addEventListener("click", () => {
            forms.showDiffForm();
        });
        DOMvariables.pvp.addEventListener("click", () => {
            forms.showPlayerForm();
            switchTurnDisplay();
        });
        
        DOMvariables.playBtn.addEventListener("click", () => {
            startPvp();
        });
        
        DOMvariables.menu.addEventListener("click", () => {
            fullReset();
        });

        DOMvariables.rematchBtn.addEventListener("click", () => {
            rematch();
        });

        DOMvariables.easy.addEventListener("click", () => {
            game.mode = "easy";
            forms.showDiffForm();
            forms.showSoloForm();
        });

        DOMvariables.hard.addEventListener("click", () => {
            game.mode = "hard";
            forms.showDiffForm();
            forms.showSoloForm();
        });

        DOMvariables.soloPlay.addEventListener("click", () => {
            soloMode();
            switchTurnDisplay();
        });

        DOMvariables.p1mark.addEventListener("click", () => {
            if (DOMvariables.p1mark.value == "X") {
                DOMvariables.p1mark.value = "O";
                DOMvariables.p2mark.value = "X"
            } else {
                DOMvariables.p1mark.value = "X";
                DOMvariables.p2mark.value = "O";
            }
        });

        DOMvariables.p2mark.addEventListener("click", () => {
            if (DOMvariables.p2mark.value == "X") {
                DOMvariables.p2mark.value = "O";
                DOMvariables.p1mark.value = "X";
            } else {
                DOMvariables.p2mark.value = "X";
                DOMvariables.p1mark.value = "O";
            }
        });

        DOMvariables.soloMark.addEventListener("click", () => {
            if (DOMvariables.soloMark.value == "X") {
                DOMvariables.soloMark.value = "O";
            } else {
                DOMvariables.soloMark.value = "X";
            }
        });

        DOMvariables.soloBack.addEventListener("click", () => {
            forms.resetForm();
            game.mode = null;
            forms.showDiffForm();
            forms.showSoloForm();
        });

        DOMvariables.back.addEventListener("click", () => {
            forms.showPlayerForm
    ();
        });

        DOMvariables.diffBack.addEventListener("click", () => {
            DOMvariables.settings.style.visibility = "visible";
            forms.showDiffForm();
        })
    }
    return {
        fullReset,
        startPvp,
        attachListeners,
        player1,
        player2,
        checkWin,
        attachCells,
        easyTurn,
        hardTurn,
        end,
        mode,
        rematchCheck,
        drawCheck,
        draw,
        turn,
        showScore,
        switchTurnDisplay
    };
})();

const minimaxModule = (() => {
    
    //keeps count of function calls
    let fc = 0;

    // the main minimax function
    function minimax(newBoard, player) {
        //add one to function calls
        fc++;
    
        //available spots
        let availSpots = emptyIndexies(newBoard);

        // checks for the terminal states such as win, lose, and tie and returning a value accordingly
        if (winning(newBoard, game.player1.mark)) {
            return {score: -10};
        } else if (winning(newBoard, game.player2.mark)) {
            return {score: 10};
        } else if (availSpots.length === 0) {
            return {score: 0};
        }

        // an array to collect all the objects
        let moves = [];

        // loop through available spots
        for (let i = 0; i < availSpots.length; i++) {
            //create an object for each and store the index of that spot that was stored as a number in the object's index key
            let move = {};
            move.index = newBoard[availSpots[i]];

            // set the empty spot to the current player
            newBoard[availSpots[i]] = player;

            //if collect the score resulted from calling minimax on the opponent of the current player
            if (player == game.player2.mark) {
                let result = minimax(newBoard, game.player1.mark);
                move.score = result.score;
            } else {
                let result = minimax(newBoard, game.player2.mark);
                move.score = result.score;
            }

            //reset the spot to empty
            newBoard[availSpots[i]] = move.index;

            // push the object to the array
            moves.push(move);
        }

        // if it is the computer's turn loop over the moves and choose the move with the highest score
        let bestMove;
        if( player === game.player2.mark) {
            let bestScore = -10000;
            for(let i = 0; i < moves.length; i++) {
                if(moves[i].score > bestScore){
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
        // else loop over the moves and choose the move with the lowest score
            let bestScore = 10000;
            for(let i = 0; i < moves.length; i++) {
                if(moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }

        // return the chosen move (object) from the array to the higher depth
        return moves[bestMove];
    }

    // returns the available spots on the board
    function emptyIndexies(board) {
        let availableSpots = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] != "X" && board[i] != "O") availableSpots.push(board[i]);
        }
        return availableSpots;
    }

    // winning combinations using the board indexies for instace the first win could be 3 xes in a row
    function winning(board, player){ 
        if (
            (board[0] == player && board[1] == player && board[2] == player) ||
            (board[3] == player && board[4] == player && board[5] == player) ||
            (board[6] == player && board[7] == player && board[8] == player) ||
            (board[0] == player && board[3] == player && board[6] == player) ||
            (board[1] == player && board[4] == player && board[7] == player) ||
            (board[2] == player && board[5] == player && board[8] == player) ||
            (board[0] == player && board[4] == player && board[8] == player) ||
            (board[2] == player && board[4] == player && board[6] == player)
            ) {
            return true;
        } else {
            return false;
        }
    }

    return {minimax}
})();

game.attachListeners();
