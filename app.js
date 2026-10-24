(() => {
  const data = window.EVENT_DATA;
  const unresolved = (value) => !value || /^\[[^\]]+\]$/.test(value.trim());
  const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const markPlaceholder = (element, value) => {
    element.textContent = value;
    if (unresolved(value)) element.closest('.info-card, .meta-item')?.classList.add('is-pending');
  };

  document.querySelectorAll('[data-event]').forEach((element) => {
    const key = element.dataset.event;
    markPlaceholder(element, data[key] || `[${key.toUpperCase()}]`);
  });
  document.title = `${data.name} · De MET`;
  document.querySelectorAll('meta[property="og:title"]').forEach((el) => { el.content = document.title; });

  document.querySelector('#distance-list').innerHTML = data.distances.map((distance, index) => `
    <article class="distance-card distance-card-${index + 1}">
      <div class="distance-number">0${index + 1}</div><span class="distance-mark" aria-hidden="true">${['↗', '✳', '→'][index]}</span>
      <p class="eyebrow">${index === 0 ? 'Op jouw tempo' : index === 1 ? 'Samen op pad' : 'Ga de challenge aan'}</p>
      <h3>${escapeHTML(distance)}</h3>
      <p class="distance-detail">Startuur vanaf 9h , iederen is welkom!</p>
    </article>`).join('');

  document.querySelector('#program-list').innerHTML = data.program.map((item, index) => `
    <li><span class="timeline-index">0${index + 1}</span><div><strong>${escapeHTML(item.split(' · ')[0])}</strong><span>${escapeHTML(item.includes(' · ') ? item.split(' · ')[1] : '[INFO]')}</span></div><span class="status-pill">Nog aan te vullen</span></li>`).join('');

  document.querySelector('#faq-list').innerHTML = data.faq.map(({ question, answer }) => `
    <details class="faq-item"><summary>${escapeHTML(question)}<span class="faq-plus" aria-hidden="true">+</span></summary><p>${escapeHTML(answer)}</p></details>`).join('');

  const registerButton = document.querySelector('#register-button');
  if (!unresolved(data.registrationUrl) && /^https:\/\//i.test(data.registrationUrl)) {
    const link = document.createElement('a');
    link.className = 'button button-dark'; link.href = data.registrationUrl;
    link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Schrijf je in';
    registerButton.replaceWith(link);
  }

  const contact = document.querySelector('[data-contact]');
  if (data.contactEmail) { const link = document.createElement('a'); link.href = `mailto:${data.contactEmail}`; link.textContent = data.contact || data.contactEmail; contact.replaceWith(link); }
  const official = document.querySelector('[data-official]');
  if (data.officialUrl && /^https:\/\//i.test(data.officialUrl)) { const link = document.createElement('a'); link.href = data.officialUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = official.textContent; official.replaceWith(link); }
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
