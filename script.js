let timeRemaining = 300;
let score = 0;
let hintCount = 0;
const maxHints = 4;
let correctSuspect = Math.floor(Math.random() * 8); // Randomly choose one suspect
let currentClueIndex = 0;

const suspects = [
  {
    name: "Leslie 'The Locksmith'",
    backstory: `
      Leslie is a former safecracker who claims to have gone straight after a stint in prison. 
      Recently spotted arguing with the jewelry store owner over unpaid debts, Lesli's skills 
      and connections make her a prime suspect.
    `,
    clues: [
      "A faint trace of motor oil was detected on the vault door.",
      "A witness saw a woman with gloves moments before closing.",
      "A piece of wire was found near the safe.",
      "The vault showed signs of tampering consistent with expert safecracking.",
    ]
  },
  {
    name: "Briana 'The Ruby'",
    backstory: `
      Briana is a glamorous socialite known for her love of expensive jewelry. 
      She had an argument with the jeweler last week over a rare ruby necklace she couldn’t afford. 
      Some suspect she might have found another way to acquire it.
    `,
    clues: [
      "A fragment of silk was found snagged on a glass case.",
      "A faint scent of expensive perfume lingered in the air near the scene.",
      "A set of heel marks was found leading away from the store.",
      "One of the stolen items was a corundum necklace.",
    ]
  },
  {
    name: "Abel 'The Shadow'",
    backstory: `
      Abel is a known cat burglar with a record of high-profile heists. 
      He was spotted in town just days before the robbery, leading many to believe 
      he was scoping out his next big job.
    `,
    clues: [
      "A faint trace of shoe polish was found near the jewelry display.",
      "Security footage shows a figure moving across the store.",
      "A small grappling hook was found on the store’s rooftop.",
      "A set of climbing gloves was left behind near a broken window.",
    ]
  },
  {
    name: "Janet 'The Forger'",
    backstory: `
      Janet is an expert in creating counterfeit jewelry. While she has never been caught 
      stealing, she has been linked to underground dealings in fake gems. Her name was found 
      in the jeweler's appointment book.
    `,
    clues: [
      "A note with sketches of stolen items was found in the back room.",
      "Security footage shows a woman wearing sunglasses leaving the store before the robbery.",
      "A diamond not belonging to the store was left behind.",
      "A faint smell of acetone was present in the air."
    ]
  },
  {
    name: "Jared 'The Muscle'",
    backstory: `
      A former bouncer with a reputation for strong-arm tactics, Jared was seen arguing 
      with the jewelry store staff a day before the heist. He has the strength to break into safes 
      and the connections to fence stolen goods.
    `,
    clues: [
      "A faint trail of boot prints led to the back alley.",
      "Witnesses heard loud banging moments before the alarm was triggered.",
      "A broken crowbar was found near the back entrance.",
      "A handprint on the glass case matched someone with a large glove size.",
    ]
  },
  {
    name: "Sherine 'The Siren'",
    backstory: `
      Sherine is a con artist who uses her charm to distract her targets while accomplices 
      do the dirty work. She was seen chatting with the store owner just before closing time.
    `,
    clues: [
      "A witness mentioned hearing laughter and a soft voice just before the robbery.",
      "A strand of blonde hair was found near the scene.",
      "A lipstick-stained glass was found on the store counter.",
      "The store owner’s desk had an opened appointment book with her name."
    ]
  },
  {
    name: "Patrice 'The Planner' ",
    backstory: `
      Patrice is a mastermind known for planning intricate heists. 
      Though she often avoids direct involvement, her blueprints for past robberies have 
      been found in criminal investigations. She was seen entering a nearby café before the heist.
    `,
    clues: [
      "A crumpled note with a schedule of security shifts was discovered.",
      "An earpiece was found near the alley behind the store.",
      "The alarm system showed signs of tampering.",
      "A detailed blueprint of the store was found in a nearby dumpster."
    ]
  },
  {
    name: "Gabrielle 'The Ghost'",
    backstory: `
      Gabrielle is a master of disguise who can blend into any crowd. She was seen browsing 
      the jewelry store earlier that day, wearing an outfit that doesn’t match her usual appearance.
    `,
    clues: [
      "Security footage shows someone entering the store but did not catch that person leaving.",
      "A witness described someone with a trench coat and a large bag.",
      "A set of fake ID cards was found near the getaway route.",
      "A wig and glasses were found discarded near the store."
    ]
  }
];

const suspectsList = document.getElementById("suspects-list");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const hintText = document.getElementById("hint-text");
const endScreen = document.getElementById("end-screen");
const endMessage = document.getElementById("end-message");
const mainMenu = document.getElementById("game-container");
const suspectsPage = document.getElementById("suspects-page");
const suspectsButton = document.getElementById("suspects-button");
const backButton = document.getElementById("back-button");
const hintButton = document.getElementById("hint-button");

suspects.forEach((suspect, index) => {
  const suspectDiv = document.createElement("div");
  suspectDiv.classList.add("suspect");
  suspectDiv.innerHTML = `
    <h4>${suspect.name}</h4>
    <p>${suspect.backstory}</p>
    <button class="suspect-button" data-index="${index}">Accuse</button>
  `;
  suspectsList.appendChild(suspectDiv);
});

const timer = setInterval(() => {
  if (timeRemaining > 0) {
    timeRemaining--;
    timerDisplay.textContent = timeRemaining;
  } else {
    clearInterval(timer);
    endGame(false);
  }
}, 1000);

suspectsButton.addEventListener("click", () => {
  mainMenu.classList.add("hidden");
  suspectsPage.classList.remove("hidden");
});

backButton.addEventListener("click", () => {
  suspectsPage.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

hintButton.addEventListener("click", () => {
  if (hintCount < maxHints) {
    const hint = suspects[correctSuspect].clues[currentClueIndex];
    hintText.textContent = `Hint ${hintCount + 1}: ${hint}`;
    currentClueIndex = (currentClueIndex + 1) % suspects[correctSuspect].clues.length;
    hintCount++;
    score -= 5;
    scoreDisplay.textContent = score;
  } else {
    hintText.textContent = "No more hints available!";
  }
});

document.querySelectorAll(".suspect-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const suspectIndex = parseInt(event.target.dataset.index);
    if (suspectIndex === correctSuspect) {
      score += 15;
      endGame(true);
    } else {
      score -= 10;
      scoreDisplay.textContent = score;
      alert("Incorrect suspect! Try again.");
    }
  });
});

function endGame(won) {
  clearInterval(timer);
  mainMenu.classList.add("hidden");
  suspectsPage.classList.add("hidden");
  endScreen.classList.remove("hidden");

  const suspect = suspects[correctSuspect];
  endMessage.innerHTML = won
    ? `Congratulations! You caught the culprit: ${suspect.name}. <br> Final Score: ${score}`
    : `Time's up! The culprit was ${suspect.name}. <br> Final Score: ${score}`;
}
