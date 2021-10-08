function generateLinks() {
    let linkEl = document.getElementById('top-nav-link');
    let linkEl2 = document.getElementById('top-nav-link-login');
    if (document.location.pathname === '/') {
        linkEl.href = '/user'
        linkEl.innerHTML = 'user page'
    } else if (document.location.pathname === '/user'){
        linkEl.href = '/'
        linkEl.innerHTML = 'home page'
    } else {
        linkEl2.href = '/'
        linkEl2.innerHTML = 'home page'
    }
}

window.addEventListener('load', (event) => {
    event.preventDefault();
    generateLinks();
});