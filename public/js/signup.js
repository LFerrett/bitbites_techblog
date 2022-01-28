const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-input-signup').value.trim();
  const password = document.querySelector('#password-input-signup').value.trim();

  if (username && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Sign-up failed.');
    }
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);