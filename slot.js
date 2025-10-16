const symbols = ['🍒','🍋','🍊','⭐','7️⃣','🍉'];
let balance = parseInt(localStorage.getItem('myBalance')) || 1000;
const balEl = document.getElementById('balance');
const logEl = document.getElementById('log');
const resultEl = document.getElementById('result');
let isSpinning = false;

function update() {
  balEl.textContent = 'رصيدك: ' + balance;
  localStorage.setItem('myBalance', balance);
}

function log(msg) {
  const d = document.createElement('div');
  d.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
  logEl.prepend(d);
}

function showResult(msg, isWin) {
  resultEl.textContent = msg;
  resultEl.className = isWin ? 'win' : 'lose';
}

function spinReels() {
  isSpinning = true;
  const reels = [
    document.getElementById('r1'),
    document.getElementById('r2'),
    document.getElementById('r3')
  ];
  
  // إضافة تأثير الدوران
  reels.forEach(reel => reel.classList.add('spinning'));
  
  // محاكاة دوران كل بكر بشكل عشوائي
  const spinDuration = 1500; // مدة الدوران بالمللي ثانية
  const spinInterval = 100; // الفاصل بين تغيير الرموز
  
  let spins = 0;
  const maxSpins = spinDuration / spinInterval;
  
  const spinIntervalId = setInterval(() => {
    reels.forEach(reel => {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      reel.textContent = randomSymbol;
    });
    
    spins++;
    if (spins >= maxSpins) {
      clearInterval(spinIntervalId);
      
      // إظهار النتيجة النهائية
      const r1 = symbols[Math.floor(Math.random() * symbols.length)];
      const r2 = symbols[Math.floor(Math.random() * symbols.length)];
      const r3 = symbols[Math.floor(Math.random() * symbols.length)];
      
      document.getElementById('r1').textContent = r1;
      document.getElementById('r2').textContent = r2;
      document.getElementById('r3').textContent = r3;
      
      // إزالة تأثير الدوران
      reels.forEach(reel => reel.classList.remove('spinning'));
      
      let msg = '😢 خسارة!';
      let isWin = false;
      let winAmount = 0;
      
      if (r1 === r2 && r2 === r3) {
        winAmount = r1 === '7️⃣' ? 100 : 50;
        balance += winAmount;
        msg = `🎉 فوز كبير! ربحت ${winAmount} عملة!`;
        isWin = true;
      } else if (r1 === r2 || r2 === r3 || r1 === r3) {
        winAmount = 20;
        balance += winAmount;
        msg = `🙂 فوز صغير! ربحت ${winAmount} عملة!`;
        isWin = true;
      }
      
      showResult(msg, isWin);
      log(msg);
      update();
      isSpinning = false;
    }
  }, spinInterval);
}

document.getElementById('spin').addEventListener('click', () => {
  if (isSpinning) return;
  
  if (balance < 10) {
    alert('رصيدك غير كافي!');
    return;
  }

  balance -= 10;
  update();
  resultEl.textContent = '';
  
  spinReels();
});

document.getElementById('reset').addEventListener('click', () => {
  if (isSpinning) return;
  
  if (confirm('هل تريد إعادة تعيين الرصيد إلى 1000 عملة؟')) {
    balance = 1000;
    update();
    log('تم إعادة تعيين الرصيد إلى 1000 عملة');
    resultEl.textContent = 'تم إعادة تعيين الرصيد';
    setTimeout(() => {
      resultEl.textContent = '';
    }, 2000);
  }
});

update();
