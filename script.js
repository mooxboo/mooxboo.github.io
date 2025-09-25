document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const container = document.querySelector('.container');
    const questionText = document.getElementById('question-text');

    // --- State variables for the magic ---
    let noClickCount = 0;
    let yesButtonSize = 1; // Represents scale factor

    const noButtonTexts = [
        "No no",
        "Yakin nii yang?",
        "Ga nyesel?",
        "Seriusan yang",
        "Kesempatan terakhir ini lho!",
        "Yakin engga?",
        "Sayang pasti nyesel!",
        "Coba pikirin ulang!",
        "Apakah ini jawaban final sayang? :(",
        "You're breaking my heart ;(",
    ];

    // --- The "No" Button Escalation ---
    noBtn.addEventListener('click', () => {
        // Increment the count and size
        noClickCount++;
        yesButton-size += 0.5; // Increase the growth factor

        // Make the "Yes" button bigger
        yesBtn.style.transform = `scale(${yesButtonSize})`;

        // Change the "No" button text
        // Use the modulo operator to loop through the texts if clicked too many times
        noBtn.textContent = noButtonTexts[noClickCount % noButtonTexts.length];

        // (Optional) Make the "No" button smaller
        const noButtonScale = Math.max(1 - noClickCount * 0.1, 0.1); // Don't let it disappear completely
        noBtn.style.transform = `scale(${noButtonScale})`;
    });

    // --- The "Yes" Button Celebration ---
    yesBtn.addEventListener('click', () => {
        // Create the success message
        const successHTML = `
            <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTFweDFwNHJ0d2tpYnBzbzkyNGhpbXp0cjVpNGxubHJsMTRmem15ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pqxXb2to/giphy.gif" alt="Cute hug gif" class="gif">
            <h1>YEAAYYYY ASIIKKKKK AYCE!!</h1>
            <p style="font-size: 1.2rem; color: #333;">I love you to infinity and beyond Boo Boo Sayang!!</p>
        `;

        // Replace the container's content with the success message
        container.innerHTML = successHTML;
    });
});
