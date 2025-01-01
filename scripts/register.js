
    // Populate the date dropdowns
    document.addEventListener('DOMContentLoaded', () => {
        const daySelect = document.getElementById('day');
        const monthSelect = document.getElementById('month');
        const yearSelect = document.getElementById('year');

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
            option.value = index + 1; // Months are 1-indexed in the backend
            option.textContent = month;
            monthSelect.appendChild(option);
        });

        // Populate years (from current year to 100 years ago)
        const currentYear = new Date().getFullYear();
        for (let year = currentYear; year >= currentYear - 100; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        }
    });

    // Handle the form submission
    document.addEventListener('DOMContentLoaded', () => {
        const signupForm = document.getElementById('signup-form');
        if (!signupForm) {
            console.error('Signup form not found.');
            return;
        }

        signupForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            // Get form values
            const email = document.getElementById('email').value;
            const forename = document.getElementById('forename').value;
            const surname = document.getElementById('surname').value;
            const day = document.getElementById('day').value;
            const month = document.getElementById('month').value;
            const year = document.getElementById('year').value;
            const birthday = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const password = document.getElementById('password').value;

            // Validate input
            if (!email || !forename || !surname || !day || !month || !year || !password) {
                alert('Please fill in all required fields.');
                return;
            }

            // Backend API URL
            const apiUrl = 'https://api.cpnacademy.co.uk/register';

            try {
                // Sending data to the backend
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
                    const result = await response.json();
                    const errorMessage = result.message || 'An error occurred during registration.';
                    console.error('Backend error:', errorMessage);
                    alert('Error: ' + errorMessage);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to connect to the server. Please try again later.');
            }
        });
    });


