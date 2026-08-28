import './style.css';

const app = document.querySelector('#app');

const catArt = `
  <svg class="cat" viewBox="0 0 280 230" role="img" aria-labelledby="cat-title cat-desc">
    <title id="cat-title">A cheerful orange cat holding a flower</title>
    <desc id="cat-desc">An illustrated orange cat waves beside a small flower.</desc>
    <path class="tail" d="M215 167c42 21 48-34 22-47-20-10-30 11-14 18" fill="none" stroke="#cc633b" stroke-width="17" stroke-linecap="round"/>
    <path class="ear-shadow" d="M72 86 75 35l38 31M170 65l38-31 4 56"/>
    <path class="cat-body" d="M64 96c0-32 28-48 75-48s75 16 75 48v56c0 38-30 60-75 60s-75-22-75-60Z"/>
    <path class="muzzle" d="M106 143c0 19 15 28 33 28s34-9 34-28c-10-9-57-9-67 0Z"/>
    <path class="stripe" d="M105 67c8 7 15 11 25 13M139 58v24M173 67c-8 7-15 11-25 13" fill="none" stroke="#aa4c33" stroke-width="7" stroke-linecap="round"/>
    <circle cx="103" cy="119" r="7" fill="#362623"/><circle cx="175" cy="119" r="7" fill="#362623"/>
    <path d="m132 140 8 6 8-6" fill="#c85d68"/><path d="M140 147c-5 11-19 8-21 1m21-1c5 11 19 8 21 1" fill="none" stroke="#362623" stroke-width="3" stroke-linecap="round"/>
    <path class="arm" d="M76 153c-24 15-24 43-7 50 15 6 30-9 37-27M202 152c21 10 28 30 18 45" fill="none" stroke="#e88251" stroke-width="22" stroke-linecap="round"/>
    <path d="M212 156v-37M212 138l-14-13M212 130l13-14" fill="none" stroke="#518a5d" stroke-width="5" stroke-linecap="round"/>
    <circle cx="212" cy="114" r="12" fill="#f1ae43"/><circle cx="212" cy="114" r="5" fill="#8c5534"/>
  </svg>`;

function render(state = 'alert') {
  const done = state === 'done';
  app.innerHTML = `
    <section class="shell" aria-label="Purr reminder alert">
      <header class="topbar">
        <button class="icon-button back" type="button" aria-label="Go back">‹</button>
        <span class="brand" aria-label="Purr">purr<span class="brand-dot">.</span></span>
        <button class="icon-button more" type="button" aria-label="More reminder options">•••</button>
      </header>
      <section class="alert-card ${done ? 'is-done' : ''}" aria-live="polite">
        <div class="reminder-chip"><span class="chip-dot" aria-hidden="true"></span>${done ? 'Completed' : 'Reminder'}</div>
        <div class="art-wrap">${catArt}</div>
        <p class="eyebrow">${done ? 'NICE WORK!' : 'IT’S TIME FOR'}</p>
        <h1>${done ? 'All done!' : 'Morning stretch'}</h1>
        <p class="message">${done ? 'Tiny wins make a wonderful day. Your cat is very proud.' : 'A little movement can change the whole mood. You’ve got this.'}</p>
        ${done ? '<div class="completed-note" role="status">✓ Reminder marked complete</div>' : `
        <div class="action-grid" aria-label="Reminder actions">
          <button class="action complete" type="button" data-action="complete"><span class="action-icon" aria-hidden="true">✓</span><span><b>Complete</b><small>Mark it done</small></span></button>
          <button class="action snooze" type="button" data-action="snooze"><span class="action-icon" aria-hidden="true">◷</span><span><b>Snooze</b><small>Remind in 10 min</small></span></button>
          <button class="dismiss" type="button" data-action="dismiss">Dismiss for now</button>
        </div>`}
      </section>
      <p class="flow-note"><span aria-hidden="true">●</span> Alert shown through app notifications — no overlay permission needed.</p>
    </section>`;
}

render();

app.addEventListener('click', (event) => {
  const action = event.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'complete') render('done');
  if (action === 'snooze') {
    document.querySelector('.message').textContent = 'Okay — we’ll nudge you again in 10 minutes. Take your time.';
    event.target.closest('.action').classList.add('selected');
  }
  if (action === 'dismiss') {
    document.querySelector('.alert-card').classList.add('dismissed');
    document.querySelector('.flow-note').textContent = 'Reminder dismissed. You can find it again in your reminders.';
  }
});
