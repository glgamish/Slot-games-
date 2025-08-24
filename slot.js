const symbols = ['🍒','🍋','🍊','⭐','7️⃣','🍉'];
let balance = parseInt(localStorage.getItem('myBalance')) || 1000;
const balEl = document.getElementById('balance');
const logEl = document.getElementById('log');

function update() {
  balEl.textContent = 'رصيدك: ' + balance;
  localStorage.setItem('myBalance', balance);
}

function log(msg) {
  const d = document.createElement('div');
  d.textContent = `${new Date().toLocaleTimeString()} - ${msg}`;
  logEl.prepend(d);
}

document.getElementById('spin').addEventListener('click', () => {
  if (balance < 10) {
    alert('رصيدك غير كافي!');
    return;
  }

  balance -= 10;
  update();

  const r1 = symbols[Math.floor(Math.random() * symbols.length)];
  const r2 = symbols[Math.floor(Math.random() * symbols.length)];
  const r3 = symbols[Math.floor(Math.random() * symbols.length)];

  document.getElementById('r1').textContent = r1;
  document.getElementById('r2').textContent = r2;
  document.getElementById('r3').textContent = r3;

  let msg = '😢 خسارة!';
  if (r1 === r2 && r2 === r3) {
    const win = r1 === '7️⃣' ? 100 : 50;
    balance += win;
    msg = `🎉 فزت ${win} عملة!`;
  } else if (r1 === r2 || r2 === r3 || r1 === r3) {
    balance += 20;
    msg = `🙂 فزت 20 عملة!`;
  }

  alert(msg);
  log(msg);
  update();
});

update();