if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const form = document.getElementById('booking-form');
const list = document.getElementById('booking-list');
const total = document.getElementById('total-bookings');
const tierCountsEl = document.getElementById('tier-counts');
const STORAGE_KEY = 'bookings';

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  list.innerHTML = '';
  bookings.forEach(b => {
    const li = document.createElement('li');
    li.textContent = `${b.date || 'unscheduled'} – ${b.dogName} (${b.tier})`;
    list.appendChild(li);
  });
  total.textContent = bookings.length;
  const counts = bookings.reduce((acc, b) => {
    acc[b.tier] = (acc[b.tier] || 0) + 1;
    return acc;
  }, {});
  tierCountsEl.textContent = Object.entries(counts)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  const bookings = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  bookings.push(data);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  form.reset();
  loadBookings();
});

loadBookings();
