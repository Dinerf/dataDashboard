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
  document.getElementById('dropdownBranch').addEventListener("click", dropdownBranch);
  // document.getElementById('dropdownClass').onclick = dropdownClass();
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
getClassData();
getSprintData();

//variáveis do menu dropdownSprint
var dropdownBranch;
var dropdownClass;
var dropdownSprint;
//variáveis para acessar o banco de dados
var branch;
var branchClass;
var sprint;
var numSprints;
var student;
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
//variáveis para cálculo de média em soft skills
var aboveAvgSoft;
var underAvgSoft;
var numAboveAvgSoft;
var numUnderAvgSoft;
//variáveis para obter desempenho da equipe Laboratória
var npsScore;
var exceedsExpectations;
var meetsExpectations;
var happyStudents;
var jediMasterScore;
var mentorsScore;

function dropdownBranch(event) {
  var theTarget = event.target.id;
  if (theTarget == 'aqp') {
    dropdownBranch = 'AQP';
  } else if (theTarget == 'cdmx') {
    dropdownBranch = 'CDMX';
  } else if (theTarget == 'lim') {
    dropdownBranch = 'LIM';
  } else if (theTarget == 'scl') {
    dropdownBranch = 'SCL';
  } else if (theTarget == 'spa') {
    dropdownBranch = 'SPA';
  }
  document.getElementById('headerBranch').innerHTML = document.getElementById(theTarget).textContent;
  return dropdownBranch;
}

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

function getClassData() {
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
  sprint = 0;

  //definir branch como o valor selecionado no dropdown de sede
  dropdownBranch = 'AQP';
  //definir branchClass como o valor selecionado no dropdown de turma
  dropdownClass = '2016-2';

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
          npsScore = happyStudents - rating[sp]['nps']['detractors'];
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
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts) / 1800) * 100);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts) / 1200) * 100);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / sprtAttendeesTechPts);
  underAvgTech = Math.round((numUnderAvgTech * 100) / sprtAttendeesTechPts);

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / sprtAttendeesSoftPts);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / sprtAttendeesSoftPts);

  //Cálculo de número de alunas acima / abaixo da média
  numAboveAvg = Math.round((numAboveAvgTech + numAboveAvgSoft) / 2);
  numUnderAvg = Math.round((numUnderAvgTech + numUnderAvgSoft) / 2);

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((aboveAvgTech + aboveAvgSoft) / 2);
  underAvg = Math.round((underAvgTech + underAvgSoft) / 2);

  //Porcentagem das alunas satisfeitas com a Laboratoria_RGB_logo
  happyStudents = exceedsExpectations + meetsExpectations;

  console.log('........................................................');
  console.log('........................................................');
  console.log('SE A PESSOA SELECIONAR SEDE>TURMA>SPRINT:');
  console.log('NÚMERO de estudantes: ' + numOfStudents);
  console.log('NÚMERO de estudantes ATIVAS: ' + numOfActiveStudents);
  console.log('NÚMERO de estudantes INATIVAS: ' + numOfInactiveStudents);
  console.log('% das estudantes ATIVAS: ' + perctOfActiveStudents + '%');
  console.log('% das estudantes INATIVAS: ' + perctOfInactiveStudents + '%');
  console.log('........................................................');
  console.log('MÉDIA GERAL da turma: ' + classAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da MÉDIA GERAL: ' + numAboveAvg);
  console.log('NÚMERO de alunas ABAIXO da MÉDIA GERAL: ' + numUnderAvg);
  console.log('% de alunas ACIMA da MÉDIA GERAL: ' + aboveAvg + '%');
  console.log('% de alunas ABAIXO da MÉDIA GERAL: ' + underAvg + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em TECH POINTS: ' + classTechAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em TECH SKILLS: ' + numAboveAvgTech);
  console.log('NÚMERO de alunas ABAIXO da média em TECH SKILLS: ' + numUnderAvgTech);
  console.log('% de alunas ACIMA da média em TECH SKILLS: ' + aboveAvgTech + '%');
  console.log('% de alunas ABAIXO da média em TECH SKILLS: ' + underAvgTech + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em SOFT POINTS: ' + classSoftAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em SOFT SKILLS: ' + numAboveAvgSoft);
  console.log('NÚMERO de alunas ABAIXO da média em SOFT SKILLS: ' + numUnderAvgSoft);
  console.log('% de alunas ACIMA da média em SOFT SKILLS: ' + aboveAvgSoft + '%');
  console.log('% de alunas ABAIXO da média em SOFT SKILLS: ' + underAvgSoft + '%');
  console.log('........................................................');
  console.log('% de NPS da Laboratória: ' + npsScore + '%');
  console.log('% de alunas SATISFEITAS com a Laboratória: ' + happyStudents + '%');
  console.log('DESEMPENHO dos JEDI MASTERS: ' + jediMasterScore);
  console.log('DESEMPRENHO dos MENTORES: ' + mentorsScore);
}

