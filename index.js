var five = require("johnny-five");

var board = new five.Board({
    port: "COM3"
});

var buttonPressed;

board.on("ready", function () {

    button7 = new five.Button({
        pin: 7,
        isPullup: true
    });

    button6 = new five.Button({
        pin: 6,
        isPullup: true
    });


    button5 = new five.Button({
        pin: 5,
        isPullup: true
    });

    button7.on("down", function () {
        console.log("7");
        buttonPressed = 7;
    });

    button6.on("down", function () {
        console.log("6");
        buttonPressed = 6;
    });


    button5.on("down", function () {
        console.log("5");
        buttonPressed = 5;
    });

});