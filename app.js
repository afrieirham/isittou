import { getStatus } from './schedule.js';

const answer = document.querySelector('#answer');
const theme = document.querySelector('meta[name="theme-color"]');
const preview = document.querySelector('#preview');
const live = document.querySelector('#live');
const timeLabel = document.querySelector('#time-label');
let previewState = null;

function update() {
  const state = previewState ?? getStatus();
  preview.textContent = state === 'yes' ? 'Preview red' : 'Preview green';
  live.hidden = previewState === null;
  timeLabel.textContent = previewState === null ? 'GMT+8' : 'Color preview · GMT+8';
  if (document.documentElement.dataset.state === state) return;
  document.documentElement.dataset.state = state;
  answer.textContent = state === 'yes' ? 'Yes' : 'No';
  theme.content = state === 'yes' ? '#00d58a' : '#ff527c';
}

preview.hidden = false;
preview.addEventListener('click', () => {
  previewState = document.documentElement.dataset.state === 'yes' ? 'no' : 'yes';
  update();
});
live.addEventListener('click', () => {
  previewState = null;
  update();
  preview.focus();
});

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
