document.addEventListener('DOMContentLoaded', () => {
    // Dynamically create the navigation bar
    const navBar = document.createElement('nav');
    navBar.classList.add('nav-bar');

    // Create the Home link
    const homeNav = document.createElement('a');
    homeNav.id = 'home-nav';
    homeNav.textContent = 'Home';

    // Determine Home link destination
    const sessionToken = localStorage.getItem('session_token');
    homeNav.href = sessionToken ? '/browse/dashboard' : '/browse/register';

    // Add other navigation links
    const links = [
        { href: '/browse/courses', text: 'Courses' },
        { href: '/browse/about', text: 'About' },
        { href: '/browse/contact', text: 'Contact' },
        { href: '/browse/login', text: 'Sign In' },
    ];

    // Append the Home link first
    navBar.appendChild(homeNav);

    // Append other links
    links.forEach(link => {
        const aTag = document.createElement('a');
        aTag.href = link.href;
        aTag.textContent = link.text;
        navBar.appendChild(aTag);
    });

    // Insert the navigation bar into the placeholder
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.appendChild(navBar);
    } else {
        console.error('Navigation placeholder not found.');
    }
});

