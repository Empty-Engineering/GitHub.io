const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collecting input values
    const email = document.getElementById('email').value;
    const forename = document.getElementById('forename').value;
    const surname = document.getElementById('surname').value;
    const birthday = document.getElementById('birthday').value.replace(/\//g, '.'); // Auto-format birthday if needed
    const password = document.getElementById('password').value;

    // Backend API URL
    const apiUrl = 'https://api.cpnacademy.co.uk';

    try {
        // Sending registration data to the backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, forename, surname, birthday, password }),
        });

        if (response.ok) {
            // If registration is successful
            alert('Registration successful! Redirecting to the sign-in page.');
            window.location.href = '/signin.html'; // Redirect to sign-in page
        } else {
            // Handle server error responses
            const result = await response.json();
            alert('Error: ' + (result.message || 'An error occurred.'));
        }
    } catch (error) {
        // Handle network or other errors
        console.error('Error:', error);
        alert('Failed to connect to the server. Please try again later.');
    }
});
