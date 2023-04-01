const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim(); //get the inputted username
    const password = document.querySelector('#password-login').value.trim(); //get the inputted password
  
    if (username && password) { // make sure username and password were provided
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }), // include username and password in post request body
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); //redirect to the homepage once logged in
      } else {
        alert('Failed to log in');
      }
    }
  };
   // event listener to check if login form has been submitted   
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);