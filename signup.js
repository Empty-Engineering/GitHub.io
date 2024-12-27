const signupForm = document.getElementById('signup-form');
const verifyForm = document.getElementById('verify-form');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            alert('Verification code sent!');
            signupForm.classList.add('hidden');
            verifyForm.classList.remove('hidden');
        } else {
            const result = await response.json();
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('Failed to send verification code.');
    }
});

verifyForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const verificationCode = document.getElementById('verification-code').value;

    try {
        const response = await fetch('/verify-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, verificationCode }),
        });

        if (response.ok) {
            alert('Verification successful! User registered.');
        } else {
            const result = await response.json();
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error(error);
        alert('Verification failed.');
    }
});
