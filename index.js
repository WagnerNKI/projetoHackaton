var five = require("johnny-five");
const question = require('./questions');
const scroll = require("lcd-scrolling");
const _ = require("lodash");
var lcd;

var board = new five.Board({
    port: "COM3",
    repl: false,
});
var prefixos = [
    "A",
    "B",
    "C"
]

var givenAnswer;
var rightAnswer = question.rightAnswer;
var questionShow = question.question;
var alternativas  = _.chain(prefixos)
    .zip(question.alternativas)
    .map(function(prefixoComAlternativa) {
        return prefixoComAlternativa.join(") ")
    }).value();

console.log(questionShow);
console.log(alternative1);
console.log(alternative2);
console.log(alternative3);
console.log("Resposta:");

board.on("ready", function () {

    button6 = new five.Button({
        pin: 6,
        isPullup: true
    });

    button5 = new five.Button({
        pin: 5,
        isPullup: true
    });

    button4 = new five.Button({
        pin: 4,
        isPullup: true
    });

    button6.on("down", function () {
        console.log(alternative1);
        givenAnswer = alternative1;
        isRightAnswer();
    });

    button5.on("down", function () {
        console.log(alternative2);
        givenAnswer = alternative2;
        isRightAnswer();
    });


    button4.on("down", function () {
        console.log(alternative3);
        givenAnswer = alternative3;
        isRightAnswer();
    });

    lcd = new five.LCD({
        pins: [7, 8, 9, 10, 11, 12],
        rows: 2,
        cols: 16
    });

    scroll.setup({
        lcd: lcd,
    });

    mostrarAlternativas();
});

function mostrarAlternativas() {
    scroll.line(0, questionShow);
    var textoAlternativas = alternativas.join(" ");
    scroll.line(1, textoAlternativas);
}


function isRightAnswer() {

    var answer;
    switch (givenAnswer) {

        case alternative1:
            answer = question.alternative1;
            break;

        case alternative2:
            answer = question.alternative2;
            break;

        case alternative3:
            answer = question.alternative3;
            break;
    };

    if (answer == rightAnswer) {
        console.log("Resposta correta");
        scroll.line(1, "Resposta correta");
    }
    else {
        console.log("Resposta errada");
        scroll.line(1, "Resposta errada");
        setTimeout(mostrarAlternativas, 2000);
    }
}