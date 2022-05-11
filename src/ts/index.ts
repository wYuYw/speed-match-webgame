const BTNSRC: string = '↑↓←→C';

const level: HTMLElement = document.querySelector('#level');
const up: HTMLElement = document.querySelector('#up');
const down: HTMLElement = document.querySelector('#down');
const left: HTMLElement = document.querySelector('#left');
const right: HTMLElement = document.querySelector('#right');
const center: HTMLElement = document.querySelector('#center');
const pattern: HTMLElement = document.querySelector('#pattern');
const time: HTMLElement = document.querySelector('#time');
const gameStatus: HTMLElement = document.querySelector('#game-status');

let btnInput: number = -1;
let stage: number[] = [];
let start: HTMLElement = document.querySelector('#start-retry-button');
let levelnum: number = 0; // determine the number of arrows while level goes up
let nickname: string = 'Anonymous';

// for data parsed from localstorage
interface LoadedObj {
  Snickname: string; // nickname of player
  Slevel: string; // reached level
  Sscore: string; // score of player
}

// getting nickname after player enter it
function getNickname(): void {
  nickname = (document.getElementById('nickname') as HTMLInputElement).value;
}

// send pattern to html pattern display element
function outputStage(stage: number[]): string {
  let ret: string = '';
  for (let i = 0; i < stage.length; i++) {
    ret += BTNSRC.charAt(stage[i]);
  }
  return ret;
}

// generate pattern
function setStage(): void {
  stage = [];
  for (let i = 0; i < 10 + levelnum * 3; i++) {
    stage.push(Math.floor(Math.random() * 5));
  }
}

// save ranking data into localstorage
function saveInfo(saveData: Rank) {
  load = localStorage.getItem('ranking');
  let loadData = [];
  if (!(load == null)) {
    let ObjLoad: LoadedObj[] = JSON.parse(load);
    for (let i = 0; i < ObjLoad.length; i++) loadData.push(ObjLoad[i]);
  }
  loadData.push(saveData);
  loadData.sort(function (a, b) {
    return b.Sscore - a.Sscore;
  });
  let ret: string = JSON.stringify(loadData);
  localStorage.setItem('ranking', ret);
}

// after entering nickname and press start button, the game starts
start.addEventListener('click', function () {
  let score: number = 0;
  gameStatus.innerHTML = score + '';
  levelnum = 0;
  pattern.innerHTML = '';
  stage = [];
  start.style.display = 'none';
  (document.querySelector('#status-container') as HTMLElement).style.display = '';
  (document.querySelector('#game-play') as HTMLElement).style.display = '';
  (document.querySelector('#nickname') as HTMLElement).style.display = 'none';
  let limit: number = 45;
  let sec: number = 0;
  let interval = setInterval(function () {
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
      (document.getElementById('pattern') as HTMLElement).classList.add('correct-ans');
    } else {
      (document.getElementById('pattern') as HTMLElement).classList.remove('correct-ans');
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
