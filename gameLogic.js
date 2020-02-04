// List of cards
const cards = document.querySelectorAll('.memory-card');

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Instance variables
let hasFlippedCard = false;
let lockBoard = false;
let winCheck = 0;
let firstCard, secondCard;
//comment test

function flipCard() {

    if (lockBoard) {
        return;
    }

    if (this === firstCard) {
        return;
    }

    this.classList.add('flip');


    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        var audio = new Audio('youwin.m4a');
        audio.play();
        winCheck++;
        console.log("So far: " + winCheck);
        if (winCheck === 6) {
            var audio = new Audio('youwin.m4a');
            audio.play();
            btn.click();
            return;
        }
        return;
    }

    unflipCards();
}


function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    location.reload();
};

cards.forEach(card => card.addEventListener('click', flipCard));