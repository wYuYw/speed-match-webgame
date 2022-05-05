const BTNSRC = "↑↓←→C";

let level = document.querySelector("#level");
let up = document.querySelector("#up");
let down = document.querySelector("#down");
let left = document.querySelector("#left");
let right = document.querySelector("#right");
let center = document.querySelector("#center");
let pattern = document.querySelector("#pattern");
let time = document.querySelector("#time");
let status = document.querySelector("#status");
let btnInput = -1;
let stage = [];
let start = document.querySelector("#start-retry-button");
let levelnum = 0; //스테이지상 화살표 갯수
let nickname = "Unknown";

function getNickname(){
    nickname = document.getElementById("nickname").value;
}

function outputStage(stage){ // 배열을 html으로 보내주는 함수
    let ret = "";
    for (let i = 0; i < stage.length; i++){
        ret += BTNSRC.charAt(stage[i]);
    }
    return ret;
}

function setStage(){
    stage = [];
    for (let i = 0; i < 10 + (levelnum * 3); i++){
        stage.push(Math.floor(Math.random() * 5));
    }
}

function saveInfo(saveData){
    load = localStorage.getItem("ranking");
    let loadData = [];
    if (!(load == null)){
        let ObjLoad = JSON.parse(load);
        for (let i = 0; i < ObjLoad.length; i++)
            loadData.push(ObjLoad[i]);
    }
    loadData.push(saveData);
    loadData.sort(function(a, b) {
        return b.Sscore - a.Sscore;
    })
    let ret = JSON.stringify(loadData);
    localStorage.setItem("ranking", ret);
}

start.addEventListener("click", function(){
    let score = 0;
    status.innerHTML = score;
    levelnum = 0;
    pattern.innerHTML = "";
    stage = [];
    start.style.display = "none";
    document.querySelector("#status-container").style.display = ""
    document.querySelector("#game-play").style.display = ""
    document.querySelector("#nickname").style.display = "none";
    let limit = 45;
    let sec = 0;
    let interval = setInterval(function(){
        status.innerHTML = score;
        sec += 0.1;
        time.innerHTML = (limit - Math.floor(sec)) + "s";
        if (limit <= sec){
            clearInterval(interval);
            pattern.innerHTML = "GAMEOVER";
            start.innerHTML = "RETRY";
            start.style.display = "";
            saveInfo({Snickname : nickname, Slevel : levelnum + "", Sscore : score + ""});
        }
        if (stage.length == 0){
            score += levelnum * 500;
            levelnum++;
            setStage();
            level.innerHTML = "level " + levelnum;
            pattern.innerHTML = outputStage(stage);
        }
        if (stage[0] === btnInput){
            btnInput = -1;
            score += 10;
            stage.shift();
            pattern.innerHTML = outputStage(stage);
        }
        document.body.addEventListener("keydown", function(){
            switch(event.keyCode){
                case 38: //상단
                    btnInput = 0;
                    break;
                case 40: //하단
                    btnInput = 1;
                    break;
                case 37: //좌측
                    btnInput = 2;
                    break;
                case 39: // 우측
                    btnInput = 3;
                    break;
                case 32: // C
                    btnInput = 4;
                    break;
            }
        })
        up.addEventListener("click", function(){
            btnInput = 0;
        })
        down.addEventListener("click", function(){
            btnInput = 1;
        })
        left.addEventListener("click", function(){
            btnInput = 2;
        })
        right.addEventListener("click", function(){
            btnInput = 3;
        })
        center.addEventListener("click", function(){
            btnInput = 4;
        })
    }, 100);
})