function getClassData() {
  numOfStudents = 0;
  numOfActiveStudents = 0;
  numOfInactiveStudents = 0;

  techPointsSum = 0;
  softPointsSum = 0;
  numOfScores = 0;
  sprtAttendeesTechPts = 0;
  sprtAttendeesSoftPts = 0;
  numAboveAvgTech = 0;
  numInAvgTech = 0;
  numUnderAvgTech = 0;
  numAboveAvgSoft = 0;
  numInAvgSoft = 0;
  numUnderAvgSoft = 0;
  aboveAvgSum = 0;
  inAvgSum = 0;
  underAvgSum = 0;
  sprint = 0;

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

        //pega o número de estudantes dessa turma
        if (branch === dropdownBranch && branchClass === dropdownClass) {
          numOfStudents += 1;

          //calcula o número de estudantes ativas e inativas desse sprint
          if (student['active'] === true) {
            numOfActiveStudents += 1;
          } else if (student['active'] === false) {
            numOfInactiveStudents += 1;
          }

          //Pega dados para calcular a média de tech points da turma
          for (sp in student['sprints']) {
            techPoints = student['sprints'][sp]['score']['tech'];
            techPointsSum += techPoints;
            sprtAttendeesTechPts += 1;

//-------------------------------------------------------------------------------------------------
//PAREI AQUI, CONTINUAR A CALCULAR O DESEMPENHO DAS ALUNAS EM TECHSKILLS E SOFTSKILLS DIVIDIDOS PELO
//NÚMERO TOTAL DE SPRINTS. DO JEITO QUE TÁ, ESTÁ SOMANDO TODOS OS DADOS, RESULTANDO EM 60 ALUNAS E
//NÃO 15 POIS FORAM 4 sprints
//--------------------------------------------------------------------------------------------------
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
          }
        }
      }

      //Soma do número de supera / cumpre / no-supera da turma em todos os sprints na média geral
      rating = data[dropdownBranch][dropdownClass]['ratings'];
      for (sp in rating) {
        if (branch === dropdownBranch && branchClass === dropdownClass) {
          exceedsExpectations = rating[sp]['student']['supera'];
          meetsExpectations = rating[sp]['student']['cumple'];

          //Pegando dados de avaliação da Laboratória
          npsScore = happyStudents - rating[sp]['nps']['detractors'];
          jediMasterScore = rating[sp]['jedi'];
          mentorsScore = rating[sp]['teacher'];

          //Calculando o númer de sprints total de uma TURMA
          sprint += 1;
        }
      }
    }
  }

  //Cálculo da porcentagem das alunas ativas e inativas
  perctOfActiveStudents = Math.round((numOfActiveStudents * 100) / numOfStudents);
  perctOfInactiveStudents = Math.round((numOfInactiveStudents * 100) / numOfStudents);

  //Cálculo da média de tech skills da turma
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts) / 1800) * 100);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts) / 1200) * 100);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / sprtAttendeesTechPts);
  underAvgTech = Math.round((numUnderAvgTech * 100) / sprtAttendeesTechPts);

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / sprtAttendeesSoftPts);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / sprtAttendeesSoftPts);

  //Cálculo de número de alunas acima / abaixo da média
  numAboveAvg = Math.round((numAboveAvgTech + numAboveAvgSoft) / 2);
  numUnderAvg = Math.round((numUnderAvgTech + numUnderAvgSoft) / 2);

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((aboveAvgTech + aboveAvgSoft) / 2);
  underAvg = Math.round((underAvgTech + underAvgSoft) / 2);

  //Porcentagem das alunas satisfeitas com a Laboratoria_RGB_logo
  happyStudents = exceedsExpectations + meetsExpectations;

  console.log('........................................................');
  console.log('........................................................');
  console.log('SE A PESSOA SELECIONAR SEDE>TURMA:');
  console.log('NÚMERO de estudantes: ' + numOfStudents);
  console.log('NÚMERO de estudantes ATIVAS: ' + numOfActiveStudents);
  console.log('NÚMERO de estudantes INATIVAS: ' + numOfInactiveStudents);
  console.log('% das estudantes ATIVAS: ' + perctOfActiveStudents + '%');
  console.log('% das estudantes INATIVAS: ' + perctOfInactiveStudents + '%');
  console.log('........................................................');
  console.log('MÉDIA GERAL da turma: ' + classAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da MÉDIA GERAL: ' + numAboveAvg);
  console.log('NÚMERO de alunas ABAIXO da MÉDIA GERAL: ' + numUnderAvg);
  console.log('% de alunas ACIMA da MÉDIA GERAL: ' + aboveAvg + '%');
  console.log('% de alunas ABAIXO da MÉDIA GERAL: ' + underAvg + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em TECH POINTS: ' + classTechAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em TECH SKILLS: ' + numAboveAvgTech);
  console.log('NÚMERO de alunas ABAIXO da média em TECH SKILLS: ' + numUnderAvgTech);
  console.log('% de alunas ACIMA da média em TECH SKILLS: ' + aboveAvgTech + '%');
  console.log('% de alunas ABAIXO da média em TECH SKILLS: ' + underAvgTech + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em SOFT POINTS: ' + classSoftAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em SOFT SKILLS: ' + numAboveAvgSoft);
  console.log('NÚMERO de alunas ABAIXO da média em SOFT SKILLS: ' + numUnderAvgSoft);
  console.log('% de alunas ACIMA da média em SOFT SKILLS: ' + aboveAvgSoft + '%');
  console.log('% de alunas ABAIXO da média em SOFT SKILLS: ' + underAvgSoft + '%');
  console.log('........................................................');
  console.log('% de NPS da Laboratória: ' + npsScore + '%');
  console.log('% de alunas SATISFEITAS com a Laboratória: ' + happyStudents + '%');
  console.log('DESEMPENHO dos JEDI MASTERS: ' + jediMasterScore);
  console.log('DESEMPRENHO dos MENTORES: ' + mentorsScore);
}

