'use strict';

(function loadUserStylePreferences(mode) {
    const el = s => document.querySelector(s);
    const link = el('link#color-mode');
    const current = mode === 'dark' ? 'dark' : 'light';
    link.className = current;
    link.href = `${window.location.origin}/css/${current}.css`;
    window.onload = () => {
        el('#color').innerHTML = window.strings[current === 'dark' ? 'light' : 'dark'];
    };
})(localStorage.getItem('mode'));
