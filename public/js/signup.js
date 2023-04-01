const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim(); //get the inputted username
    const password = document.querySelector('#password-signup').value.trim(); //get the inputted password
  
    if (username && password) { // make sure username and password were provided
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }), // include username and password in post request body
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/'); //redirect to the homepage once signed up
      } else {
        alert('Failed to sign up.');
      }
    }
  };
 // event listener to check if signup form has been submitted  
  document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);