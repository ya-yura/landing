(() => {
  const emailSubject = 'Посадочная страница под услугу';
  const emailBody = [
    'Компания:',
    'Ссылка на текущий сайт:',
    'Услуга или предложение:',
    'Что должен сделать посетитель:',
    'Какой канал заявки уже используется:',
  ].join('\n');
  const emailHref = `mailto:sharikov@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  document.querySelectorAll('a[href^="mailto:sharikov@gmail.com"]').forEach((link) => {
    link.setAttribute('href', emailHref);
  });

  const track = (eventName, params = {}) => {
    const payload = { event: eventName, ...params };
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    if (Array.isArray(window.dataLayer)) window.dataLayer.push(payload);
    if (typeof window.ym === 'function' && window.YM_COUNTER_ID) window.ym(window.YM_COUNTER_ID, 'reachGoal', eventName, params);
    window.dispatchEvent(new CustomEvent('landing_event', { detail: payload }));
  };

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => track(element.dataset.track));
  });

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

  const compareTitle = document.querySelector('[data-compare-title]');
  const compareTag = document.querySelector('[data-compare-tag]');
  const compareNote = document.querySelector('[data-compare-note]');
  const compareRoute = document.querySelector('[data-compare-route]');
  const compareCopy = {
    before: {
      title: 'Общий сайт',
      tag: 'поиск по меню',
      note: 'Когда следующий шаг неочевиден, человек тратит внимание на навигацию, а не на предложение.',
      route: '<span class="route-chip">запрос</span><i aria-hidden="true">→</i><span class="route-chip">меню</span><i aria-hidden="true">→</i><span class="route-chip">поиск</span><i aria-hidden="true">→</i><span class="route-chip route-chip-accent">сомнение <b aria-hidden="true">↘</b></span>',
    },
    after: {
      title: 'Отдельная посадочная',
      tag: 'один маршрут',
      note: 'Отдельная ссылка собирает рекламный запрос и следующий шаг в одном контексте.',
      route: '<span class="route-chip">запрос</span><i aria-hidden="true">→</i><span class="route-chip">подходящее предложение</span><i aria-hidden="true">→</i><span class="route-chip">условия</span><i aria-hidden="true">→</i><span class="route-chip route-chip-accent">заявка <b aria-hidden="true">↗</b></span>',
    },
  };
  document.querySelectorAll('[data-compare-mode]').forEach((button) => button.addEventListener('click', () => {
    const mode = button.dataset.compareMode;
    document.querySelectorAll('[data-compare-mode]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (compareTitle) compareTitle.textContent = compareCopy[mode].title;
    if (compareTag) compareTag.textContent = compareCopy[mode].tag;
    if (compareNote) compareNote.textContent = compareCopy[mode].note;
    if (compareRoute) compareRoute.innerHTML = compareCopy[mode].route;
  }));

  const portfolio = [
    { match: 'pinkme-krasnodar', order: 1, category: 'landing', status: 'Публичная посадочная', task: 'Задача: отдельная точка входа в фитнес и растяжку. Путь: направление → запись.' },
    { match: 'masterfix-krasnodar', order: 2, category: 'landing', status: 'Публичная посадочная', task: 'Задача: объяснить сервис и довести до записи. Путь: услуга → условия → обращение.' },
    { match: 'smart-climat-krasnodar', order: 3, category: 'landing', status: 'Публичная посадочная', task: 'Задача: собрать подбор и монтаж кондиционера. Путь: запрос → решение → расчёт.' },
    { match: 'rem-split-krasnodar', order: 4, category: 'landing', status: 'Публичная посадочная', task: 'Задача: привести к ремонту и обслуживанию. Путь: проблема → услуга → заявка.' },
    { match: 'servisavto-krasnodar', order: 5, category: 'landing', status: 'Публичная посадочная', task: 'Задача: сделать автосервис понятным с первого экрана. Путь: услуга → запись.' },
    { match: 'orange-master-krasnodar', order: 6, category: 'landing', status: 'Публичная посадочная', task: 'Задача: отдельная точка входа в автотехцентр. Путь: запрос → консультация.' },
    { match: 'avtoklimat23-krasnodar', order: 7, category: 'landing', status: 'Публичная посадочная', task: 'Задача: объяснить ремонт и заправку автокондиционера. Путь: услуга → стоимость.' },
    { match: 'dinamika-autocenter', order: 8, category: 'landing', status: 'Публичная посадочная', task: 'Задача: навигация по услугам автотехцентра. Путь: услуга → запись.' },
    { match: 'sk-service-krasnodar', order: 9, category: 'landing', status: 'Публичная посадочная', task: 'Задача: собрать ремонт и диагностику в одном маршруте. Путь: проблема → сервис.' },
    { match: 'logos-krasnodar-landing-20260811', order: 10, category: 'landing', status: 'Публичная посадочная', task: 'Задача: подобрать программу центра. Путь: запрос → направление → обращение.' },
    { match: 'evrika-krasnodar-20260811', order: 11, category: 'landing', status: 'Публичная посадочная', task: 'Задача: помочь выбрать образовательную программу. Путь: запрос → формат → заявка.' },
    { exact: 'https://ya-yura.github.io/', order: 12, category: 'landing', status: 'Публичный пример', task: 'Задача: архив открытых страниц и интерфейсов. Путь: интерес → просмотр примера.' },
    { match: 'kubtel.2026', order: 13, category: 'landing', status: 'Демонстрационный проект', task: 'Задача: развести домашний интернет, тарифы и бизнес. Путь: запрос → подходящий маршрут.' },
    { match: 'case-sklad-15', order: 14, category: 'service', status: 'Кейс сервисного сценария', task: 'Задача: показать маршрут сложной складской операции. Путь: приёмка → условия → действие.' },
    { match: 'case-kubtel', order: 15, category: 'service', status: 'Кейс сервисного сценария', task: 'Задача: объяснить статус при аварии. Путь: проблема → статус → следующий шаг.' },
    { match: 'test-zinit', order: 16, category: 'interface', status: 'Рабочий интерфейс', task: 'Задача: показать рабочую панель закупщика. Путь: данные → решение → действие.' },
    { match: 'hotel-app', order: 17, category: 'interface', status: 'Рабочий интерфейс', task: 'Задача: управлять бронированиями и номерами. Путь: статус → номер → операция.' },
    { match: 'WightApp', order: 18, category: 'interface', status: 'Рабочий интерфейс', task: 'Задача: сравнить цену товаров. Путь: товар → единица → сравнение.' },
  ];
  const projectGrid = document.querySelector('[data-project-grid]');
  let projectCards = [...document.querySelectorAll('[data-category]')];
  projectCards = projectCards.map((card) => {
    const link = card.querySelector('.project-link');
    const href = link?.href || '';
    const item = portfolio.find((entry) => entry.exact ? href === entry.exact : href.includes(entry.match));
    if (!item) return card;
    card.dataset.category = item.category;
    card.dataset.order = String(item.order);
    card.dataset.extra = String(item.order > 8);
    const meta = card.querySelector('.project-meta');
    if (meta) meta.innerHTML = `<span>${item.status}</span><span>${String(item.order).padStart(2, '0')} / 18</span>`;
    const description = card.querySelector('p');
    if (description) description.textContent = item.task;
    if (link) link.innerHTML = 'Открыть пример <span aria-hidden="true">↗</span>';
    return card;
  }).sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  projectCards.forEach((card) => projectGrid?.append(card));

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const showAllButton = document.querySelector('[data-show-all]');
  const filterEmpty = document.querySelector('[data-filter-empty]');
  const allowedFilters = new Set(['all', 'landing', 'service', 'interface']);
  let showAll = false;
  const applyFilter = (filter, updateUrl = true) => {
    const activeFilter = allowedFilters.has(filter) ? filter : 'all';
    let visible = 0;
    projectCards.forEach((card) => {
      const matchesCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matchesDefault = activeFilter !== 'all' || showAll || Number(card.dataset.order) <= 8;
      const show = matchesCategory && matchesDefault;
      card.hidden = !show;
      if (show) visible += 1;
    });
    filterButtons.forEach((button) => {
      const active = button.dataset.filter === activeFilter;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    if (showAllButton) {
      const canExpand = activeFilter === 'all' && projectCards.some((card) => Number(card.dataset.order) > 8);
      showAllButton.hidden = !canExpand;
      showAllButton.setAttribute('aria-expanded', String(showAll));
      showAllButton.innerHTML = showAll ? 'Свернуть примеры <span aria-hidden="true">－</span>' : 'Показать все примеры <span aria-hidden="true">＋</span>';
    }
    if (filterEmpty) filterEmpty.hidden = visible !== 0;
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (activeFilter === 'all') url.searchParams.delete('category');
      else url.searchParams.set('category', activeFilter);
      window.history.replaceState({}, '', url);
    }
  };
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    showAll = false;
    track('portfolio_filter_used', { category: button.dataset.filter });
    applyFilter(button.dataset.filter);
  }));
  showAllButton?.addEventListener('click', () => {
    showAll = !showAll;
    track('portfolio_filter_used', { category: showAll ? 'all-expanded' : 'all-collapsed' });
    applyFilter('all');
  });
  const initialFilter = new URLSearchParams(window.location.search).get('category') || 'all';
  showAll = initialFilter !== 'all';
  applyFilter(initialFilter, false);

  projectCards.forEach((card) => card.querySelector('.project-link')?.addEventListener('click', () => {
    track('portfolio_card_open', { order: card.dataset.order });
  }));

  document.querySelectorAll('.faq-list details').forEach((details) => details.addEventListener('toggle', () => {
    if (details.open) track('faq_open', { question: details.querySelector('summary')?.textContent.trim() });
  }));

  const scrollMilestones = new Set();
  const checkScrollDepth = () => {
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (pageHeight <= 0) return;
    const percent = Math.round((window.scrollY / pageHeight) * 100);
    [50, 90].forEach((milestone) => {
      if (percent >= milestone && !scrollMilestones.has(milestone)) {
        scrollMilestones.add(milestone);
        track(`scroll_${milestone}`);
      }
    });
  };
  window.addEventListener('scroll', checkScrollDepth, { passive: true });

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
