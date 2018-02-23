var five = require("johnny-five");
const question = require('./questions.json');

var board = new five.Board({
    port: "COM3",
    repl: false
});

var buttonPressed;
var rightAnswer = question.rightAnswer;
console.log(question.question);
console.log("A) " + question.alternative1);
console.log("B) " + question.alternative2);
console.log("C) " + question.alternative3);

board.on("ready", function () {

    var lcd = new five.LCD({
        pins: [7, 8, 9, 10, 11, 12],
        backlight: 13,
    });

    lcd.cursor(0,0);
    lcd.autoscroll().print("Bloop").print("asdfasdfadsfsaadfasdf");
    lcd.cursor(1,0);
    lcd.autoscroll().print("Bloop").print("asdfasdfadsfsaadfasdf");

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
        console.log(question.alternative1);
        buttonPressed = question.alternative1;
        isRightAnswer();
    });

    button6.on("down", function () {
        console.log(question.alternative2);
        buttonPressed = question.alternative2;
        isRightAnswer();
    });


    button5.on("down", function () {
        console.log(question.alternative3);
        buttonPressed = question.alternative3;
        isRightAnswer();
    });

});

function isRightAnswer() {
    if (buttonPressed == rightAnswer) {
        console.log("Resposta correta")
    }
    else {
        console.log("Resposta errada")
    }
}