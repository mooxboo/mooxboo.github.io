// --- CUSTOMIZE THIS SECTION ---
// The first question now has an array of possible answers.
// The other questions still have a simple string answer.
const clues = [
    {
        clue: "Security Question 1/5: According to the official Star Command mission log, what was the terrestrial stardate of the 'First Contact' event? (Format: Day Month Year)",
        answer: [
            "30 september 2023",
            "september 30 2023",
            "30 sep 2023"
        ],
        image: "assets/photo1.jpg"
    },
    {
        clue: "Security Question 2/5: Accessing mission archives from the Palembang sector. For our mid-day sustenance protocol, we analyzed a local aquatic species. What was its official designation?",
        answer: "pindang bandeng",
        image: "assets/photo2.jpg"
    },
    {
        clue: "Security Question 3/5: Every Star Command vessel requires a non-sentient morale officer. Please state the official designation of our plush canine crewmember.",
        answer: "corcor",
        image: "assets/photo3.jpg"
    },
    {
        clue: "Security Question 4/5: Visual log from our coastal mission. The frozen ration depot was named...?",
        answer: "salty's",
        image: "assets/photo4.jpg"
    },
    {
        clue: "Security Question 5/5: Final decryption key required! Unscramble the name of our designated habitation unit: RPAETENMT",
        answer: "apartment",
        image: "assets/photo5.jpg"
    }
];
// --- END CUSTOMIZE SECTION ---


// --- No need to edit below this line ---
let currentClueIndex = -1; 
let isMuted = false;

const audio = {
    background: new Audio('assets/background-music.mp3'),
    correct: new Audio('assets/sfx-correct.mp3'),
    incorrect: new Audio('assets/sfx-incorrect.mp3'),
    reveal: new Audio('assets/sfx-reveal.mp3'),
};
audio.background.loop = true;
audio.background.volume = 0.3;

const clueContainer = document.getElementById('clue-container');
const finalPrize = document.getElementById('final-prize');
const clueText = document.getElementById('clue-text');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const feedbackText = document.getElementById('feedback-text');
const lockedStatus = document.querySelector('h2.status-locked');
const clueImage = document.getElementById('clue-image');
const progressWrapper = document.getElementById('progress-wrapper');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const muteButton = document.getElementById('mute-button');

function playSound(sound) {
    if (!isMuted) {
        sound.currentTime = 0;
        sound.play();
    }
}

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔈' : '🔇';
    audio.background.muted = isMuted;
});

document.body.addEventListener('click', () => {
    if (audio.background.paused) {
        audio.background.play().catch(e => console.error("Autoplay was prevented.", e));
    }
}, { once: true });


submitButton.addEventListener('click', () => {
    if (currentClueIndex === -1) {
        currentClueIndex++;
        displayClue();
        return;
    }

    // --- NEW FLEXIBLE ANSWER LOGIC ---
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswerObject = clues[currentClueIndex].answer;

    let isAnswerCorrect = false;
    if (Array.isArray(correctAnswerObject)) {
        // If the answer is an array, check if the user's answer is in it
        isAnswerCorrect = correctAnswerObject.includes(userAnswer);
    } else {
        // Otherwise, do a simple string comparison
        isAnswerCorrect = (userAnswer === correctAnswerObject.toLowerCase());
    }
    // --- END OF NEW LOGIC ---

    if (isAnswerCorrect) {
        playSound(audio.correct);
        feedbackText.textContent = ">>> ACCESS GRANTED <<<";
        feedbackText.style.color = "#9effaf";

        currentClueIndex++;
        updateProgressBar();

        setTimeout(() => {
            if (currentClueIndex < clues.length) {
                displayClue();
            } else {
                showFinalPrize();
            }
        }, 1500);

    } else {
        playSound(audio.incorrect);
        feedbackText.textContent = "!!! ACCESS DENIED. SECURITY PROTOCOL ENGAGED !!!";
        feedbackText.style.color = "#ff5a5f";
        answerInput.value = "";
    }
});

function updateProgressBar() {
    const progressPercentage = (currentClueIndex / clues.length) * 100;
    progressBar.style.width = progressPercentage + '%';
    progressText.textContent = Math.round(progressPercentage) + '% Decrypted';
}

function displayClue() {
    progressWrapper.style.display = 'block';
    feedbackText.textContent = "";
    clueImage.src = clues[currentClueIndex].image;
    clueImage.style.display = 'block';
    clueText.textContent = clues[currentClueIndex].clue;
    answerInput.style.display = 'block';
    answerInput.value = "";
    answerInput.focus();
    submitButton.textContent = "Decrypt";
}

function showFinalPrize() {
    playSound(audio.reveal);
    audio.background.volume = 0.1;

    clueContainer.style.display = 'none';
    if(lockedStatus) lockedStatus.style.display = 'none';
    finalPrize.style.display = 'block';

    progressBar.style.width = '100%';
    progressText.textContent = 'Decryption Complete!';

    confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: -0.1 }
    });
}
