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
    tabs[i].addEventListener('click', showHideTabs);
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

//Função para pegar dados do banco e inserir no dashboard de Sede:Turma:sprint

//trocar isso aqui depois que o dropdown tiver definido por eventos que chamem essas funções
getBranchData();
getSprintData();

var branch;
var branchClass;
var sprint;
var numSprints;
var student;
var numOfStudents;
var numOfActiveStudents;
var numOfInactiveStudents;
var techPoints;
var techPointsSum;
var softPoints;
var softPointsSum;
var sprtAttendeesTechPts;
var sprtAttendeesSoftPts;
var dropdownBranch;
var dropdownClass;
var dropdownSprint;
var classAvgScore;
var classTechAvgScore;
var classSoftAvgScore;

//Em andamento
function getBranchData() {
  numOfStudents = 0;
  numOfActiveStudents = 0;
  numOfInactiveStudents = 0;

  for (var b in data) {
    branch = b;
    for (var c in data[branch]) {
      branchClass = c;
      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        if (student['name'] === undefined) {
          numOfStudents += 0;
        } else {
          numOfStudents += 1;
        }

        if (student['active'] === true) {
          numOfActiveStudents += 1;
        } else if (student['active'] === false) {
          numOfInactiveStudents += 1;
        }
      }
    }
  }
}

function getSprintData() {
  numOfStudents = 0;
  numOfActiveStudents = 0;
  numOfInactiveStudents = 0;
  techPointsSum = 0;
  softPointsSum = 0;
  numOfScores = 0;
  sprtAttendeesTechPts = 0;
  sprtAttendeesSoftPts = 0;

  //definir branch como o valor selecionado no dropdown de sede
  dropdownBranch = 'AQP';
  //definir branchClass como o valor selecionado no dropdown de turma
  dropdownClass = '2016-2';
  //definir sprint como o valor selecionado no dropdown de sprint
  dropdownSprint = 1;

  for (var b in data) {
    branch = b;
    for (var c in data[branch]) {
      branchClass = c;

      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        //pega o número de estudantes desse sprint
        if (branch === dropdownBranch && branchClass === dropdownClass) {
          numOfStudents += 1;
        }

        //calcula o número de estudantes ativas e inativas desse sprint
        if (branch === dropdownBranch && branchClass === dropdownClass && student['active'] === true) {
          numOfActiveStudents += 1;
        } else if (branch === dropdownBranch && branchClass === dropdownClass && student['active'] === false) {
          numOfInactiveStudents += 1;
        }

        //calcula a média de pontos tech
        for (sp in student['sprints']) {
          if (branch === dropdownBranch && branchClass === dropdownClass && student['sprints'][sp]['number'] === dropdownSprint) {
            techPoints = student['sprints'][sp]['score']['tech'];
            techPointsSum += techPoints;
            sprtAttendeesTechPts += 1;
          }
        }

        classTechAvgScore = Math.round((((techPointsSum / sprtAttendeesTechPts) / 1800) * 10) * 10) / 10;

        //calcula a média de pontos de softskills
        for (sp in student['sprints']) {
          if (branch === dropdownBranch && branchClass === dropdownClass && student['sprints'][sp]['number'] === dropdownSprint) {
            softPoints = student['sprints'][sp]['score']['hse'];
            softPointsSum += softPoints;
            sprtAttendeesSoftPts += 1;
          }
        }
        classSoftAvgScore = Math.round((((softPointsSum / sprtAttendeesSoftPts) / 1200) * 10) * 10) / 10;
      }
    }
  }
  //Média geral da turma:
  classAvgScore = (classTechAvgScore + classSoftAvgScore) / 2;
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
    if (studentOffice === 'AQP') {
      studentOffice = 'Arequipa';
    } else if (studentOffice === 'CDMX') {
      studentOffice = 'Cidade do México';
    } else if (studentOffice === 'LIM') {
      studentOffice = 'Lima';
    } else if (studentOffice === 'SCL') {
      studentOffice = 'Santiago do Chile';
    }
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
        if (sprintLength !== 0) {
          for (var j = 0; j < sprintLength; j++) {
            techMedia += sprint[j]['score']['tech'];
          }
          techMedia = parseInt(techMedia/sprintLength);

          softMedia = 0;
          for (var j = 0; j < sprintLength; j++) {
            softMedia += sprint[j]['score']['hse'];
          }
          softMedia = parseInt(softMedia/sprintLength);
        } else {
          softMedia = 0;
        }
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
