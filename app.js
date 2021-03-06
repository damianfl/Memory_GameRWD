document.addEventListener("DOMContentLoaded", function() {
(function(){
  const karty = [
    {
      color: "red",
      item: '<i class="fa fa-gavel" aria-hidden="true"></i>'
    },
    {
      color: "red",
      item: '<i class="fa fa-gavel" aria-hidden="true"></i>'
    },
    {
      color: "blue",
      item: '<i class="fa fa-hourglass-half" aria-hidden="true"></i>'
    },
    {
      color: "blue",
      item: '<i class="fa fa-hourglass-half" aria-hidden="true"></i>'
    },
    {
      color: "whitesnow",
      item: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>'
    },
    {
      color: "whitesnow",
      item: '<i class="fa fa-snowflake-o" aria-hidden="true"></i>'
    },
    {
      color: "violet",
      item: '<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>'
    },
    {
      color: "violet",
      item: '<i class="fa fa-thermometer-quarter" aria-hidden="true"></i>'
    },
    {
      color: "yellow",
      item: '<i class="fa fa-shower" aria-hidden="true"></i> '
    },
    {
      color: "yellow",
      item: '<i class="fa fa-shower" aria-hidden="true"></i> '
    },
    {
      color: "lightblue",
      item: '<i class="fa fa-bluetooth" aria-hidden="true"></i>'
    },
    {
      color: "lightblue",
      item: '<i class="fa fa-bluetooth" aria-hidden="true"></i>'
    },
    {
      color: "burlywood",
      item: '<i class="fa fa-coffee" aria-hidden="true"></i>'
    },
    {
      color: "burlywood",
      item: '<i class="fa fa-coffee" aria-hidden="true"></i>'
    },
    {
      color: "cadetblue",
      item: '<i class="fa fa-book" aria-hidden="true"></i>'
    },
    {
      color: "cadetblue",
      item: '<i class="fa fa-book" aria-hidden="true"></i>'
    },
    {
      color: "tomato",
      item: '<i class="fa fa-eye" aria-hidden="true"></i>'
    },
    {
      color: "tomato",
      item: '<i class="fa fa-eye" aria-hidden="true"></i>'
    }
  ];

  let cards = document.querySelectorAll(".game--item");
  cards = [...cards];

  const startTime = new Date().getTime();
  let activeCard = "";
  let activeCards = [];
  let offCards = []; // here will be stored paired cards
  const gamePairs = cards.length / 2;
  let gameResult = 0;

  //Events happening after clicking the cards

  const clickCard = function() {
    activeCard = this;
    if (activeCard == activeCards[0]) return; // if same card was clicked do not add second card to activeCards array
    activeCard.classList.remove("hidden");
    if (activeCards.length === 0) {
      activeCards[0] = activeCard;
      return;
    } else {
      cards.forEach(card => card.removeEventListener("click", clickCard));
      activeCards[1] = activeCard;
      // checking if first value in the array matches second value in the array

      setTimeout(function() {
        if (activeCards[0].innerHTML === activeCards[1].innerHTML) {
          gameResult++;
          activeCards.forEach(index => {
            index.classList.add("off");
            offCards.push(index);
          });
          cards.forEach(card => card.addEventListener("click", clickCard));
          console.log(offCards);
          offCards.forEach(index => {
            index.removeEventListener("click", clickCard);
          });
          activeCards = [];

          // GAME OVER
          if (gameResult == gamePairs) {
            const endTime = new Date().getTime();
            const gameTime = (endTime - startTime) / 1000;
            const overlay = document.querySelector(".gameOver");
            const button = document.querySelector('.gameOver--button')
            button.addEventListener('click', function(){
              location.reload();
            })
            overlay.classList.remove("notVisible");
            const time = document.querySelector(".over--item__time");
            time.innerHTML = ` ${gameTime} s`;
          }
        } else {
          activeCards.forEach(index => {
            index.classList.add("hidden");
            activeCard = "";
            activeCards = [];
            cards.forEach(card => card.addEventListener("click", clickCard));
          });
        }
      }, 400);
    }
  };

  //hiding cards at the beginning of the game

  const hideCards = function() {
    cards.forEach(card => {
      const position = Math.floor(Math.random() * karty.length);
      card.classList.add(karty[position].color);
      card.innerHTML = karty[position].item;
      karty.splice(position, 1);
    });

    setTimeout(function() {
      cards.forEach(card => {
        card.classList.add("hidden");
        card.addEventListener("click", clickCard);
      });
    }, 1000);
  };
  hideCards();
})()
});
