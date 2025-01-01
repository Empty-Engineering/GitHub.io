document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');
    // Lovely jubbly -- sound as a pound

    // Get the login form
    const form = document.getElementById('login-form');
    if (!form) {
        console.error('Login form not found!');
        return;
    }
    console.log('Login form found:', form);

    // Attach the submit event listener
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submitted!');

        // Get email and password inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(`Email: ${email}, Password: [hidden]`);

        try {
            // Send the login request to the API
            const response = await fetch('https://api.cpnacademy.co.uk/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include', // Include cookies in the request
            });

            console.log('Fetch response:', response);

            if (response.ok) {
                // Parse the result
                const result = await response.json();
                console.log('Fetch result:', result);

                // Debug cookies
                const allCookies = document.cookie.split('; ');
                console.log('Cookies after login:', allCookies);

                // Ensure `session_token` exists
                const sessionToken = allCookies.find(row => row.startsWith('session_token='));
                if (sessionToken) {
                    console.log('Session Token:', sessionToken.split('=')[1]);
                    alert('Login successful! Redirecting to your dashboard.');
                    window.location.href = '/browse/dashboard.html';
                } else {
                    console.error('Session token not found in cookies.');
                    alert('Failed to log in. No session token found.');
                }
            } else {
                const result = await response.json();
                console.error('Error response:', result);
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Failed to sign in:', error);
            alert('Failed to sign in. Please try again.');
        }
    });

    // Check cookies on page load
    const allCookies = document.cookie.split('; ');
    console.log('Current cookies:', allCookies);

    const sessionToken = allCookies.find(row => row.startsWith('session_token='));
    if (sessionToken) {
        console.log('Session Token:', sessionToken.split('=')[1]);
    } else {
        console.log('No session token found.');
    }
});
