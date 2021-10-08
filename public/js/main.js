function generateLinks() {
    let linkEl = document.getElementById('top-nav-link');
    console.log(linkEl);
    console.log(document.location.pathname);
    if (document.location.pathname === '/') {
        console.log('If works');
        linkEl.href = '/user'
        linkEl.innerHTML = 'user page'
    } else {
        console.log('Else works');
        linkEl.href = '/'
        linkEl.innerHTML = 'home page'
    }
}

window.addEventListener('load', (event) => {
    generateLinks();
});