// data kartu
const items = ['Panyaweuan','Talaga Herang','Situ Cipaten','Muara Jaya','Siliwangi','Ciremai','Ciboar Pass','Jember Land'];

// duplikat data kartu
let cards = [...items,...items];

// simpan data
let flipped = [], matches = 0,clicks = 0, score = 0, timeLeft = 60, timer = null;

// reset game
function resetGame(){
    // hapus waktu
    clearInterval(timer);
    // reset data
    flipped = []; matches = 0; clicks = 0; score = 0; timeLeft = 60;
    // kirim data ke index
    document.getElementById('timer').textContent = timeLeft;
    document.getElementById('clicks').textContent = clicks;
    document.getElementById('score').textContent = score;
    document.getElementById('high').textContent = localStorage.getItem('mm_high') || 0;
    // acak kartu
    cards.sort(() => Math.random() - 0.5);
    // ambil kartu lama
    const board = document.getElementById('board');
    // hapus data kartu
    board.innerHTML = '';
    // loop 
    cards.forEach((text) => {
        // buat elemen div
        const btn = document.createElement('div');
        // kasih class
        btn.className = 'card';
        // isi data kartu
        btn.textContent = text;
        // jalankan fungsi flipCard
        btn.onclick = () => flipCard(btn);
        // kirim ke index
        board.appendChild(btn);
    });
    // hitung waktu mundur
    timer = setInterval(() => {
        // kurangi waktu
        timeLeft--;
        // kirim waktu ke index
        document.getElementById('timer').textContent = timeLeft;
        // jika sudah 0 detik
        if(timeLeft === 0) endGame('Waktu habis! Skor anda: ' + score);
    }, 1000);
}

// buka kartu
function flipCard(card){
    // cek apakah sudah 2 kartu dan ada class open
    if(flipped.length === 2 || card.classList.contains('open')) return;
    // tambahkan class
    card.classList.add('open');
    // simpan kartu
    flipped.push(card);
    // jika ada 2 kartu
    if(flipped.length === 2){
        // cek kecocokan
        if(flipped[0].textContent === flipped[1].textContent){
            // tambahkan matches dan score 10
            matches++;
            score+= 10;
            // kirim score
            document.getElementById('score').textContent = score;
            // reset kartu
            flipped = [];
            // jika cocok semua
            if(matches === items.length) endGame('Selamat anda menang! Skor anda: ' + score);
        }else{
            // balik kartu tunda selama 0.8 detiik
            setTimeout(() => {
                // hapus class open
                flipped[0].classList.remove('open');
                flipped[1].classList.remove('open');
                // reset kartu
                flipped = [];
            }, 800);
        }
    }
}

// end game
function endGame(msg){
    // hapus waktu
    clearInterval(timer);
    // ambil high lama
    let hi = localStorage.getItem('mm_high') || 0;
    // jika score lebih besar dari high simpan high terbaru
    if(score > hi) localStorage.setItem('mm_high', score);
    // pesan pop up
    alert(msg);
    // reset game
    resetGame();
}

// jalankan reset game pertama kali
resetGame();