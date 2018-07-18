window.onload = loadFunctions();

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
  document.getElementById('tabStudents').onclick = showStudentsCards();
  document.getElementById('dropdownBranch').addEventListener('click', dropdownBranch);
  document.getElementById('selectedClass').addEventListener('click', selectClass);
  document.getElementById('selectedClass').addEventListener('click', dropdownSprint);
  document.getElementById('selectedSprint').addEventListener('click', selectSprint);
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

//variáveis do menu dropdownSprint
var dropdownBranch;
var dropdownClass;
var dropdownSprint;
//variáveis para acessar o banco de dados
var branch;
var branchClass;
var sprint;
var numSprints;
var numClasses;
var student;
var studentName;
var rating;
//variáveis para cálculo de quantidade de alunas
var numOfStudents;
var numOfActiveStudents;
var numOfInactiveStudents;
var perctOfActiveStudents;
var perctOfInactiveStudents;
//variáveis para cálculo de notas e médias de tech points e solft skills
var techPoints;
var techPointsSum;
var sprtAttendeesTechPts;
var softPoints;
var softPointsSum;
var sprtAttendeesSoftPts;
var classAvgScore;
var classTechAvgScore;
var classSoftAvgScore;
//variáveis para cálculo de média geral da turma
var aboveAvg;
var underAvg;
var aboveAvgSum;
var underAvgSum;
var numAboveAvg;
var numUnderAvg;
var noPoints;
//variáveis para cálculo de média em tech skills
var aboveAvgTech;
var underAvgTech;
var noPointsTech;
var numAboveAvgTech;
var numUnderAvgTech;
var sumTechPointsStudent;
//variáveis para cálculo de média em soft skills
var aboveAvgSoft;
var underAvgSoft;
var noPointsSoft;
var numAboveAvgSoft;
var numUnderAvgSoft;
var sumSoftPointsStudent;
//variáveis para obter desempenho da equipe Laboratória
var npsScore;
var exceedsExpectations;
var meetsExpectations;
var sumExceedsExpectations;
var sumMeetsExpectations;
var promoters;
var detractors;
var happyStudents;
var jediMasterScore;
var sumJediScore;
var mentorsScore;
var sumMentorsScore;
//Variáveis para o título do Dashboard
var dashbTitle;
var dashbBranchTitle;
var dashbClassTitle;
var dashbSprintTitle;

function dropdownBranch(event) {
  var theTarget = event.target.id;
  if (theTarget == 'aqp') {
    dropdownBranch = 'AQP';
    dashbBranchTitle = 'Arequipa';
  } else if (theTarget == 'cdmx') {
    dropdownBranch = 'CDMX';
    dashbBranchTitle = 'Cidade do México';
  } else if (theTarget == 'lim') {
    dropdownBranch = 'LIM';
    dashbBranchTitle = 'Lima';
  } else if (theTarget == 'scl') {
    dropdownBranch = 'SCL';
    dashbBranchTitle = 'Santiago';
  } else if (theTarget == 'spa') {
    dropdownBranch = 'SPA';
  }
  document.getElementById('headerBranch').innerHTML = document.getElementById(theTarget).textContent;
  document.getElementById('ulSelectedClass').style.display = "block";
  document.getElementById('ulSelectedSprint').style.display = "none";

  clearClasses();
  dropdownClasses();
  loadPrincipalData()
}

function loadPrincipalData() {
  dropdownClass = document.getElementById('headerClass').textContent;
  dropdownSprint = document.getElementById('headerSprint').textContent;
  console.log(dropdownClass);

  if (dropdownBranch !== 'SPA' && dropdownClass !== 'Turma' && dropdownSprint !== 'Sprint') {
    getSprintData();
  } else if (dropdownBranch !== 'SPA' && dropdownClass !== 'Turma' && dropdownSprint === 'Sprint') {
    getClassData();
  } else if (dropdownBranch !== 'SPA' && dropdownClass === 'Turma' && dropdownSprint === 'Sprint') {
    getBranchData();
  } else {
    document.getElementById('principal').innerHTML = '';
  }
}

