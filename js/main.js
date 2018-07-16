'use strict';


function switcher() {
    const link = document.querySelector('link#color-mode');

    return event => {
        const previous = link.className;
        link.className = link.className === 'dark' ? 'light' : 'dark';
        event.target.innerHTML = `${previous} mode`;
        link.href = `${window.location.origin}/css/${link.className}.css`;
    }
}

document.querySelector('#color').addEventListener('click', switcher());
