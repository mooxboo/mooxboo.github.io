// --- CUSTOMIZE THIS SECTION ---
const clues = [
    {
        clue: "Security Question 1/5: According to the official Star Command mission log, what was the terrestrial stardate of the 'First Contact' event? (Format: Day Month Year)",
        answer: ["30 september 2023", "september 30 2023", "30 sep 2023"],
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
        clue: "Security Question 4/5: For ongoing tactical analysis, we frequently review mission logs from an elite squadron of operatives. What is the designated callsign of this gaming unit?",
        answer: "kaciw",
        image: "assets/photo4.jpg"
    },
    {
        clue: "Security Question 5/5: FINAL DECRYPTION! The location of 'The Chosen One' is scrambled. To unlock the anniversary log, recompile the designation of your primary command post: SIT KOMB",
        answer: "kost bmi",
        image: "assets/photo5.jpg"
    }
];

const messagesToType = [
    "My Dearest Boo Boo Sayang,",
    "If you're reading this, it means you've successfully decrypted the log file. But I never had a single doubt. After all, you've always been the only one who could decode my heart.",
    "The last two years feel like the greatest mission I've ever been on. Our official log file began on 30 September 2023, and since then, every entry has been an adventure. From analyzing aquatic species in Palembang to debriefing with our plush canine officer, Corcor, every moment with you is a memory I've logged and cherished.",
    "But the most important data point, the one that holds my universe together, is you. Before you, I was just Agent Moo, flying solo. Now, I have my co-pilot, my navigator, my everything. You are my gravity. With you, even just watching the Kaciw squadron feels like discovering a new galaxy.",
    "I can't wait to see what missions the coming years have in store for us. More adventures, more laughter, and more just being with you. You have been chosen... by me. And I will choose you every single day, forever.",
    "Happy Anniversary, my love. Ooooooh!",
    "Eternally Grateful,\nYour Moo"
];

// --- No need to edit below this line ---
let currentClueIndex = -1;
let isMuted = false;
let hasAudioBeenUnlocked = false; // <-- NEW: Flag to track if audio is ready

const audio = {
    background: new Audio('assets/background-music.mp3'),
    correct: new Audio('assets/sfx-correct.mp3'),
    incorrect: new Audio('assets/sfx-incorrect.mp3'),
    reveal: new Audio('assets/sfx-reveal.mp3'),
    typing: new Audio('assets/sfx-typing.mp3'),
};
audio.background.loop = true;
audio.background.volume = 0.3;
audio.typing.volume = 0.6;

// --- NEW FUNCTION: Unlocks all sounds on first user click ---
function unlockAllAudio() {
    if (hasAudioBeenUnlocked) return; // Only run this function once

    // This is a trick to get all sounds ready to play
    for (const sound of Object.values(audio)) {
        sound.play().catch(() => {}); // Try to play...
        sound.pause();                // ...and immediately pause.
    }

    // Now safely play the background music
    if (audio.background.paused) {
        audio.background.play().catch(() => {});
    }

    hasAudioBeenUnlocked = true;
    console.log("All audio sources have been unlocked.");
}

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
const typewriterElements = document.querySelectorAll('.typewriter');
const typingSpeed = 40;

function playSound(sound) {
    if (!isMuted) {
        sound.currentTime = 0;
        sound.play().catch(e => {});
    }
}

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔈' : '🔇';
    for (const key in audio) {
        audio[key].muted = isMuted;
    }
});

// The old body click listener has been removed, as unlockAllAudio() handles it now.

submitButton.addEventListener('click', () => {
    // --- MODIFIED: Unlock audio on the very first click ---
    if (!hasAudioBeenUnlocked) {
        unlockAllAudio();
    }

    if (currentClueIndex === -1) {
        currentClueIndex++;
        displayClue();
        return;
    }

    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswerObject = clues[currentClueIndex].answer;

    let isAnswerCorrect = false;
    if (Array.isArray(correctAnswerObject)) {
        isAnswerCorrect = correctAnswerObject.includes(userAnswer);
    } else {
        isAnswerCorrect = (userAnswer === correctAnswerObject.toLowerCase());
    }

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

// --- MODIFIED: This typewriter function is simpler and more reliable ---
function typeWriter(element, text, index, onComplete) {
    if (index < text.length) {
        // This will now play the sound for EVERY character.
        playSound(audio.typing);

        if (text.substring(index, index + 1) === '\n') {
            element.innerHTML += '<br>';
        } else {
            element.innerHTML += text[index];
        }

        index++;
        setTimeout(() => typeWriter(element, text, index, onComplete), typingSpeed);
    } else if (onComplete) {
        onComplete();
    }
}

function startTypingSequence(messageIndex) {
    if (messageIndex < typewriterElements.length && messageIndex < messagesToType.length) {
        const currentElement = typewriterElements[messageIndex];
        const currentText = messagesToType[messageIndex];

        currentElement.classList.add('typing');

        typeWriter(currentElement, currentText, 0, () => {
            currentElement.classList.remove('typing');
            startTypingSequence(messageIndex + 1);
        });
    }
}

function showFinalPrize() {
    playSound(audio.reveal);
    audio.background.volume = 0.1;

    clueContainer.style.display = 'none';
    if(lockedStatus) lockedStatus.style.display = 'none';
    finalPrize.style.display = 'block';

    progressBar.style.width = '100%';
    progressText.textContent = 'Decryption Complete!';

    startTypingSequence(0);

    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: -0.1 }
        });
    }, 1000);
}
