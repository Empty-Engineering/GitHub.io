document.addEventListener('DOMContentLoaded', () => {
    // Populate the date dropdowns
    const daySelect = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');

    if (!daySelect || !monthSelect || !yearSelect) {
        console.error('Date dropdowns not found. Ensure the correct IDs are in the HTML.');
        return;
    }

    // Populate days
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }

    // Populate months
    const months = [
        'January', 'February', 'March', 'April',
        'May', 'June', 'July', 'August',
        'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Months are 1-indexed
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate years (current year to 100 years ago)
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    console.log('Date dropdowns populated.');

    // Handle the form submission
    const signupForm = document.getElementById('signup-form');
    if (!signupForm) {
        console.error('Signup form not found.');
        return;
    }

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Get form values
        const email = document.getElementById('email').value.trim();
        const forename = document.getElementById('forename').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const day = document.getElementById('day').value;
        const month = document.getElementById('month').value;
        const year = document.getElementById('year').value;
        const password = document.getElementById('password').value.trim();

        // Validate input
        if (!email || !forename || !surname || !day || !month || !year || !password) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct birthday in YYYY-MM-DD format
        const birthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        console.log('Constructed birthday:', birthday);

        // Backend API URL
        const apiUrl = 'https://api.cpnacademy.co.uk/register';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, forename, surname, birthday, password }),
            });

            if (response.ok) {
                alert('Registration successful! Redirecting to sign in.');
                window.location.href = '/browse/login.html';
            } else {
                const text = await response.text();
                console.error('Raw response:', text);

                // Attempt to parse JSON error
                try {
                    const result = JSON.parse(text);
                    alert('Error: ' + (result.message || 'An error occurred during registration.'));
                } catch (parseError) {
                    console.error('Failed to parse JSON:', parseError);
                    alert('Error: Unexpected response format from the server.');
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server. Please try again later.');
        }
    });
});
