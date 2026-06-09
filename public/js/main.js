/**
 * TransFelicianoWeb — main.js
 * Interações globais: sidebar toggle, data, mobile menu
 */

(function () {
  'use strict';

  /* ── Sidebar Toggle (desktop) ─────────────────────────────── */
  const sidebarToggleBtn = document.getElementById('sidebarToggle');
  const sidebar          = document.getElementById('sidebar');
  const mainWrapper      = document.getElementById('mainWrapper');

  if (sidebarToggleBtn && sidebar && mainWrapper) {
    // Restaurar estado salvo
    const collapsed = localStorage.getItem('tfwSidebarCollapsed') === 'true';
    if (collapsed) applySidebarCollapsed(true, false);

    sidebarToggleBtn.addEventListener('click', () => {
      const isCollapsed = sidebar.classList.contains('collapsed');
      applySidebarCollapsed(!isCollapsed, true);
    });
  }

  function applySidebarCollapsed(collapse, save) {
    if (!sidebar || !mainWrapper) return;
    const icon = document.querySelector('#sidebarToggle i');

    if (collapse) {
      sidebar.classList.add('collapsed');
      mainWrapper.classList.add('sidebar-collapsed');
      if (icon) { icon.classList.remove('fa-chevron-left'); icon.classList.add('fa-chevron-right'); }
    } else {
      sidebar.classList.remove('collapsed');
      mainWrapper.classList.remove('sidebar-collapsed');
      if (icon) { icon.classList.remove('fa-chevron-right'); icon.classList.add('fa-chevron-left'); }
    }

    if (save) localStorage.setItem('tfwSidebarCollapsed', collapse);
  }

  /* ── Sidebar Collapse CSS (injected) ─────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .sidebar.collapsed { width: var(--sidebar-collapsed, 72px); }
    .sidebar.collapsed .sidebar-brand-text,
    .sidebar.collapsed .nav-text,
    .sidebar.collapsed .sidebar-section-label span,
    .sidebar.collapsed .sidebar-user-info { display: none; }
    .sidebar.collapsed .sidebar-brand { justify-content: center; padding: 20px 8px; }
    .sidebar.collapsed .sidebar-toggle-btn { position: static; margin-left: 4px; }
    .sidebar.collapsed .sidebar-nav-link { justify-content: center; padding: 10px; }
    .sidebar.collapsed .sidebar-footer { justify-content: center; }
    .sidebar.collapsed .sidebar-logout-btn { margin-left: 0; }
    .sidebar.collapsed .sidebar-user-avatar { margin: 0 auto; }
    .sidebar.collapsed .sidebar-section-label { padding: 8px 0; text-align: center; }
  `;
  document.head.appendChild(style);

  /* ── Mobile Sidebar Toggle ────────────────────────────────── */
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (
        sidebar.classList.contains('mobile-open') &&
        !sidebar.contains(e.target) &&
        e.target !== mobileToggle
      ) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }

  /* ── Data/Hora na Topbar ──────────────────────────────────── */
  const dateEl = document.getElementById('currentDate');
  if (dateEl) {
    function updateDate() {
      const now  = new Date();
      const opts = { day: '2-digit', month: 'short', year: 'numeric' };
      dateEl.textContent = now.toLocaleDateString('pt-BR', opts);
    }
    updateDate();
  }

  /* ── Tooltips simples para sidebar collapsed ─────────────── */
  document.querySelectorAll('.sidebar-nav-link').forEach(link => {
    const text = link.querySelector('.nav-text');
    if (!text) return;
    link.setAttribute('title', text.textContent.trim());
  });

  /* ── Fade-in para cards ───────────────────────────────────── */
  const cards = document.querySelectorAll('.stat-card, .dash-card, .coming-soon-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = `opacity .4s ease ${i * 60}ms, transform .4s ease ${i * 60}ms`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 50);
  });

})();
