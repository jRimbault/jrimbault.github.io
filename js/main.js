'use strict';


const $ = {
    el: s => document.querySelector(s),
    set: (k, v) => localStorage.setItem(k, v),
    get: k => localStorage.getItem(k),
};

const link = $.el('link#color-mode');
const button = $.el('#color');
const href = mode => `${window.location.origin}/css/${mode}.css`;
const inverse = mode => mode === 'dark' ? 'light' : 'dark';

function change(mode) {
    const current = inverse(mode);
    link.className = current;
    link.href = href(current);
    button.innerHTML = window.strings[mode];
    return current;
}

button.addEventListener('click', () => $.set('mode', change(link.className)));
