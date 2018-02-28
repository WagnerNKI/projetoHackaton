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

var date = new Date();

var timeSinceshowed;
var givenAnswer;
var rightAnswer = question.rightAnswer;
var questionShow = question.question;
var alternativas = _.chain(prefixos)
    .zip(question.alternativas)
    .map(function (prefixoComAlternativa) {
        return prefixoComAlternativa.join(") ")
    }).value();

console.log(questionShow);
console.log(alternativas[0]);
console.log(alternativas[1]);
console.log(alternativas[2]);
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
        console.log(alternativas[0]);
        givenAnswer = alternativas[0];
        isRightAnswer();
    });

    button5.on("down", function () {
        console.log(alternativas[1]);
        givenAnswer = alternativas[1];
        isRightAnswer();
    });


    button4.on("down", function () {
        console.log(alternativas[2]);
        givenAnswer = alternativas[2];
        isRightAnswer();
    });

    lcd = new five.LCD({
        pins: [7, 8, 9, 10, 11, 12],
        rows: 2,
        cols: 16
    });

    scroll.setup({
        lcd: lcd,
        lastcharduration: 2000,
        scrollingDuration: 800,
        full: false
    });

    mostrarAlternativas();
    timeSinceShowed = date.now;
});

function mostrarAlternativas() {
    scroll.line(0, questionShow);
    var textoAlternativas = alternativas.join(" ");
    scroll.line(1, textoAlternativas);
}


function isRightAnswer() {

    var answer;
    switch (givenAnswer) {

        case alternativas[0]:
            answer = question.alternativas[0];
            break;

        case alternativas[1]:
            answer = question.alternativas[1];
            break;

        case alternativas[2]:
            answer = question.alternativas[2];
            break;
    };

    if (answer == rightAnswer) {
        console.log("Resposta correta");
        scroll.line(1, "Resposta correta");
        var now = date.now;
        var tempo = (now - timeSinceShowed)/(1000);
        console.log(tempo +" segundos");
    }
    else {
        console.log("Resposta errada");
        scroll.line(1, "Resposta errada");
        setTimeout(mostrarAlternativas, 3000);
    }
}