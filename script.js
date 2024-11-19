let spelerNaam = "";
let huidigThema = null;
let huidigeVraagIndex = 0;
let score = 0;
let timer;
let tijdOver = 15;
let vragenData = {};

// Functie om de quiz te starten (User Story 1 en 2)
function startQuiz(startTimer) {
  spelerNaam = document.getElementById("spelerNaam").value;
  document.getElementById("speler").innerText = spelerNaam;
  document.getElementById("welkomPagina").style.display = "none";
  document.getElementById("themaPagina").style.display = "block";
  laadThemas();
}

// Laad de thema's uit de JSON file (User Story 3)
async function laadThemas() {
  const response = await fetch('vragen.json');
  vragenData = await response.json();

  const themaKnoppen = document.getElementById("themaKnoppen");
  vragenData.themas.forEach((thema, index) => {
    const knop = document.createElement("button");
    knop.innerText = thema.naam;
    knop.onclick = () => kiesThema(index);
    themaKnoppen.appendChild(knop);
  });
}

// Functie om een thema te kiezen
function kiesThema(themaIndex) {
  huidigThema = vragenData.themas[themaIndex];
  document.getElementById("themaPagina").style.display = "none";
  document.getElementById("quizPagina").style.display = "block";
  document.getElementById("teamNaam").innerText = spelerNaam;
  laadVraag();
}

// Functie om de vraag te laden (User Story 4, 5 en 7)
function laadVraag() {
  if (huidigeVraagIndex >= huidigThema.vragen.length) {
    eindigQuiz();
    return;
  }
  
  tijdOver = 15;
  document.getElementById("timer").innerText = tijdOver;
  startTimer();

  const vraagData = huidigThema.vragen[huidigeVraagIndex];
  document.getElementById("quizVraag").innerText = vraagData.vraag;
  document.getElementById("quizAfbeelding").src = vraagData.afbeelding;
  
  // Shuffle antwoorden
  const antwoorden = vraagData.antwoorden.sort(() => Math.random() - 0.5);
  const antwoordenKnoppen = document.getElementById("antwoordenKnoppen");
  antwoordenKnoppen.innerHTML = "";

  antwoorden.forEach(antwoord => {
    const knop = document.createElement("button");
    knop.innerText = antwoord.antwoord;
    knop.onclick = () => controleerAntwoord(antwoord.correct);
    antwoordenKnoppen.appendChild(knop);
  });
}

// Start de timer voor elke vraag (User Story 5)
function startTimer() {
  timer = setInterval(() => {
    tijdOver--;
    document.getElementById("timer").innerText = tijdOver;
    if (tijdOver <= 0) {
      controleerAntwoord(false);
    }
  }, 1000);
}

// Controleer het antwoord en verhoog de score indien correct
function controleerAntwoord(correct) {
  clearInterval(timer);
  if (correct) {
    score++;
  }
  huidigeVraagIndex++;
  laadVraag();
}

// Eindig de quiz en toon het scorebord (User Story 8, 9 en 10)
function eindigQuiz() {
  document.getElementById("quizPagina").style.display = "none";
  document.getElementById("eindPagina").style.display = "block";
  document.getElementById("eindSpelerNaam").innerText = spelerNaam;
  document.getElementById("score").innerText = score;

  // Toon de score in een fictief scoreboard
  // Voor verdere verbetering kan je hier localStorage gebruiken
}

// Opnieuw starten of nieuw thema kiezen (User Story 11)
function opnieuwSpelen() {
  huidigeVraagIndex = 0;
  score = 0;
  document.getElementById("eindPagina").style.display = "none";
  document.getElementById("themaPagina").style.display = "block";
}