function clearClasses() {
  clearSprint();
  var clearDropdownClasses = document.getElementById('dropdownClass');
  var clearClasses = document.getElementById('selectedClass');
  clearClasses.removeChild(clearDropdownClasses);
  var dropdownClass = document.createElement('ul');
  dropdownClass.setAttribute('id', 'dropdownClass');
  document.getElementById('selectedClass').appendChild(dropdownClass);
  document.getElementById('headerClass').textContent = "Turma";
}

var headerClass
function dropdownClasses() {
  for (var classes in data[dropdownBranch]) {
    var classesMenu = document.createElement('li');
    classesMenu.setAttribute('class', 'classesMenu');
    classesMenu.textContent = classes;
    document.getElementById('dropdownClass').appendChild(classesMenu);
  }
}

function selectClass(event) {
  document.getElementById('headerClass').textContent = event.target.textContent;
  loadPrincipalData()
}

function dropdownSprint(event) {
  clearSprint();
  document.getElementById('ulSelectedSprint').style.display = "block";
  var classes = event.target.textContent;
  for (var i in data[dropdownBranch][classes]['ratings']) {
    var sprint = "Sprint " + data[dropdownBranch][classes]['ratings'][i]['sprint'];
    var sprintMenu = document.createElement('li');
    sprintMenu.textContent = sprint;
    document.getElementById('dropdownSprint').appendChild(sprintMenu);
  }
}

function selectSprint(event) {
  document.getElementById('headerSprint').textContent = event.target.textContent;
  loadPrincipalData();
}

function clearSprint() {
  var clearDropdownSprint = document.getElementById('dropdownSprint');
  var clearSprint = document.getElementById('selectedSprint');
  clearSprint.removeChild(clearDropdownSprint);
  var dropdownSprint = document.createElement('ul');
  dropdownSprint.setAttribute('id', 'dropdownSprint');
  document.getElementById('selectedSprint').appendChild(dropdownSprint);
  document.getElementById('headerSprint').textContent = "Sprint";
}

