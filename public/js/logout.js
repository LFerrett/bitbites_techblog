const logout = async function() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
    alert('You have been logged out!')
  } else {
    alert('Logout failure!');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);