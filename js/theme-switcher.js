/**
 * theme-switcher.js
 * Handles dark/light theme toggling using CSS variables and data-theme attribute.
 * Week 5: Advanced CSS & Modern Layouts
 */

(function () {
  'use strict';

  /* ── Constants ───────────────────────────────────────── */
  const STORAGE_KEY  = 'portfolio-theme';
  const DARK_THEME   = 'dark';
  const LIGHT_THEME  = 'light';
  const DARK_ICON    = '🌙';
  const LIGHT_ICON   = '☀️';

  /* ── Elements ────────────────────────────────────────── */
  const html        = document.documentElement;
  const toggleBtn   = document.getElementById('themeToggle');
  const toggleIcon  = toggleBtn ? toggleBtn.querySelector('.theme-toggle__icon') : null;

  /* ── Helpers ─────────────────────────────────────────── */

  /**
   * Returns the user's OS/browser preferred colour scheme.
   * @returns {'dark'|'light'}
   */
  function getSystemPreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? DARK_THEME
      : LIGHT_THEME;
  }

  /**
   * Returns the saved theme from localStorage, or falls back to system preference.
   * @returns {'dark'|'light'}
   */
  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || getSystemPreference();
  }

  /**
   * Applies a theme by:
   *  1. Setting the data-theme attribute on <html>
   *  2. Updating the toggle button icon and aria-label
   *  3. Persisting the choice to localStorage
   *
   * @param {'dark'|'light'} theme
   */
  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);

    if (toggleIcon) {
      toggleIcon.textContent = theme === DARK_THEME ? DARK_ICON : LIGHT_ICON;
    }

    if (toggleBtn) {
      toggleBtn.setAttribute(
        'aria-label',
        theme === DARK_THEME ? 'Switch to light mode' : 'Switch to dark mode'
      );
    }

    localStorage.setItem(STORAGE_KEY, theme);
  }

  /**
   * Toggles between dark and light themes.
   */
  function toggleTheme() {
    const current = html.getAttribute('data-theme') || DARK_THEME;
    applyTheme(current === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  }

  /* ── Init ────────────────────────────────────────────── */

  // Apply saved / preferred theme immediately (before paint)
  applyTheme(getSavedTheme());

  // Wire up toggle button
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }

  // Keyboard shortcut: Alt + T
  document.addEventListener('keydown', function (e) {
    if (e.altKey && e.key.toLowerCase() === 't') {
      toggleTheme();
    }
  });

  // React to OS-level preference changes in real time
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    // Only follow the OS if the user hasn't manually chosen a theme
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    }
  });

})();