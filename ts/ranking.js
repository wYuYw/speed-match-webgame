var rank_monitor = document.querySelector('#rank-data-monitor');
var person_info_display = document.createElement('h4');
var load = localStorage.getItem('ranking');
var loadData = [];
if (!(load == null)) {
    loadData = JSON.parse(load);
    var person_info = '';
    for (var i = 0; i < loadData.length; i++) {
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
