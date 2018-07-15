window.onload = loadFunctions();
document.getElementById("tabStudents").onclick = showStudentsCards();

function loadFunctions() {
//Estado inicial do conteúdo das tabs e evento para mostrá-las com click
  var principal = document.getElementById('principal');
  var students = document.getElementById('students');
  var team = document.getElementById('team');

  principal.style.display = 'none';
  students.style.display = 'none';
  team.style.display = 'none';

  var tabs = document.getElementsByClassName('tab');
  for (i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', showHideTabs)
  }

}

//Função que mostra ou esconde o conteúdo das tabs
function showHideTabs(e) {
  var selectedTab = e.target.dataset.selectedTab;
  var principal = document.getElementById('principal');
  var students = document.getElementById('students');
  var team = document.getElementById('team');

  if (selectedTab === 'tab-principal') {
    principal.style.display = 'flex';
    students.style.display = 'none';
    team.style.display = 'none';
  } else if (selectedTab === 'tab-students') {
    students.style.display = 'flex';
    principal.style.display = 'none';
    team.style.display = 'none';
  } else if (selectedTab === 'tab-team') {
    team.style.display = 'flex';
    principal.style.display = 'none';
    students.style.display = 'none';
  }
}

var studentPhoto;
var studentName;
var studentOffice;
var studentClass;
var studentStatus;
var techMedia;
var softMedia;

function showStudentsCards() {
  for (var office in data) {
    studentOffice = office;
    for (var classes in data[office]) {
      studentClass = classes;
      for (var i in data[office][classes]['students']) {
        studentName = data[office][classes]['students'][i]['name'];
        studentPhoto = data[office][classes]['students'][i]['photo'];
        if (data[office][classes]['students'][i]['active'] === true) {
          studentStatus = 'Ativa';
        } else {
          studentStatus = 'Inativa';
        }
        var sprint = data[office][classes]['students'][i]['sprints'];
        var sprintLength = sprint.length;
        techMedia = 0;
        for (var j = 0; j < sprintLength; j++) {
          techMedia += sprint[j]['score']['tech'];
        }
        techMedia = parseInt(techMedia/sprintLength);

        softMedia = 0;
        for (var j = 0; j < sprintLength; j++) {
          softMedia += sprint[j]['score']['hse'];
        }
        softMedia = parseInt(softMedia/sprintLength);
        createStudentCard();
      }
    }
  }
}

function createStudentCard() {
  template = `
    <div class="photoConteiner">
      <img class='studentPhoto' src='${studentPhoto}' alt=''>
    </div>
    <div class='studentInfo'>
      <p class='name'>${studentName}</p>
      <p><span class='country'>${studentOffice}</span>/<span class='class'>${studentClass}</span></p>
      <p>Status: <span class='status'>${studentStatus}</span></p>
      <br>
      <p>Media Tech: <span class='techMedia'>${techMedia}</span></p>
      <p>Media Soft: <span class='softMedia'>${softMedia}</span></p>
    </div>
  `
  var studentCard = document.createElement('div');
  studentCard.setAttribute('class', 'flexRow studentCard');
  studentCard.innerHTML = template;
  document.getElementById('students').appendChild(studentCard);
}