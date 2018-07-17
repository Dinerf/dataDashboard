window.onload = loadFunctions();

function loadFunctions() {
//Estado inicial do conteúdo das tabs e evento para mostrá-las com click
  var principal = document.getElementById('principal');
  var students = document.getElementById('students');
  var team = document.getElementById('team');

  principal.style.display = 'flex';
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
//variáveis para cálculo de média em tech skills
var aboveAvgTech;
var underAvgTech;
var numAboveAvgTech;
var numUnderAvgTech;
var sumTechPointsStudent;
//variáveis para cálculo de média em soft skills
var aboveAvgSoft;
var underAvgSoft;
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
var dashbBranchTitle;

//Calculando número de sprints
numSprints += 1;

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
  document.getElementById('headerClass').style.display = "block";
  document.getElementById('headerSprint').style.display = "none";
  clearClasses();
  dropdownClasses();
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
}

function dropdownSprint(event) {
  clearSprint();
  document.getElementById('headerSprint').style.display = "block";
  var classes = event.target.textContent;
  console.log(classes);
  for (var i in data[dropdownBranch][classes]['ratings']) {
    var sprint = "Sprint " + data[dropdownBranch][classes]['ratings'][i]['sprint'];
    var sprintMenu = document.createElement('li');
    sprintMenu.textContent = sprint;
    document.getElementById('dropdownSprint').appendChild(sprintMenu);
  }
}

function selectSprint(event) {
  document.getElementById('headerSprint').textContent = event.target.textContent;
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




// function selectSprint(event) {
//   var theTarget = event.target.value;

//   for (var i in data[dropdownBranch][headerClass]['ratings'][i]['sprint']) {
    
//  }

//   // .style.display = 'block';
// }

{/* <i class="fas angle fa-angle-double-right"> */}


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
      }
    }
  document.getElementById('headerBranch').innerHTML = document.getElementById(theTarget).textContent;
  }
  if (dropdownBranch !== 'SPA') {
    getBranchData();
  } else {
    document.getElementById('principal').innerHTML = '';
  }
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

  document.getElementById('principal').innerHTML = '';

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

  //definir branch como o valor selecionado no dropdown de sede
  dropdownBranch = 'AQP';
  //definir branchClass como o valor selecionado no dropdown de turma
  dropdownClass = '2017-1';

  for (var b in data) {
    branch = b;
    for (var c in data[branch]) {
      branchClass = c;

      for (var s in data[branch][branchClass]['students']) {
        student = data[branch][branchClass]['students'][s];

        for (sp in student['sprints']) {

          //pega o número de estudantes dessa turma
          if (branch === dropdownBranch && branchClass === dropdownClass) {
            numOfStudents += 1;

            //calcula o número de estudantes ativas e inativas dessa turma
            if (student['active'] === true) {
              numOfActiveStudents += 1;
            } else if (student['active'] === false) {
              numOfInactiveStudents += 1;
            }

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

  //Cálculo do número de alunas (total / ativas e inativas) da turma
  numOfStudents = numOfStudents / numSprints;
  numOfActiveStudents = numOfActiveStudents / numSprints;
  numOfInactiveStudents = numOfInactiveStudents / numSprints;

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

  createMainDashboard();
}

function createMainDashboard() {
  var template = `
    <h2>${dashbBranchTitle}</h2>
    <div class="container-sub-column">
      <div class="sub-column data-students">
        <h3>Alunas e Presença:</h3>
        <p>Total de Alunas: <span class="status-principal">${numOfStudents}</span></p>
        <br>
        <p>Ativas: <span class="status-principal">${numOfActiveStudents} (${perctOfActiveStudents}%)</span></p>
        <p>Inativas: <span class="status-principal">${numOfInactiveStudents} (${perctOfInactiveStudents}%)</span></p>
        <p>Formadas: <span class="status-principal">Não há dados</span></p>
        <br>
        <p>Presença: <span class="status-principal">Não há dados</span></p>
        <p>Atrasos: <span class="status-principal">Não há dados</span></p>
      </div>
      <div class="sub-column total-score">
        <h3>Desempenho Geral:</h3>
        <p>Média: <span class="status-principal">${classAvgScore}%</span></p>
        <br>
        <p>Meta: <span class="status-principal">70%</span></p>
        <p>Acima da meta: <span class="status-principal">${numAboveAvg} (${aboveAvg})</span></p>
        <p>Abaixo da meta: <span class="status-principal">${numUnderAvg} (${underAvg})</span></p>
        <br>
      </div>
      <div class="sub-column detailed-score">
        <h3>Desempenho em Tech Skills:</h3>
        <p>Média: <span class="status-principal">${classTechAvgScore}%</span></p>
        <br>
        <p>Meta: <span class="status-principal">70%</span></p>
        <p>Acima da meta: <span class="status-principal">${numAboveAvgTech} (${aboveAvgTech}%)</span></p>
        <p>Abaixo da meta: <span class="status-principal">${numUnderAvgTech} (${underAvgTech}%)</span></p>
        <br>
        <h3>Desempenho em Soft Skills:</h3>
        <p>Média: <span class="status-principal">${classSoftAvgScore}%</span></p>
        <br>
        <p>Meta: <span class="status-principal">70%</span></p>
        <p>Acima da meta: <span class="status-principal">${numAboveAvgSoft} (${aboveAvgSoft}%)</span></p>
        <p>Abaixo da meta: <span class="status-principal">${numUnderAvgSoft} (${underAvgSoft}%)</span></p>
        <br>
      </div>
      <div class="sub-column team-score">
        <h3>Desempenho da Laboratória:</h3>
        <p>Net Promoter Score (NPS): <span class="status-principal">${npsScore}%</span></p>
        <p>Alunas satisfeitas: <span class="status-principal">${happyStudents}%</span></p>
        <br>
        <h3>Desempenho da Equipe:</h3>
        <p>Jedi Masters: <span class="status-principal">${jediMasterScore} / 5</span></p>
        <p>Mentores: <span class="status-principal">${mentorsScore} / 5</span></p>
      </div>
    </div>
  `
  var mainDashboard = document.createElement('div');
  mainDashboard.setAttribute('class', 'flexCol data')
  mainDashboard.innerHTML = template;
  document.getElementById('principal').appendChild(mainDashboard);
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
