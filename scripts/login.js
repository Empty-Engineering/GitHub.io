document.addEventListener('DOMContentLoaded', () => {
    // Parse and log the user_data cookie
    const userDataCookie = document.cookie.split('; ').find(row => row.startsWith('user_data='));
    if (userDataCookie) {
        try {
            const userData = JSON.parse(decodeURIComponent(userDataCookie.split('=')[1]));
            alert(`Welcome back, ${userData.forename} ${userData.surname}!`);
        } catch (error) {
            console.error('Error parsing user_data cookie:', error);
        }
    }

    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        try {
            const response = await fetch('https://api.cpnacademy.co.uk/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Include cookies in the request
            });

            if (response.ok) {
                const result = await response.json();

                alert('Login successful! Redirecting to your dashboard.');
                window.location.href = '/browse/dashboard.html';
            } else {
                const result = await response.json();
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Failed to sign in:', error);
            alert('Failed to sign in. Please try again.');
        }
    });
});
