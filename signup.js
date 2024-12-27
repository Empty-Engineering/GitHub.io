const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const forename = document.getElementById('forename').value;
    const surname = document.getElementById('surname').value;
    const birthday = document.getElementById('birthday').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, forename, surname, birthday, password }),
        });

        if (response.ok) {
            alert('Registration successful! Redirecting to sign-in page.');
            window.location.href = '/signin.html'; // Update with actual sign-in page URL
        } else {
            const result = await response.json();
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('Failed to register. Please try again.');
    }
});
