// =================================================================
// SCRIPT UNTUK WEBSITE PERMINTAAN MAAF
// =================================================================

// Langkah 1: Ambil semua elemen penting dari HTML dan simpan dalam variabel
// Ini agar kita bisa memanipulasinya dengan JavaScript
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const initialView = document.getElementById('initial-view');
const thankYouView = document.getElementById('thank-you-view');
const container = document.querySelector('.container');

// Langkah 2: Tambahkan "pendengar acara" (event listener) untuk tombol 'IYA'
// Kode di dalam ini akan berjalan ketika tombol 'IYA' diklik
yesBtn.addEventListener('click', () => {
    // Sembunyikan tampilan awal (permintaan maaf)
    initialView.style.display = 'none';

    // Tampilkan tampilan "terima kasih"
    thankYouView.style.display = 'block';
});

// Langkah 3: Buat fungsi untuk membuat tombol 'NGGAK!' lari
// Kita buat fungsi terpisah agar bisa digunakan di beberapa event
const runAwayButton = () => {
    // Dapatkan ukuran dan posisi dari container utama
    const containerRect = container.getBoundingClientRect();
    // Dapatkan ukuran dari tombol 'NGGAK!' itu sendiri
    const noBtnRect = noBtn.getBoundingClientRect();

    // Hitung posisi acak baru untuk 'top' (atas) dan 'left' (kiri)
    // Posisi ini dipastikan akan selalu berada di dalam area container
    let newTop = Math.random() * (containerRect.height - noBtnRect.height);
    let newLeft = Math.random() * (containerRect.width - noBtnRect.width);

    // Terapkan posisi baru ke tombol 'NGGAK!'
    noBtn.style.position = 'absolute'; // Ini penting agar 'top' dan 'left' berfungsi
    noBtn.style.top = `${newTop}px`;
    noBtn.style.left = `${newLeft}px`;
};

// Langkah 4: Terapkan fungsi 'runAwayButton' ke tombol 'NGGAK!'
// Kita akan menerapkannya pada dua jenis interaksi:

// 1. Untuk pengguna Desktop/Laptop dengan mouse
// 'mouseover' berarti fungsi akan berjalan saat kursor mouse mendekati tombol
noBtn.addEventListener('mouseover', runAwayButton);

// 2. Untuk pengguna HP/Tablet dengan sentuhan
// 'touchstart' berarti fungsi akan berjalan saat jari pertama kali menyentuh tombol
noBtn.addEventListener('touchstart', runAwayButton);
