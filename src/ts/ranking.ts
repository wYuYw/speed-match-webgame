const rank_monitor: HTMLElement = document.querySelector('#rank-data-monitor');
const person_info_display: HTMLHeadingElement = document.createElement('h4');
let load: string = localStorage.getItem('ranking');

// Each gameplay result
type Rank = {
  Snickname: string; // nickname of player
  Slevel: string; // reached level
  Sscore: string; // score of player
};
let loadData: Rank[] = [];

if (!(load == null)) {
  loadData = JSON.parse(load);
  let person_info: string = '';
  for (let i = 0; i < loadData.length; i++) {
    person_info += i + 1 + '.';
    person_info += loadData[i].Snickname;
    person_info += ' | ';
    person_info += 'level' + loadData[i].Slevel;
    person_info += ' | ';
    person_info += loadData[i].Sscore + '<br>';
    person_info_display.innerHTML = person_info;
    person_info_display.setAttribute('class', 'card-title');
    rank_monitor.appendChild(person_info_display);
  }
}