function getBranchData() {
  numOfStudents = 0;
  numOfActiveStudents = 0;
  numOfInactiveStudents = 0;
  techPointsSum = 0;
  softPointsSum = 0;
  sprtAttendeesTechPts = 0;
  sprtAttendeesSoftPts = 0;
  numAboveAvg = 0;
  numUnderAvg = 0;
  numAboveAvgTech = 0;
  numUnderAvgTech = 0;
  numAboveAvgSoft = 0;
  numUnderAvgSoft = 0;
  numSprints = 0;
  sumExceedsExpectations = 0;
  sumMeetsExpectations = 0;
  promoters = 0;
  detractors = 0;
  sumJediScore = 0;
  sumMentorsScore = 0;
  numClasses = 0;

  for (var branch in data) {
    for (var branchClass in data[branch]) {
      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        //Calculando o número total de alunas
        if (branch === dropdownBranch) {
          numOfStudents += 1;

          //calcula o número de estudantes ativas e inativas dessa turma
          if (student['active'] === true) {
            numOfActiveStudents += 1;
          } else if (student['active'] === false) {
            numOfInactiveStudents += 1;
          }

          for (sp in student['sprints']) {
            // Pega dados para calcular a média de tech points da turma
            techPoints = student['sprints'][sp]['score']['tech'];
            techPointsSum += techPoints;
            sprtAttendeesTechPts += 1;

            //Pega dados para calcular a média de soft points da turma
            softPoints = student['sprints'][sp]['score']['hse'];
            softPointsSum += softPoints;
            sprtAttendeesSoftPts += 1;
          }
        }
      }

      //Desempenho da turma entre supera-cumple-no-cumple em porcentagem
      rating = data[branch][branchClass]['ratings'];
      for (sp in rating) {
        if (branch === dropdownBranch) {
          sumExceedsExpectations += rating[sp]['student']['supera'];
          sumMeetsExpectations += rating[sp]['student']['cumple'];

          //Pegando dados de avaliação da Laboratória
          promoters += rating[sp]['nps']['promoters'];
          detractors += rating[sp]['nps']['detractors'];

          sumJediScore += rating[sp]['jedi'];
          sumMentorsScore += rating[sp]['teacher'];

          //Calculando número de sprints
          numSprints += 1;
        }
      }
    }
  }

  // Cálculo do número de alunas que superam 70% da média em TechSkills na turma
  for (var branch in data) {
    for (var branchClass in data[branch]) {
      if (branch === dropdownBranch) {
        for (var st in data[branch][branchClass]['students']) {
          sumTechPointsStudent = 0;
          sumSoftPointsStudent = 0;
          studentName = data[branch][branchClass]['students'][st]['name'];
          sprint = data[branch][branchClass]['students'][st]['sprints'];

          for (var num in sprint) {
            techPoints = sprint[num]['score']['tech'];
            sumTechPointsStudent += techPoints;

            techPoints = sprint[num]['score']['hse'];
            sumSoftPointsStudent += techPoints;
          }

          sumTechPointsStudent = sumTechPointsStudent / sprint.length;
          sumSoftPointsStudent = sumSoftPointsStudent / sprint.length;

          if (sumTechPointsStudent >= 1260) {
            numAboveAvgTech += 1;
          } else if (sumTechPointsStudent <= 1259) {
            numUnderAvgTech += 1;
          }

          if (sumSoftPointsStudent >= 840) {
            numAboveAvgSoft += 1;
          } else if (sumSoftPointsStudent <= 839) {
            numUnderAvgSoft += 1;
          }

          if (sumTechPointsStudent + sumSoftPointsStudent >= 2100) {
            numAboveAvg += 1;
          } else if (sumTechPointsStudent + sumSoftPointsStudent <= 2100) {
            numUnderAvg += 1;
          }
        }
      }
    }
  }

  //Cálculo do número de turmas de uma sede
  for (classes in data[dropdownBranch]) {
    numClasses += 1;
  }

  //Cálculo do número de alunas que não ponturaram na sede
  console.log(numOfStudents);
  console.log(sprtAttendeesSoftPts / numSprints);
  noPoints = numOfStudents - (sprtAttendeesSoftPts / numSprints);

  //Cálculo da satisfação das Alunas
  happyStudents = Math.round((sumExceedsExpectations + sumMeetsExpectations) / numSprints);

  //Cálculo da média de NPS da TURMA
  npsScore = Math.round((promoters - detractors) / numSprints);

  //Cálculo da média dos Jedi MASTERS
  jediMasterScore = Math.round((sumJediScore / numSprints) * 10) / 10;

  //Cálculo da média dos MENTORES
  mentorsScore = Math.round((sumMentorsScore / numSprints) * 10) / 10;

  //Cálculo da porcentagem das alunas ativas e inativas
  perctOfActiveStudents = Math.round((numOfActiveStudents * 100) / numOfStudents);
  perctOfInactiveStudents = Math.round((numOfInactiveStudents * 100) / numOfStudents);

  //Cálculo da média de tech skills da turma
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts) * 100) / 1800);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts) * 100) / 1200);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / ((sprtAttendeesSoftPts / numSprints) * numClasses));
  underAvgTech = Math.round((numUnderAvgTech * 100) / ((sprtAttendeesSoftPts / numSprints) * numClasses));

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / ((sprtAttendeesSoftPts / numSprints) * numClasses));
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / ((sprtAttendeesSoftPts / numSprints) * numClasses));

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / numOfStudents);
  underAvg = Math.round((numUnderAvg * 100) / numOfStudents);

  dashbTitle = dashbBranchTitle + ':';
  createMainDashboard();
}

