const createPostHandler = async (event) => {
    event.preventDefault(); //stops normal submission process
  
    const title = document.querySelector('#title').value.trim(); //get post title from title field
    const content = document.querySelector('#content').value.trim(); //get post content from content field
  
    if (title && content) { //ensure a title and content was provided
      const response = await fetch('/api/posts', { // make post request to api/post endpoint
        method: 'POST',
        body: JSON.stringify({ title, content }), // include title and content in post request body
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard'); // redirect to dashboard after post has been created
      } else {
        alert('Failed to create post');
      }
    }
  };
  // event listener to check if create post form has been submitted
  document
    .querySelector('.create-form')
    .addEventListener('submit', createPostHandler);