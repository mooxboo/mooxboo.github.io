// --- CUSTOMIZE THIS SECTION ---
const clues = [
    {
        clue: "Security Question 1/5: Analyze visual data. This first joint operation was at a terrestrial establishment designated as...?",
        answer: "la trattoria",
        image: "photo1.jpg" // The photo from your first date
    },
    {
        clue: "Security Question 2/5: This archived simulation is one we have engaged in most frequently. What is its designation?",
        answer: "the office",
        image: "photo2.jpg" // A photo of you watching TV
    },
    {
        clue: "Security Question 3/5: The callsign for our furry companion, seen here, is recorded as...?",
        answer: "captain fluffenpants",
        image: "photo3.jpg" // A photo of your pet
    },
    {
        clue: "Security Question 4/5: Visual log from our coastal mission. The frozen ration depot was named...?",
        answer: "salty's",
        image: "photo4.jpg" // A photo from your vacation
    },
    {
        clue: "Security Question 5/5: Final decryption key required. A critical system is scrambled! Unscramble its name: NPIK YSK",
        answer: "pink sky",
        image: "photo5.jpg" // A photo related to your song/place
    }
];
// --- END CUSTOMIZE SECTION ---


// --- No need to edit below this line unless you want to get fancy ---
let currentClueIndex = -1; 

const clueContainer = document.getElementById('clue-container');
const finalPrize = document.getElementById('final-prize');
const clueText = document.getElementById('clue-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackText = document.getElementById('feedback-text');
const lockedStatus = document.querySelector('h2');
const clueImage = document.getElementById('clue-image'); // Get the image element

submitButton.addEventListener('click', () => {
    if (currentClueIndex === -1) {
        currentClueIndex++;
        displayClue();
        return;
    }

    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = clues[currentClueIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        feedbackText.textContent = ">>> ACCESS GRANTED <<<";
        feedbackText.style.color = "#9effaf";

        currentClueIndex++;
        setTimeout(() => {
            if (currentClueIndex < clues.length) {
                displayClue();
            } else {
                showFinalPrize();
            }
        }, 1500);

    } else {
        feedbackText.textContent = "!!! ACCESS DENIED. SECURITY PROTOCOL ENGAGED !!!";
        feedbackText.style.color = "#ff5a5f";
        answerInput.value = "";
    }
});

function displayClue() {
    feedbackText.textContent = "";

    // Set the image source and make it visible
    clueImage.src = clues[currentClueIndex].image;
    clueImage.style.display = 'block';

    clueText.textContent = clues[currentClueIndex].clue;
    answerInput.style.display = 'block';
    answerInput.value = "";
    answerInput.focus();
    submitButton.textContent = "Decrypt";
}

function showFinalPrize() {
    clueContainer.style.display = 'none';
    lockedStatus.textContent = "Anniversary Log File: UNLOCKED";
    lockedStatus.style.color = "#9effaf";
    finalPrize.style.display = 'block';

    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: -0.1 }
    });
}