function getClassData() {
  numOfStudents = 0;
  numOfActiveStudents = 0;
  numOfInactiveStudents = 0;
  techPointsSum = 0;
  softPointsSum = 0;
  sprtAttendeesTechPts = 0;
  sprtAttendeesSoftPts = 0;
  numAboveAvg = 0;
  numUnderAvg = 0;
  numAboveAvgTech = 0;
  numUnderAvgTech = 0;
  numAboveAvgSoft = 0;
  numUnderAvgSoft = 0;
  numSprints = 0;
  sumExceedsExpectations = 0;
  sumMeetsExpectations = 0;
  promoters = 0;
  detractors = 0;
  sumJediScore = 0;
  sumMentorsScore = 0;

  for (var b in data) {
    branch = b;
    for (var c in data[branch]) {
      branchClass = c;

      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        if (branch === dropdownBranch && branchClass === dropdownClass) {
          numOfStudents += 1;

          //calcula o número de estudantes ativas e inativas dessa turma
          if (student['active'] === true) {
            numOfActiveStudents += 1;
          } else if (student['active'] === false) {
            numOfInactiveStudents += 1;
          }
        }

        for (sp in student['sprints']) {

          //pega o número de estudantes dessa turma
          if (branch === dropdownBranch && branchClass === dropdownClass) {

            // Pega dados para calcular a média de tech points da turma
            techPoints = student['sprints'][sp]['score']['tech'];
            techPointsSum += techPoints;
            sprtAttendeesTechPts += 1;

            //Pega dados para calcular a média de soft points da turma
            softPoints = student['sprints'][sp]['score']['hse'];
            softPointsSum += softPoints;
            sprtAttendeesSoftPts += 1;
          }
        }
      }

      //Desempenho da turma entre supera-cumple-no-cumple em porcentagem
      rating = data[dropdownBranch][dropdownClass]['ratings'];
      for (sp in rating) {
        if (branch === dropdownBranch && branchClass === dropdownClass) {
          sumExceedsExpectations += rating[sp]['student']['supera'];
          sumMeetsExpectations += rating[sp]['student']['cumple'];

          //Pegando dados de avaliação da Laboratória
          promoters += rating[sp]['nps']['promoters'];
          detractors += rating[sp]['nps']['detractors'];

          sumJediScore += rating[sp]['jedi'];
          sumMentorsScore += rating[sp]['teacher'];

          //Calculando número de sprints
          numSprints += 1;
        }
      }
    }
  }

  // Cálculo do número de alunas que superam 70% da média em TechSkills na turma
  for (var branch in data) {
    for (var branchClass in data[branch]) {
      if (branch === dropdownBranch && branchClass === dropdownClass) {
        for (var st in data[branch][branchClass]['students']) {
          sumTechPointsStudent = 0;
          sumSoftPointsStudent = 0;
          studentName = data[branch][branchClass]['students'][st]['name'];
          sprint = data[branch][branchClass]['students'][st]['sprints'];

          for (var num in sprint) {
            techPoints = sprint[num]['score']['tech'];
            sumTechPointsStudent += techPoints;
            techPoints = sprint[num]['score']['hse'];
            sumSoftPointsStudent += techPoints;
          }

          sumTechPointsStudent = sumTechPointsStudent / sprint.length;
          sumSoftPointsStudent = sumSoftPointsStudent / sprint.length;

          if (sumTechPointsStudent >= 1260) {
            numAboveAvgTech += 1;
          } else if (sumTechPointsStudent <= 1259) {
            numUnderAvgTech += 1;
          }

          if (sumSoftPointsStudent >= 840) {
            numAboveAvgSoft += 1;
          } else if (sumSoftPointsStudent <= 839) {
            numUnderAvgSoft += 1;
          }

          if (sumTechPointsStudent + sumSoftPointsStudent >= 2100) {
            numAboveAvg += 1;
          } else if (sumTechPointsStudent + sumSoftPointsStudent <= 2100) {
            numUnderAvg += 1;
          }
        }
      }
    }
  }

  //Cálculo da satisfação das Alunas
  happyStudents = Math.round((sumExceedsExpectations + sumMeetsExpectations) / numSprints);

  //Cálculo da média de NPS da TURMA
  npsScore = Math.round((promoters - detractors) / numSprints);

  //Cálculo da média dos Jedi MASTERS
  jediMasterScore = Math.round((sumJediScore / numSprints) * 10) / 10;

  //Cálculo da média dos MENTORES
  mentorsScore = Math.round((sumMentorsScore / numSprints) * 10) / 10;

  //Cálculo da porcentagem das alunas ativas e inativas
  perctOfActiveStudents = Math.round((numOfActiveStudents * 100) / numOfStudents);
  perctOfInactiveStudents = Math.round((numOfInactiveStudents * 100) / numOfStudents);

  //Cálculo da média de tech skills da turma
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts) * 100) / 1800);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts) * 100) / 1200);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / (sprtAttendeesTechPts / numSprints));
  underAvgTech = Math.round((numUnderAvgTech * 100) / (sprtAttendeesTechPts / numSprints));

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem

  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / (sprtAttendeesSoftPts / numSprints));
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / (sprtAttendeesSoftPts / numSprints));

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / numOfStudents);
  underAvg = Math.round((numUnderAvg * 100) / numOfStudents);

  dashbClassTitle = dropdownClass;
  dashbTitle = dashbBranchTitle + ': ' + dashbClassTitle + ':';

  createMainDashboard();
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
  numAboveAvgTech = 0;
  numUnderAvgTech = 0;
  numAboveAvgSoft = 0;
  numUnderAvgSoft = 0;
  numAboveAvg = 0;
  numUnderAvg = 0;

  dropdownSprint = dropdownSprint.split(' ');
  dropdownSprint = parseInt(dropdownSprint[1]);

  for (var b in data) {
    branch = b;
    for (var c in data[branch]) {
      branchClass = c;

      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        for (sp in student['sprints']) {
          //pega o número de estudantes desse sprint
          if (branch === dropdownBranch && branchClass === dropdownClass && student['sprints'][sp]['number'] === dropdownSprint) {
            numOfStudents += 1;

            //calcula o número de estudantes ativas e inativas desse sprint
            if (student['active'] === true) {
              numOfActiveStudents += 1;
            } else if (student['active'] === false) {
              numOfInactiveStudents += 1;
            }

            //Pega dados para calcular a média de tech points da turma
            techPoints = student['sprints'][sp]['score']['tech'];
            techPointsSum += techPoints;
            sprtAttendeesTechPts += 1;

            //Cálculo do desempenho (supera / cumple / no-cumple) em Tech Skills por número de aluna
            if (techPoints >= 1260) {
              numAboveAvgTech += 1;
            } else if (techPoints <= 1259) {
              numUnderAvgTech += 1;
            }

            //Pega dados para calcular a média de soft points da turma
            softPoints = student['sprints'][sp]['score']['hse'];
            softPointsSum += softPoints;
            sprtAttendeesSoftPts += 1;

            //Cálculo do desempenho (supera / cumple / no-cumple) em SoftSkills por número de aluna
            if (softPoints >= 840) {
              numAboveAvgSoft += 1;
            } else if (softPoints <= 839) {
              numUnderAvgSoft += 1;
            }

            if (techPoints + softPoints >= 2100) {
              numAboveAvg += 1;
            } else if (techPoints + softPoints <= 2100) {
              numUnderAvg += 1;
            }
          }
        }
      }

      //Desempenho da turma entre supera-cumple-no-cumple em porcentagem
      rating = data[dropdownBranch][dropdownClass]['ratings'];
      for (sp in rating) {
        if (branch === dropdownBranch && branchClass === dropdownClass && student['sprints'][sp]['number'] === dropdownSprint) {
          exceedsExpectations = rating[sp]['student']['supera'];
          meetsExpectations = rating[sp]['student']['cumple'];

          //Pegando dados de avaliação da Laboratória
          npsScore = rating[sp]['nps']['promoters'] - rating[sp]['nps']['detractors'];
          jediMasterScore = rating[sp]['jedi'];
          mentorsScore = rating[sp]['teacher'];
        }
      }
    }
  }

  //Cálculo da porcentagem das alunas ativas e inativas
  perctOfActiveStudents = Math.round((numOfActiveStudents * 100) / numOfStudents);
  perctOfInactiveStudents = Math.round((numOfInactiveStudents * 100) / numOfStudents);

  //Cálculo da média de tech skills da turma
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts)  * 100) / 1800);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts)  * 100) / 1200);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / sprtAttendeesTechPts);
  underAvgTech = Math.round((numUnderAvgTech * 100) / sprtAttendeesTechPts);

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / sprtAttendeesSoftPts);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / sprtAttendeesSoftPts);

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / sprtAttendeesTechPts);
  underAvg = Math.round((numUnderAvg * 100) / sprtAttendeesTechPts);

  //Porcentagem das alunas satisfeitas com a Laboratoria
  happyStudents = exceedsExpectations + meetsExpectations;

  dashbSprintTitle = dropdownSprint;
  dashbClassTitle = dropdownClass;
  dashbTitle = dashbBranchTitle + ': ' + dashbClassTitle + ': Sprint ' + dashbSprintTitle + ':';
  createMainDashboard();
}

