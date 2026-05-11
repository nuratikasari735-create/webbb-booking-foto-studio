let bookings = [
  { id: 'RSY-001', nama: 'Siti Nurhaliza', paket: 'Paket Premium - Pre-Wedding', tanggal: 'Sabtu, 19 April 2026', jam: '10:00 - 12:00', harga: '350.000', status: 'confirmed' },
  { id: 'RSY-002', nama: 'Ahmad Fauzi', paket: 'Paket Eksklusif - Wisuda', tanggal: 'Minggu, 20 April 2026', jam: '08:00 - 10:00', harga: '700.000', status: 'pending' },
];

function showTab(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const tabs = ['beranda', 'galeri', 'booking', 'transaksi', 'tentang'];
  document.querySelectorAll('.nav-tab')[tabs.indexOf(id)].classList.add('active');
}

function pilihPaket(nama, harga) {
  document.getElementById('inp-paket').value = nama + ' - Rp ' + harga;
  showTab('booking');
  document.getElementById('inp-paket').style.borderColor = '#22c55e';
}

function getHarga(paket) {
  if (paket.includes('Basic')) return '150.000';
  if (paket.includes('Premium')) return '350.000';
  if (paket.includes('Eksklusif')) return '700.000';
  return '-';
}

function submitBooking() {
  const nama = document.getElementById('inp-nama').value.trim();
  const wa = document.getElementById('inp-wa').value.trim();
  const paket = document.getElementById('inp-paket').value;
  const tanggal = document.getElementById('inp-tanggal').value;
  const jam = document.getElementById('inp-jam').value;

  if (!nama || !wa || !paket || !tanggal || !jam) {
    alert('Mohon lengkapi semua data booking!');
    return;
  }

  const tgl = new Date(tanggal);
  const tglStr = tgl.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const harga = getHarga(paket);
  const idNum = String(bookings.length + 1).padStart(3, '0');
  const newId = 'RSY-' + idNum;

  bookings.unshift({ id: newId, nama, paket, tanggal: tglStr, jam, harga, status: 'pending' });
  renderTx();

  document.getElementById('modal-detail').innerHTML =
    '<strong>ID:</strong> #' + newId + '<br>' +
    '<strong>Nama:</strong> ' + nama + '<br>' +
    '<strong>Paket:</strong> ' + paket.split(' - ')[0] + '<br>' +
    '<strong>Tanggal:</strong> ' + tglStr + '<br>' +
    '<strong>Jam:</strong> ' + jam + '<br>' +
    '<strong>Total:</strong> Rp ' + harga;

  document.getElementById('modal').classList.add('show');

  ['inp-nama', 'inp-wa', 'inp-catatan'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('inp-paket').value = '';
  document.getElementById('inp-tanggal').value = '';
  document.getElementById('inp-jam').value = '';
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  showTab('transaksi');
}

function renderTx() {
  const list = document.getElementById('tx-list');
  list.innerHTML = bookings.map(b => `
    <div class="tx-card">
      <div class="tx-header">
        <div class="tx-id">#${b.id}</div>
        <div class="tx-status ${b.status === 'confirmed' ? 'status-confirmed' : 'status-pending'}">${b.status === 'confirmed' ? 'Terkonfirmasi' : 'Menunggu'}</div>
      </div>
      <div class="tx-name">${b.nama}</div>
      <div class="tx-pkg">${b.paket}</div>
      <div class="tx-date">${b.tanggal} · ${b.jam}</div>
      <div class="tx-footer">
        <div class="tx-price">Rp ${b.harga}</div>
        <button class="tx-whatsapp" onclick="hubungiWA('${b.nama}', '${b.paket.split(' - ')[0]}', '${b.tanggal}')">Hubungi</button>
      </div>
    </div>
  `).join('');
}

function hubungiWA(nama, paket, tanggal) {
  const msg = encodeURIComponent(`Halo Raisyah Studio, saya ingin konfirmasi booking:\nNama: ${nama}\nPaket: ${paket}\nTanggal: ${tanggal}`);
  window.open('https://wa.me/6281227245379?text=' + msg, '_blank');
}

function openWA() {
  window.open('https://wa.me/6281227245379?text=' + encodeURIComponent('Halo Raisyah Studio, saya ingin informasi lebih lanjut!'), '_blank');
}
