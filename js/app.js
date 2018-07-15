// Pensei em trabalharmos como micro-funções separadas pra gente
// não se confundir. Então ao entrar na página, chamaríamos a loadFunctions
// e dentro dela vão todas as funções que serão carregadas, eventos etc

<<<<<<< HEAD





// Puedes hacer uso de la base de datos a través de la variable `data`
console.log(data);
=======
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
    principal.style.display = 'block';
    students.style.display = 'none';
    team.style.display = 'none';
  } else if (selectedTab === 'tab-students') {
    students.style.display = 'block';
    principal.style.display = 'none';
    team.style.display = 'none';
  } else if (selectedTab === 'tab-team') {
    team.style.display = 'block';
    principal.style.display = 'none';
    students.style.display = 'none';
  }
}
>>>>>>> 9b925e676cfa3b0af714832278e4a28c1487a7f9