function createMainDashboard() {
  document.getElementById('dashbTitle').textContent = dashbTitle; 
  document.getElementById('numOfStudents').textContent = numOfStudents; 
  document.getElementById('numOfActiveStudents').textContent = numOfActiveStudents;
  document.getElementById('perctOfActiveStudents').textContent = perctOfActiveStudents;
  document.getElementById('numOfInactiveStudents').textContent = numOfInactiveStudents;
  document.getElementById('perctOfInactiveStudents').textContent = perctOfInactiveStudents;
  document.getElementById('classAvgScore').textContent = classAvgScore;
  document.getElementById('numAboveAvg').textContent = numAboveAvg;
  document.getElementById('aboveAvg').textContent = aboveAvg;
  document.getElementById('numUnderAvg').textContent = numUnderAvg;
  document.getElementById('underAvg').textContent = underAvg;
  document.getElementById('noPoints').textContent = noPoints;
  document.getElementById('noPointsPercent').textContent = noPointsPercent;
  document.getElementById('classTechAvgScore').textContent = classTechAvgScore;
  document.getElementById('numAboveAvgTech').textContent = numAboveAvgTech;
  document.getElementById('aboveAvgTech').textContent = aboveAvgTech;
  document.getElementById('numUnderAvgTech').textContent = numUnderAvgTech;
  document.getElementById('underAvgTech').textContent = underAvgTech;
  document.getElementById('noPointsTech').textContent = noPointsTech;
  document.getElementById('noPointsTechPercent').textContent = noPointsTechPercent;
  document.getElementById('classSoftAvgScore').textContent = classSoftAvgScore;
  document.getElementById('numAboveAvgSoft').textContent = numAboveAvgSoft;
  document.getElementById('aboveAvgSoft').textContent = aboveAvgSoft;
  document.getElementById('numUnderAvgSoft').textContent = numUnderAvgSoft;
  document.getElementById('underAvgSoft').textContent = underAvgSoft;
  document.getElementById('noPointsSoft').textContent = noPointsSoft;
  document.getElementById('noPointsSoftPercent').textContent = noPointsSoftPercent;
  document.getElementById('npsScore').textContent = npsScore;
  document.getElementById('happyStudents').textContent = happyStudents;
  document.getElementById('jediMasterScore').textContent = jediMasterScore;
  document.getElementById('mentorsScore').textContent = mentorsScore;
  principalChart();
  mediaChart();
  techMediaChart();
  softMediaChart();
  abvMediaChart();
  abvTechMediaChart();
  abvSoftMediaChart();
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
        softMedia = 0;
        if (sprintLength !== 0) {
          for (var j = 0; j < sprintLength; j++) {
            techMedia += sprint[j]['score']['tech'];
          }
          techMedia = parseInt(techMedia/sprintLength);
          for (var j = 0; j < sprintLength; j++) {
            softMedia += sprint[j]['score']['hse'];
          }
          softMedia = parseInt(softMedia/sprintLength);
        }
        createStudentCard();
      }
    }
  }
}

