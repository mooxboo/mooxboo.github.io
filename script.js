document.addEventListener('DOMContentLoaded', () => {
    // --- Music Control ---
    const music = document.getElementById('background-music');
    const musicBtn = document.getElementById('music-toggle-btn');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.textContent = '🔇'; // Muted icon
        } else {
            music.play();
            musicBtn.textContent = '🎵'; // Music note icon
        }
        isPlaying = !isPlaying;
    });

    // --- Button Logic ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.container');
    const questionText = document.getElementById('question-text');

    let noClickCount = 0;
    let yesButtonSize = 1;

    const noButtonTexts = [ "No no", "Yakin nii yang?", "Ga nyesel?", "Seriusan yang", "Kesempatan terakhir ini lho!", "Yakin engga?", "Sayang pasti nyesel!", "Coba pikirin ulang!", "Apakah ini jawaban final sayang? :(", "You're breaking my heart ;(", ];

    noBtn.addEventListener('click', () => {
        noClickCount++;
        yesButtonSize += 0.5;
        yesBtn.style.transform = `scale(${yesButtonSize})`;
        noBtn.textContent = noButtonTexts[noClickCount % noButtonTexts.length];
        const noButtonScale = Math.max(1 - noClickCount * 0.1, 0.1);
        noBtn.style.transform = `scale(${noButtonScale})`;
    });

    yesBtn.addEventListener('click', () => {
        const successHTML = `
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHNoY2g0am9raW9rNndiaHZkcmNidzY5ejd6bWFheXR2MGh0NnZtOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/AgbhG0ZNWDilq/giphy.gif" alt="Cute hug gif" class="gif">
            <h1>YEAAYYYY ASIIKKKKK AYCE!!</h1>
            <p style="font-size: 1.2rem; color: #333;">I love you to infinity and beyond Boo Boo Sayang!!</p>
        `;
        container.innerHTML = successHTML;
        // When "Yes" is clicked, ensure the music is playing
        if (!isPlaying) {
            music.play();
            isPlaying = true; // Update the state
        }
    });
});
