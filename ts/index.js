var BTNSRC = '↑↓←→C';
var level = document.querySelector('#level');
var up = document.querySelector('#up');
var down = document.querySelector('#down');
var left = document.querySelector('#left');
var right = document.querySelector('#right');
var center = document.querySelector('#center');
var pattern = document.querySelector('#pattern');
var time = document.querySelector('#time');
var gameStatus = document.querySelector('#game-status');
var btnInput = -1;
var stage = [];
var start = document.querySelector('#start-retry-button');
var levelnum = 0; // determine the number of arrows while level goes up
var nickname = 'Anonymous';
// getting nickname after player enter it
function getNickname() {
    nickname = document.getElementById('nickname').value;
}
// send pattern to html pattern display element
function outputStage(stage) {
    var ret = '';
    for (var i = 0; i < stage.length; i++) {
        ret += BTNSRC.charAt(stage[i]);
    }
    return ret;
}
// generate pattern
function setStage() {
    stage = [];
    for (var i = 0; i < 10 + levelnum * 3; i++) {
        stage.push(Math.floor(Math.random() * 5));
    }
}
// save ranking data into localstorage
function saveInfo(saveData) {
    load = localStorage.getItem('ranking');
    var loadData = [];
    if (!(load == null)) {
        var ObjLoad = JSON.parse(load);
        for (var i = 0; i < ObjLoad.length; i++)
            loadData.push(ObjLoad[i]);
    }
    loadData.push(saveData);
    loadData.sort(function (a, b) {
        return b.Sscore - a.Sscore;
    });
    var ret = JSON.stringify(loadData);
    localStorage.setItem('ranking', ret);
}
// after entering nickname and press start button, the game starts
start.addEventListener('click', function () {
    var score = 0;
    gameStatus.innerHTML = score + '';
    levelnum = 0;
    pattern.innerHTML = '';
    stage = [];
    start.style.display = 'none';
    document.querySelector('#status-container').style.display = '';
    document.querySelector('#game-play').style.display = '';
    document.querySelector('#nickname').style.display = 'none';
    var limit = 45;
    var sec = 0;
    var interval = setInterval(function () {
        gameStatus.innerHTML = score + '';
        sec += 0.1;
        time.innerHTML = limit - Math.floor(sec) + 's';
        if (limit <= sec) {
            clearInterval(interval);
            pattern.innerHTML = 'GAMEOVER';
            start.innerHTML = 'RETRY';
            start.style.display = '';
            saveInfo({
                Snickname: nickname,
                Slevel: levelnum + '',
                Sscore: score + '',
            });
        }
        // obtain score when level up and pattern display
        if (stage.length == 0) {
            score += levelnum * 500;
            levelnum++;
            setStage();
            level.innerHTML = 'level ' + levelnum;
            pattern.innerHTML = outputStage(stage);
        }
        // obtain score when press correct button and pattern display
        if (stage[0] === btnInput) {
            btnInput = -1;
            score += 10;
            stage.shift();
            pattern.innerHTML = outputStage(stage);
            document.getElementById('pattern').classList.add('correct-ans');
        }
        else {
            document.getElementById('pattern').classList.remove('correct-ans');
        }
        document.body.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 38: // up
                    btnInput = 0;
                    break;
                case 40: // down
                    btnInput = 1;
                    break;
                case 37: // left
                    btnInput = 2;
                    break;
                case 39: // right
                    btnInput = 3;
                    break;
                case 32: // C, space
                    btnInput = 4;
                    break;
            }
        });
        up.addEventListener('click', function () {
            btnInput = 0;
        });
        down.addEventListener('click', function () {
            btnInput = 1;
        });
        left.addEventListener('click', function () {
            btnInput = 2;
        });
        right.addEventListener('click', function () {
            btnInput = 3;
        });
        center.addEventListener('click', function () {
            btnInput = 4;
        });
    }, 100);
});
