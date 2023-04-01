const logout = async () => {
    const response = await fetch('/api/users/logout', { //send post request to the logout endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/'); //redirect to the homepage once logged out
    } else {
      alert('Failed to log out.');
    }
};
  // event listener to check if logout button was clicked
document.querySelector('#logout').addEventListener('click', logout);