async function logout() {
  const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
  });

  if (response.ok) {
      document.location.replace('/');
      alert('You have been logged out.')
  } else {
      alert(response.statusText);
  }
}

document.querySelector('#logout').addEventListener('click', logout);