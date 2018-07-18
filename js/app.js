window.onload = loadFunctions();

function loadFunctions() {
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
    team.style.display = 'block';
    principal.style.display = 'none';
    students.style.display = 'none';
  }
}
//variáveis do menu dropdownSprint
var dropdownBranch;
var dropdownClass;
var dropdownSprint;
//variáveis para acessar o banco de dados
var numSprints;
var numClasses;
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
var numAboveAvg;
var numUnderAvg;
var noPoints;
var noPointsPercent;
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
//Define sede selecionada e ativa/desativa botões de turma e sprint
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
  loadPrincipalData();
  clearCards();
  validateStudentCards();
}
//Observa sede/turma/sprint selecionado e chama função para pegar dados correspondentes
function loadPrincipalData() {
  dropdownClass = document.getElementById('headerClass').textContent;
  dropdownSprint = document.getElementById('headerSprint').textContent;
  document.getElementById('principal').style.display = 'flex';
  students.style.display = 'none';
  team.style.display = 'none';
  if (dropdownBranch !== 'SPA' && dropdownClass !== 'Turma' && dropdownSprint !== 'Sprint') {
    getSprintData();
  } else if (dropdownBranch !== 'SPA' && dropdownClass !== 'Turma' && dropdownSprint === 'Sprint') {
    getClassData();
  } else if (dropdownBranch !== 'SPA' && dropdownClass === 'Turma' && dropdownSprint === 'Sprint') {
    getBranchData();
  } else {
    document.getElementById('principal').style.display = 'none';
  }
}
// Função retorna o menu de classes ao estado inicial vazio
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
// Função cria menu de classes
var headerClass
function dropdownClasses() {
  for (var classes in data[dropdownBranch]) {
    var classesMenu = document.createElement('li');
    classesMenu.setAttribute('class', 'classesMenu');
    classesMenu.textContent = classes;
    document.getElementById('dropdownClass').appendChild(classesMenu);
  }
}
// Função altera display do cabeçalho para classe selecionada
function selectClass(event) {
  document.getElementById('headerClass').textContent = event.target.textContent;
  clearCards();
  validateStudentCards();
  loadPrincipalData()
}
// Função cria menu de sprints
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
// Função altera display do cabeçalho para classe selecionada
function selectSprint(event) {
  document.getElementById('headerSprint').textContent = event.target.textContent;
  loadPrincipalData();
}
// Função retorna o menu de sprint ao estado inicial vazio
function clearSprint() {
  var clearDropdownSprint = document.getElementById('dropdownSprint');
  var clearSprint = document.getElementById('selectedSprint');
  clearSprint.removeChild(clearDropdownSprint);
  var dropdownSprint = document.createElement('ul');
  dropdownSprint.setAttribute('id', 'dropdownSprint');
  document.getElementById('selectedSprint').appendChild(dropdownSprint);
  document.getElementById('headerSprint').textContent = "Sprint";
}
// Função pega todos os dados do escopo sede
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
  classAvgScore = 0;

  for (var branch in data) {
    for (var branchClass in data[branch]) {
      for (var s in data[branch][branchClass]['students']) {
        var student = data[branch][branchClass]['students'][s];
        //Calculando o número total de alunas
        if (branch === dropdownBranch) {
          numOfStudents += 1;
          //calcula o número de estudantes ativas e inativas dessa turma
          if (student['active'] === true) {
            numOfActiveStudents += 1;
          } else if (student['active'] === false) {
            numOfInactiveStudents += 1;
          }
          // Pega dados para calcular a média de tech points da turma
          for (sp in student['sprints']) {
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
      var rating = data[branch][branchClass]['ratings'];
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
          var sprint = data[branch][branchClass]['students'][st]['sprints'];
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
          if (sumTechPointsStudent >= 0 && sumSoftPointsStudent >= 0) {
          classAvgScore += sumTechPointsStudent + sumSoftPointsStudent;
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
  //Cálculo da média de pontos da média de pontos das alunas em soft + tech skills
  classAvgScore = Math.round(((classAvgScore / (numAboveAvg + numUnderAvg)) * 100 ) / 3000);
  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / numOfStudents);
  underAvgTech = Math.round((numUnderAvgTech * 100) / numOfStudents);
  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / numOfStudents);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / numOfStudents);
  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / numOfStudents);
  underAvg = Math.round((numUnderAvg * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede
  noPoints = numOfStudents - (numAboveAvg + numUnderAvg);
  //Cálculo da porcentagem de alunas que não ponturaram na sede
  noPointsPercent = Math.round((noPoints * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em TechSkills
  noPointsTech = numOfStudents - (numAboveAvgTech + numUnderAvgTech);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em TechSkills
  noPointsTechPercent = Math.round((noPointsTech * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em SoftSkills
  noPointsSoft = numOfStudents - (numAboveAvgSoft + numUnderAvgSoft);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em SoftSkills
  noPointsSoftPercent = Math.round((noPointsSoft * 100) / numOfStudents);
  dashbTitle = dashbBranchTitle + ':';
  createMainDashboard();
}
// Função pega todos os dados do escopo turma
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

  for (var branch in data) {
    for (var branchClass in data[branch]) {
      for (var s in data[branch][branchClass]['students']) {
        var student = data[branch][branchClass]['students'][s];
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
      var rating = data[dropdownBranch][dropdownClass]['ratings'];
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
          var sprint = data[branch][branchClass]['students'][st]['sprints'];
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
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / numOfStudents);
  underAvgTech = Math.round((numUnderAvgTech * 100) / numOfStudents);
  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / numOfStudents);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / numOfStudents);
  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / numOfStudents);
  underAvg = Math.round((numUnderAvg * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede
  noPoints = numOfStudents - (numAboveAvg + numUnderAvg);
  //Cálculo da porcentagem de alunas que não ponturaram na sede
  noPointsPercent = Math.round((noPoints * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em TechSkills
  noPointsTech = numOfStudents - (numAboveAvgTech + numUnderAvgTech);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em TechSkills
  noPointsTechPercent = Math.round((noPointsTech * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em SoftSkills
  noPointsSoft = numOfStudents - (numAboveAvgSoft + numUnderAvgSoft);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em SoftSkills
  noPointsSoftPercent = Math.round((noPointsSoft * 100) / numOfStudents);
  dashbClassTitle = dropdownClass;
  dashbTitle = dashbBranchTitle + ': ' + dashbClassTitle + ':';
  createMainDashboard();
}
// Função pega todos os dados do escopo sprint
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

  for (var branch in data) {
    for (var branchClass in data[branch]) {
      for (var s in data[branch][branchClass]['students']) {
        var student = data[branch][branchClass]['students'][s];
        //pega o número de estudantes desse sprint
        if (branch === dropdownBranch && branchClass === dropdownClass) {
          numOfStudents += 1;
          //calcula o número de estudantes ativas e inativas desse sprint
          if (student['active'] === true) {
            numOfActiveStudents += 1;
          } else if (student['active'] === false) {
            numOfInactiveStudents += 1;
          }
        }

        for (sp in student['sprints']) {
          //pega o número de estudantes desse sprint
          if (branch === dropdownBranch && branchClass === dropdownClass && student['sprints'][sp]['number'] === dropdownSprint) {
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
      var rating = data[dropdownBranch][dropdownClass]['ratings'];
      for (sp in rating) {
        if (branch === dropdownBranch && branchClass === dropdownClass && data[branch][branchClass]['ratings'][sp]['sprint'] === dropdownSprint) {
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
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / numOfStudents);
  underAvgTech = Math.round((numUnderAvgTech * 100) / numOfStudents);
  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / numOfStudents);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / numOfStudents);
  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((numAboveAvg * 100) / numOfStudents);
  underAvg = Math.round((numUnderAvg * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede
  noPoints = numOfStudents - (numAboveAvg + numUnderAvg);
  //Cálculo da porcentagem de alunas que não ponturaram na sede
  noPointsPercent = Math.round((noPoints * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em TechSkills
  noPointsTech = numOfStudents - (numAboveAvgTech + numUnderAvgTech);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em TechSkills
  noPointsTechPercent = Math.round((noPointsTech * 100) / numOfStudents);
  //Cálculo do número de alunas que não ponturaram na sede em SoftSkills
  noPointsSoft = numOfStudents - (numAboveAvgSoft + numUnderAvgSoft);
  //Cálculo da porcentagem de alunas que não ponturaram na sede em SoftSkills
  noPointsSoftPercent = Math.round((noPointsSoft * 100) / numOfStudents);
  //Porcentagem das alunas satisfeitas com a Laboratoria
  happyStudents = exceedsExpectations + meetsExpectations;
  dashbSprintTitle = dropdownSprint;
  dashbClassTitle = dropdownClass;
  dashbTitle = dashbBranchTitle + ': ' + dashbClassTitle + ': Sprint ' + dashbSprintTitle + ':';
  createMainDashboard();
}
// Função cria página geral e equipe com os dados selecionados
function createMainDashboard() {
  document.getElementById('dashbTitle').textContent = dashbTitle;
  document.getElementById('dashTeamTitle').textContent = dashbTitle;
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
  npsScoreChart();
  happyStudentsChart();
  jediMasterScoreChart();
  mentorsScoreChart();
}

var studentPhoto;
var studentName;
var studentOffice;
var studentClass;
var studentStatus;
var techMedia;
var softMedia;
//Função pega dados para os cards das alunas
function showStudentsCards() {
  for (var office in data) {
    studentOffice = office;
    if (studentOffice === 'AQP') {
      studentOffice = 'Arequipa';
    } else if (studentOffice === 'CDMX') {
      studentOffice = 'Cidade do Mexico';
    } else if (studentOffice === 'LIM') {
      studentOffice = 'Lima';
    } else if (studentOffice === 'SCL') {
      studentOffice = 'Santiago';
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
  clearCards();
  validateStudentCards();
}
// Função cria os cards das alunas e exibe na tela
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
// Função filtra cards das alunas
function validateStudentCards() {
  var studentCards = document.querySelectorAll('.studentCard');
  var validateBranch = document.getElementById('headerBranch').textContent;
  var validateClass = document.getElementById('headerClass').textContent;
  if (validateBranch !== 'São Paulo') {
    for (card of studentCards) {
      var branch = card.getElementsByClassName('country');
      for (i of branch) {
        if(i.textContent !== validateBranch){
          card.style.display = 'none';
        }
      }
    }
  }
  if (validateClass !== 'Turma') {
    for (card of studentCards) {
      var classes = card.getElementsByClassName('class');
      for (i of classes) {
        if(i.textContent !== validateClass){
          card.style.display = 'none';
        }
      }
    }
  }  
}
// Função limpa seleção anterior de filtro nos cards das alunas
function clearCards() {
  var studentCards = document.querySelectorAll('.studentCard');
  for(card of studentCards) {
    card.style.display = 'flex';    
  }
}
// Função cria gráfico de alunas ativas/inativas
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
// Função cria gráfico de media geral
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
      labels : [classAvgScore + '%', '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA GERAL', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70
    }
  });
}
// Função cria gráfico de media tech skills
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
      labels : [classTechAvgScore + '%', '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA TECH SKILLS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
// Função cria gráfico de media soft skills
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
      labels : [classSoftAvgScore + '%', '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'MÉDIA SOFT SKILLS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
// Função cria gráfico de desempenho geral
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
// Função cria gráfico de desempenho tech
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
// Função cria gráfico de desempenho soft
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
// Função cria gráfico de NPS
function npsScoreChart() {
  var npsScore = document.getElementById('npsScore').textContent;
  var npsScoreChart = document.getElementById('npsScoreChart').getContext('2d');
  var thenpsScoreChart = new Chart(npsScoreChart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [npsScore, 100 - npsScore],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [npsScore + '%', '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'NET PROMOTER SCORE (NPS)', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
// Função cria gráfico de satisfação das alunas
function happyStudentsChart() {
  var happyStudents = document.getElementById('happyStudents').textContent;
  var happyStudentsChart = document.getElementById('happyStudentsChart').getContext('2d');
  var thehappyStudentsChart = new Chart(happyStudentsChart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [happyStudents, 100 - happyStudents],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [happyStudents + '%', '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'ALUNAS SATISFEITAS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
// Função cria gráfico de desempenho jedi
function jediMasterScoreChart() {
  var jediMasterScore = document.getElementById('jediMasterScore').textContent;
  var jediMasterScoreChart = document.getElementById('jediMasterScoreChart').getContext('2d');
  var thejediMasterScoreChart = new Chart(jediMasterScoreChart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [jediMasterScore, Math.round(5 - jediMasterScore)],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [jediMasterScore, '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'DESEMPENHO JEDIS', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
// Função cria gráfico de desempenho mentores
function mentorsScoreChart() {
  var mentorsScore = document.getElementById('mentorsScore').textContent;
  var mentorsScoreChart = document.getElementById('mentorsScoreChart').getContext('2d');
  var thementorsScoreChart = new Chart(mentorsScoreChart, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [mentorsScore, Math.round(5 - mentorsScore)],
        backgroundColor: ['rgba(255, 0, 158, 1)'],
      }],
      labels : [mentorsScore, '']
    },
    options: {
      legend: {display: true, position: 'bottom', reverse: true},
      title: {display: true, text: 'DESEMPENHO MENTORES', fontColor: 'rgba(0, 0, 0, 1)', fontSize: 16, fontFamily: 'sans-serif'},
      cutoutPercentage: 70,
    }
  });
}
