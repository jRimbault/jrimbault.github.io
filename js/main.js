'use strict';


function switcher() {
    const link = document.querySelector('link#color-mode');

    return event => {
        const previous = link.className;
        link.className = link.className === 'dark' ? 'light' : 'dark';
        event.target.innerHTML = window.strings[previous];
        link.href = `${window.location.origin}/css/${link.className}.css`;
        localStorage.setItem('mode', link.className);
    }
}

document.querySelector('#color').addEventListener('click', switcher());

window.onload = () => {
    const mode = localStorage.getItem('mode') === 'dark' ? 'dark' : 'light';
    const previous = mode === 'dark' ? 'light' : 'dark';
    const link = document.querySelector('link#color-mode');
    link.className = mode;
    link.href = `${window.location.origin}/css/${link.className}.css`;
    document.querySelector('#color').innerHTML = window.strings[previous];
}
