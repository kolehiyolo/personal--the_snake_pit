// The state of this boolean determines if logging the gameStarted() events is permitted
var enableLogGameStarted = true;

var row =49;
var col =49;

function setGameStarted() {
    console.log("Player 1's Chosen Snake = " + player1.chooseSnake);
    console.log("Player 2's Chosen Snake = " + player2.chooseSnake);
    console.log("\n");

    player1.gameSnake = player1.chooseSnake;
    player2.gameSnake = player2.chooseSnake;

    console.log("Player 1's Active Snake = " + player1.gameSnake);
    console.log("Player 2's Active Snake = " + player2.gameSnake);
    console.log("\n");

    // FIX ME
    // p1InitSnake(row, col);
    // p2InitSnake(row, col);

    setGrid(row, col);
    setTimeout(function () {
        setFood("1");
        setFood("2");
        setFood("3");
        setFood("super");

        setSnakes(1);
        setSnakes(2);
        // setSnakes(1);
    }, 1000);

    // BUILD
    // The game should automatically start a "Ready... Fight!" sequence upon showing up
}

function logGameStarted() {
    var logEvent;
    if (keyType != undefined && enableLogGameChoose === true) {
        switch (keyType) {
            case "misc":
                switch (activePlayer.activeMisc) {
                    case "aux":
                        break;
                    case "exit":
                        break;
                }
                break;
            case "ability":
                switch (activePlayer.activeAbility) {
                    case 0:
                        logEvent = "'Strike'";
                        break;
                    case 1:
                        logEvent = "'Ability 1'";
                        break;
                    case 2:
                        logEvent = "'Ability 2'";
                        break;
                }
                break;
            case "direction":
                logEvent = "Go '" + activePlayer.direction + "'";
                break;
        }

        console.log("----gameStarted: Player " + activePlayer.playerNumber + " -> '" + key + "' = " + logEvent);
    }
}

function setGrid(row, col) {
    console.log("activated addGrid()");
    for (var i = 1; i <= row; i++) { // This first layer of the nest adds the rows
        $("#game-arena").append("<div id='r" + i + "' class='row'></div>");
        for (var j = 1; j <= col; j++) { // This second layer adds the column cells for each row
            $("#r" + i).append("<div id='r" + i + "c" + j + "' class='col'></div>");
        }
    }

}

function setSnakes(activePlayerNumber) {
    // FIX
    // This is to be used to set the Snakes on the Game Board
    // I also intend on adding a "respawn" mechanic, which will probably use the same method this one does
    // This replaces p1InitSnake() and p2Initsnake()

    switch (activePlayerNumber) {
        case 1:
            player1.startedCoordinate[0][0] = Math.floor(row / 4);
            player1.startedCoordinate[0][1] = Math.floor(col / 4);
            $("#r" + player1.startedCoordinate[0][0] + "c" + player1.startedCoordinate[0][1]).addClass("player1-snake-head");
            console.log( "#r" + player1.startedCoordinate[0][0] + "c" + player1.startedCoordinate[0][1] ) ; 
            break;
        case 2:
            player2.startedCoordinate[0][0] = Math.ceil(row - row / 4) + 1;
            player2.startedCoordinate[0][1] = Math.ceil(col - col / 4) + 1;
            $("#r" + player2.startedCoordinate[0][0] + "c" + player2.startedCoordinate[0][1]).addClass("player2-snake-head");
            console.log( "#r" + player2.startedCoordinate[0][0] + "c" + player2.startedCoordinate[0][1] ) ; 
            break;
    }
}

function setFood(food) {
    var activeFood = {
        number: food,
        coordinate: [undefined, undefined]
    };

    activeFood.coordinate[0] = Math.floor((Math.random() * row) + 1);
    activeFood.coordinate[1] = Math.floor((Math.random() * col) + 1);

    $(".food-" + activeFood.number).removeClass("food-" + activeFood.number);
    $("#r" + activeFood.coordinate[0] + "c" + activeFood.coordinate[1]).addClass("food-" + activeFood.number);
}

function gameStarted() {
    // The following commands are triggered when a miscellaneous key is pressed
    if (keyType === "misc") {
        switch (activePlayer.activeMisc) {
            // BUILD
            // The Aux and Exit keys should serve as Pause/Resume buttons
            // When paused, the Aux key will Resume the game
            // -Both players must press their Aux key to set themselves ready before the game resumes
            // When paused, the Exit key will Exit the game and direct to gameChoose
            // -Both players must press their Exit key to set themselves ready before going back to the Selection Screen

            case "aux":
            case "exit":
                break;
        }
    }

    // The following commands are triggered when a directional key is pressed
    else if (keyType === "direction") {
        // BUILD
        // The directional keys direct the movement of the snakes
        // The snake must not be able to go on the opposite direction without turning first
        // -For example, if they're going left, they can't go right without going up or down first
        // If the snake crashes onto the edge of the arena or onto their own body or the enemy's or a dead body, they lose
    }

    // The following commands are triggered when an ability key is pressed
    else if (keyType === "ability") {
        switch (activePlayer.activeAbility) {
            // BUILD
            // The ability keys will trigger the snake's abilities (duh) 
            // The first ability key by default activates Strike, which is the same across all the snakes
            // The other 2 will trigger abilities, and each snake has 2 unique abilities, unless the ability is passive
            // The active abilities have cooldowns and duration
            case 0:
                break;
            case 1:
                break;
            case 2:
                break;
        }
    }

    logGameStarted();
}