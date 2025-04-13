document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const grid = document.querySelector(".game_grid");
  const restartbtn = document.getElementById("restart_btn");
  const moveCounter = document.getElementById("move_counter");
  const timer = document.getElementById("timer");

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

  // Use first 10 images and duplicate to make pairs (total 20 cards)
  const selectedImages = images.slice(0, 10);
  let cards = [...selectedImages, ...selectedImages];

  // Timer function, updates every second
  function startTimer() {
    interval = setInterval(() => {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      timer.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  // Check if the two flipped cards match
  function checkMatch() {
    const [first, second] = flippedCards;

    if (first.img.src === second.img.src) {
      // It's a match!
      first.card.classList.add("matched");
      second.card.classList.add("matched");
      matchedPairs++;

      // Check if all pairs are matched
      if (matchedPairs === 10) {
        clearInterval(interval);
        document.getElementById("winModal").style.display = "block";
      }
    } else {
      // Not a match – hide both images
      first.img.style.display = "none";
      second.img.style.display = "none";
    }

    // Reset for next turn
    flippedCards = [];
    moves++;
    moveCounter.textContent = moves;
    lockBoard = false;
  }

  // Create all cards and add to game board
  function createCards() {
    cards.forEach((imgSrc) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Farm animal";
      img.style.display = "none";
      img.classList.add("card-image");

      // Handle card click
      card.addEventListener("click", () => {
        // Don't allow clicking if the board is locked, card already flipped, or matched
        if (lockBoard || img.style.display === "block" || card.classList.contains("matched")) return;

        // Start timer on first click
        if (!timerStarted) {
          timerStarted = true;
          startTimer();
        }

        // Show the card image
        img.style.display = "block";
        flippedCards.push({ card, img });

        // If two cards are flipped, check for match
        if (flippedCards.length === 2) {
          lockBoard = true;
          setTimeout(checkMatch, 800); // Wait before checking
        }
      });

      // Add image to card, and card to grid
      card.appendChild(img);
      grid.appendChild(card);
    });
  }

  // Reset the whole game
  function resetGame() {
    // Reset timer
    clearInterval(interval);
    seconds = 0;
    timer.textContent = "00:00";
    timerStarted = false;

    // Reset game state
    matchedPairs = 0;
    moves = 0;
    moveCounter.textContent = "0";
    flippedCards = [];
    lockBoard = false;

    // Shuffle cards again
    cards.sort(() => Math.random() - 0.5);

    // Clear the game board
    grid.innerHTML = "";

    // Build a fresh set of cards
    createCards();

    // Hide win modal if visible
    document.getElementById("winModal").style.display = "none";
  }

  // Restart button listener
  restartbtn.addEventListener("click", resetGame);

  // Start game automatically when page loads
  resetGame();

  // Close modal when X is clicked
  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("winModal").style.display = "none";
  });
});