'use strict';


function switcher() {
    const link = document.querySelector('link#color-mode');

    return event => {
        const previous = link.className;
        link.className = link.className === 'dark' ? 'light' : 'dark';
        event.target.innerHTML = window.strings[previous];
        link.href = `${window.location.origin}/css/${link.className}.css`;
    }
}

document.querySelector('#color').addEventListener('click', switcher());
