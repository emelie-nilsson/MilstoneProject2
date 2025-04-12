document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".game_grid");
    const restartbtn = document.getElementById("restart_btn");
    const moveCounter = document.getElementById("move_counter");
    const timer = document.getElementById("timer");
  
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
      img.style.display = "none"; // Gömmer bilden tills den vänds
  
      card.appendChild(img);
      grid.appendChild(card);
    });
  });
  