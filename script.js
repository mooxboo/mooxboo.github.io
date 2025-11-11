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

// --- OPTION 1: Heartfelt & Thematic ---
const messagesToType = [
    "My Dearest Boo Boo Sayang,",
    "You've done it. Log file decrypted. I knew you would. From the moment of 'First Contact' on Stardate 30.09.2023, you've always been the only one who could read my encrypted heart.",
    "These last two years have been our own great cosmic adventure. Our mission logs are filled with more than just data; they're filled with laughter. From charting the Palembang sector for a 'Pindang Bandeng' to sharing command with our furry morale officer, Corcor, every single entry is a star I wouldn't trade for anything.",
    "Before our flight paths crossed, I was just Agent Moo, drifting solo through an empty starfield. You didn't just join my mission; you became its destination. You are my gravity, the center of my universe, pulling me home no matter how far I roam.",
    "They say space is infinite, but I can't wait to explore every single corner of it with you. More missions with the Kaciw squadron, more discovering new galaxies from our command post at Kost BMI, more everything... as long as you're my co-pilot.",
    "Happy Second Anniversary, my chosen one. I love you to infinity... and beyond.",
    "Yours, always, through every stardate,\nAgent Moo"
];
// --- END CUSTOMIZE SECTION ---


// --- No need to edit below this line ---
let currentClueIndex = -1;
let isMuted = false;
let hasAudioBeenUnlocked = false; 

const audio = {
    background: new Audio('assets/background-music.mp3'),
    correct: new Audio('assets/sfx-correct.mp3'),
    incorrect: new Audio('assets/sfx-incorrect.mp3'),
    reveal: new Audio('assets/sfx-reveal.mp3'),
    typing: new Audio('assets/sfx-typing.mp3'),
};
audio.background.loop = true;
audio.background.volume = 0.3;

// --- CHANGE #1: We tell the typing sound to loop forever ---
audio.typing.loop = true; 
audio.typing.volume = 0.6; // You can adjust this volume

function unlockAllAudio() {
    if (hasAudioBeenUnlocked) return; 

    for (const sound of Object.values(audio)) {
        sound.play().catch(() => {});
        sound.pause();              
    }

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

// --- CHANGE #2: A new, simple function to stop sounds ---
function stopSound(sound) {
    sound.pause();
    sound.currentTime = 0; // Rewind it for the next time it might be used
}

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    muteButton.textContent = isMuted ? '🔈' : '🔇';
    for (const key in audio) {
        audio[key].muted = isMuted;
    }
});

submitButton.addEventListener('click', () => {
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

// --- CHANGE #3: The typewriter NO LONGER plays any sound ---
function typeWriter(element, text, index, onComplete) {
    if (index < text.length) {
        // NO MORE SOUND HERE!
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

// --- CHANGE #4: This function is now the master controller for the typing sound ---
function startTypingSequence(messageIndex) {
    // If this is the VERY FIRST message, start the looping sound.
    if (messageIndex === 0) {
        playSound(audio.typing);
    }

    // Check if there are more messages to type
    if (messageIndex < typewriterElements.length && messageIndex < messagesToType.length) {
        const currentElement = typewriterElements[messageIndex];
        const currentText = messagesToType[messageIndex];

        currentElement.classList.add('typing');

        typeWriter(currentElement, currentText, 0, () => {
            currentElement.classList.remove('typing');
            startTypingSequence(messageIndex + 1);
        });
    } else {
        // If there are NO MORE messages, stop the looping sound.
        stopSound(audio.typing);
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

    setTimeout(() => {
        startTypingSequence(0);
    }, 300);

    setTimeout(() => {
        confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: -0.1 }
        });
    }, 1000);
}
