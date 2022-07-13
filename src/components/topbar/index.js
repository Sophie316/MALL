import './topbar.css';

const topbar = document.getElementById('topbar');
const haveMenu = topbar.querySelectorAll('#havemenu');
for (const item of haveMenu) {
    item.addEventListener('mouseenter', function () {
        let name = `#${this.dataset.n}-hide-content`;
        document.querySelector(name).style.display = 'block';
    }, false)
};
for (const item of haveMenu) {
    let name = `#${item.dataset.n}-hide-content`;
    document.querySelector(name).addEventListener('mouseleave', function () {
        document.querySelector(name).style.display = 'none';
    }, false)
}