//DINE, ESSA FUNÇÃO AQUI ESTÁ PRONTA, JÁ DÁ PRA INSERIR ELA NO HTML E USAR ELA NO DROPDOWN
// QUE SELECIONE TUDO, OU SEJA, SEDE>TURMA>SPRINT. TESTEI AQUI DE SUBSTITUIR AS VARIÁVEIS
// 'dropdownBranch', 'dropdownClass' E 'dropdownSprint' POR QUALQUER COMBINAÇÃO DO DATA.JS
//E FUNCIONOU, PEGOU OS DADOS CORRETAMENTE... ENTÃO SUCESSO!
//AH, PRA FACILITAR DE COLOCAR NO HTML, ORGANIZEI O CONSOLE.LOG DE TODAS AS VARIÁVEIS E A QUE
//DADO ELA SE REFERE

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

  //definir branch como o valor selecionado no dropdown de sede
  dropdownBranch = 'AQP';
  //definir branchClass como o valor selecionado no dropdown de turma
  dropdownClass = '2017-1';
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
          npsScore = happyStudents - rating[sp]['nps']['detractors'];
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
  classTechAvgScore = Math.round(((techPointsSum / sprtAttendeesTechPts) / 1800) * 100);

  //Cálculo da média de soft skills da turma
  classSoftAvgScore = Math.round(((softPointsSum / sprtAttendeesSoftPts) / 1200) * 100);

  //Cálculo da média geral da turma:
  classAvgScore = Math.round((classTechAvgScore + classSoftAvgScore) / 2);

  //Cálculo de alunas acima / abaixo da média em TechSkills em porcentagem
  aboveAvgTech = Math.round((numAboveAvgTech * 100) / sprtAttendeesTechPts);
  underAvgTech = Math.round((numUnderAvgTech * 100) / sprtAttendeesTechPts);

  //Cálculo de alunas acima / abaixo da média em Softskills em porcentagem
  aboveAvgSoft = Math.round((numAboveAvgSoft * 100) / sprtAttendeesSoftPts);
  underAvgSoft = Math.round((numUnderAvgSoft * 100) / sprtAttendeesSoftPts);

  //Cálculo de número de alunas acima / abaixo da média
  numAboveAvg = Math.round((numAboveAvgTech + numAboveAvgSoft) / 2);
  numUnderAvg = Math.round((numUnderAvgTech + numUnderAvgSoft) / 2);

  //Cálculo de porcentagem de alunas acima / abaixo da média
  aboveAvg = Math.round((aboveAvgTech + aboveAvgSoft) / 2);
  underAvg = Math.round((underAvgTech + underAvgSoft) / 2);

  //Porcentagem das alunas satisfeitas com a Laboratoria_RGB_logo
  happyStudents = exceedsExpectations + meetsExpectations;

  console.log('........................................................');
  console.log('........................................................');
  console.log('SE A PESSOA SELECIONAR SEDE>TURMA>SPRINT:');
  console.log('NÚMERO de estudantes: ' + numOfStudents);
  console.log('NÚMERO de estudantes ATIVAS: ' + numOfActiveStudents);
  console.log('NÚMERO de estudantes INATIVAS: ' + numOfInactiveStudents);
  console.log('% das estudantes ATIVAS: ' + perctOfActiveStudents + '%');
  console.log('% das estudantes INATIVAS: ' + perctOfInactiveStudents + '%');
  console.log('........................................................');
  console.log('MÉDIA GERAL da turma: ' + classAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da MÉDIA GERAL: ' + numAboveAvg);
  console.log('NÚMERO de alunas ABAIXO da MÉDIA GERAL: ' + numUnderAvg);
  console.log('% de alunas ACIMA da MÉDIA GERAL: ' + aboveAvg + '%');
  console.log('% de alunas ABAIXO da MÉDIA GERAL: ' + underAvg + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em TECH POINTS: ' + classTechAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em TECH SKILLS: ' + numAboveAvgTech);
  console.log('NÚMERO de alunas ABAIXO da média em TECH SKILLS: ' + numUnderAvgTech);
  console.log('% de alunas ACIMA da média em TECH SKILLS: ' + aboveAvgTech + '%');
  console.log('% de alunas ABAIXO da média em TECH SKILLS: ' + underAvgTech + '%');
  console.log('........................................................');
  console.log('MÉDIA da turma em SOFT POINTS: ' + classSoftAvgScore + '%');
  console.log('NÚMERO de alunas ACIMA da média em SOFT SKILLS: ' + numAboveAvgSoft);
  console.log('NÚMERO de alunas ABAIXO da média em SOFT SKILLS: ' + numUnderAvgSoft);
  console.log('% de alunas ACIMA da média em SOFT SKILLS: ' + aboveAvgSoft + '%');
  console.log('% de alunas ABAIXO da média em SOFT SKILLS: ' + underAvgSoft + '%');
  console.log('........................................................');
  console.log('% de NPS da Laboratória: ' + npsScore + '%');
  console.log('% de alunas SATISFEITAS com a Laboratória: ' + happyStudents + '%');
  console.log('DESEMPENHO dos JEDI MASTERS: ' + jediMasterScore);
  console.log('DESEMPRENHO dos MENTORES: ' + mentorsScore);
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
