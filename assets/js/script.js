document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".game_grid");
    const restartbtn = document.getElementById("restart_btn");
    const moveCounter = document.getElementById("move_counter");
    const timer = document.getElementById("timer");

    let flippedCards = [];
    let moves = 0;
    let lockBoard = false;
  
    // List with the images
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
  
    // 10 cards x2 = 20 cards total
    const selectedImages = images.slice(0, 10);
    let cards = [...selectedImages, ...selectedImages];
  
    // Shuffle the cards
    cards.sort(() => Math.random() - 0.5);
  
    // Create the cards
    cards.forEach((imgSrc) => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = "Farm animal";
      card.addEventListener("click", () => {
        if (lockBoard || img.style.display === "block" || card.classList.contains("matched")) return;
      
        // Show the image
        card.classList.add("show");
      
        // Save the choosen card
        flippedCards.push({ card, img });
      
        if (flippedCards.length === 2) {
            lockBoard = true;
          setTimeout(checkMatch, 800);
        }
      });
  
      card.appendChild(img);
      grid.appendChild(card);
    });
    function checkMatch() {
        const [first, second] = flippedCards;
      
        if (first.img.src === second.img.src) {
          // It's a match!
          first.card.classList.add("matched");
          second.card.classList.add("matched");
        } else {
          // If not a match, turn back the cards
          first.card.classList.remove("show");
          second.card.classList.remove("show");
        }
      
        // Clear array
        flippedCards = [];
      
        // Count moves
        moves++;
        moveCounter.textContent = moves;
        lockBoard = false;
      }
  });
  