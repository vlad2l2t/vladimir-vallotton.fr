// Navbar toggle
const menuToggle = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');
menuToggle.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// Scroll top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if(window.scrollY > 300){
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
});

// Fermer menu après clic sur lien
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('show');
    });
});