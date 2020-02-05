// List of cards
const cards = document.querySelectorAll('.memory-card');

// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const dynamicList = document.getElementById("ScoreList");


// Instance variables
let hasFlippedCard = false;
let lockBoard = false;
let winCheck = 0;
let scoreIndex = 1;
let time, intervalId;
let firstCard, secondCard;
let firstCardFlipped = false;


function flipCard() {
    if (!firstCardFlipped) {
        time = -1;
        incrementTime();
        intervalId = setInterval(incrementTime, 1000);

        firstCardFlipped = true;
    }
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
    const audio = new Audio('youwin.m4a');
    if (firstCard.dataset.framework === secondCard.dataset.framework) {
        disableCards();
        audio.play();
        winCheck++;
        if (winCheck === 6) {

            audio.play();

            clearInterval(intervalId);
            document.getElementById("resultDiv").textContent = "Your score is: " +
                presentationTime(document.getElementById("time").textContent);


            saveGame(document.getElementById("time").textContent);

            btn.click();
            return;
        }
        return;
    }

    unflipCards();
}

function presentationTime(score) {
    let array = score.toString().split(":");
    if (array[0] === "00") {
        return array[1] + " sec"
    } else {
        return score;
    }
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

// Logic to shuffle cards
(function shuffle() {
    //localStorage.clear();
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

//Prints out the scores to the main screen
(function showScores() {
    if (localStorage.length !== 0) {
        let scores = [];
        for (let i = 1; i < localStorage.length+1; i++) {
            console.log("We are here: " + localStorage.getItem(i.toString()));
            scores.push(localStorage.getItem(i.toString()));
            const li = document.createElement("li");
            li.setAttribute("id", localStorage.getItem(i.toString()).toString() + " sec");
            li.appendChild(document.createTextNode(localStorage.getItem(i.toString()).toString() + " sec"));
            dynamicList.appendChild(li);
        }
    }
})();

// sorts the list from small numbers to bigger numbers
function sortScores(scores) {
    let sortedScores = [];
    scores.forEach(value => {
        sortedScores.push(convertScore(value));
    });

    sortedScores = sortedScores.sort((a, b) => a - b);
    return convertBackToTime(sortedScores);
}

// Converts int back to time so it can be presented
function convertBackToTime(scores) {
    let sortedScoreTimes = [];
    scores.forEach(value =>  {
        let date = new Date(value*1000);
        sortedScoreTimes.push(date.toString().split(" ")[4].substring(3,8));
    });
    return sortedScoreTimes;
}

// Converts time to int so it can be sorted
function convertScore(score) {
    const array = score.split(":");
    return ((parseInt(array[0], 10) * 60) + parseInt(array[1], 10));
}

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
    location.reload();
};


//Stop Watch logic
function incrementTime() {
    time++;
    document.getElementById("time").textContent =
        ("0" + Math.trunc(time / 60)).slice(-2) +
        ":" + ("0" + (time % 60)).slice(-2);
}

// Saves the new time Score
function saveGame(time) {
    let maxLength = 3;
    if (localStorage.length === 0 || localStorage.length !== maxLength) {
        let index = (localStorage.length+1).toString();
        localStorage.setItem(index, time);
        console.log("index: " + index + ", item: " + time);
    }
    for (let i = 1; i < localStorage.length+1; i++) {
        console.log("Are we here somehow?   " + localStorage.getItem(i.toString()));
        let bestScore = localStorage.getItem(i.toString());
        if (time < bestScore || time === bestScore) {
            localStorage.setItem(i.toString(),time);
            return;
        }
    }

}

document.getElementById("back-face1").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});

document.getElementById("back-face2").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});

document.getElementById("back-face3").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face4").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face5").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face6").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face7").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face8").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face9").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face10").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("back-face11").addEventListener("click", function () {
    document.getElementById("clicksfx").play();
});
document.getElementById("howdare").addEventListener("click", function () {
    document.getElementById("howdareyou").play();
});
document.getElementById("howdare1").addEventListener("click", function () {
    document.getElementById("howdareyou").play();
});



cards.forEach(card => card.addEventListener('click', flipCard));