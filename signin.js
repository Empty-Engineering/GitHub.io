const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collecting input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Backend API URL
    const apiUrl = 'https://api.cpnacademy.co.uk/login';

    try {
        // Sending login data to the backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // If login is successful
            const result = await response.json();
            alert('Login successful! Redirecting to your dashboard.');
            // Store session token or user info if needed (e.g., in localStorage)
            localStorage.setItem('user', JSON.stringify(result.user));
            // Redirect to the dashboard or homepage
            window.location.href = '/dashboard.html'; // Update with your dashboard page URL
        } else {
            // Handle server error responses
            const result = await response.json();
            alert('Error: ' + (result.message || 'Invalid credentials.'));
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('Failed to connect to the server. Please try again later.');
    }
});
