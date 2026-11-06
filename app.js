import { getStatus } from './schedule.js';

const answer = document.querySelector('#answer');
const theme = document.querySelector('meta[name="theme-color"]');

function update() {
  const state = getStatus();
  if (document.documentElement.dataset.state === state) return;
  document.documentElement.dataset.state = state;
  answer.textContent = state === 'yes' ? 'Yes' : 'No';
  theme.content = state === 'yes' ? '#00d58a' : '#ff527c';
}

update();
// Align to the clock so the answer changes at the minute boundary.
function scheduleUpdate() {
  setTimeout(() => {
    update();
    scheduleUpdate();
  }, 60_000 - (Date.now() % 60_000));
}
scheduleUpdate();
document.addEventListener('visibilitychange', update);
window.addEventListener('pageshow', update);
window.addEventListener('focus', update);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch((error) => {
    console.warn('Offline support could not be enabled:', error);
  });
}
