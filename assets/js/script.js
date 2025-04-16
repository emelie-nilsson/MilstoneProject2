document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const grid = document.querySelector(".game_grid");
  const restartbtn = document.getElementById("restart_btn");
  const moveCounter = document.getElementById("move_counter");
  const timer = document.getElementById("timer");

  const muteButton = document.getElementById("mute-button");

  // Audio setting
let isMuted = false;

if (muteButton) {
  /**
   * Toggles the mute setting and updates the text on the button.
   * 
   * @event click
   * @returns {void}
   */
  muteButton.addEventListener("click", () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? "🔇 Sound on" : "🔈 Sound off";
  });
}

  // Game state variables
  let flippedCards = [];
  let moves = 0;
  let lockBoard = false;
  let seconds = 0;
  let interval;
  let timerStarted = false;
  let matchedPairs = 0;

  // Array of image paths
  const images = [
    "assets/image/cat.jpg",
    "assets/image/chick.jpg",
    "assets/image/cow.jpg",
    "assets/image/dog.jpg",
    "assets/image/duck.jpg",
    "assets/image/goat.jpg",
    "assets/image/horse.jpg",
    "assets/image/pig.jpg",
    "assets/image/rooster.jpg",
    "assets/image/sheep.jpg"
  ];

  // Map image filenames to sound file paths
  const soundMap = {
    "cat.jpg": "assets/sounds/cat.mp3",
    "chick.jpg": "assets/sounds/chick.mp3",
    "cow.jpg": "assets/sounds/cow.mp3",
    "dog.jpg": "assets/sounds/dog.mp3",
    "duck.jpg": "assets/sounds/duck.mp3",
    "goat.jpg": "assets/sounds/goat.mp3",
    "horse.jpg": "assets/sounds/horse.mp3",
    "pig.jpg": "assets/sounds/pig.mp3",
    "rooster.jpg": "assets/sounds/rooster.mp3",
    "sheep.jpg": "assets/sounds/sheep.mp3"
  };

  // Use first 10 images and duplicate to make pairs (total 20 cards)
  const selectedImages = images.slice(0, 10);
  let cards = [...selectedImages, ...selectedImages];

  
  /**
   * Starts the timer and updates every second.
   * 
   * @returns {void}
   */
  function startTimer() {
    interval = setInterval(() => {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      timer.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  /**
   * Checks if the two flipped cards are a match.
   * If so, marks them as a match.
   * If all pairs are matched, win modal shows.
   * Otherwise, flips the cards back afer a delay.
   * 
   * @returns {void}
   */
  function checkMatch() {
    const [first, second] = flippedCards;

    if (first.img.src === second.img.src) {
      // Match found
      first.card.classList.add("matched");
      second.card.classList.add("matched");
      matchedPairs++;

      if (matchedPairs === 10) {
        clearInterval(interval);
        document.getElementById("winModal").style.display = "block";
      }
    } else {
      setTimeout(() => {
        first.card.classList.remove("flip");
        second.card.classList.remove("flip");
      }, 800);
    }

    // Reset for next move
    flippedCards = [];
    moves++;
    moveCounter.textContent = moves;
    lockBoard = false;
  }
/** 
 * Creats memory cards and adds them to the game grid.
 * Adds click event listeners to each card.
 * 
 * @returns {void}
*/
  function createCards() {
    cards.forEach((imgSrc) => {
      const card = document.createElement("div");
      card.classList.add("memory-card");

      const frontImg = document.createElement("img");
      frontImg.src = imgSrc;
      frontImg.alt = "Farm animal";
      frontImg.classList.add("front-face");
      
      const backImg = document.createElement("img");
      backImg.src = "assets/image/card-front.jpg";
      backImg.alt = "Card back";
      backImg.classList.add("back-face");
      
      card.appendChild(frontImg);
      card.appendChild(backImg);
      
      /**
       * When a card is clicked, it flipps, sound plays and match is checked.
       * 
       * @event click
       * @returns {void}
       */
      card.addEventListener("click", () => {
        if (lockBoard || card.classList.contains("flip") || card.classList.contains("matched")) return;
      
        if (!timerStarted) {
          timerStarted = true;
          startTimer();
        }
      
        card.classList.add("flip");
        flippedCards.push({ card, img: frontImg });
      
        const fileName = frontImg.src.split("/").pop();
        const soundPath = soundMap[fileName];

          if (soundPath && !isMuted) {
            const sound = new Audio(soundPath);
            sound.play();
          }
      
        if (flippedCards.length === 2) {
          lockBoard = true;
          setTimeout(checkMatch, 800);
        }
      });
      
      grid.appendChild(card);
    });
  }
/**
 * Reset the whole game (timer, move counter, board, cards).
 * 
 * @returns {void}
 */
  function resetGame() {
    clearInterval(interval);
    seconds = 0;
    timer.textContent = "00:00";
    timerStarted = false;
    matchedPairs = 0;
    moves = 0;
    moveCounter.textContent = "0";
    flippedCards = [];
    lockBoard = false;

    cards.sort(() => Math.random() - 0.5);
    grid.innerHTML = "";
    createCards();

    document.getElementById("winModal").style.display = "none";
  }
/**
 * Restarts the game when restart botton is clicked.
 * 
 * @event click
 */
  restartbtn.addEventListener("click", resetGame);

  resetGame();

 /**
  * Closes the win modal when the close button id clicked.
  * 
  * @event click
  */
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("winModal").style.display = "none";
    resetGame();
  });
});