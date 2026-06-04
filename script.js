const textarea = document.getElementById('notebook-textarea');
const pageTitle = document.getElementById('page-title');
const saveStatus = document.getElementById('save-status');
const tabsContainer = document.querySelector('.tabs');
const tabs = document.querySelectorAll('.tab-btn');

const STORAGE_PREFIX = 'note_';
let currentTab = 'tab1';
let statusTimer;

function updateStatus(message) {
    saveStatus.textContent = message;
    saveStatus.style.opacity = '1';

    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => {
        saveStatus.textContent = 'Збережено у браузері ✨';
        saveStatus.style.opacity = '0.85';
    }, 800);
}

function loadNote(tab = currentTab) {
    textarea.value = localStorage.getItem(`${STORAGE_PREFIX}${tab}`) ?? '';
}

function setActiveTab(tabName) {
    currentTab = tabName;

    tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    const label = document.querySelector(`[data-tab="${tabName}"]`)?.textContent.trim() || 'Плани';
    pageTitle.textContent = `Мій день • ${label}`;
    loadNote(tabName);
}

textarea.addEventListener('input', () => {
    localStorage.setItem(`${STORAGE_PREFIX}${currentTab}`, textarea.value);
    updateStatus('Зберігаю... ☕');
});

tabsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('.tab-btn');
    if (!button) return;

    setActiveTab(button.dataset.tab);
});

setActiveTab(currentTab);
// Реєстрація Service Worker для PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker успішно зареєстровано!', reg))
      .catch(err => console.log('Помилка реєстрації Service Worker:', err));
  });
}