function createStudentCard() {
  var template = `
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

// GRÁFICOS

function principalChart() {
  var numOfActiveStudents = document.getElementById('numOfActiveStudents').textContent;
  var numOfInactiveStudents = document.getElementById('numOfInactiveStudents').textContent;
  var principalChart = document.getElementById('principalChart').getContext('2d');
  var thePrincipalChart = new Chart(principalChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [numOfActiveStudents, numOfInactiveStudents],
        backgroundColor: ['rgba(255, 0, 158, 1)', 'rgba(86, 248, 154, 1)']
      }],
      labels : ['Inativas','Ativas']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'TOTAL DE ALUNAS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}

function mediaChart() {
  var classAvgScore = document.getElementById('classAvgScore').textContent;
  var mediaChart = document.getElementById('mediaChart').getContext('2d');
  var themediaChart = new Chart(mediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [classAvgScore, 100 - classAvgScore],
        backgroundColor: ['rgba(255, 0, 158, 1)']
      }],
      labels : [classAvgScore + '%']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA GERAL', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}

function techMediaChart() {
  var classTechAvgScore = document.getElementById('classTechAvgScore').textContent;
  var techMediaChart = document.getElementById('techMediaChart').getContext('2d');
  var thetechMediaChart = new Chart(techMediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [classTechAvgScore, 100 - classTechAvgScore],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [classTechAvgScore + '%']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA TECH SKILLS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70, 
    }
  });
}

function softMediaChart() {
  var classSoftAvgScore = document.getElementById('classSoftAvgScore').textContent;
  var softMediaChart = document.getElementById('softMediaChart').getContext('2d');
  var thesoftMediaChart = new Chart(softMediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [classSoftAvgScore, 100 - classSoftAvgScore],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [classSoftAvgScore + '%']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA SOFT SKILLS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70, 
    }
  });
}

function abvMediaChart() {
  var numAboveAvg = document.getElementById('numAboveAvg').textContent;
  var numUnderAvg = document.getElementById('numUnderAvg').textContent;
  var abvMediaChart = document.getElementById('abvMediaChart').getContext('2d');
  var theabvMediaChart = new Chart(abvMediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [numAboveAvg, numUnderAvg],
        backgroundColor: ['rgba(86, 248, 154, 1)', 'rgba(255, 0, 158, 1)']
      }],
      labels : ['Acima da média','Abaixo da média']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: false},
      title: {display: true, text: 'DESEMPENHO GERAL', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}

function abvTechMediaChart() {
  var numAboveAvgTech = document.getElementById('numAboveAvgTech').textContent;
  var numUnderAvgTech = document.getElementById('numUnderAvgTech').textContent;
  var abvTechMediaChart = document.getElementById('abvTechMediaChart').getContext('2d');
  var theabvTechMediaChart = new Chart(abvTechMediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [numAboveAvgTech, numUnderAvgTech],
        backgroundColor: ['rgba(86, 248, 154, 1)', 'rgba(255, 0, 158, 1)']
      }],
      labels : ['Acima da média','Abaixo da média']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: false},
      title: {display: true, text: 'DESEMPENHO TECH', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}

function abvSoftMediaChart() {
  var numAboveAvgSoft = document.getElementById('numAboveAvgSoft').textContent;
  var numUnderAvgSoft = document.getElementById('numUnderAvgSoft').textContent;
  var abvSoftMediaChart = document.getElementById('abvSoftMediaChart').getContext('2d');
  var theabvSoftMediaChart = new Chart(abvSoftMediaChart, {
    type: 'doughnut',
    data: {      
      datasets: [{
        data: [numAboveAvgSoft, numUnderAvgSoft],
        backgroundColor: ['rgba(86, 248, 154, 1)', 'rgba(255, 0, 158, 1)']
      }],
      labels : ['Acima da média','Abaixo da média']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: false},
      title: {display: true, text: 'DESEMPENHO SOFT', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}



// 255, 229, 33
// 86, 248, 154