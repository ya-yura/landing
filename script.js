(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Открыть меню' : 'Закрыть меню');
      mobileNav.classList.toggle('is-open', !isOpen);
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Открыть меню');
      mobileNav.classList.remove('is-open');
    }));
  }

  const flowSteps = [...document.querySelectorAll('[data-flow-step]')];
  const flowNote = document.querySelector('[data-flow-note]');
  const flowNotes = [
    'Один экран — один следующий шаг. Без перехода по меню.',
    'Страница сразу отвечает на тот запрос, с которым пришёл человек.',
    'Цена, формат, дата и важные детали находятся в одном контексте.',
    'Кнопка ведёт в привычный для бизнеса канал заявки.',
  ];
  flowSteps.forEach((step) => step.addEventListener('click', () => {
    flowSteps.forEach((item) => {
      const active = item === step;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (flowNote) flowNote.textContent = flowNotes[Number(step.dataset.flowStep)];
  }));

  const compare = document.querySelector('[data-compare]');
  const compareTitle = document.querySelector('[data-compare-title]');
  const compareTag = document.querySelector('[data-compare-tag]');
  const compareNote = document.querySelector('[data-compare-note]');
  const compareRoute = document.querySelector('[data-compare-route]');
  const compareCopy = {
    before: {
      title: 'Общий сайт',
      tag: 'поиск по меню',
      note: 'Когда следующий шаг неочевиден, человек тратит внимание на навигацию, а не на предложение.',
    },
    after: {
      title: 'Конкретный запрос',
      tag: 'посадочная',
      note: 'Один маршрут не заставляет посетителя угадывать следующий шаг.',
    },
  };
  document.querySelectorAll('[data-compare-mode]').forEach((button) => button.addEventListener('click', () => {
    const mode = button.dataset.compareMode;
    if (compare) compare.dataset.state = mode;
    document.querySelectorAll('[data-compare-mode]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (compareTitle) compareTitle.textContent = compareCopy[mode].title;
    if (compareTag) compareTag.textContent = compareCopy[mode].tag;
    if (compareNote) compareNote.textContent = compareCopy[mode].note;
    if (compareRoute) {
      compareRoute.innerHTML = mode === 'before'
        ? '<span class="route-chip">общий сайт</span><i aria-hidden="true">→</i><span class="route-chip">поиск по меню</span><i aria-hidden="true">→</i><span class="route-chip">сомнение</span><i aria-hidden="true">→</i><span class="route-chip route-chip-accent">уход <b aria-hidden="true">↘</b></span>'
        : '<span class="route-chip">конкретный запрос</span><i aria-hidden="true">→</i><span class="route-chip">понятный вариант</span><i aria-hidden="true">→</i><span class="route-chip">условия</span><i aria-hidden="true">→</i><span class="route-chip route-chip-accent">действие <b aria-hidden="true">↗</b></span>';
    }
  }));

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const projectCards = [...document.querySelectorAll('[data-category]')];
  const filterEmpty = document.querySelector('[data-filter-empty]');
  const filterParam = new URLSearchParams(window.location.search).get('category');
  const allowedFilters = new Set(['all', 'landing', 'service', 'interface']);
  const applyFilter = (filter, updateUrl = true) => {
    const activeFilter = allowedFilters.has(filter) ? filter : 'all';
    let visible = 0;
    projectCards.forEach((card) => {
      const show = activeFilter === 'all' || card.dataset.category === activeFilter;
      card.hidden = !show;
      if (show) visible += 1;
    });
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (filterEmpty) filterEmpty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeFilter === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', activeFilter);
      window.history.replaceState({}, '', url);
    }
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
  applyFilter(filterParam || 'all', false);

  const revealItems = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
